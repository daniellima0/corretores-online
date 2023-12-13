import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  styled,
  MenuItem,
} from "@mui/material";
import SelectQuestion from "../../SignUp/components/SelectQuestion";
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
  padding: "0px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "15px",
    },
  },
});

const DropdownInputStyled = styled(TextField)({
  marginTop: "14px",
  marginBottom: "8px",
  width: "100%",

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderRadius: "15px",
    },
  },
});

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
      <DropdownInputStyled placeholder={"Escolha a pergunta 1..."} />
      <TextFieldStyled
        id="respostaUm"
        label="Resposta 1"
        variant="outlined"
        margin="normal"
        value={""}
        //onChange={""}
        style={{ width: "100%", borderRadius: "15px" }}
      />
      <DropdownInputStyled placeholder={"Escolha a pergunta 2..."} />
      <TextFieldStyled
        id="respostaDois"
        label="Resposta 2"
        variant="outlined"
        margin="normal"
        value={""}
        //onChange={""}
        style={{ width: "100%", borderRadius: "15px" }}
      />
      <DropdownInputStyled placeholder={"Escolha a pergunta 3..."} />
      <TextFieldStyled
        id="respostaTres"
        label="Resposta 3"
        variant="outlined"
        margin="normal"
        value={""}
        //onChange={""}
        style={{ width: "100%", borderRadius: "15px" }}
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
