package main

import (
	//"encoding/json"
	"log"
	"os"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/daniellima0/corretores-online/backend/router"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	os.Setenv("DATABASE_URL", "postgresql://postgres:123@localhost:5432/corretoresOnline?schema=public")

	e := echo.New()
	e.Use(middleware.Logger())

	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		log.Fatal(err)
	}

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

	router.ContactOptionRouter(e, client)
	router.RealtorRouter(e, client)
	router.SocialsOptionsRouter(e, client)
	log.Print(e.Routes())
	e.Logger.Fatal(e.Start(":8080"))
}
