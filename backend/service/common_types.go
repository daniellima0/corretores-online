package service

import (
	"time"

	"github.com/steebchen/prisma-client-go/runtime/types"
)

type Telephone struct {
	DDD    string `json:"DDD"`
	Number string `json:"number"`
}

type User struct {
	UserID              string    `json:"user_id"`
	Name                string    `json:"name"`
	Cpf                 string    `json:"cpf"`
	Email               string    `json:"email"`
	DateOfBirth         time.Time `json:"date_of_birth"`
	Telephone           Telephone `json:"telephone"`
	SafetyQuestionsUser [3]struct {
		Question string `json:"question"`
		Answer   string `json:"answer"`
	} `json:"safety_questions"`
}

type Contact struct {
	Type string `json:"type"`
}

type Options struct {
	Name    string  `json:"name"`
	Icon    string  `json:"icon"`
	Contact Contact `json:"contact_options"`
}

type RealtorSocials struct {
	ContactInfo string  `json:"contact_info"`
	Options     Options `json:"socials_options"`
}

type RealtorLocation struct {
	Latitude  types.Decimal `json:"latitude"`
	Longitude types.Decimal `json:"longitude"`
}

type Realtor struct {
	RealID          string           `json:"real_id"`
	Creci           string           `json:"creci"`
	IsOnline        bool             `json:"is_online"`
	Description     string           `json:"description"`
	User            User             `json:"user"`
	UF              string           `json:"uf"`
	RealtorSocials  []RealtorSocials `json:"socials_realtor"`
	RealtorLocation RealtorLocation  `json:"realtor_location"`
}

type UserGet struct {
	UserID      string    `json:"user_id"`
	Name        string    `json:"name"`
	Cpf         string    `json:"cpf"`
	Email       string    `json:"email"`
	DateOfBirth time.Time `json:"date_of_birth"`
	Telephone   Telephone `json:"telephone"`
}

type RealtorGet struct {
	RealID           string           `json:"real_id"`
	Creci            string           `json:"creci"`
	UF               string           `json:"uf"`
	IsOnline         bool             `json:"is_online"`
	Description      string           `json:"description"`
	UserGet          UserGet          `json:"user"`
	RealtorSocials   []RealtorSocials `json:"socials_realtor"`
	RealtorLocation  RealtorLocation  `json:"realtor_location"`
	Regions          string           `json:"regions"`
	RealtorInstagram string           `json:"realtor_instagram"`
	RealtorFacebook  string           `json:"realtor_facebook"`
	RealtorWhatsapp  string           `json:"realtor_whatsapp"`
}
type CheckUserLoggedInResponse struct {
	UserID     string `json:"user_id"`
	AuthStatus string `json:"auth_status"`
	Name       string `json:"name"`
}
