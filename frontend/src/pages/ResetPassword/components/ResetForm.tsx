import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  styled,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

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

const DropdownInputStyled = styled(TextField)({
  marginTop: "14px",
  marginBottom: "8px",
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

const securityQuestions = [
  { value: "questao1", label: "Qual é o nome da sua primeira escola?" },
  {
    value: "questao2",
    label: "Qual é o nome do seu primeiro animal de estimação?",
  },
  { value: "questao3", label: "Qual é o nome da cidade onde nasceu?" },
];

const ResetForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Form>
      <TextFieldStyled
        id="email"
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <DropdownInputStyled select label="Pergunta de segurança">
        {securityQuestions.map((securityQuestion) => (
          <MenuItem key={securityQuestion.value} value={securityQuestion.value}>
            {securityQuestion.label}
          </MenuItem>
        ))}
      </DropdownInputStyled>
      <TextFieldStyled
        id="security-answer"
        label="Insira a resposta de segurança"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <TextFieldStyled
        type={showPassword ? "text" : "password"}
        id="password"
        label="Nova senha"
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
        id="password"
        label="Confirme sua nova senha"
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
      <div>
        <ButtonStyled
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          <span>Redefinir</span>
        </ButtonStyled>
      </div>
    </Form>
  );
};

export default ResetForm;
