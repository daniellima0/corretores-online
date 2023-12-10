package router

import (
	"github.com/daniellima0/corretores-online/backend/handler"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func SocialsRealtorRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewSocialsRealtorHandler(dbClient)

	g := e.Group("/socials_realtor/")
	g.POST("", h.Create)
	g.PUT(":soci_id", h.Update)
	g.GET("", h.List)
	g.DELETE(":soci_id", h.Delete)
	g.GET(":soci_id", h.Get)
}
