import HiddenComponent from "../../components/HiddenComponent";
import { Button, TextField, Typography, styled } from "@mui/material";
import CodeInputContainer from "./components/CodeInputContainer";
import { SetStateAction, useState } from "react";

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
  height: "530px",
  width: "70%",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingLeft: "60px",
  paddingRight: "60px",
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
  const [finalCode, setFinalCode] = useState("");

  const handleComplete = (code: SetStateAction<string>) => {
    setFinalCode(code);
    console.log("Código final:", finalCode); //temporary
  };

  const [switchPages, setSwitchPages] = useState(false); //temporary

  return (
    <Div>
      <Card>
        <HiddenComponent hidden={switchPages}>
          <Title variant="h1">Esqueceu a senha?</Title>
          <Description>
            Digite o email cadastrado no Corretores Online e enviaremos as
            instruções de como recuperar sua senha.
          </Description>
          <EmailInput variant="outlined" label="Endereço de Email" />
          <ButtonStyled
            fullWidth
            variant="contained"
            onClick={() => {
              setSwitchPages(true);
            }}
          >
            Enviar
          </ButtonStyled>
        </HiddenComponent>
        <HiddenComponent hidden={!switchPages}>
          <Title variant="h1">Confirme o código</Title>
          <Description>
            Foi enviado um código de verificação para o seu email. Insira abaixo
            para seguir com a alteração de senha.
          </Description>
          <CodeInputContainer onComplete={handleComplete} numDigits={4} />
          <ButtonStyled
            fullWidth
            variant="contained"
            onClick={() => {
              setSwitchPages(false);
            }}
          >
            Enviar
          </ButtonStyled>
          <ResendNote>
            {"Não recebeu o código? "}
            <a href="#">Reenviar</a>
          </ResendNote>
        </HiddenComponent>
      </Card>
    </Div>
  );
};

export default EmailInputForm;
