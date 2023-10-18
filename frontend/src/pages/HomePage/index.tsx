import { useState, useEffect } from "react";
import HiddenComponent from "../../components/HiddenComponent";
import { Box, InputAdornment, TextField, styled } from "@mui/material";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  LoadScript,
  MarkerF,
} from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";

const HomePage = () => {

  const realEstateAgents = [
      {
        "id": 1,
        "name": "John Silva",
        "neighborhood": "Barra",
        "position": { lat: -13.0037, lng: -38.5324 }
      },
      {
        "id": 2,
        "name": "Maria Oliveira",
        "neighborhood": "Pituba",
        "position": { lat: -12.9911, lng: -38.4557 }
      },
      {
        "id": 3,
        "name": "Carlos Santos",
        "neighborhood": "Rio Vermelho",
        "position": { lat: -13.0099, lng: -38.4918 }
      },
      {
        "id": 4,
        "name": "Ana Souza",
        "neighborhood": "Itaigara",
        "position": { lat: -12.9803, lng: -38.4458 }
      },
      {
        "id": 5,
        "name": "Ricardo Costa",
        "neighborhood": "Graça",
        "position": { lat: -12.9924, lng: -38.5142 }
      },
      {
        "id": 6,
        "name": "Fernanda Ferreira",
        "neighborhood": "Caminho das Árvores",
        "position": { lat: -12.9837, lng: -38.4513 }
      },
      {
        "id": 7,
        "name": "Pedro Carvalho",
        "neighborhood": "Stiep",
        "position": { lat: -12.9831, lng: -38.4451 }
      },
      {
        "id": 8,
        "name": "Marta Lima",
        "neighborhood": "Brotas",
        "position": { lat: -12.9786, lng: -38.4792 }
      },
      {
        "id": 9,
        "name": "Gustavo Mendes",
        "neighborhood": "Canela",
        "position": { lat: -13.0049, lng: -38.5079 }
      },
      {
        "id": 10,
        "name": "Aline Oliveira",
        "neighborhood": "São Caetano",
        "position": { lat: -12.9384, lng: -38.4915 }
      },
      {
        "id": 11,
        "name": "Fábio Barbosa",
        "neighborhood": "Vitória",
        "position": { lat: -12.9754, lng: -38.5085 }
      },
      {
        "id": 12,
        "name": "Lúcia Santos",
        "neighborhood": "Bonfim",
        "position": { lat: -12.9658, lng: -38.5132 }
      },
      {
        "id": 13,
        "name": "Marcos Oliveira",
        "neighborhood": "São Marcos",
        "position": { lat: -12.8973, lng: -38.4237 }
      },
      {
        "id": 14,
        "name": "Carla Fernandes",
        "neighborhood": "Cajazeiras",
        "position": { lat: -12.8945, lng: -38.3557 }
      },
      {
        "id": 15,
        "name": "Rafael Silva",
        "neighborhood": "Imbuí",
        "position": { lat: -12.9656, lng: -38.4438 }
      },
      {
        "id": 16,
        "name": "Paula Rodrigues",
        "neighborhood": "Cabula",
        "position": { lat: -12.9656, lng: -38.4438 }
      },
      {
        "id": 17,
        "name": "Mateus Lima",
        "neighborhood": "Amaralina",
        "position": { lat: -13.0051, lng: -38.4808 }
      },
      {
        "id": 18,
        "name": "Cristina Carvalho",
        "neighborhood": "Pernambués",
        "position": { lat: -12.9796, lng: -38.4463 }
      },
      {
        "id": 19,
        "name": "André Santos",
        "neighborhood": "Patamares",
        "position": { lat: -12.9609, lng: -38.4213 }
      },
      {
        "id": 20,
        "name": "Rita Oliveira",
        "neighborhood": "Liberdade",
        "position": { lat: -12.9593, lng: -38.4792 }
      }
    ];

  const apiKey = "AIzaSyD3eD__3scBZrYIqi9DMB0YQy7WaP7jcSw";

  const [latitudeUser, setLatitudeUser] = useState(-12.97);
  const [longitudeUser, setLongitudeUser] = useState(-38.512);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitudeUser(position.coords.latitude);
      setLongitudeUser(position.coords.longitude);
    });
  }, []);

  const mapSettings = {
    mapId: "b8c651ba52d26afb",
    clickableIcons: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    center: {
      lat: latitudeUser,
      lng: longitudeUser,
    },
    zoom: 16,
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const SearchContainer = styled(Box)({
    padding: "20px",
    position: "absolute",
    zIndex: "10",
    boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.2)",
    marginTop: "50px",
    marginLeft: "50px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    width: "auto",
    borderRadius: "10px",
  });

  const LocationInput = styled(TextField)({
    width: "400px",
  });

  const MapBox = styled(Box)({
    display: "flex",
    justifyContent: "left",
  });

  return (
    <div>
      <MapBox left={0} top={0} height="90vh" width="100%">
        <LoadScript
          id="script-loader"
          googleMapsApiKey="AIzaSyD3eD__3scBZrYIqi9DMB0YQy7WaP7jcSw"
          libraries={["places"]}
        >
          <SearchContainer>
            <Autocomplete>
              <LocationInput
                id="outlined-basic"
                label="Procurar corretores em..."
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Autocomplete>
          </SearchContainer>

          <HiddenComponent hidden={!isLoaded}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={mapSettings.center}
              zoom={mapSettings.zoom}
              options={mapSettings}
            >
              {realEstateAgents.map(({ id, name, position }) =>(
                <MarkerF
                  key={id} position={position}                  
                >
                  <div>{name}</div>
                </MarkerF>
              ))};
            </GoogleMap>
          </HiddenComponent>

          <HiddenComponent hidden={isLoaded}>
            <div>Carregando Google Maps...</div>
          </HiddenComponent>
        </LoadScript>
      </MapBox>
    </div>
  );
};




export default HomePage;
