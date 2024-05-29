import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import SelectQuestion from "../../SignUp/components/SelectQuestion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/Loading";

const Form = styled("form")({
  width: "80%",
  gap: "12px",
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
  margin: "10px 0px 10px 0px",
  backgroundColor: "#1C5E9F",
  width: "120px",
});

const TextFieldStyled = styled(TextField)({
  width: "100%",
  padding: "0px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "15px",
    },
  },
});

const ResetForm = () => {
  const [loading, setLoading] = useState(false);
  const [safety_questions, setSafetyQuestions] = useState([]);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    safety_questions: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
    ],
    confirmPassword: "",
  });

  const handleInputChange =
    (field: string, nestedField?: string, index?: number) =>
    (event: { target: { value: any } }) => {
      setFormData((prevFormData) => {
        if (nestedField !== undefined && index !== undefined) {
          return {
            ...prevFormData,
            [field]: prevFormData[field].map((item: any, i: number) =>
              i === index
                ? { ...item, [nestedField]: event.target.value }
                : item
            ),
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
    const securityQuestions = formData.safety_questions.map(
      (questionData, index) => {
        const question = questionData.question;
        const answer = questionData.answer;

        if (formData.password !== formData.confirmPassword) {
          alert(
            "As senhas não coincidem. Por favor, verifique e tente novamente."
          );
          return false;
        }

        if (!question || !answer) {
          alert(
            `Preencha a pergunta e a resposta correspondente para a pergunta ${
              index + 1
            }!`
          );
          return false;
        }

        return true;
      }
    );

    if (securityQuestions.includes(false)) {
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (validateData()) {
      setLoading(true);
        const body = {
        email: formData.email,
        password: formData.password,
        safety_questions: [
          {
            question: formData.safety_questions[0].question,
            answer: formData.safety_questions[0].answer,
          },
          {
            question: formData.safety_questions[1].question,
            answer: formData.safety_questions[1].answer,
          },
          {
            question: formData.safety_questions[2].question,
            answer: formData.safety_questions[2].answer,
          },
        ],
      };


      fetch("http://localhost:8080/auth/reset_password", {
        method: "PUT",
        credentials: "include",
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
        .then(() => {
          setLoading(false);
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          alert("Erro ao atualizar senha!");
        });
    }
  };

  useEffect(() => {
    const fetchSafetyQuestions = async () => {
      setLoading(true);
      try {
        const responseSafetyQuestion = await fetch(
          "http://localhost:8080/safety_questions/",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!responseSafetyQuestion.ok) {
          throw new Error("Failed to fetch research data");
        }
        const jsonSafetyQuestion = await responseSafetyQuestion.json();
        setSafetyQuestions(jsonSafetyQuestion);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSafetyQuestions();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Form>
      <TextFieldStyled
        id="email"
        label="Email"
        variant="outlined"
        margin="normal"
        value={formData.email}
        onChange={handleInputChange("email")}
        fullWidth={false}
      />
      <SelectQuestion
        placeholder={"Escolha a pergunta 1..."}
        question={formData.safety_questions[0].question}
        setQuestion={(selectedQuestion: any) =>
          handleInputChange(
            "safety_questions",
            "question",
            0
          )({ target: { value: selectedQuestion } })
        }
        possibleQuestions={safety_questions}
      />
      <TextFieldStyled
        id="respostaUm"
        label="Resposta 1"
        variant="outlined"
        margin="normal"
        value={formData.safety_questions[0].answer}
        onChange={handleInputChange("safety_questions", "answer", 0)}
        style={{ width: "100%", borderRadius: "15px" }}
      />
      <SelectQuestion
        placeholder={"Escolha a pergunta 2..."}
        question={formData.safety_questions[1].question}
        setQuestion={(selectedQuestion: any) =>
          handleInputChange(
            "safety_questions",
            "question",
            1
          )({ target: { value: selectedQuestion } })
        }
        possibleQuestions={safety_questions}
      />
      <TextFieldStyled
        id="respostaDois"
        label="Resposta 2"
        variant="outlined"
        margin="normal"
        value={formData.safety_questions[1].answer}
        onChange={handleInputChange("safety_questions", "answer", 1)}
        style={{ width: "100%", borderRadius: "15px" }}
      />
      <SelectQuestion
        placeholder={"Escolha a pergunta 3..."}
        question={formData.safety_questions[2].question}
        setQuestion={(selectedQuestion: any) =>
          handleInputChange(
            "safety_questions",
            "question",
            2
          )({ target: { value: selectedQuestion } })
        }
        possibleQuestions={safety_questions}
      />
      <TextFieldStyled
        id="respostaTres"
        label="Resposta 3"
        variant="outlined"
        margin="normal"
        value={formData.safety_questions[2].answer}
        onChange={handleInputChange("safety_questions", "answer", 2)}
        style={{ width: "100%", borderRadius: "15px" }}
      />
      <TextFieldStyled
        type={showPassword ? "text" : "password"}
        id="password"
        label="Nova senha"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.password}
        onChange={handleInputChange("password")}
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
        id="password"
        label="Confirme sua nova senha"
        variant="outlined"
        margin="normal"
        fullWidth={false}
        value={formData.confirmPassword}
        onChange={handleInputChange("confirmPassword")}
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
      <div>
        <ButtonStyled
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSave}
        >
          <span>Redefinir</span>
        </ButtonStyled>
      </div>
    </Form>
  );
};

export default ResetForm;
