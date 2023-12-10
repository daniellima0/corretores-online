package handler

import (
	"context"
	"net/http"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

type SafetyQuestionHandler struct {
	client *db.PrismaClient
}

type SafetyQuestionResponse struct {
	db.SafetyQuestionsModel
}

func NewSafetyQuestionHandler(client *db.PrismaClient) *SafetyQuestionHandler {
	return &SafetyQuestionHandler{client}
}

func (h *SafetyQuestionHandler) List(c echo.Context) error {
	ctx := context.Background()

	safety_questions, err := h.client.SafetyQuestions.FindMany().Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusOK, safety_questions)
}
