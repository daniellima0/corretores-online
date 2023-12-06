package handler

import (
	"context"
	"net/http"
	"strings"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type RealtorHandler struct {
	client *db.PrismaClient
}

type RealtorResponse struct {
	db.RealtorModel
}

func NewRealtorHandler(client *db.PrismaClient) *RealtorHandler {
	return &RealtorHandler{client}
}

func (h *RealtorHandler) Create(c echo.Context) error {
	ctx := context.Background()

	var user db.UserModel
	if err := c.Bind(&user); err != nil {
		return err
	}

	user.UserID = uuid.New().String()

	if strings.TrimSpace(user.Name) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Name is required")
	}

	if strings.TrimSpace(user.Cpf) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Cpf is required")
	}

	if strings.TrimSpace(user.Email) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Email is required")
	}

	if strings.TrimSpace(user.Password) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Password is required")
	}

	if user.DateOfBirth.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, "DateOfBirth is required")
	}

	if user.Telephone == nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Telephone is required")
	}

	userCreated := h.client.User.CreateOne(
		db.User.UserID.Set(user.UserID),
		db.User.Name.Set(user.Name),
		db.User.Cpf.Set(user.Cpf),
		db.User.Email.Set(user.Email),
		db.User.Password.Set(user.Password),
		db.User.DateOfBirth.Set(user.DateOfBirth),
		db.User.Telephone.Set(user.Telephone),
		db.User.AuthStatus.Link(db.AuthStatus.Type.Equals("realtor")),
	).Tx()

	var realtor db.RealtorModel
	if err := c.Bind(&realtor); err != nil {
		return err
	}

	realtor.RealID = uuid.New().String()

	if strings.TrimSpace(realtor.Creci) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Creci is required")
	}

	realtorCreated := h.client.Realtor.CreateOne(
		db.Realtor.RealID.Set(realtor.RealID),
		db.Realtor.Creci.Set(realtor.Creci),
		db.Realtor.IsOnline.Set(false),
		db.Realtor.User.Link(db.User.UserID.Equals(user.UserID)),
	).Tx()

	if err := h.client.Prisma.Transaction(userCreated, realtorCreated).Exec(ctx); err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, realtor)
}
