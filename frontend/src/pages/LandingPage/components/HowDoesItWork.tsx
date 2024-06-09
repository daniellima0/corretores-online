import { styled } from "@mui/material/styles";
import { Divider, Typography } from "@mui/material";
import personIcon from "@/assets/personIcon.png";
import handshakeIcon from "@/assets/handshakeIcon.png";
import phoneIcon from "@/assets/phoneIcon.png";
import MyCard from "@/pages/LandingPage/components/MyCard";

const cardData = [
  {
    icone: personIcon,
    title: "CONHEÇA",
    description:
      "Nosso negócio é desenhado com a preocupação e valorização de pequenos e médios corretores.",
  },
  {
    icone: phoneIcon,
    title: "LIGUE",
    description:
      "Corretores e clientes estão a 1 click de distância entre si, facilitando o networking do ramo imobiliário.",
  },
  {
    icone: handshakeIcon,
    title: "FECHE NEGÓCIO",
    description:
      "Basta acessar o perfil do corretor e entrar em contato para agendar sua visita! Acesse a plataforma!",
  },
];

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  width: "100%",
  height: "100vh",

  [theme.breakpoints.down("md")]: {
    height: "120vh",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  padding: "60px",
  width: "100%",
  height: "auto",
  color: "#FF5E00",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "70px",
  fontWeight: "700",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    padding: "0px",
    fontSize: "35px",
    width: "fit-content",
  },
}));

const CardContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "80%",
  height: "100%",
  gap: "80px",
  [theme.breakpoints.down("md")]: {
    position: "relative",
    flexDirection: "column",
    gap: "5px",
  },
}));

const DividerStyled = styled(Divider)(({ theme }) => ({
  height: "350px",
  width: "3px",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const GetToKnow: React.FC = () => {
  return (
    <>
      <Container id="aqui">
        <Title>Como funciona?</Title>
        <CardContainer>
          <MyCard card={cardData[0]} />
          <DividerStyled
            orientation="vertical"
            variant="middle"
            color="#FF5E00"
          />
          <MyCard card={cardData[1]} />
          <DividerStyled
            orientation="vertical"
            variant="middle"
            color="#FF5E00"
          />
          <MyCard card={cardData[2]} />
        </CardContainer>
      </Container>
    </>
  );
};

export default GetToKnow;
