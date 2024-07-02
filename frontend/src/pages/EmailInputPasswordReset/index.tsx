import HiddenComponent from "../../components/HiddenComponent";
import { Button, TextField, Typography, styled } from "@mui/material";
import CodeInputContainer from "./components/CodeInputContainer";
import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/Loading";

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
    paddingLeft: "20px",
    paddingRight: "20px",
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

const EmailInput = styled(TextField)({
  width: "100%",
});
const ButtonStyled = styled(Button)({
  borderRadius: "10px",
  width: "40%",
  height: "55px",
  fontSize: "18px",
  fontWeight: "900",
  backgroundColor: "#FF5E00",
  marginTop: "40px",
  "&: hover": { backgroundColor: "#FF5E00" },
});

const ResendNote = styled(Typography)({
  fontSize: "16px",
  color: "#7A7A7A",
  width: "100%",
  marginTop: "30px",
});

const EmailInputForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [finalCode, setFinalCode] = useState("");
  const navigator = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleComplete = (code: SetStateAction<string>) => {
    setFinalCode(code);
    console.log("Código final:", finalCode); //temporary
  };

  const [switchPages, setSwitchPages] = useState(false); //temporary

  const handleSendEmail = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/mailer/password/reset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );
      if (!response.ok) {
        const json = await response.json();
        if (json === "Usuario não encontrado") {
          alert("Usuário não encontrado");
        }
        throw new Error("Failed to send reset email");
      }
      const json = await response.json();
      console.log("Email sent:", json);
      setLoading(false);
      setSwitchPages(true);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleSendCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8080/auth/password/reset-code",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code: finalCode }),
        }
      );
      if (!response.ok) {
        const json = await response.json();
        if (json === "Código de recuperação de senha inválido") {
          alert("Código de recuperação de senha inválido");
        }
        throw new Error("Failed to verify code");
      }
      const json = await response.json();
      console.log("Code sent:", json);
      setLoading(false);
      navigator("/password-reset");
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Div>
      <Card>
        <HiddenComponent hidden={switchPages}>
          <Title variant="h1">Esqueceu a senha?</Title>
          <Description>
            Digite o email cadastrado no Corretores Online e enviaremos as
            instruções de como recuperar sua senha.
          </Description>
          <EmailInput
            variant="outlined"
            label="Endereço de Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <ButtonStyled fullWidth variant="contained" onClick={handleSendEmail}>
            Enviar
          </ButtonStyled>
        </HiddenComponent>
        <HiddenComponent hidden={!switchPages}>
          <Title variant="h1">Confirme o código</Title>
          <Description>
            Foi enviado um código de verificação para o seu email. Insira abaixo
            para seguir com a alteração de senha.
          </Description>
          <CodeInputContainer onComplete={handleComplete} numDigits={6} />
          <ButtonStyled fullWidth variant="contained" onClick={handleSendCode}>
            Enviar
          </ButtonStyled>
          <ResendNote>
            {"Não recebeu o código? "}
            <a onClick={handleSendEmail} href="#">
              Reenviar
            </a>
          </ResendNote>
        </HiddenComponent>
      </Card>
    </Div>
  );
};

export default EmailInputForm;
