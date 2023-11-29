create table safety_questions (
	saqu_id UUID primary key,
	question VARCHAR unique not null
);

create table safety_questions_user (
	squu_id UUID primary key,
	saqu_id UUID references safety_questions(saqu_id) not null,
	user_id UUID references "user"(user_id) not null,
	answer VARCHAR not null
)