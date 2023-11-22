package main

import (
	//"encoding/json"
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
)

func main() {
	os.Setenv("DATABASE_URL", "postgresql://postgres:123@localhost:5432/corretoresOnline?schema=public")
	if err := run(); err != nil {
		panic(err)
	}
}

func run() error {
	client := db.NewClient()
	if err := client.Prisma.Connect(); err != nil {
		return err
	}

	defer func() {
		if err := client.Prisma.Disconnect(); err != nil {
			panic(err)
		}
	}()

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
}
