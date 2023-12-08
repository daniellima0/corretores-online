import { Typography, styled } from "@mui/material";
import RoundedButton from "../../components/RoundedButton";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

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
  gap: "30px",
  width: "70%",
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "30px",
  borderRadius: "50px",
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

const Title = styled(Typography)`
  font-family: ${({ theme }) => theme.customTypography.bold};
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const ChooseSignup = () => {
  const theme = useTheme();

  return (
    <Div>
      <Card>
        <Title variant="h1">Fazer cadastro como:</Title>
        <RoundedButton buttonColor={theme.customPallete.realtor} width="300px">
          <Link
            to="/realtor-signup"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            Corretor
          </Link>
        </RoundedButton>
        <RoundedButton buttonColor={theme.customPallete.costumer} width="300px">
          <Link
            to="/costumer-signup"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            Cliente
          </Link>
        </RoundedButton>
      </Card>
    </Div>
  );
};

export default ChooseSignup;
