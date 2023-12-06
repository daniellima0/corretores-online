import { styled } from "@mui/material/styles";
import house from "../../../assets/house.png";
import { Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "auto",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${house})`,
  backgroundSize: "cover",
  width: "100%",
  height: "90vh",

  [theme.breakpoints.down("md")]: { height: "70vh" },
}));

const Title = styled(Typography)(({ theme }) => ({
  width: "65%",
  height: "fit-content",
  color: "#FFFFFF",
  textShadow: "8px 8px 10px rgba(0, 0, 0, 0.20)",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "70px",
  fontWeight: "700",
  textAlign: "center",

  [theme.breakpoints.down("md")]: { fontSize: "40px", width: "85%" },
}));

const TitleBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  [theme.breakpoints.down("md")]: { height: "90%" },
}));

const SaibaMaisBox = styled("div")(({ theme }) => ({
  position: "absolute",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  width: "100%",
  height: "90vh",
  paddingBottom: "40px",
  [theme.breakpoints.down("md")]: { height: "75vh", paddingBottom: "0px" },
}));

const KeyboardArrowDownIconContainer = styled("a")(() => ({
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
}));

const LearnMore: React.FC = () => {
  const title = "O Ramo Imobiliário como você nunca viu.";

  const scrollToTarget = (targetId: string) => {
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        behavior: "smooth",
        top: targetElement.offsetTop,
      });
    }
  };

  return (
    <>
      <Container id="mapa">
        <TitleBox>
          <Title>{title}</Title>
        </TitleBox>
        <SaibaMaisBox>
          <KeyboardArrowDownIconContainer
            onClick={() => scrollToTarget("aqui")}
          >
            <KeyboardArrowDownIcon
              style={{ fontSize: "150px", color: "#FFFFFF" }}
            ></KeyboardArrowDownIcon>
          </KeyboardArrowDownIconContainer>
        </SaibaMaisBox>
      </Container>
    </>
  );
};

export default LearnMore;
