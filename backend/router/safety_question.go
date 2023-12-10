package router

import (
	"github.com/daniellima0/corretores-online/backend/handler"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func SafetyQuestionRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewSafetyQuestionHandler(dbClient)

	g := e.Group("/safety_questions/")
	g.GET("", h.List)
}
