import { Typography, styled } from "@mui/material";
import RoundedButton from "../../components/RoundedButton";
import { useTheme } from "@mui/material/styles";

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

interface ChoiceProps {
  componentType: "login" | "signup";
}

const Choice: React.FC<ChoiceProps> = (props) => {
  const theme = useTheme();

  return (
    <Div>
      <Card>
        <Title variant="h1">
          <Title variant="h1">
            {props.componentType === "login"
              ? "Fazer login como:"
              : props.componentType === "signup"
              ? "Fazer cadastro como:"
              : "Wrong props"}
          </Title>
        </Title>
        <RoundedButton buttonColor={theme.customPallete.realtor} width="300px">
          Corretor
        </RoundedButton>
        <RoundedButton buttonColor={theme.customPallete.costumer} width="300px">
          Cliente
        </RoundedButton>
        {props.componentType === "login" && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Typography variant="subtitle1">
              Não possui uma conta? <a href="/login-page">Cadastre-se</a>
            </Typography>
          </div>
        )}
      </Card>
    </Div>
  );
};

export default Choice;
