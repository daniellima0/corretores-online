#!/bin/sh

# Wait for the database to be ready
until nc -z -v -w30 db 5432
do
  echo "Waiting for database connection..."
  sleep 1
done

# Run Prisma commands
go run github.com/steebchen/prisma-client-go db pull
go run github.com/steebchen/prisma-client-go generate

go build -o main .

# Start the application
./main