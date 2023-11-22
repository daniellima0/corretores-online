import { styled } from "@mui/material/styles";
import mapimage from "../../../assets/mapimage.png";
import { Button, Typography } from "@mui/material";

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  padding: "auto",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#FFFFFF",
  backgroundSize: "cover",
  width: "100%",
  height: "90vh",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MapContainer = styled("div")(({ theme }) => ({
  padding: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "row",
  width: "80%",
  height: "70vh",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MapBox = styled("div")(({ theme }) => ({
  display: "absolute",
  padding: "auto",
  borderRadius: "10px",
  backgroundImage: `url(${mapimage})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  width: "50%",
  height: "70vh",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MapTextContainer = styled("div")(({ theme }) => ({
  width: "40%",
  height: "60%",
  backgroundColor: "#FFFFFF",
  padding: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  flexDirection: "column",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  width: "100%",
  color: "#000000",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "40px",
  fontWeight: "700",
  lineHeight: "40px",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MapTextButton = styled(Button)(({ theme }) => ({
  padding: "5px",
  borderRadius: "20px",
  width: "65%",
  backgroundColor: "#FF5E00",
  textTransform: "none",
  color: "#FFFFFF",
  fontSize: "17px",
  fontWeight: "500",
  marginTop: "5vh",

  "&: hover": { backgroundColor: "#FF5E00", color: "#ffffff" },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const CreateAcount = styled(Typography)(({ theme }) => ({
  width: "100%",
  height: "auto",
  padding: "auto",
  verticalAlign: "center",
  color: "#999999",
  alignSelf: "center",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "75px",
  margin: "0px 0px 0px 46%",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MapView: React.FC = () => {
  const numero = "18";
  return (
    <>
      <Container>
        <MapContainer>
          <MapBox />
          <MapTextContainer>
            <Title>
              Existem <span color="#FF5E00">{numero}</span> corretores na sua
              região
            </Title>
            <MapTextButton fullWidth type="submit">
              Acesse a plataforma
            </MapTextButton>
            <CreateAcount>
              Não tem uma conta?
              <a href="https://www.homehost.com.br/"> Cadastre-se</a>
            </CreateAcount>
          </MapTextContainer>
        </MapContainer>
      </Container>
    </>
  );
};

export default MapView;
