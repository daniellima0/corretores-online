package handler

import (
	"context"
	"net/http"
	"strings"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type SocialsRealtorHandler struct {
	client *db.PrismaClient
}

type SocialsRealtorResponse struct {
	db.SocialsRealtorModel
}

func NewSocialsRealtorHandler(client *db.PrismaClient) *SocialsRealtorHandler {
	return &SocialsRealtorHandler{client}
}

func (h *SocialsRealtorHandler) Create(c echo.Context) error {
	ctx := context.Background()

	var socials_realtor db.SocialsRealtorModel
	if err := c.Bind(&socials_realtor); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	socials_realtor.SociID = uuid.New().String()

	if strings.TrimSpace(socials_realtor.ContactInfo) == "" {
		return c.JSON(http.StatusBadRequest, "Contact info is required")
	}

	if socials_realtor.RealID == "" {
		return c.JSON(http.StatusBadRequest, "Realtor ID is required")
	}

	if socials_realtor.SoopID == "" {
		return c.JSON(http.StatusBadRequest, "Socials options ID is required")
	}

	created, err := h.client.SocialsRealtor.CreateOne(
		db.SocialsRealtor.SociID.Set(socials_realtor.SociID),
		db.SocialsRealtor.ContactInfo.Set(socials_realtor.ContactInfo),
		db.SocialsRealtor.Realtor.Link(db.Realtor.RealID.Equals(socials_realtor.RealID)),
		db.SocialsRealtor.SocialsOptions.Link(db.SocialsOptions.SoopID.Equals(socials_realtor.SoopID)),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, created)
}

func (h *SocialsRealtorHandler) List(c echo.Context) error {
	ctx := context.Background()

	socials_realtor, err := h.client.SocialsRealtor.FindMany().Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, socials_realtor)
}

func (h *SocialsRealtorHandler) Get(c echo.Context) error {
	ctx := context.Background()

	socials_realtor, err := h.client.SocialsRealtor.FindUnique(
		db.SocialsRealtor.SociID.Equals(c.Param("soci_id")),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, socials_realtor)
}

func (h *SocialsRealtorHandler) Update(c echo.Context) error {
	ctx := context.Background()

	var socials_realtor db.SocialsRealtorModel
	if err := c.Bind(&socials_realtor); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	if strings.TrimSpace(socials_realtor.ContactInfo) == "" {
		return c.JSON(http.StatusBadRequest, "Contact info is required")
	}

	updated, err := h.client.SocialsRealtor.FindUnique(
		db.SocialsRealtor.SociID.Equals(c.Param("soci_id")),
	).Update(
		db.SocialsRealtor.ContactInfo.Set(socials_realtor.ContactInfo),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, updated)
}

func (h *SocialsRealtorHandler) Delete(c echo.Context) error {
	ctx := context.Background()

	deleted, err := h.client.SocialsRealtor.FindUnique(
		db.SocialsRealtor.SociID.Equals(c.Param("soci_id")),
	).Delete().Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, deleted)
}
