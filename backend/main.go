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
	log.Print(e.Routes())
	e.Logger.Fatal(e.Start(":8080"))

	/* if err := run(); err != nil {
		panic(err)
	} */
}

/* func run() error {
	e := echo.New()
	e.Use(middleware.Logger())

	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		return err
	}

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

	router.ContactOptionRouter(e, client)
	log.Print(e.Routes())
	e.Logger.Fatal(e.Start(":8080"))

		ctx := context.Background()

	   	// Find single contact_option

	   	contact_option, err := client.ContactOptions.FindUnique(
	   		db.ContactOptions.CoopID.Equals("6fbc58ac-e660-4d4f-9962-021cc8ec0ed0"),
	   	).Exec(ctx)
	   	if err != nil {
	   		return err
	   	}

	   	result, _ := json.MarshalIndent(contact_option, "", "  ")
	   	fmt.Printf("contact option: %s\n", result)

	   	contactType := contact_option.Type
	   	if contactType == "" {
	   		return fmt.Errorf("contactType is null")
	   	}

	   	fmt.Printf("contactType: %s\n", contactType)

	   	return nil
} */
