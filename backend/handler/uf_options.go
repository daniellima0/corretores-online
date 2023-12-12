package handler

import (
	"context"
	"net/http"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

type UfOptionsHandler struct {
	client *db.PrismaClient
}

type UfOptionsResponse struct {
	db.UfOptionsModel
}

func NewUfOptionsHandler(client *db.PrismaClient) *UfOptionsHandler {
	return &UfOptionsHandler{client}
}

func (h *UfOptionsHandler) List(c echo.Context) error {
	ctx := context.Background()

	uf_options, err := h.client.UfOptions.FindMany().Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, uf_options)
}
