package router

import (
	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
)

func StartRouters(e *echo.Echo, dbClient *db.PrismaClient) {
	ContactOptionRouter(e, dbClient)
	UserRouter(e, dbClient)
	RealtorRouter(e, dbClient)
	SocialsOptionsRouter(e, dbClient)
	AuthRouter(e, dbClient)
}
