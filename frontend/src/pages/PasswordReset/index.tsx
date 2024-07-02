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
import { useNavigate } from "react-router-dom";

const Div = styled("div")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  minHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F5F5F5",
});

const Card = styled("div")({
  height: "fit-content",
  width: "70%",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingLeft: "60px",
  paddingRight: "60px",
  paddingTop: "40px",
  paddingBottom: "40px",
  justifyContent: "center",
  textAlign: "center",

  borderRadius: "20px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
  margin: "auto",
  maxWidth: "700px",

  "@media (max-width: 800px)": {
    width: "90%",
  },
  "@media (max-width: 500px)": {
    width: "100%",
    borderRadius: "0px",
  },
});

const Title = styled(Typography)({
  fontSize: "40px",
  fontWeight: "900",
  textAlign: "start",
  width: "100%",
  marginBottom: "40px",
});
const Description = styled(Typography)({
  fontSize: "20px",
  fontWeight: "400",
  color: "#7A7A7A",
  width: "100%",
  textAlign: "start",
  marginBottom: "20px",
});

const PasswordInput = styled(TextField)({
  width: "100%",
  marginBottom: "20px",
});
const ButtonStyled = styled(Button)({
  borderRadius: "10px",
  width: "40%",
  height: "55px",
  fontSize: "18px",
  fontWeight: "900",
  backgroundColor: "#FF5E00",
  marginTop: "10px",
  "&: hover": { backgroundColor: "#FF5E00" },
});

const PasswordReset: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const navigator = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordReset = async () => {
    if (password !== confirmPassword) {
      alert("As senhas não coincidem");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/auth/password/reset",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to set new password");
      }
      const json = await response.json();
      console.log("Password sent:", json);
      navigator("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Div>
      <Card>
        <Title variant="h1">Definir nova senha</Title>
        <Description>
          Digite e confirme sua nova senha. Deve ter no mínimo 8 caracteres.
        </Description>
        <PasswordInput
          type={showPassword ? "text" : "password"}
          id="password"
          label="Senha"
          variant="outlined"
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          label="Confirmar Senha"
          variant="outlined"
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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <ButtonStyled
          fullWidth
          variant="contained"
          onClick={handlePasswordReset}
        >
          Enviar
        </ButtonStyled>
      </Card>
    </Div>
  );
};

export default PasswordReset;
