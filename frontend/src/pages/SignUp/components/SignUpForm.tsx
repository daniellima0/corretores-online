import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";
import SelectQuestion from "./SelectQuestion";

const Form = styled("form")({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  margin: "auto",
  paddingTop: "24px",

  "@media (max-width: 800px)": {
    width: "100%",
  },
});

const ButtonStyled = styled(Button)({
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
  borderRadius: "45px",
  margin: "30px 0px 10px 0px",
  backgroundColor: "#1C5E9F",
  width: "120px",
});

const TextFieldStyled = styled(TextField)({
  width: "100%",
  "& label.Mui-focused": {
    color: "#FF5E00",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FF5E00",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#1C5E9F",
      borderRadius: "15px",
      border: "2px solid #1C5E9F",
    },
    "&:hover fieldset": {
      borderColor: "#1C5E9F",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1C5E9F",
    },
  },
});

const Title = styled(Typography)`
  font-family: ${({ theme }) => theme.customTypography.bold};
  font-size: 1.8rem;
  margin-top: 20px;
`;

interface SignUpFormProps {
  userType: string;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const questions = [
    "Qual é o nome do seu primeiro animal de estimação?",
    "Em que cidade você nasceu?",
    "Qual é o nome do meio da sua mãe?",
    "Qual era o nome da sua escola primária?",
    "Qual é o seu prato de comida favorito?",
    "Qual é o nome do seu melhor amigo de infância?",
    "Qual é o nome da rua em que você cresceu?",
    "Qual é o nome do seu personagem fictício favorito?",
    "Qual é o modelo do seu primeiro carro?",
    "Em que ano você se formou no ensino médio?",
  ];
  const [selectedQuestions, setSelectedQuestions] = React.useState<string[]>(
    []
  );
  const [filteredQuestions, setFilteredQuestions] =
    React.useState<string[]>(questions);
  const [perguntaUm, setPerguntaUm] = React.useState("");
  const [perguntaDois, setPerguntaDois] = React.useState("");
  const [perguntaTres, setPerguntaTres] = React.useState("");

  return (
    <Form>
      <TextFieldStyled
        id="nome"
        label="Nome"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <TextFieldStyled
        id="sobrenome"
        label="Sobrenome"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <TextFieldStyled
        id="telefone"
        label="Telefone"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <TextFieldStyled
        id="cpf"
        label="CPF"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <TextFieldStyled
        id="creci"
        label="CRECI"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <TextFieldStyled
        id="email"
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <TextFieldStyled
        type={showPassword ? "text" : "password"}
        id="password"
        label="Senha"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextFieldStyled
        type={showPassword ? "text" : "password"}
        label="Confirme sua senha"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                aria-label="Toggle password visibility"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Title variant="h1">
        Perguntas de segurança para recuperação de senha
      </Title>
      <SelectQuestion
        placeholder={"Escolha a pergunta 1..."}
        question={perguntaUm}
        setQuestion={setPerguntaUm}
        possibleQuestions={filteredQuestions}
      />
      <TextFieldStyled
        id="respostaUm"
        label="Resposta 1"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <SelectQuestion
        placeholder={"Escolha a pergunta 2..."}
        question={perguntaDois}
        setQuestion={setPerguntaDois}
        possibleQuestions={filteredQuestions}
      />
      <TextFieldStyled
        id="respostaDois"
        label="Resposta 2"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <SelectQuestion
        placeholder={"Escolha a pergunta 3..."}
        question={perguntaTres}
        setQuestion={setPerguntaTres}
        possibleQuestions={filteredQuestions}
      />
      <TextFieldStyled
        id="respostaTres"
        label="Resposta 3"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <div>
        <ButtonStyled
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          <span>Cadastrar</span>
        </ButtonStyled>
      </div>
    </Form>
  );
};

export default SignUpForm;
