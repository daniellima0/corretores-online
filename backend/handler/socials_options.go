package handler

import (
	"context"
	"net/http"
	"strings"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type SocialsOptionsHandler struct {
	client *db.PrismaClient
}

type SocialsOptionsResponse struct {
	db.SocialsOptionsModel
}

func NewSocialsOptionsHandler(client *db.PrismaClient) *SocialsOptionsHandler {
	return &SocialsOptionsHandler{client}
}

func (h *SocialsOptionsHandler) Create(c echo.Context) error {
	ctx := context.Background()

	var social_option db.SocialsOptionsModel
	if err := c.Bind(&social_option); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	social_option.SoopID = uuid.New().String()

	if strings.TrimSpace(social_option.Name) == "" {
		return c.JSON(http.StatusBadRequest, "Name is required")
	}

	if strings.TrimSpace(social_option.Icon) == "" {
		return c.JSON(http.StatusBadRequest, "Icon is required")
	}

	created, err := h.client.SocialsOptions.CreateOne(
		db.SocialsOptions.SoopID.Set(social_option.SoopID),
		db.SocialsOptions.Icon.Set(social_option.Icon),
		db.SocialsOptions.Name.Set(social_option.Name),
		db.SocialsOptions.ContactOptions.Link(db.ContactOptions.CoopID.Equals(social_option.CoopID)),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, created)
}

func (h *SocialsOptionsHandler) List(c echo.Context) error {
	ctx := context.Background()

	social_option_list, err := h.client.SocialsOptions.FindMany().Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, social_option_list)
}
