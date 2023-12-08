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

type ContactOptions struct {
	Type string `json:"type"`
}

type SocialsOptions struct {
	Icon          string         `json:"icon"`
	Name          string         `json:"name"`
	ContactOption ContactOptions `json:"contact_option"`
}

type SocialsRealtor struct {
	ContactInfo    string         `json:"contact_info"`
	SocialsOptions SocialsOptions `json:"socials_options"`
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

	pickCreated, err := h.client.SocialsRealtor.FindUnique(
		db.SocialsRealtor.SociID.Equals(created.SociID),
	).With(
		db.SocialsRealtor.SocialsOptions.Fetch().With(
			db.SocialsOptions.ContactOptions.Fetch(),
		),
	).Exec(ctx)

	createdFiltered := SocialsRealtor{
		ContactInfo: pickCreated.ContactInfo,
		SocialsOptions: SocialsOptions{
			Icon: pickCreated.SocialsOptions().Icon,
			Name: pickCreated.SocialsOptions().Name,
			ContactOption: ContactOptions{
				Type: pickCreated.SocialsOptions().ContactOptions().Type,
			},
		},
	}

	return c.JSON(http.StatusCreated, createdFiltered)
}

func (h *SocialsRealtorHandler) List(c echo.Context) error {
	ctx := context.Background()

	socials_realtor, err := h.client.SocialsRealtor.FindMany(
		db.SocialsRealtor.RealID.Equals(c.QueryParam("real_id")),
	).With(
		db.SocialsRealtor.SocialsOptions.Fetch().With(
			db.SocialsOptions.ContactOptions.Fetch(),
		),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	var socials []SocialsRealtor
	for _, social := range socials_realtor {
		socials = append(socials, SocialsRealtor{
			ContactInfo: social.ContactInfo,
			SocialsOptions: SocialsOptions{
				Icon: social.SocialsOptions().Icon,
				Name: social.SocialsOptions().Name,
				ContactOption: ContactOptions{
					Type: social.SocialsOptions().ContactOptions().Type,
				},
			},
		})
	}

	return c.JSON(http.StatusOK, socials)
}

func (h *SocialsRealtorHandler) Get(c echo.Context) error {
	ctx := context.Background()

	socials_realtor, err := h.client.SocialsRealtor.FindUnique(
		db.SocialsRealtor.SociID.Equals(c.Param("soci_id")),
	).With(
		db.SocialsRealtor.SocialsOptions.Fetch().With(
			db.SocialsOptions.ContactOptions.Fetch(),
		),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	social := SocialsRealtor{
		ContactInfo: socials_realtor.ContactInfo,
		SocialsOptions: SocialsOptions{
			Icon: socials_realtor.SocialsOptions().Icon,
			Name: socials_realtor.SocialsOptions().Name,
			ContactOption: ContactOptions{
				Type: socials_realtor.SocialsOptions().ContactOptions().Type,
			},
		},
	}

	return c.JSON(http.StatusOK, social)
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
	).With(
		db.SocialsRealtor.SocialsOptions.Fetch().With(
			db.SocialsOptions.ContactOptions.Fetch(),
		),
	).Update(
		db.SocialsRealtor.ContactInfo.Set(socials_realtor.ContactInfo),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	updatedFiltered := SocialsRealtor{
		ContactInfo: updated.ContactInfo,
		SocialsOptions: SocialsOptions{
			Icon: updated.SocialsOptions().Icon,
			Name: updated.SocialsOptions().Name,
			ContactOption: ContactOptions{
				Type: updated.SocialsOptions().ContactOptions().Type,
			},
		},
	}

	return c.JSON(http.StatusOK, updatedFiltered)
}

func (h *SocialsRealtorHandler) Delete(c echo.Context) error {
	ctx := context.Background()

	deleted, err := h.client.SocialsRealtor.FindUnique(
		db.SocialsRealtor.SociID.Equals(c.Param("soci_id")),
	).With(
		db.SocialsRealtor.SocialsOptions.Fetch().With(
			db.SocialsOptions.ContactOptions.Fetch(),
		),
	).Delete().Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	deletedFiltered := SocialsRealtor{
		ContactInfo: deleted.ContactInfo,
		SocialsOptions: SocialsOptions{
			Icon: deleted.SocialsOptions().Icon,
			Name: deleted.SocialsOptions().Name,
			ContactOption: ContactOptions{
				Type: deleted.SocialsOptions().ContactOptions().Type,
			},
		},
	}

	return c.JSON(http.StatusOK, deletedFiltered)
}
