package main

import (
	//"encoding/json"
	"log"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/daniellima0/corretores-online/backend/router"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
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
	router.UserRouter(e, client)
	router.RealtorRouter(e, client)
	router.SocialsOptionsRouter(e, client)
	log.Print(e.Routes())
	e.Logger.Fatal(e.Start(":8080"))
}
