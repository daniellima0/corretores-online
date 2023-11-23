import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import BrokerList from "../../components/BrokerLIst";
import CorretoresMap from "../../components/CorretoresMap";
import CloseIcon from "@mui/icons-material/Close";

const libraries: any = ["places"];

const HomePage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "beta",
    libraries: libraries,
  });

  useEffect(() => {
    const successCallback = (position: any) => {
      setSearchMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      console.log(position);
    };

    const errorCallback = (error: any) => {};

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  type Broker = {
    id: number;
    name: string;
    position: { lat: number; lng: number };
  };

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
    {
      id: 4,
      name: "Luca Villela",
      position: {
        lat: -13.00986936272844,
        lng: -38.532670253972434,
      },
    },
  ];
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState<Broker[]>(testData);
  const [filteredData, setFilteredData] = useState<Broker[]>(testData);

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

  let autocompleteInstance: google.maps.places.Autocomplete | null = null;
  const [searchMapCenter, setSearchMapCenter] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handlePlaceChanged = () => {
    if (autocompleteInstance) {
      const place = autocompleteInstance.getPlace();
      if (place && place.geometry && place.geometry.location) {
        setSearchMapCenter({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
      }
    }
  };

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

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
    borderRadius: "10px",
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <strong>Bem-vindo ao Corretores Online!</strong>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, textAlign: "center" }}
          >
            Compartilhe sua localização ou pesquise por um endereço para
            encontrar corretores próximos a você!
          </Typography>
          <Button
            variant="outlined"
            color="error"
            sx={{ mt: 2 }}
            onClick={handleClose}
          >
            Fechar
          </Button>
        </Box>
      </Modal>

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
        <BrokerList
          key={data.length}
          data={filteredData}
          setSearchMapCenter={setSearchMapCenter}
        />
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
          <CorretoresMap
            data={data}
            searchMapCenter={searchMapCenter}
            dataFilter={setFilteredData}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
