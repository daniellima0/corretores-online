package handler

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"
	"time"

	"github.com/daniellima0/corretores-online/backend/auth"
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

	var encryptedPassword, err = bcrypt.GenerateFromPassword([]byte(user.Password), 14)
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

	created, err := h.client.User.CreateOne(
		db.User.UserID.Set(user.UserID),
		db.User.Name.Set(user.Name),
		db.User.Cpf.Set(user.Cpf),
		db.User.Email.Set(user.Email),
		db.User.Password.Set(string(encryptedPassword)),
		db.User.DateOfBirth.Set(user.DateOfBirth),
		db.User.Telephone.Set(telephoneJson),
		db.User.AuthStatus.Link(db.AuthStatus.AustID.Equals(authStatus.AustID)),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, created)
}

func (h *UserHandler) Login(c echo.Context) error {
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
