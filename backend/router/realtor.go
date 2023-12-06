package router

import (
	"github.com/daniellima0/corretores-online/backend/handler"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func RealtorRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewRealtorHandler(dbClient)

	g := e.Group("/realtors/")
	g.POST("", h.Create)
	g.GET("", h.List)
	g.GET(":real_id", h.Get)
	/* g.PUT(":real_id", h.Update)
	g.DELETE(":real_id", h.Delete) */
}
