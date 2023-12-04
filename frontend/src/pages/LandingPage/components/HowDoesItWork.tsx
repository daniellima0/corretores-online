import { styled } from "@mui/material/styles";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import personIcon from "../../../assets/personIcon.png";
import handshakeIcon from "../../../assets/handshakeIcon.png";
import phoneIcon from "../../../assets/phoneIcon.png";

const cardData = [
  {
    id: 1,
    icone: personIcon,
    title: "CONHEÇA",
    description:
      "Nosso negócio é desenhado com a preocupação e valorização de pequenos e médios corretores.",
  },
  {
    id: 2,
    icone: phoneIcon,
    title: "LIGUE",
    description:
      "Corretores e clientes estão a 1 click de distância entre si, facilitando o networking do ramo imobiliário.",
  },
  {
    id: 3,
    icone: handshakeIcon,
    title: "FECHE NEGÓCIO",
    description:
      "Basta acessar o perfil do corretor e entrar em contato para agendar sua visita!",
  },
];

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  width: "100%",
  height: "90vh",

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
  height: "90%",
  gap: "80px",
  [theme.breakpoints.down("md")]: {
    position: "relative",
    flexDirection: "column",
    gap: "5px",
  },
}));
const InfoCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  display: "flex",
  minWidth: "160px",
  alignItems: "center",
  justifyContent: "center",
  height: "50%",
  cursor: "pointer",
  "&: hover": { boxShadow: "5px 5px 50px rgba(0, 0, 0, 0.20)" },
  [theme.breakpoints.down("md")]: { height: "50%", scale: "0.8" },
}));

const DividerStyled = styled(Divider)(({ theme }) => ({
  height: "350px",
  width: "3px",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const CardIcon = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  paddingBottom: "20px",
  [theme.breakpoints.down("md")]: {},
}));

const GetToKnow: React.FC = () => {
  return (
    <>
      <Container>
        <Title>Como funciona?</Title>
        <CardContainer>
          {cardData.map((card) => (
            <>
              <InfoCard
                sx={{ maxWidth: 400 }}
                onClick={() => {
                  location.href = "/realtor-profile";
                }}
              >
                <CardContent>
                  <CardIcon>
                    <img
                      src={card.icone}
                      alt="icon"
                      style={{ width: "150px" }}
                    />
                  </CardIcon>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign={"center"}
                    fontWeight={900}
                    fontSize={"30px"}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign={"center"}
                    fontSize={"16px"}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
              </InfoCard>
              {card.id <= 2 && (
                <DividerStyled
                  orientation="vertical"
                  variant="middle"
                  color="#FF5E00"
                  key={card.id}
                />
              )}
            </>
          ))}
        </CardContainer>
      </Container>
    </>
  );
};

export default GetToKnow;
