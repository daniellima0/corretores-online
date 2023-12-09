package handler

import (
	"context"
	"encoding/json"

	//"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/daniellima0/corretores-online/backend/service"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type RealtorHandler struct {
	client *db.PrismaClient
}

type RealtorResponse struct {
	db.RealtorModel
}

type RequestBody struct {
	db.UserModel
	Description *string           `json:"description"`
	Creci       string            `json:"creci"`
	Telephone   service.Telephone `json:"telephone"`
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
	realtor.UserID = request.UserID
	realtor.Creci = request.Creci

	if strings.TrimSpace(realtor.Creci) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Creci is required")
	}

	realtorCreated := h.client.Realtor.CreateOne(
		db.Realtor.RealID.Set(realtor.RealID),
		db.Realtor.Creci.Set(realtor.Creci),
		db.Realtor.IsOnline.Set(false),
		db.Realtor.User.Link(db.User.UserID.Equals(realtor.UserID)),
	).Tx()

	if err := h.client.Prisma.Transaction(userCreated, realtorCreated).Exec(ctx); err != nil {
		return err
	}

	description, _ := realtorCreated.Result().Description()

	telephoneBytes := userCreated.Result().Telephone
	telephoneResponse := service.Telephone{}
	if err := json.Unmarshal(telephoneBytes, &telephoneResponse); err != nil {
		return err
	}

	response := service.Realtor{
		RealID:      realtorCreated.Result().RealID,
		Creci:       realtorCreated.Result().Creci,
		IsOnline:    realtorCreated.Result().IsOnline,
		Description: description,
		User: service.User{
			UserID:      userCreated.Result().UserID,
			Name:        userCreated.Result().Name,
			Cpf:         userCreated.Result().Cpf,
			Email:       userCreated.Result().Email,
			DateOfBirth: userCreated.Result().DateOfBirth,
			Telephone:   telephoneResponse,
		},
	}

	return c.JSON(http.StatusCreated, response)
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

	var realtorsFiltered []service.Realtor
	for _, realtor := range realtors {
		var realtorFiltered service.Realtor
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
				var socialFiltered service.RealtorSocials
				socialFiltered.ContactInfo = social.ContactInfo
				socialFiltered.Options.Name = social.SocialsOptions().Name
				socialFiltered.Options.Icon = social.SocialsOptions().Icon
				socialFiltered.Options.Contact.Type = social.SocialsOptions().ContactOptions().Type
				realtorFiltered.RealtorSocials = append(realtorFiltered.RealtorSocials, socialFiltered)
			}
		}
		if realtor.RealtorRegions() != nil {
			for _, region := range realtor.RealtorRegions() {
				if region.RegionsUsed() != nil {
					var regionFiltered service.RealtorRegions
					regionFiltered.RegionsUsed.Region = region.RegionsUsed().Region
					realtorFiltered.RealtorRegions = append(realtorFiltered.RealtorRegions, regionFiltered)
				}
			}
		}
		realtorLocation, ok := realtor.RealtorLocation()
		if ok {
			realtorFiltered.RealtorLocation.Latitude, _ = realtorLocation.Latitude()
			realtorFiltered.RealtorLocation.Longitude, _ = realtorLocation.Longitude()
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
		db.Realtor.RealtorRegions.Fetch().With(
			db.RealtorRegions.RegionsUsed.Fetch(),
		),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	var realtorFiltered service.Realtor
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
			var socialFiltered service.RealtorSocials
			socialFiltered.ContactInfo = social.ContactInfo
			socialFiltered.Options.Name = social.SocialsOptions().Name
			socialFiltered.Options.Icon = social.SocialsOptions().Icon
			socialFiltered.Options.Contact.Type = social.SocialsOptions().ContactOptions().Type
			realtorFiltered.RealtorSocials = append(realtorFiltered.RealtorSocials, socialFiltered)
		}
	}
	if realtor.RealtorRegions() != nil {
		for _, region := range realtor.RealtorRegions() {
			if region.RegionsUsed() != nil {
				var regionFiltered service.RealtorRegions
				regionFiltered.RegionsUsed.Region = region.RegionsUsed().Region
				realtorFiltered.RealtorRegions = append(realtorFiltered.RealtorRegions, regionFiltered)
			}
		}
	}
	realtorLocation, ok := realtor.RealtorLocation()
	if ok {
		realtorFiltered.RealtorLocation.Latitude, _ = realtorLocation.Latitude()
		realtorFiltered.RealtorLocation.Longitude, _ = realtorLocation.Longitude()
	}

	return c.JSON(http.StatusOK, realtorFiltered)
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

