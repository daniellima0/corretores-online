package handler

import (
	"context"
	"encoding/json"

	"net/http"
	"strconv"
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

type RealtorHandler struct {
	client *db.PrismaClient
}

type RealtorResponse struct {
	db.RealtorModel
}

type RequestBody struct {
	db.UserModel
	Description         *string           `json:"description"`
	Regions             *string           `json:"regions"`
	RealtorInstagram    *string           `json:"realtor_instagram"`
	RealtorFacebook     *string           `json:"realtor_facebook"`
	RealtorWhatsapp     *string           `json:"realtor_whatsapp"`
	Creci               string            `json:"creci"`
	Telephone           service.Telephone `json:"telephone"`
	SafetyQuestionsUser [3]struct {
		Question string `json:"question"`
		Answer   string `json:"answer"`
	} `json:"safety_questions"`
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

	if len(strings.TrimSpace(request.Password)) < 8 {
		return c.JSON(http.StatusBadRequest, "Password must be at least 8 characters")
	}

	if request.DateOfBirth.IsZero() {
		return echo.NewHTTPError(http.StatusBadRequest, "DateOfBirth is required")
	}

	if strings.TrimSpace(request.Telephone.DDD) == "" || strings.TrimSpace(request.Telephone.Number) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Telephone is required")
	}

	if len(request.SafetyQuestionsUser) < 3 {
		return echo.NewHTTPError(http.StatusBadRequest, "SafetyQuestions is required")
	}

	questions := []string{
		request.SafetyQuestionsUser[0].Question,
		request.SafetyQuestionsUser[1].Question,
		request.SafetyQuestionsUser[2].Question,
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

	encryptedPassword, err := bcrypt.GenerateFromPassword([]byte(request.Password), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	encryptedAnswer1, err := bcrypt.GenerateFromPassword([]byte(request.SafetyQuestionsUser[0].Answer), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	encryptedAnswer2, err := bcrypt.GenerateFromPassword([]byte(request.SafetyQuestionsUser[1].Answer), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	encryptedAnswer3, err := bcrypt.GenerateFromPassword([]byte(request.SafetyQuestionsUser[2].Answer), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	safety_questions, err := h.client.SafetyQuestions.FindMany(
		db.SafetyQuestions.Question.In(questions),
	).Exec(ctx)
	if err != nil {
		return err
	}

	userCreated := h.client.User.CreateOne(
		db.User.UserID.Set(request.UserID),
		db.User.Name.Set(request.Name),
		db.User.Cpf.Set(request.Cpf),
		db.User.Email.Set(request.Email),
		db.User.Password.Set(string(encryptedPassword)),
		db.User.DateOfBirth.Set(request.DateOfBirth),
		db.User.Telephone.Set(telephoneJson),
		db.User.AuthStatus.Link(db.AuthStatus.AustID.Equals(auth_status.AustID)),
	).Tx()

	first_safety_questions := h.client.SafetyQuestionsUser.CreateOne(
		db.SafetyQuestionsUser.SquuID.Set(uuid.New().String()),
		db.SafetyQuestionsUser.Answer.Set(string(encryptedAnswer1)),
		db.SafetyQuestionsUser.SafetyQuestions.Link(db.SafetyQuestions.SaquID.Equals(safety_questions[0].SaquID)),
		db.SafetyQuestionsUser.User.Link(db.User.UserID.Equals(request.UserID)),
	).Tx()

	second_safety_questions := h.client.SafetyQuestionsUser.CreateOne(
		db.SafetyQuestionsUser.SquuID.Set(uuid.New().String()),
		db.SafetyQuestionsUser.Answer.Set(string(encryptedAnswer2)),
		db.SafetyQuestionsUser.SafetyQuestions.Link(db.SafetyQuestions.SaquID.Equals(safety_questions[1].SaquID)),
		db.SafetyQuestionsUser.User.Link(db.User.UserID.Equals(request.UserID)),
	).Tx()

	third_safety_questions := h.client.SafetyQuestionsUser.CreateOne(
		db.SafetyQuestionsUser.SquuID.Set(uuid.New().String()),
		db.SafetyQuestionsUser.Answer.Set(string(encryptedAnswer3)),
		db.SafetyQuestionsUser.SafetyQuestions.Link(db.SafetyQuestions.SaquID.Equals(safety_questions[2].SaquID)),
		db.SafetyQuestionsUser.User.Link(db.User.UserID.Equals(request.UserID)),
	).Tx()

	var realtor db.RealtorModel
	realtor.UserID = request.UserID
	realtor.Creci = request.Creci

	if strings.TrimSpace(realtor.Creci) == "" {
		return echo.NewHTTPError(http.StatusBadRequest, "Creci is required")
	}

	realtorCreated := h.client.Realtor.CreateOne(
		db.Realtor.RealID.Set(uuid.New().String()),
		db.Realtor.Creci.Set(realtor.Creci),
		db.Realtor.IsOnline.Set(false),
		db.Realtor.UfOptions.Link(db.UfOptions.UfopID.Equals("f1b3287b-753d-46c6-b6af-8904c93af43a")),
		db.Realtor.User.Link(db.User.UserID.Equals(realtor.UserID)),
	).Tx()

	if err := h.client.Prisma.Transaction(userCreated, first_safety_questions, second_safety_questions, third_safety_questions, realtorCreated).Exec(ctx); err != nil {
		return err
	}

	return c.JSON(http.StatusCreated, "Corretor cadastrado com sucesso!")
}

func (h *RealtorHandler) List(c echo.Context) error {
	ctx := context.Background()

	cookie, err := c.Request().Cookie("token")
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Você não está logado")
	}

	token := cookie.Value

	claims, err := auth.ValidateToken(token)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Login Inválido")
	}

	_, ok := claims["userId"].(string)
	if !ok {
		return c.JSON(http.StatusBadRequest, "ID de usuário não encontrado")
	}

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
		db.Realtor.RealtorLocation.Fetch(),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	var realtorsFiltered []service.RealtorGet
	for _, realtor := range realtors {
		var realtorFiltered service.RealtorGet
		realtorFiltered.RealID = realtor.RealID
		realtorFiltered.Creci = realtor.Creci
		realtorFiltered.IsOnline = realtor.IsOnline
		realtorFiltered.Description, _ = realtor.Description()
		realtorFiltered.Regions, _ = realtor.Regions()
		realtorFiltered.RealtorFacebook, _ = realtor.RealtorFacebook()
		realtorFiltered.RealtorInstagram, _ = realtor.RealtorInstagram()
		realtorFiltered.RealtorWhatsapp, _ = realtor.RealtorWhatsapp()
		realtorFiltered.UserGet.UserID = realtor.User().UserID
		realtorFiltered.UserGet.Name = realtor.User().Name
		realtorFiltered.UserGet.Cpf = realtor.User().Cpf
		realtorFiltered.UserGet.Email = realtor.User().Email
		realtorFiltered.UserGet.DateOfBirth = realtor.User().DateOfBirth
		json.Unmarshal(realtor.User().Telephone, &realtorFiltered.UserGet.Telephone)

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

	cookie, err := c.Request().Cookie("token")
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Você não está logado")
	}

	token := cookie.Value

	claims, err := auth.ValidateToken(token)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Login Inválido")
	}

	_, ok := claims["userId"].(string)
	if !ok {
		return c.JSON(http.StatusBadRequest, "ID de usuário não encontrado")
	}

	realtor, err := h.client.Realtor.FindUnique(
		db.Realtor.UserID.Equals(c.Param("user_id"))).With(
		db.Realtor.User.Fetch(),
		db.Realtor.RealtorLocation.Fetch(),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	var realtorFiltered service.RealtorGet
	realtorFiltered.RealID = realtor.RealID
	realtorFiltered.Creci = realtor.Creci
	realtorFiltered.IsOnline = realtor.IsOnline
	realtorFiltered.Description, _ = realtor.Description()
	realtorFiltered.Regions, _ = realtor.Regions()
	realtorFiltered.RealtorFacebook, _ = realtor.RealtorFacebook()
	realtorFiltered.RealtorInstagram, _ = realtor.RealtorInstagram()
	realtorFiltered.RealtorWhatsapp, _ = realtor.RealtorWhatsapp()
	realtorFiltered.UserGet.UserID = realtor.User().UserID
	realtorFiltered.UserGet.Name = realtor.User().Name
	realtorFiltered.UserGet.Cpf = realtor.User().Cpf
	realtorFiltered.UserGet.Email = realtor.User().Email
	realtorFiltered.UserGet.DateOfBirth = realtor.User().DateOfBirth
	json.Unmarshal(realtor.User().Telephone, &realtorFiltered.UserGet.Telephone)

	realtorLocation, ok := realtor.RealtorLocation()
	if ok {
		realtorFiltered.RealtorLocation.Latitude, _ = realtorLocation.Latitude()
		realtorFiltered.RealtorLocation.Longitude, _ = realtorLocation.Longitude()
	}

	return c.JSON(http.StatusOK, realtorFiltered)
}

func (h *RealtorHandler) Delete(c echo.Context) error {
	ctx := context.Background()

	cookie, err := c.Request().Cookie("token")
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Você não está logado")
	}

	token := cookie.Value

	claims, err := auth.ValidateToken(token)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Login Inválido")
	}

	_, ok := claims["userId"].(string)
	if !ok {
		return c.JSON(http.StatusBadRequest, "ID de usuário não encontrado")
	}

	realtor, err := h.client.Realtor.FindUnique(
		db.Realtor.RealID.Equals(c.Param("real_id")),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	if realtor.UserID != claims["userId"].(string) {
		return c.JSON(http.StatusUnauthorized, "Você não tem permissão para deletar este corretor")
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

	cookie, err := c.Request().Cookie("token")
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Você não está logado")
	}

	token := cookie.Value

	claims, err := auth.ValidateToken(token)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Login Inválido")
	}

	userID, ok := claims["userId"].(string)
	if !ok {
		return c.JSON(http.StatusBadRequest, "ID de usuário não encontrado")
	}

	if userID != c.Param("user_id") {
		return c.JSON(http.StatusUnauthorized, "Você não tem permissão para editar este corretor")
	}

	var request RequestBody
	if err := c.Bind(&request); err != nil {
		return err
	}

	realtor, err := h.client.Realtor.FindUnique(
		db.Realtor.UserID.Equals(c.Param("user_id")),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	_, err = h.client.Realtor.FindUnique(
		db.Realtor.RealID.Equals(realtor.RealID),
	).Update(
		db.Realtor.Description.SetIfPresent(request.Description),
		db.Realtor.Regions.SetIfPresent(request.Regions),
		db.Realtor.RealtorInstagram.SetIfPresent(request.RealtorInstagram),
		db.Realtor.RealtorFacebook.SetIfPresent(request.RealtorFacebook),
		db.Realtor.RealtorWhatsapp.SetIfPresent(request.RealtorWhatsapp),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "Corretor atualizado com sucesso!")
}

func (h *RealtorHandler) SetOnline(c echo.Context) error {
	ctx := context.Background()

	cookie, err := c.Request().Cookie("token")
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Você não está logado")
	}

	token := cookie.Value

	claims, err := auth.ValidateToken(token)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Login Inválido")
	}

	userID, ok := claims["userId"].(string)
	if !ok {
		return c.JSON(http.StatusBadRequest, "ID de usuário não encontrado")
	}

	if userID != c.Param("user_id") {
		return c.JSON(http.StatusUnauthorized, "Você não tem permissão para editar este corretor")
	}

	type SetOnlineRequest struct {
		IsOnline bool `json:"is_online"`
	}
	var req SetOnlineRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid request body")
	}

	_, err = h.client.Realtor.FindUnique(
		db.Realtor.UserID.Equals(c.Param("user_id")),
	).Update(
		db.Realtor.IsOnline.Set(req.IsOnline),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "Status Alterado!")
}

