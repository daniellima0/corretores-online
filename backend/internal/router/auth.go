package router

import (
	"github.com/daniellima0/corretores-online/backend/internal/handler"
	"github.com/daniellima0/corretores-online/backend/internal/prisma/db"
	"github.com/labstack/echo/v4"
)

func AuthRouter(e *echo.Echo, dbClient *db.PrismaClient) {
	h := handler.NewAuthHandler(dbClient)

	g := e.Group("/auth/")
	g.POST("login", h.Login)
	g.GET("check", h.CheckUserLoggedIn)
	g.GET("logout", h.Logout)
}
