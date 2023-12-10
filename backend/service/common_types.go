package service

import (
	"time"

	"github.com/steebchen/prisma-client-go/runtime/types"
)

type Telephone struct {
	DDD    string `json:"DDD"`
	Number string `json:"number"`
}

type QuestionAnswer struct {
	SaquID   string `json:"saqu_id"`
	Question string `json:"question"`
	Answer   string `json:"answer"`
}

type SafetyQuestionsUser struct {
	QuestionAnswer [3]QuestionAnswer `json:"question_answer"`
}

type User struct {
	UserID              string              `json:"user_id"`
	Name                string              `json:"name"`
	Cpf                 string              `json:"cpf"`
	Email               string              `json:"email"`
	DateOfBirth         time.Time           `json:"date_of_birth"`
	Telephone           Telephone           `json:"telephone"`
	SafetyQuestionsUser SafetyQuestionsUser `json:"safety_questions"`
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

type RegionsUsed struct {
	Region string `json:"region"`
}

type RealtorRegions struct {
	RegionsUsed RegionsUsed `json:"regions_used"`
}

type Realtor struct {
	RealID          string           `json:"real_id"`
	Creci           string           `json:"creci"`
	IsOnline        bool             `json:"is_online"`
	Description     string           `json:"description"`
	User            User             `json:"user"`
	RealtorSocials  []RealtorSocials `json:"socials_realtor"`
	RealtorLocation RealtorLocation  `json:"realtor_location"`
	RealtorRegions  []RealtorRegions `json:"realtor_regions"`
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
	RealID          string           `json:"real_id"`
	Creci           string           `json:"creci"`
	IsOnline        bool             `json:"is_online"`
	Description     string           `json:"description"`
	UserGet         UserGet          `json:"user"`
	RealtorSocials  []RealtorSocials `json:"socials_realtor"`
	RealtorLocation RealtorLocation  `json:"realtor_location"`
	RealtorRegions  []RealtorRegions `json:"realtor_regions"`
}