func (h *RealtorHandler) SetLocation(c echo.Context) error {
	ctx := context.Background()

	cookie, err := c.Request().Cookie("token")
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Você não está logado")
	}

	token := cookie.Value

	claims, err := auth.ValidateToken(token)
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Login Inválido")
	}

	_, ok := claims["userId"].(string)
	if !ok {
		return c.JSON(http.StatusBadRequest, "ID de usuário não encontrado")
	}

	if claims["userId"].(string) != c.Param("user_id") {
		return c.JSON(http.StatusUnauthorized, "Você não tem permissãasjlakjsflkgdslif")
	}

	type SetLocationRequest struct {
		Latitude  types.Decimal `json:"latitude"`
		Longitude types.Decimal `json:"longitude"`
	}
	//AQUI
	var req SetLocationRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid request body")
	}

	realtor, err := h.client.Realtor.FindUnique(
		db.Realtor.UserID.Equals(c.Param("user_id")),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	_, err = h.client.RealtorLocation.UpsertOne(
		db.RealtorLocation.RealID.Equals(realtor.RealID),
	).Create(
		db.RealtorLocation.ReloID.Set(uuid.New().String()),
		db.RealtorLocation.Realtor.Link(db.Realtor.RealID.Equals(realtor.RealID)),
		db.RealtorLocation.Latitude.Set(req.Latitude),
		db.RealtorLocation.Longitude.Set(req.Longitude),
	).Update(
		db.RealtorLocation.Latitude.Set(req.Latitude),
		db.RealtorLocation.Longitude.Set(req.Longitude),
	).Exec(ctx)

	return c.JSON(http.StatusOK, "Localização atualizada!")
}
