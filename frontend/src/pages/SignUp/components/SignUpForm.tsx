import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as React from "react";
import SelectQuestion from "./SelectQuestion";
import { useNavigate } from "react-router-dom";

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

interface SignUpFormProps {
  userType: "realtor" | "user";
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const primaryColor = props.userType === "realtor" ? "#1C5E9F" : "#FF5E00";
  const navigate = useNavigate();

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

  /*   const questions = [
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
  ]; */

  const [showPassword, setShowPassword] = useState(false);
  const [safety_questions, setSafetyQuestions] = useState([]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = React.useState({
    name: "",
    telephone: {
      ddd: "",
      number: "",
    },
    date_of_birth: "",
    cpf: "",
    creci: "",
    email: "",
    password: "",
    confirmPassword: "",
    safety_questions: {
      question_answer: [
        {
          perguntaUm: "",
          respostaUm: "",
        },
        {
          perguntaDois: "",
          respostaDois: "",
        },
        {
          perguntaTres: "",
          respostaTres: "",
        },
      ],
    },
  });

  /* const handleInputChange =
    (field: string, nestedField?: string, secondNestedField?: string) =>
    (event: { target: { value: any } }) => {
      setFormData((prevFormData) => {
        if (nestedField) {
          return {
            ...prevFormData,
            [field]: {
              ...prevFormData[field],
              [nestedField]: event.target.value,
            },
          };
        } else {
          return { ...prevFormData, [field]: event.target.value };
        }
      });
    }; */

  const handleInputChange =
    (
      field: string,
      nestedField?: string,
      secondNestedField?: string,
      index?: number
    ) =>
    (event: { target: { value: any } }) => {
      setFormData((prevFormData) => {
        if (secondNestedField !== undefined && index !== undefined) {
          return {
            ...prevFormData,
            [field]: {
              ...prevFormData[field],
              [nestedField]: prevFormData[field][nestedField].map(
                (item: any, i: number) =>
                  i === index
                    ? { ...item, [secondNestedField]: event.target.value }
                    : item
              ),
            },
          };
        } else if (nestedField) {
          return {
            ...prevFormData,
            [field]: {
              ...prevFormData[field],
              [nestedField]: event.target.value,
            },
          };
        } else {
          return { ...prevFormData, [field]: event.target.value };
        }
      });
    };

  const validateData = () => {
    console.log(formData.date_of_birth);
    for (const field in formData) {
      if (!formData[field]) {
        if (field === "creci" && props.userType === "user") continue;
        alert(`Preencha o campo ${field}!`);
        return false;
      }
    }

    if (formData.cpf.length !== 11) {
      alert("CPF inválido!");
      return false;
    }

    if (formData.telephone.ddd.length !== 2) {
      alert("DDD inválido!");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return false;
    }

    if (formData.password.length < 8) {
      alert("A senha deve ter no mínimo 8 caracteres!");
      return false;
    }

    if (
      formData.safety_questions.question_answer["perguntaUm"] ===
        formData.safety_questions.question_answer["perguntaDois"] ||
      formData.safety_questions.question_answer["perguntaUm"] ===
        formData.safety_questions.question_answer["perguntaTres"] ||
      formData.safety_questions.question_answer["perguntaDois"] ===
        formData.safety_questions.question_answer["perguntaTres"]
    ) {
      alert("Perguntas de segurança repetidas!");
      return false;
    }

    const securityQuestions = ["perguntaUm", "perguntaDois", "perguntaTres"];
    for (const questionField of securityQuestions) {
      const question = formData[questionField];
      const answer = formData[`resposta${questionField.slice(8)}`];
      if (!question || !answer) {
        console.log(question, answer);
        alert(`Preencha a pergunta e a resposta correspondente!`);
        return false;
      }
    }

    return true;
  };

  const handleSave = () => {
    if (validateData()) {
      const body = {
        name: formData.name,
        cpf: formData.cpf,
        email: formData.email,
        password: formData.password,
        date_of_birth: new Date(formData.date_of_birth).toISOString(),
        telephone: {
          DDD: formData.telephone.ddd,
          number: formData.telephone.number,
        },
        safety_questions: {
          question_answer: [
            {
              question: formData.safety_questions.question_answer["perguntaUm"],
              answer: formData.safety_questions.question_answer["respostaUm"],
            },
            {
              question:
                formData.safety_questions.question_answer["perguntaDois"],
              answer: formData.safety_questions.question_answer["respostaDois"],
            },
            {
              question:
                formData.safety_questions.question_answer["perguntaTres"],
              answer: formData.safety_questions.question_answer["respostaTres"],
            },
          ],
        },
        ...(props.userType === "realtor" && { creci: formData.creci }),
      };

      let signUpUrl =
        props.userType === "realtor"
          ? "http://localhost:8080/realtors/"
          : "http://localhost:8080/user/";

      fetch(signUpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch. Status: ${response.status}`);
          }
          return response.json();
        })
        .then((json) => {
          console.log(json);
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/safety_questions/",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
        const json = await response.json();
        setSafetyQuestions(json);
        console.log(json);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Form>
      <TextFieldStyled
        id="name"
        label="Nome Completo"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.name}
        onChange={handleInputChange("name")}
      />
      <TextFieldStyled
        id="ddd"
        label="DDD"
        type="text"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.telephone.ddd}
        onChange={handleInputChange("telephone", "ddd")}
      />
      <TextFieldStyled
        helperText="Digite apenas os números"
        id="telefone"
        label="Telefone"
        type="text"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.telephone.number}
        onChange={handleInputChange("telephone", "number")}
      />
      <TextFieldStyled
        helperText="Digite sua data de nascimento"
        id="date_of_birth"
        type="date"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.date_of_birth}
        onChange={handleInputChange("date_of_birth")}
      />
      <TextFieldStyled
        helperText="Digite apenas os números"
        id="cpf"
        label="CPF"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.cpf}
        onChange={handleInputChange("cpf")}
      />
      {props.userType === "realtor" && (
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
        helperText="Senha de no mínimo 8 caracteres"
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
        question={formData.safety_questions.question_answer["perguntaUm"]}
        setQuestion={(value: any) =>
          handleInputChange(
            "safety_questions",
            "question_answer",
            "perguntaUm",
            0
          )({ target: { value } })
        }
        possibleQuestions={safety_questions.map(
          (question: { question: string }) => question.question
        )}
      />
      <TextFieldStyled
        id="respostaUm"
        label="Resposta 1"
        variant="outlined"
        margin="normal"
        value={formData.safety_questions.question_answer["respostaUm"]}
        onChange={handleInputChange(
          "safety_questions",
          "question_answer",
          "respostaUm",
          0
        )}
        style={{ width: "100%", borderRadius: "15px" }}
      />
      <SelectQuestion
        placeholder={"Escolha a pergunta 2..."}
        question={formData.safety_questions.question_answer["perguntaDois"]}
        setQuestion={(value: any) =>
          handleInputChange(
            "safety_questions",
            "question_answer",
            "perguntaDois",
            1
          )({ target: { value } })
        }
        possibleQuestions={safety_questions.map(
          (question: { question: string }) => question.question
        )}
      />
      <TextFieldStyled
        id="respostaDois"
        label="Resposta 2"
        variant="outlined"
        margin="normal"
        value={formData.safety_questions.question_answer["respostaDois"]}
        onChange={handleInputChange(
          "safety_questions",
          "question_answer",
          "respostaDois",
          1
        )}
        sx={{ width: "100%", borderRadius: "15px" }}
      />
      <SelectQuestion
        placeholder={"Escolha a pergunta 3..."}
        question={formData.safety_questions.question_answer["perguntaTres"]}
        setQuestion={(value: any) =>
          handleInputChange(
            "safety_questions",
            "question_answer",
            "perguntaTres",
            2
          )({ target: { value } })
        }
        possibleQuestions={safety_questions.map(
          (question: { question: string }) => question.question
        )}
      />
      <TextFieldStyled
        id="respostaTres"
        label="Resposta 3"
        variant="outlined"
        margin="normal"
        value={formData.safety_questions.question_answer["respostaTres"]}
        onChange={handleInputChange(
          "safety_questions",
          "question_answer",
          "respostaTres",
          2
        )}
        sx={{ width: "100%", borderRadius: "15px" }}
      />
      <div>
        <ButtonStyled
          fullWidth
          type="button"
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          <span>Cadastrar</span>
        </ButtonStyled>
      </div>
    </Form>
  );
};

export default SignUpForm;
