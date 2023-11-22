import { styled } from "@mui/material/styles";
import background from "../../../assets/backadress.png";
import { Button, Typography } from "@mui/material";
import NavLogin from "./NavLogin";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "auto",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  width: "100%",
  height: "120vh",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  backgroundSize: "cover",
  width: "70%",
  height: "6vh",
  margin: "0px 0px 0px 190px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchText = styled(Typography)(({ theme }) => ({
  padding: "15px",
  width: "97%",
  color: "#999999",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "2.5vh",
  fontWeight: "500",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  borderRadius: "0 10px 10px 0",
  width: "3%",
  height: "100%",
  textTransform: "none",
  backgroundColor: "#FF5E00",
  color: "#FFFFFF",
  fontSize: "3vh",
  fontWeight: 800,

  "&: hover": { backgroundColor: "#FF5E00", color: "#ffffff" },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Titulo = styled(Typography)(({ theme }) => ({
  margin: "80px 0px 0px 190px",
  width: "700px",
  height: "180px",
  color: "#FFFFFF",
  textShadow: "8px 8px 10px rgba(0, 0, 0, 0.50)",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "70px",
  fontWeight: "700",
  lineHeight: "75px",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchAdress: React.FC = () => {
  const name = "Encontre o seu Corretor Online";

  return (
    <>
      <Container>
        <NavLogin />
        <Titulo>
          <span>{name}</span>
        </Titulo>
        <SearchContainer>
          <SearchText>
            <span>{name}</span>
          </SearchText>
          <SearchButton fullWidth type="submit">
            <SearchOutlinedIcon></SearchOutlinedIcon>
          </SearchButton>
        </SearchContainer>
      </Container>
    </>
  );
};

export default SearchAdress;
