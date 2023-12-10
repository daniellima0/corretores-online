import { Typography, styled } from "@mui/material";
import SignUpForm from "./components/SignUpForm";

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
  marginTop: "50px",
  marginBottom: "50px",
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
`;

interface SignUpProps {
  userType: "realtor" | "user";
}
const SignUp: React.FC<SignUpProps> = (props) => {
  return (
    <Div>
      <Card>
        <Title variant="h1">Crie sua conta</Title>
        <SignUpForm userType={props.userType} />
      </Card>
    </Div>
  );
};

export default SignUp;