func (h *RealtorHandler) Update(c echo.Context) error {
	ctx := context.Background()

	var request RequestBody
	if err := c.Bind(&request); err != nil {
		return err
	}

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

	if strings.TrimSpace(request.Creci) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Creci is required")
	}

	telephoneJson, err := json.Marshal(request.Telephone)
	if err != nil {
		return err
	}

	realtor, err := h.client.Realtor.FindUnique(
		db.Realtor.RealID.Equals(c.Param("real_id")),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	realtorUpdated := h.client.Realtor.FindUnique(
		db.Realtor.RealID.Equals(realtor.RealID),
	).Update(
		db.Realtor.Creci.Set(request.Creci),
		db.Realtor.Description.SetIfPresent(request.Description),
	).Tx()

	userUpdated := h.client.User.FindMany(
		db.User.UserID.Equals(realtor.UserID),
		db.User.DeletedAt.IsNull(),
	).Update(
		db.User.Name.Set(request.Name),
		db.User.Cpf.Set(request.Cpf),
		db.User.Email.Set(request.Email),
		db.User.Password.Set(request.Password),
		db.User.DateOfBirth.Set(request.DateOfBirth),
		db.User.Telephone.Set(telephoneJson),
	).Tx()

	if err := h.client.Prisma.Transaction(realtorUpdated, userUpdated).Exec(ctx); err != nil {
		return err
	}

	response, err := h.client.Realtor.FindUnique(
		db.Realtor.RealID.Equals(c.Param("real_id")),
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

	responseFiltered := service.Realtor{}
	responseFiltered.RealID = response.RealID
	responseFiltered.Creci = response.Creci
	responseFiltered.IsOnline = response.IsOnline
	responseFiltered.Description, _ = response.Description()
	responseFiltered.User.UserID = response.User().UserID
	responseFiltered.User.Name = response.User().Name
	responseFiltered.User.Cpf = response.User().Cpf
	responseFiltered.User.Email = response.User().Email
	responseFiltered.User.DateOfBirth = response.User().DateOfBirth
	json.Unmarshal(response.User().Telephone, &responseFiltered.User.Telephone)

	if response.SocialsRealtor() != nil {
		for _, social := range response.SocialsRealtor() {
			var socialFiltered service.RealtorSocials
			socialFiltered.ContactInfo = social.ContactInfo
			socialFiltered.Options.Name = social.SocialsOptions().Name
			socialFiltered.Options.Icon = social.SocialsOptions().Icon
			socialFiltered.Options.Contact.Type = social.SocialsOptions().ContactOptions().Type
			responseFiltered.RealtorSocials = append(responseFiltered.RealtorSocials, socialFiltered)
		}
	}
	if response.RealtorRegions() != nil {
		for _, region := range response.RealtorRegions() {
			if region.RegionsUsed() != nil {
				var regionFiltered service.RealtorRegions
				regionFiltered.RegionsUsed.Region = region.RegionsUsed().Region
				responseFiltered.RealtorRegions = append(responseFiltered.RealtorRegions, regionFiltered)
			}
		}
	}
	realtorLocation, ok := response.RealtorLocation()
	if ok {
		responseFiltered.RealtorLocation.Latitude, _ = realtorLocation.Latitude()
		responseFiltered.RealtorLocation.Longitude, _ = realtorLocation.Longitude()
	}

	return c.JSON(http.StatusOK, responseFiltered)
}
