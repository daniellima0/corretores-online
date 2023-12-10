package handler

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/daniellima0/corretores-online/backend/service"
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
	Telephone           service.Telephone           `json:"telephone"`
	SafetyQuestionsUser service.SafetyQuestionsUser `json:"safety_questions"`
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

	var encryptedPassword, err = bcrypt.GenerateFromPassword([]byte(user.Password), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	encryptedAnswer1, err := bcrypt.GenerateFromPassword([]byte(user.SafetyQuestionsUser.QuestionAnswer[0].Answer), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	encryptedAnswer2, err := bcrypt.GenerateFromPassword([]byte(user.SafetyQuestionsUser.QuestionAnswer[1].Answer), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	encryptedAnswer3, err := bcrypt.GenerateFromPassword([]byte(user.SafetyQuestionsUser.QuestionAnswer[2].Answer), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
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

	first_safety_questions := h.client.SafetyQuestionsUser.CreateOne(
		db.SafetyQuestionsUser.SquuID.Set(uuid.New().String()),
		db.SafetyQuestionsUser.Answer.Set(string(encryptedAnswer1)),
		db.SafetyQuestionsUser.SafetyQuestions.Link(db.SafetyQuestions.SaquID.Equals(user.SafetyQuestionsUser.QuestionAnswer[0].SaquID)),
		db.SafetyQuestionsUser.User.Link(db.User.UserID.Equals(user.UserID)),
	).Tx()

	second_safety_questions := h.client.SafetyQuestionsUser.CreateOne(
		db.SafetyQuestionsUser.SquuID.Set(uuid.New().String()),
		db.SafetyQuestionsUser.Answer.Set(string(encryptedAnswer2)),
		db.SafetyQuestionsUser.SafetyQuestions.Link(db.SafetyQuestions.SaquID.Equals(user.SafetyQuestionsUser.QuestionAnswer[1].SaquID)),
		db.SafetyQuestionsUser.User.Link(db.User.UserID.Equals(user.UserID)),
	).Tx()

	third_safety_questions := h.client.SafetyQuestionsUser.CreateOne(
		db.SafetyQuestionsUser.SquuID.Set(uuid.New().String()),
		db.SafetyQuestionsUser.Answer.Set(string(encryptedAnswer3)),
		db.SafetyQuestionsUser.SafetyQuestions.Link(db.SafetyQuestions.SaquID.Equals(user.SafetyQuestionsUser.QuestionAnswer[2].SaquID)),
		db.SafetyQuestionsUser.User.Link(db.User.UserID.Equals(user.UserID)),
	).Tx()

	if err := h.client.Prisma.Transaction(created, first_safety_questions, second_safety_questions, third_safety_questions).Exec(ctx); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, "Usuário criado com sucesso!")
}

func (h *UserHandler) Delete(c echo.Context) error {
	ctx := context.Background()

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

	user, err := h.client.User.FindUnique(
		db.User.UserID.Equals(c.Param("user_id")),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	filteredUser := struct {
		Name      string
		Cpf       string
		Email     string
		Dob       time.Time
		Telephone types.JSON
	}{
		Name:      user.Name,
		Cpf:       user.Cpf,
		Email:     user.Email,
		Dob:       user.DateOfBirth,
		Telephone: user.Telephone,
	}
	return c.JSON(http.StatusOK, filteredUser)
}
