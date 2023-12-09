import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useContext, useState } from "react";
import * as React from "react";
import SelectQuestion from "./SelectQuestion";
import { UserTypeContext } from "../../../App";

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

const TextFieldStyled = styled(TextField)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "15px",
    },
  },
});

const Title = styled(Typography)`
  font-family: ${({ theme }) => theme.customTypography.bold};
  font-size: 1.8rem;
  margin-top: 20px;
`;

const SignUpForm = () => {
  const { userType } = useContext(UserTypeContext);

  const primaryColor = userType === "realtor" ? "#1C5E9F" : "#FF5E00";

  const ButtonStyled = styled(Button)({
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
    borderRadius: "45px",
    margin: "30px 0px 10px 0px",
    backgroundColor: primaryColor,
    width: "120px",
    "&: hover": {
      backgroundColor: primaryColor,
      color: "#ffffff",
      border: "none",
    },
  });

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

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = React.useState({
    nome: "",
    sobrenome: "",
    telefone: "",
    dataNascimento: "",
    cpf: "",
    creci: "",
    email: "",
    password: "",
    confirmPassword: "",
    perguntaUm: "",
    respostaUm: "",
    perguntaDois: "",
    respostaDois: "",
    perguntaTres: "",
    respostaTres: "",
  });

  const handleInputChange =
    (field: string) => (event: { target: { value: any } }) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  const validateData = () => {
    for (const field in formData) {
      if (!formData[field]) {
        if (field === "creci" && userType === "costumer") continue;
        alert(`Preencha o campo ${field}!`);
        return;
      }
    }

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    if (
      formData["perguntaUm"] === formData["perguntaDois"] ||
      formData["perguntaUm"] === formData["perguntaTres"] ||
      formData["perguntaDois"] === formData["perguntaTres"]
    ) {
      alert("Perguntas de segurança repetidas!");
      return;
    }

    const securityQuestions = ["perguntaUm", "perguntaDois", "perguntaTres"];
    for (const questionField of securityQuestions) {
      const question = formData[questionField];
      const answer = formData[`resposta${questionField.slice(8)}`];
      if (!question || !answer) {
        console.log(question, answer);
        alert(`Preencha a pergunta e a resposta correspondente!`);
        return;
      }
    }

    console.log("Data validation successful!");
  };

  return (
    <Form>
      <TextFieldStyled
        id="nome"
        label="Nome"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.nome}
        onChange={handleInputChange("nome")}
      />
      <TextFieldStyled
        id="sobrenome"
        label="Sobrenome"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.sobrenome}
        onChange={handleInputChange("sobrenome")}
      />
      <TextFieldStyled
        id="telefone"
        label="Telefone"
        type="text"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.telefone}
        onChange={handleInputChange("telefone")}
      />
      <TextFieldStyled
        id="dataNascimento"
        label="Data de nascimento"
        type="date"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.dataNascimento}
        onChange={handleInputChange("dataNascimento")}
      />
      <TextFieldStyled
        id="cpf"
        label="CPF"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.cpf}
        onChange={handleInputChange("cpf")}
      />
      {userType === "realtor" && (
        <TextFieldStyled
          id="creci"
          label="CRECI"
          variant="outlined"
          margin="normal"
          fullWidth={false}
          value={formData.creci}
          onChange={handleInputChange("creci")}
        />
      )}
      <TextFieldStyled
        id="email"
        label="Email"
        type="email"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.email}
        onChange={handleInputChange("email")}
      />
      <TextFieldStyled
        type={showPassword ? "text" : "password"}
        id="password"
        label="Senha"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.password}
        onChange={handleInputChange("password")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ color: "black" }}
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
        id="confirmPassword"
        label="Confirme sua senha"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.confirmPassword}
        onChange={handleInputChange("confirmPassword")}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                sx={{ color: "black" }}
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
        question={formData.perguntaUm}
        setQuestion={(value: any) =>
          handleInputChange("perguntaUm")({ target: { value } })
        }
        possibleQuestions={questions}
      />
      <TextFieldStyled
        id="respostaUm"
        label="Resposta 1"
        variant="outlined"
        margin="normal"
        value={formData.respostaUm}
        onChange={handleInputChange("respostaUm")}
        style={{ width: "100%", borderRadius: "15px" }}
      />
      <SelectQuestion
        placeholder={"Escolha a pergunta 2..."}
        question={formData.perguntaDois}
        setQuestion={(value: any) =>
          handleInputChange("perguntaDois")({ target: { value } })
        }
        possibleQuestions={questions}
      />
      <TextFieldStyled
        id="respostaDois"
        label="Resposta 2"
        variant="outlined"
        margin="normal"
        value={formData.respostaDois}
        onChange={handleInputChange("respostaDois")}
        sx={{ width: "100%", borderRadius: "15px" }}
      />
      <SelectQuestion
        placeholder={"Escolha a pergunta 3..."}
        question={formData.perguntaTres}
        setQuestion={(value: any) =>
          handleInputChange("perguntaTres")({ target: { value } })
        }
        possibleQuestions={questions}
      />
      <TextFieldStyled
        id="respostaTres"
        label="Resposta 3"
        variant="outlined"
        margin="normal"
        value={formData.respostaTres}
        onChange={handleInputChange("respostaTres")}
        sx={{ width: "100%", borderRadius: "15px" }}
      />
      <div>
        <ButtonStyled
          fullWidth
          type="button"
          variant="contained"
          color="primary"
          onClick={validateData}
        >
          <span>Cadastrar</span>
        </ButtonStyled>
      </div>
    </Form>
  );
};

export default SignUpForm;
