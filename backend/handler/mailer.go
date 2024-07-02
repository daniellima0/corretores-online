package handler

import (
	"context"
	"crypto/rand"
	"net/http"
	"os"
	"strings"

	"github.com/daniellima0/corretores-online/backend/prisma/db"
	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/gomail.v2"
)

type MailerHandler struct {
	client *db.PrismaClient
}

type PasswordResetRequestBody struct {
	Email string `json:"email"`
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

func generateSecureRandomDigitCode(numDigits int) (string, error) {
	const charset = "0123456789"
	code := make([]byte, numDigits)

	randomBytes := make([]byte, numDigits)
	_, err := rand.Read(randomBytes)
	if err != nil {
		return "", err
	}

	for i, b := range randomBytes {
		code[i] = charset[b%byte(len(charset))]
	}

	return string(code), nil
}

func (h *MailerHandler) SendPasswordResetCode(c echo.Context) error {
	ctx := context.Background()

	var request PasswordResetRequestBody
	if err := c.Bind(&request); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	if strings.TrimSpace(request.Email) == "" {
		return c.JSON(http.StatusBadRequest, "Email is required")
	}

	user, err := h.client.User.FindUnique(
		db.User.Email.Equals(request.Email),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Usuario não encontrado")
	}

	resetCode, err := generateSecureRandomDigitCode(6)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Erro ao gerar código de recuperação de senha")
	}

	encryptedResetCode, err := bcrypt.GenerateFromPassword([]byte(resetCode), 14)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Erro ao gerar código de recuperação de senha")
	}

	PwrcId := uuid.New().String()

	_, err = h.client.PasswordResetCode.CreateOne(
		db.PasswordResetCode.PwrcID.Set(PwrcId),
		db.PasswordResetCode.Code.Set(string(encryptedResetCode)),
		db.PasswordResetCode.User.Link(db.User.UserID.Equals(user.UserID)),
	).Exec(ctx)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Erro ao criar código de recuperação de senha")
	}

	from := "corretoresmail@gmail.com"
	subject := "Corretores Online - Código de recuperação de senha"
	body := "Olá, recebemos uma solicitação de recuperação de senha no Corretores Online. Seu código de recuperação é: " + resetCode
	smtpHost := "smtp.gmail.com"
	smtpPort := 587
	smtpUser := "corretoresmail@gmail.com"
	smtpPassword := os.Getenv("MAILER_PASSWORD")

	err = sendEmail(from, request.Email, subject, body, smtpHost, smtpPort, smtpUser, smtpPassword)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, "Erro ao enviar email de recuperação de senha")
	}

	return c.JSON(http.StatusOK, "Email sent")
}
