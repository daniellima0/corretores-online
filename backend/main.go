package main

import (
	//"encoding/json"
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

	//ctx := context.Background()

	return nil
}
