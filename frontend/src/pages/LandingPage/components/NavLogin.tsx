import { styled } from "@mui/material/styles";
import logo from "../../../assets/logo-white.png";
import Button from "@mui/material/Button";

const ButtonContained = styled(Button)(({ theme }) => ({
  padding: "3px",
  borderRadius: "8px",
  width: "120px",
  backgroundColor: "#ffffff",
  textTransform: "none",
  color: "#FF5E00",
  fontSize: "17px",
  fontWeight: 800,
  "&: hover": { backgroundColor: "#FF5E00", color: "#ffffff" },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  padding: "3px",
  borderRadius: "8px",
  width: "120px",
  textTransform: "none",
  color: "#ffffff",
  fontSize: "17px",
  fontWeight: 800,
  "&: hover": { backgroundColor: "rgba(0,0,0,0.18)", color: "#ffffff" },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Container = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  alignItems: "center",
  padding: "0 40px",
  height: "90px",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Logo = styled("img")(({ theme }) => ({
  width: "150px",
  alignSelf: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const LoginSpace = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  justifySelf: "end",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const NavLogin: React.FC = () => {
  return (
    <Container>
      <Logo src={logo} />
      <LoginSpace>
        <ButtonStyled fullWidth type="submit">
          <span>Entrar</span>
        </ButtonStyled>
        <ButtonContained fullWidth type="submit">
          <span>Cadastrar</span>
        </ButtonContained>
      </LoginSpace>
    </Container>
  );
};

export default NavLogin;
