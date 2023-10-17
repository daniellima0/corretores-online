import { useState, useEffect } from "react";
import HiddenComponent from "../../components/HiddenComponent";
import { Box, TextField, styled } from "@mui/material";
import { useJsApiLoader, GoogleMap, Autocomplete, LoadScript } from "@react-google-maps/api";


const HomePage = () => {
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
    libraries: ['places'],
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
    borderRadius: "10px"  

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
        <LoadScript id="script-loader" googleMapsApiKey="AIzaSyD3eD__3scBZrYIqi9DMB0YQy7WaP7jcSw" libraries={["places"]}>
          <SearchContainer>
            <Autocomplete>
              <LocationInput id="outlined-basic" label="Procurar corretores em..." variant="outlined"  />
            </Autocomplete>
          </SearchContainer>

          <HiddenComponent hidden={!isLoaded}>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100%" }}
              center={mapSettings.center}
              zoom={mapSettings.zoom}
              options={mapSettings}
              ></GoogleMap>
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