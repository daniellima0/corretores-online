import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  styled,
} from "@mui/material";

/* const Form = styled("form")({
  width: "40%",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "30px",
  borderRadius: "50px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
  textAlign: "center",
  margin: "auto",
}); */

const ButtonStyled = styled(Button)({
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
  borderRadius: "45px",
  margin: "10px 0px 10px 0px",
  backgroundColor: "#1C5E9F",
});

const TextFieldStyled = styled(TextField)({
  width: "70%",
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
    <form style={{ display: "flex", flexDirection: "column"}}>
      <TextFieldStyled
        id="email"
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <TextFieldStyled
        id="password"
        label="Senha"
        variant="outlined"
        margin="normal"
        fullWidth={false}
      />
      <FormControlLabel
        label="Lembrar-me"
        control={<Checkbox color="primary" />}
      />
      <div>
        <ButtonStyled
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
        >
          <span>Entrar</span>
        </ButtonStyled>
      </div>
    </form>
  );
};

export default LoginForm;
