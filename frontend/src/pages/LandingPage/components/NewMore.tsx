import { styled } from "@mui/material/styles";
import house from "../../../assets/house.png";
import { Button, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "auto",
  alignItems: "space-around",
  justifyItems: "center",
  justifyContent: "center",
  backgroundImage: `url(${house})`,
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  width: "80%",
  height: "30vh",
  color: "#FFFFFF",
  textShadow: "8px 8px 10px rgba(0, 0, 0, 0.50)",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "60px",
  fontWeight: "700",
  lineHeight: "75px",
  textAlign: "center",
  margin: "0 auto",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ButtonNewMore = styled(Button)(({ theme }) => ({
  width: "500px",
  height: "20%",
  color: "#FFFFFF",
  fontSize: "50vh",
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
        <ButtonNewMore fullWidth type="submit">
          <KeyboardArrowDownIcon></KeyboardArrowDownIcon>
        </ButtonNewMore>
      </Container>
    </>
  );
};

export default NewMore;
