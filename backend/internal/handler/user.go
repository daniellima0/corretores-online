package handler

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/daniellima0/corretores-online/backend/internal/auth"
	"github.com/daniellima0/corretores-online/backend/internal/prisma/db"
	"github.com/daniellima0/corretores-online/backend/internal/service"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/steebchen/prisma-client-go/runtime/types"
	"golang.org/x/crypto/bcrypt"
)

type UserHandler struct {
	client *db.PrismaClient
}

type UserResponse struct {
	db.UserModel
	Telephone service.Telephone `json:"telephone"`
}

func NewUserHandler(client *db.PrismaClient) *UserHandler {
	return &UserHandler{client}
}

func (h *UserHandler) Create(c echo.Context) error {
	ctx := context.Background()

	var user UserResponse
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	user.UserID = uuid.New().String()

	if strings.TrimSpace(user.Name) == "" {
		return c.JSON(http.StatusBadRequest, "Name is required")
	}

	if strings.TrimSpace(user.Email) == "" {
		return c.JSON(http.StatusBadRequest, "Email is required")
	}

	if strings.TrimSpace(user.Password) == "" {
		return c.JSON(http.StatusBadRequest, "Password is required")
	}

	if len(strings.TrimSpace(user.Password)) < 8 {
		return c.JSON(http.StatusBadRequest, "Password must be at least 8 characters")
	}

	if strings.TrimSpace(user.Cpf) == "" {
		return c.JSON(http.StatusBadRequest, "Cpf is required")
	}

	if strings.TrimSpace(user.DateOfBirth.String()) == "" {
		return c.JSON(http.StatusBadRequest, "Date of birth is required")
	}

	if strings.TrimSpace(user.Telephone.DDD) == "" || strings.TrimSpace(user.Telephone.Number) == "" {
		return c.JSON(http.StatusBadRequest, "Telephone is required")
	}

	var encryptedPassword, err = bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	telephoneJson, err := json.Marshal(user.Telephone)
	if err != nil {
		return err
	}

	authStatus, err := h.client.AuthStatus.FindFirst(
		db.AuthStatus.Type.Equals("user"),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	created := h.client.User.CreateOne(
		db.User.UserID.Set(user.UserID),
		db.User.Name.Set(user.Name),
		db.User.Cpf.Set(user.Cpf),
		db.User.Email.Set(user.Email),
		db.User.Password.Set(string(encryptedPassword)),
		db.User.DateOfBirth.Set(user.DateOfBirth),
		db.User.Telephone.Set(telephoneJson),
		db.User.AuthStatus.Link(db.AuthStatus.AustID.Equals(authStatus.AustID)),
	).Tx()

	if err := h.client.Prisma.Transaction(created).Exec(ctx); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, "Usuário criado com sucesso!")
}

func (h *UserHandler) Delete(c echo.Context) error {
	ctx := context.Background()

	userID := c.Param("user_id")

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

	if userId != userID {
		return c.JSON(http.StatusUnauthorized, "Você não tem permissão para deletar esse usuário")
	}

	deleted, err := h.client.User.FindMany(
		db.User.UserID.Equals(c.Param("user_id")),
		db.User.DeletedAt.IsNull(),
	).Update(
		db.User.DeletedAt.Set(time.Now()),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, deleted)
}

func (h *UserHandler) Get(c echo.Context) error {
	ctx := context.Background()

	userID := c.Param("user_id")

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

	if userId != userID {
		return c.JSON(http.StatusUnauthorized, "Você não tem permissão para visualizar esse usuário")
	}

	user, err := h.client.User.FindUnique(
		db.User.UserID.Equals(c.Param("user_id")),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	filteredUser := struct {
		Name      string     `json:"name"`
		Cpf       string     `json:"cpf"`
		Email     string     `json:"email"`
		Dob       time.Time  `json:"date_of_birth"`
		Telephone types.JSON `json:"telephone"`
	}{
		Name:      user.Name,
		Cpf:       user.Cpf,
		Email:     user.Email,
		Dob:       user.DateOfBirth,
		Telephone: user.Telephone,
	}
	return c.JSON(http.StatusOK, filteredUser)
}

func (h *UserHandler) Update(c echo.Context) error {
	ctx := context.Background()

	userID := c.Param("user_id")

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

	if userId != userID {
		return c.JSON(http.StatusUnauthorized, "Você não tem permissão para atualizar esse usuário")
	}

	var user UserResponse
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	if strings.TrimSpace(user.Name) == "" {
		return c.JSON(http.StatusBadRequest, "Name is required")
	}

	if strings.TrimSpace(user.Email) == "" {
		return c.JSON(http.StatusBadRequest, "Email is required")
	}

	/* if strings.TrimSpace(user.Password) == "" {
		return c.JSON(http.StatusBadRequest, "Password is required")
	}

	if len(strings.TrimSpace(user.Password)) < 8 {
		return c.JSON(http.StatusBadRequest, "Password must be at least 8 characters")
	}

	if strings.TrimSpace(user.Cpf) == "" {
		return c.JSON(http.StatusBadRequest, "Cpf is required")
	}

	if strings.TrimSpace(user.DateOfBirth.String()) == "" {
		return c.JSON(http.StatusBadRequest, "Date of birth is required") }*/

	if strings.TrimSpace(user.Telephone.DDD) == "" || strings.TrimSpace(user.Telephone.Number) == "" {
		return c.JSON(http.StatusBadRequest, "Telephone is required")
	}

	telephoneJson, err := json.Marshal(user.Telephone)
	if err != nil {
		return err
	}

	updated, err := h.client.User.FindMany(
		db.User.UserID.Equals(c.Param("user_id")),
		db.User.DeletedAt.IsNull(),
	).Update(
		db.User.Name.Set(user.Name),
		/* 		db.User.Cpf.Set(user.Cpf), */
		db.User.Email.Set(user.Email),
		/* 		db.User.Password.Set(user.Password),
		   		db.User.DateOfBirth.Set(user.DateOfBirth), */
		db.User.Telephone.Set(telephoneJson),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, updated)
}
