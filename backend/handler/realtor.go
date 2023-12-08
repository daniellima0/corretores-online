package handler

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/steebchen/prisma-client-go/runtime/types"
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

type User struct {
	Name        string    `json:"name"`
	Cpf         string    `json:"cpf"`
	Email       string    `json:"email"`
	DateOfBirth time.Time `json:"date_of_birth"`
	Telephone   Telephone `json:"telephone"`
}

type SocialsOptions struct {
	Name string `json:"name"`
	Icon string `json:"icon"`
}

type SocialsRealtor struct {
	ContactInfo    string         `json:"contact_info"`
	SocialsOptions SocialsOptions `json:"socials_options"`
}

type RealtorLocation struct {
	Latitude  types.Decimal `json:"latitude"`
	Longitude types.Decimal `json:"longitude"`
}

type RegionsUsed struct {
	Region string `json:"region"`
}

type RealtorRegions struct {
	RegionsUsed RegionsUsed `json:"regions_used"`
}

type Realtor struct {
	Creci           string            `json:"creci"`
	IsOnline        bool              `json:"is_online"`
	Description     string            `json:"description"`
	User            User              `json:"user"`
	SocialsRealtor  []SocialsRealtor  `json:"socials_realtor"`
	RealtorLocation []RealtorLocation `json:"realtor_location"`
	RealtorRegions  []RealtorRegions  `json:"realtor_regions"`
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

	isOnline := c.QueryParam("is_online")

	var isOnlineBool *bool

	if isOnline != "" {
		converted, err := strconv.ParseBool(isOnline)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
		isOnlineBool = &converted
	}

	realtors, err := h.client.Realtor.FindMany(
		db.Realtor.User.Where(db.User.DeletedAt.IsNull()),
		db.Realtor.IsOnline.EqualsIfPresent(isOnlineBool),
	).With(
		db.Realtor.User.Fetch(),
		db.Realtor.SocialsRealtor.Fetch().With(
			db.SocialsRealtor.SocialsOptions.Fetch().With(
				db.SocialsOptions.ContactOptions.Fetch(),
			),
		),
		db.Realtor.RealtorLocation.Fetch(),
		db.Realtor.RealtorRegions.Fetch().With(
			db.RealtorRegions.RegionsUsed.Fetch(),
		),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	var realtorsFiltered []Realtor
	for _, realtor := range realtors {
		var realtorFiltered Realtor
		realtorFiltered.Creci = realtor.Creci
		realtorFiltered.IsOnline = realtor.IsOnline
		realtorFiltered.Description, _ = realtor.Description()
		realtorFiltered.User.Name = realtor.User().Name
		realtorFiltered.User.Cpf = realtor.User().Cpf
		realtorFiltered.User.Email = realtor.User().Email
		realtorFiltered.User.DateOfBirth = realtor.User().DateOfBirth
		json.Unmarshal(realtor.User().Telephone, &realtorFiltered.User.Telephone)

		if realtor.SocialsRealtor() != nil {
			for _, social := range realtor.SocialsRealtor() {
				var socialFiltered SocialsRealtor
				socialFiltered.ContactInfo = social.ContactInfo
				socialFiltered.SocialsOptions.Name = social.SocialsOptions().Name
				socialFiltered.SocialsOptions.Icon = social.SocialsOptions().Icon
				realtorFiltered.SocialsRealtor = append(realtorFiltered.SocialsRealtor, socialFiltered)
			}
		}
		if realtor.RealtorRegions() != nil {
			for _, region := range realtor.RealtorRegions() {
				if region.RegionsUsed() != nil {
					var regionFiltered RealtorRegions
					regionFiltered.RegionsUsed.Region = region.RegionsUsed().Region
					realtorFiltered.RealtorRegions = append(realtorFiltered.RealtorRegions, regionFiltered)
				}
			}
		}
		if realtor.RealtorLocation() != nil {
			for _, location := range realtor.RealtorLocation() {
				var locationFiltered RealtorLocation
				locationFiltered.Latitude, _ = location.Latitude()
				locationFiltered.Longitude, _ = location.Longitude()
				realtorFiltered.RealtorLocation = append(realtorFiltered.RealtorLocation, locationFiltered)
			}
		}

		realtorsFiltered = append(realtorsFiltered, realtorFiltered)
	}

	return c.JSON(http.StatusOK, realtorsFiltered)
}

func (h *RealtorHandler) Get(c echo.Context) error {
	ctx := context.Background()

	realtor, err := h.client.Realtor.FindUnique(
		db.Realtor.RealID.Equals(c.Param("real_id"))).With(
		db.Realtor.User.Fetch(),
		db.Realtor.SocialsRealtor.Fetch().With(
			db.SocialsRealtor.SocialsOptions.Fetch().With(
				db.SocialsOptions.ContactOptions.Fetch(),
			),
		),
		db.Realtor.RealtorLocation.Fetch(),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, realtor)
}

func (h *RealtorHandler) Delete(c echo.Context) error {
	ctx := context.Background()

	realtor, err := h.client.Realtor.FindUnique(
		db.Realtor.RealID.Equals(c.Param("real_id")),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	deleted, err := h.client.User.FindMany(
		db.User.UserID.Equals(realtor.UserID),
		db.User.DeletedAt.IsNull(),
	).Update(
		db.User.DeletedAt.Set(time.Now()),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, deleted)
}

func (h *RealtorHandler) AddSocial(c echo.Context) error {
	ctx := context.Background()

	var realtor_social db.SocialsRealtorModel
	if err := c.Bind(&realtor_social); err != nil {
		return err
	}

	realtor_social.SociID = uuid.New().String()

	if strings.TrimSpace(realtor_social.ContactInfo) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Contact info is required")
	}

	if strings.TrimSpace(realtor_social.RealID) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Realtor id is required")
	}

	if strings.TrimSpace(realtor_social.SoopID) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Social option is required")
	}

	realtor_social_created, err := h.client.SocialsRealtor.CreateOne(
		db.SocialsRealtor.SociID.Set(realtor_social.SociID),
		db.SocialsRealtor.ContactInfo.Set(realtor_social.ContactInfo),
		db.SocialsRealtor.Realtor.Link(db.Realtor.RealID.Equals(realtor_social.RealID)),
		db.SocialsRealtor.SocialsOptions.Link(db.SocialsOptions.SoopID.Equals(realtor_social.SoopID)),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, realtor_social_created)
}

func (h *RealtorHandler) UpdateSocial(c echo.Context) error {
	ctx := context.Background()

	var realtor_social db.SocialsRealtorModel
	if err := c.Bind(&realtor_social); err != nil {
		return err
	}

	realtor_social_updated, err := h.client.SocialsRealtor.FindUnique(
		db.SocialsRealtor.SociID.Equals(c.Param("soci_id")),
	).Update(
		db.SocialsRealtor.ContactInfo.Set(realtor_social.ContactInfo),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusCreated, realtor_social_updated)
}

func (h *RealtorHandler) ListSocials(c echo.Context) error {
	ctx := context.Background()

	socials, err := h.client.SocialsRealtor.FindMany(
		db.SocialsRealtor.RealID.Equals(c.Param("real_id")),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, socials)
}

func (h *RealtorHandler) DeleteSocial(c echo.Context) error {
	ctx := context.Background()

	social, err := h.client.SocialsRealtor.FindUnique(
		db.SocialsRealtor.SociID.Equals(c.Param("soci_id")),
	).Delete().Exec(ctx)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, social)
}
