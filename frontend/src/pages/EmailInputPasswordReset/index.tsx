import { Button, TextField, Typography, styled } from "@mui/material";

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
  height: "450px",
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
  marginBottom: "40px",
});
const ButtonStyled = styled(Button)({
  borderRadius: "35px",
  width: "50%",
  height: "40px",
  fontSize: "16px",
  fontWeight: "900",
  backgroundColor: "#FF5E00",
  "&: hover": { backgroundColor: "#FF5E00" },
});

const EmailInputForm: React.FC = () => {
  return (
    <Div>
      <Card>
        <Title variant="h1">Esqueceu a senha?</Title>
        <Description>
          Digite seu email cadastrado no Corretores Online e enviaremos as
          instruções de como recuperar sua senha.
        </Description>
        <EmailInput variant="outlined" label="Endereço de Email" />
        <ButtonStyled fullWidth variant="contained">
          Enviar
        </ButtonStyled>
      </Card>
    </Div>
  );
};

export default EmailInputForm;
