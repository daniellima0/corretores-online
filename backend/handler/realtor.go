package handler

import (
	"context"
	"encoding/json"
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

type Telephone struct {
	DDD    string `json:"DDD"`
	Number string `json:"number"`
}

type RequestBody struct {
	db.UserModel
	Creci     string    `json:"creci"`
	Telephone Telephone `json:"telephone"`
}

func NewRealtorHandler(client *db.PrismaClient) *RealtorHandler {
	return &RealtorHandler{client}
}

func (h *RealtorHandler) Create(c echo.Context) error {
	ctx := context.Background()

	var request RequestBody
	if err := c.Bind(&request); err != nil {
		return err
	}

	request.UserID = uuid.New().String()

	if strings.TrimSpace(request.Name) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Name is required")
	}

	if strings.TrimSpace(request.Cpf) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Cpf is required")
	}

	if strings.TrimSpace(request.Email) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Email is required")
	}

	if strings.TrimSpace(request.Password) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Password is required")
	}

	if request.DateOfBirth.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, "DateOfBirth is required")
	}

	if strings.TrimSpace(request.Telephone.DDD) == "" || strings.TrimSpace(request.Telephone.Number) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Telephone is required")
	}

	telephoneJson, err := json.Marshal(request.Telephone)
	if err != nil {
		return err
	}

	auth_status, err := h.client.AuthStatus.FindFirst(
		db.AuthStatus.Type.Equals("realtor"),
	).Exec(ctx)
	if err != nil {
		return err
	}

	userCreated := h.client.User.CreateOne(
		db.User.UserID.Set(request.UserID),
		db.User.Name.Set(request.Name),
		db.User.Cpf.Set(request.Cpf),
		db.User.Email.Set(request.Email),
		db.User.Password.Set(request.Password),
		db.User.DateOfBirth.Set(request.DateOfBirth),
		db.User.Telephone.Set(telephoneJson),
		db.User.AuthStatus.Link(db.AuthStatus.AustID.Equals(auth_status.AustID)),
	).Tx()

	var realtor db.RealtorModel
	realtor.RealID = uuid.New().String()
	realtor.Creci = request.Creci

	if strings.TrimSpace(realtor.Creci) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Creci is required")
	}

	realtorCreated := h.client.Realtor.CreateOne(
		db.Realtor.RealID.Set(realtor.RealID),
		db.Realtor.Creci.Set(realtor.Creci),
		db.Realtor.IsOnline.Set(false),
		db.Realtor.User.Link(db.User.UserID.Equals(request.UserID)),
	).Tx()

	if err := h.client.Prisma.Transaction(userCreated, realtorCreated).Exec(ctx); err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, realtor)
}

func (h *RealtorHandler) List(c echo.Context) error {
	ctx := context.Background()

	realtors, err := h.client.Realtor.FindMany(
		db.Realtor.User.Where(db.User.DeletedAt.IsNull()),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, realtors)
}

func (h *RealtorHandler) Get(c echo.Context) error {
	ctx := context.Background()

	realtor, err := h.client.Realtor.FindUnique(
		db.Realtor.RealID.Equals(c.Param("real_id"))).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, realtor)
}

/* func (h *RealtorHandler) Delete(c echo.Context) error {
	ctx := context.Background()

	deleted, err := h.client.Realtor.FindMany(
		db.Realtor.RealID.Equals(c.Param("real_id")),
		db.Realtor.User.Where(db.User.DeletedAt.IsNull()),
		).Update(
			db.Realtor.User.
		).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, deleted)
} */
