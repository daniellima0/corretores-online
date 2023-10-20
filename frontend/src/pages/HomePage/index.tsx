import { useState } from "react";
import {
  Box,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from "@mui/material";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
} from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import BrokerList from "../../components/BrokerLIst";

const HomePage = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ["places"],
  });

  const mapSettings = {
    mapId: "b8c651ba52d26afb",
    clickableIcons: false,
    streetViewControl: true,
    mapTypeControl: false,
    fullscreenControl: false,
    zoom: 16,
  };

  const SearchContainer = styled(Box)({
    padding: "20px",
    position: "absolute",
    zIndex: "10",
    boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.2)",
    marginTop: "20px",
    marginLeft: "20px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    width: "auto",
    borderRadius: "10px",
  });

  const LocationInput = styled(TextField)({
    width: "400px",
  });

  const [mapCenter] = useState({
    lat: -13.00978573518952,
    lng: -38.532841915342516,
  });

  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  let autocompleteInstance: google.maps.places.Autocomplete | null = null;

  const handlePlaceChanged = () => {
    if (autocompleteInstance) {
      const place = autocompleteInstance.getPlace();

      if (place.geometry && place.geometry.location) {
        const newMapCenter = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        if (mapInstance) {
          mapInstance.panTo(newMapCenter);
        }
      }
    }
  };

  const autocompleteOptions = {
    componentRestrictions: { country: "BR" },
  };

  const handleSearchButtonClick = () => {
    handlePlaceChanged();
  };

  if (!isLoaded) {
    return (
      <div>
        <Navbar />
        <div>Carregando Google Maps...</div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div
        className="BodyContainer"
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <div
          className="MapContainer"
          style={{
            width: "80%",
          }}
        >
          <SearchContainer>
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteInstance = autocomplete;
              }}
              onPlaceChanged={handlePlaceChanged}
              options={autocompleteOptions}
            >
              <LocationInput
                id="outlined-basic"
                label="Procurar corretores em..."
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        sx={{ color: "#505050" }}
                        onClick={() => {
                          handleSearchButtonClick();
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Autocomplete>
          </SearchContainer>
          <GoogleMap
            center={mapCenter}
            zoom={mapSettings.zoom}
            options={mapSettings}
            mapContainerStyle={{
              height: "90vh",
              width: "100%",
            }}
            onLoad={(map) => {
              setMapInstance(map);
            }}
          ></GoogleMap>
        </div>
        <BrokerList />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
