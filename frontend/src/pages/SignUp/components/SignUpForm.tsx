import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import { useState } from "react";
import * as React from "react";

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

interface SignUpFormProps {
  userType: string;
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
