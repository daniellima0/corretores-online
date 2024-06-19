package handler

import (
	"net/http"
	"os"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/labstack/echo/v4"
	"gopkg.in/gomail.v2"
)

type MailerHandler struct {
	client *db.PrismaClient
}

func NewMailerHandler(client *db.PrismaClient) *MailerHandler {
	return &MailerHandler{client}
}

func sendEmail(from, to, subject, body, smtpHost string, smtpPort int, smtpUser, smtpPass string) error {
	m := gomail.NewMessage()
	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", subject)
	m.SetBody("text/plain", body)

	d := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)

	return d.DialAndSend(m)
}

func (h *MailerHandler) Send(c echo.Context) error {
	from := "corretoresmail@gmail.com"
	subject := "Corretores Online - Recuperação de senha"
	body := "Olá, você solicitou a recuperação de senha no Corretores Online. Para redefinir sua senha, clique no link a seguir: http://localhost:3000/reset-password"

	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	smtpUser := "corretoresmail@gmail.com"
	smtpPassword := os.Getenv("MAILER_PASSWORD")

	address := c.Param("address")
	if address == "" {
		return c.JSON(http.StatusBadRequest, "Address is required")
	}

	err := sendEmail(from, address, subject, body, smtpHost, smtpPort, smtpUser, smtpPassword)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSON(http.StatusOK, "Email sent")
}
