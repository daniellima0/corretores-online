package handler

import (
	"context"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/daniellima0/corretores-online/backend/auth"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/daniellima0/corretores-online/backend/service"
	"github.com/labstack/echo/v4"
	"github.com/pkg/errors"
	"golang.org/x/crypto/bcrypt"
)

type AuthHandler struct {
	client *db.PrismaClient
}

func NewAuthHandler(client *db.PrismaClient) *AuthHandler {
	return &AuthHandler{client}
}

func (h *AuthHandler) Login(c echo.Context) error {
	ctx := context.Background()

	var user UserResponse
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	if strings.TrimSpace(user.Email) == "" {
		return c.JSON(http.StatusBadRequest, "Email is required")
	}

	if strings.TrimSpace(user.Password) == "" {
		return c.JSON(http.StatusBadRequest, "Password is required")
	}
	userDb, err := h.client.User.FindUnique(
		db.User.Email.Equals(user.Email),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	err = bcrypt.CompareHashAndPassword([]byte(userDb.Password), []byte(user.Password))
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	auth.GenerateJWT(c.Response().Writer, userDb.UserID)

	return c.JSON(http.StatusOK, userDb)

}

func (h *AuthHandler) CheckUserLoggedIn(c echo.Context) error {
	cookie, err := c.Request().Cookie("token")
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "Você não está logado")
	}

	token := cookie.Value
	claims, err := auth.ValidateToken(token)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, "Token inválido")
	}

	userId, ok := claims["userId"].(string)
	if !ok {
		return c.JSON(http.StatusUnauthorized, "Token JWT não contém userId")
	}

	userDb, err := h.client.User.FindUnique(
		db.User.UserID.Equals(userId),
	).With(
		db.User.AuthStatus.Fetch(),
	).Exec(context.Background())
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	response := service.CheckUserLoggedInResponse{
		UserID:     userDb.UserID,
		AuthStatus: userDb.AuthStatus().Type,
		Name:       userDb.Name,
	}

	return c.JSON(http.StatusOK, response)
}

func (h *AuthHandler) Logout(c echo.Context) error {
	cookie := new(http.Cookie)
	cookie.Name = "token"
	cookie.Value = ""
	cookie.Expires = time.Unix(0, 0)
	cookie.Path = "/"
	c.SetCookie(cookie)

	return c.NoContent(http.StatusOK)
}

func (h *AuthHandler) ResetPassword(c echo.Context) error {
	ctx := context.Background()

	var resetPassword service.ResetPasswordRequest
	if err := c.Bind(&resetPassword); err != nil {
		return c.JSON(http.StatusBadRequest, "Erro ao fazer bind do resetPassword")
	}

	fmt.Println(resetPassword)

	if strings.TrimSpace(resetPassword.Email) == "" {
		return c.JSON(http.StatusBadRequest, "Email is required")
	}

	if strings.TrimSpace(resetPassword.Password) == "" {
		return c.JSON(http.StatusBadRequest, "Password is required")
	}

	if len(resetPassword.SafetyQuestionsUser) == 0 {
		return c.JSON(http.StatusBadRequest, "Safety questions are required")
	}

	encryptedPassword, err := bcrypt.GenerateFromPassword([]byte(resetPassword.Password), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	user, err := h.client.User.FindUnique(
		db.User.Email.Equals(resetPassword.Email),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errors.Wrap(err, "Erro ao encontrar usuário pelo email"))
	}

	safetyQuestions, err := h.client.SafetyQuestionsUser.FindMany(
		db.SafetyQuestionsUser.UserID.Equals(user.UserID),
	).With(
		db.SafetyQuestionsUser.SafetyQuestions.Fetch(),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, errors.Wrap(err, "Erro ao encontrar perguntas de segurança do usuário"))
	}

	for _, question := range resetPassword.SafetyQuestionsUser {
		found := false
		for _, safetyQuestion := range safetyQuestions {
			if safetyQuestion.SafetyQuestions().Question == question.Question {
				err := bcrypt.CompareHashAndPassword([]byte(safetyQuestion.Answer), []byte(question.Answer))
				if err == nil {
					found = true
					break
				}
			}
		}
		if !found {
			return c.JSON(http.StatusBadRequest, "As respostas fornecidas não correspondem às registradas")
		}
	}

	_, err = h.client.User.FindUnique(
		db.User.UserID.Equals(user.UserID),
	).Update(
		db.User.Password.Set(string(encryptedPassword)),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Erro ao atualizar senha do usuário")
	}

	return c.JSON(http.StatusOK, "Senha atualizada com sucesso")
}
