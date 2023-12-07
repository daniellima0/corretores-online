package router

import (
	"github.com/daniellima0/corretores-online/backend/handler"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func SocialsOptionsRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewSocialsOptionsHandler(dbClient)

	g := e.Group("/socials_options/")
	g.POST("", h.Create)
	g.GET("", h.List)
}
