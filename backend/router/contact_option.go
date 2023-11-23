package router

import (
	"github.com/daniellima0/corretores-online/backend/handler"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func ContactOptionRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewContactOptionHandler(dbClient)

	g := e.Group("/contact_options/")
	g.POST("", h.Create)
	g.PUT(":coop_id", h.Update)
	g.GET(":coop_id", h.Get)
	g.GET("", h.List)
	g.DELETE(":coop_id", h.Delete)
}
