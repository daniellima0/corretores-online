package handler

import (
	"context"
	"net/http"
	"strings"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type ContactOptionHandler struct {
	client *db.PrismaClient
}

type ContactOptionResponse struct {
	db.ContactOptionsModel
}

func NewContactOptionHandler(client *db.PrismaClient) *ContactOptionHandler {
	return &ContactOptionHandler{client}
}

func (h *ContactOptionHandler) Create(c echo.Context) error {
	ctx := context.Background()

	var contact_option db.ContactOptionsModel
	if err := c.Bind(&contact_option); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	contact_option.CoopID = uuid.New().String()

	if strings.TrimSpace(contact_option.Type) == "" {
		return c.JSON(http.StatusBadRequest, "Type is required")
	}

	created, err := h.client.ContactOptions.CreateOne(
		db.ContactOptions.CoopID.Set(contact_option.CoopID),
		db.ContactOptions.Type.Set(contact_option.Type),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, created)
}

func (h *ContactOptionHandler) Update(c echo.Context) error {
	ctx := context.Background()

	var contact_option db.ContactOptionsModel
	if err := c.Bind(&contact_option); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	if strings.TrimSpace(contact_option.Type) == "" {
		return c.JSON(http.StatusBadRequest, "Type is required")
	}

	updated, err := h.client.ContactOptions.FindUnique(
		db.ContactOptions.CoopID.Equals(c.Param("coop_id"))).Update(
		db.ContactOptions.Type.Set(contact_option.Type),
	).Exec(ctx)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, updated)
}

func (h *ContactOptionHandler) List(c echo.Context) error {
	ctx := context.Background()

	contact_options, err := h.client.ContactOptions.FindMany().Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, contact_options)
}

func (h *ContactOptionHandler) Get(c echo.Context) error {
	ctx := context.Background()

	contact_option, err := h.client.ContactOptions.FindUnique(
		db.ContactOptions.CoopID.Equals(c.Param("coop_id"))).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, contact_option)
}

func (h *ContactOptionHandler) Delete(c echo.Context) error {
	ctx := context.Background()

	contact_option, err := h.client.ContactOptions.FindUnique(
		db.ContactOptions.CoopID.Equals(c.Param("coop_id"))).Delete().Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, contact_option)
}
