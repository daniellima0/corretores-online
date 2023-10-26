import { useEffect, useState } from "react";
import {
  Container,
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
import CorretoresMap from "../../components/CorretoresMap";

const HomePage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "beta",
    libraries: ["places"],
  });

  type Broker = {
    id: number;
    name: string;
    position: { lat: number; lng: number };
  };

  const [data, setData] = useState<Broker[]>([]);

  useEffect(() => {
    const testData = [
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
    ];
    setData(testData);
  }, []);

  const SearchContainer = styled(Container)({
    padding: "20px",
    position: "absolute",
    zIndex: "10",
    boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.2)",
    marginTop: "20px",
    right: "20px",
    backgroundColor: "#FFFFFF",
    display: "flex",
    width: "fit-content",
    borderRadius: "10px",
  });

  const LocationInput = styled(TextField)({
    width: "400px",
  });

  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  let autocompleteInstance: google.maps.places.Autocomplete | null = null;

  const handlePlaceChanged = () => {
    if (autocompleteInstance) {
      const place = autocompleteInstance.getPlace();

      if (place && place.geometry && place.geometry.location) {
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

  //PODE PARARRR!!!

  const autocompleteOptions = {
    componentRestrictions: { country: "BR" },
    language: "pt-BR",
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
          justifyContent: "flex-end",
          height: "850px",
        }}
      >
        <BrokerList />
        <div
          className="MapContainer"
          style={{
            width: "75%",
            height: "100%",
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
          <CorretoresMap data={data} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
