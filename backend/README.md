# Backend

- This is the backend of the project. It is a GO project that serves the frontend and provides an API for the frontend to interact with.
- This project should only be set up AFTER the database is setup and running.

## Prerequisites

- Before running the backend, you need to setup your .env file. You can use the .env.example file as a template. You can copy the file and rename it to .env and fill in the values. Refer to the dev team for API keys and other sensitive information.

## Running the Project

- After setting up the .env file, you can run the following commands to start the project:

```sh
cd backend
go run github.com/steebchen/prisma-client-go db pull
go run github.com/steebchen/prisma-client-go db push
go mod tidy
go run main.go
```
