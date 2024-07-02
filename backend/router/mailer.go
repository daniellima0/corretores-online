package router

import (
	"github.com/daniellima0/corretores-online/backend/handler"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func MailerRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewMailerHandler(dbClient)

	g := e.Group("/mailer/")
	g.POST("password/reset", h.SendPasswordResetCode)
}
