import { Typography, styled } from "@mui/material";
import LoginForm from "./loginForm";

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
});

const LoginPage = () => {
  return (
    <Div>
      <Card>
        <>
          <Typography variant="h4">Bem vindo de volta!</Typography>
          <LoginForm />
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Typography variant="subtitle1">
              Não possui uma conta? <a href="/login-page">Cadastre-se</a>
            </Typography>
            <Typography variant="subtitle1">
              Não possui uma conta? <a href="/login-page">Cadastre-se</a>
            </Typography>
          </div>
        </>
      </Card>
    </Div>
  );
};

export default LoginPage;
