package router

import (
	"github.com/daniellima0/corretores-online/backend/handler"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func UfOptionsRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewUfOptionsHandler(dbClient)

	g := e.Group("/uf_options/")
	g.GET("", h.List)
}
