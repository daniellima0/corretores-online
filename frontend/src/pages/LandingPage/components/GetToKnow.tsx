import { styled } from "@mui/material/styles";
import mulherNoPc from "../../../assets/MulherNoPc.png";
import { Button, Typography } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "auto",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${mulherNoPc})`,
  backgroundSize: "cover",
  width: "100%",
  height: "90vh",
  gap: "40px",

  [theme.breakpoints.down("md")]: { height: "70vh", gap: "20px" },
}));

const Title = styled(Typography)(({ theme }) => ({
  width: "50%",
  height: "auto",
  color: "#FFFFFF",
  textShadow: "8px 8px 10px rgba(0, 0, 0, 0.20)",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "70px",
  fontWeight: "700",
  textAlign: "center",

  [theme.breakpoints.down("md")]: { fontSize: "40px", width: "70%" },
}));

const Description = styled(Typography)(({ theme }) => ({
  width: "50%",
  height: "fit-content",
  color: "#FFFFFF",
  textShadow: "8px 8px 10px rgba(0, 0, 0, 0.20)",
  fontFamily: "${({ theme }) => theme.customTypography.regular}",
  fontSize: "30px",
  textAlign: "center",

  [theme.breakpoints.down("md")]: { fontSize: "15px" },
}));

const DiscoverButton = styled(Button)(({ theme }) => ({
  width: "auto",
  backgroundColor: "#FF5E00",
  color: "#FFFFFF",
  "&: hover": { backgroundColor: "#FF5E00", color: "#ffffff" },
  [theme.breakpoints.down("md")]: {},
}));

const GetToKnow: React.FC = () => {
  return (
    <>
      <Container>
        <Title>Conheça o Site</Title>
        <Description>
          Acesse o site e veja tudo na prática. Navegue pelo tempo que quiser, e
          se ainda tiver dúvidas, fale conosco.
        </Description>
        <DiscoverButton
          variant="contained"
          endIcon={<OpenInNewIcon />}
          size="large"
        >
          Conhecer o Site
        </DiscoverButton>
      </Container>
    </>
  );
};

export default GetToKnow;
