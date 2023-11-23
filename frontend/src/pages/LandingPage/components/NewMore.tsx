import { styled } from "@mui/material/styles";
import house from "../../../assets/house.png";
import { Button, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "auto",
  justifyContent: "center",
  alignContent: "space-between",
  alignItems: "center",
  backgroundImage: `url(${house})`,
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  marginTop: "auto",
  width: "80%",
  height: "45vh",
  color: "#FFFFFF",
  textShadow: "8px 8px 10px rgba(0, 0, 0, 0.50)",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "60px",
  fontWeight: "700",
  lineHeight: "75px",
  textAlign: "center",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ButtonNewMore = styled(Button)(({ theme }) => ({
  width: "5vw",
  height: "20vh",
  color: "#FFFFFF",
  margin: "0 auto",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const NewMore: React.FC = () => {
  const title = "O Ramo Imobiliário como você nunca viu.";
  return (
    <>
      <Container>
        <Title>{title}</Title>
        <ButtonNewMore disableRipple>
          <KeyboardArrowDownIcon
            style={{ fontSize: "7vw" }}
          ></KeyboardArrowDownIcon>
        </ButtonNewMore>
      </Container>
    </>
  );
};

export default NewMore;
