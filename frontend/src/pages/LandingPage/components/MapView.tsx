import { styled } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useEffect, useRef, useState } from "react";

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  padding: "auto",
  backgroundColor: "#FFFFFF",
  backgroundSize: "cover",
  width: "100%",
  height: "100vh",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: { height: "100vh" },
}));

const MapTextContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  borderRadius: "10px",
  width: "70%",
  height: "40%",
  boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#FFFFFF",
  padding: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "40px",
  maxWidth: "550px",

  [theme.breakpoints.down("md")]: { gap: "20px" },
}));

const Title = styled(Typography)(({ theme }) => ({
  width: "100%",
  color: "#000000",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "40px",
  fontWeight: "700",
  lineHeight: "40px",
  textAlign: "center",

  [theme.breakpoints.down("md")]: { fontSize: "25px", lineHeight: "30px" },
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

  "&: hover": { backgroundColor: "#FF5E00", color: "#ffffff" },
  [theme.breakpoints.down("md")]: {},
}));

const CreateAcount = styled(Typography)(({ theme }) => ({
  width: "100%",
  height: "auto",
  verticalAlign: "center",
  color: "#999999",
  alignSelf: "center",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "14px",
  fontWeight: "500",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {},
}));

type Broker = {
  id: number;
  name: string;
  position: { lat: number; lng: number };
};

const MapView = () => {
  const numero = "18";

  return (
    <>
      <Container>
        <MapWrapper />
        <MapTextContainer>
          <Title>
            Existem <span color="#FF5E00">{numero}</span> corretores online
            agora
          </Title>
          <MapTextButton fullWidth type="submit">
            Acesse a plataforma
          </MapTextButton>
          <CreateAcount>
            Não tem uma conta?
            <a href="https://www.homehost.com.br/"> Cadastre-se</a>
          </CreateAcount>
        </MapTextContainer>
      </Container>
    </>
  );
};

function MapWrapper() {
  return (
    <Wrapper
      apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      libraries={["marker", "maps"]}
    >
      <Map />
    </Wrapper>
  );
}

const Map = () => {
  const data = [
    {
      id: 1,
      name: "Bernardo Serravalle",
      position: {
        lat: -12.993966980061542,
        lng: -38.44557003269835,
      },
    },
    {
      id: 2,
      name: "Arthur Sant'Anna",
      position: {
        lat: -12.986820652837016,
        lng: -38.4369292224266,
      },
    },
    {
      id: 3,
      name: "Giulia Franca",
      position: {
        lat: -12.985937092644223,
        lng: -38.44490330351072,
      },
    },
    {
      id: 4,
      name: "Luca Villela",
      position: {
        lat: -13.00986936272844,
        lng: -38.532670253972434,
      },
    },
  ];
  const mapOptions = {
    mapId: "abc9203fc784d845",
    center: { lat: -12.979947718368807, lng: -38.48555740869868 },
    clickableIcons: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoom: 14,
  };

  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (ref.current && map) {
      data.forEach((broker: Broker) => {
        new window.google.maps.Marker({
          position: broker.position,
          map: map,
          title: broker.name,
        });
      });
    }
  }, [map]);

  useEffect(() => {
    if (ref.current) {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }
  }, []);

  return <div style={{ width: "100%", height: "100%" }} ref={ref} />;
};

export default MapView;
