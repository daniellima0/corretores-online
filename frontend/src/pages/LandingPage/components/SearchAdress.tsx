import { styled } from "@mui/material/styles";
import background from "../../../assets/searchadress.png";
import { Button, Typography } from "@mui/material";
import NavLogin from "./NavLogin";

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "auto",
  backgroundImage: `url(${background})`,
  width: "100%",
  height: "100vh",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchAdress: React.FC = () => {
  const name = "Landing Page";

  return (
    <>
      <Container>
        <NavLogin />
        <Typography>
          <span>{name}</span>
        </Typography>
      </Container>
    </>
  );
};

export default SearchAdress;
