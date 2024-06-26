package router

import (
	"github.com/daniellima0/corretores-online/backend/internal/handler"
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func UserRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewUserHandler(dbClient)

	g := e.Group("/user/")
	g.POST("", h.Create)
	g.GET(":user_id", h.Get)
	g.DELETE(":user_id", h.Delete)
	g.PUT(":user_id", h.Update)

}
