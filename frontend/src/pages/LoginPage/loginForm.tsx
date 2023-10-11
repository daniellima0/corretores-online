import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  styled,
} from "@mui/material";

const Form = styled("form")({
  width: "50%",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  borderRadius: "50px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
  textAlign: "center",
  margin: "auto",
});

const ButtonStyled = styled(Button)({
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
  borderRadius: "45px",
  margin: "10px 0px 10px 0px",
  backgroundColor: "#1C5E9F",
});

const TextFieldStyled = styled(TextField)({
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

const LoginForm = () => {
  return (
    <Form>
      <TextFieldStyled
        id="email"
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <TextFieldStyled
        id="password"
        label="Senha"
        variant="outlined"
        margin="normal"
        fullWidth
      />
      <FormControlLabel
        label="Lembrar-me"
        control={<Checkbox color="primary" />}
      />
      <div>
        <ButtonStyled variant="contained" color="primary" fullWidth>
          <span>Entrar</span>
        </ButtonStyled>
      </div>
    </Form>
  );
};

export default LoginForm;
