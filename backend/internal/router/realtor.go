package router

import (
	"github.com/daniellima0/corretores-online/backend/internal/handler"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func RealtorRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewRealtorHandler(dbClient)

	g := e.Group("/realtors/")
	g.POST("", h.Create)
	g.PUT("set_status/:user_id", h.SetOnline)
	g.PUT("set_location/:user_id", h.SetLocation)
	g.GET("", h.List)
	g.GET(":user_id", h.Get)
	g.DELETE(":user_id", h.Delete)
	g.PUT(":user_id", h.Update)
}
