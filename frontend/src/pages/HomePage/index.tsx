import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  TextField,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import BrokerList from "@/pages/HomePage/components/BrokerLIst";
import CorretoresMap from "@/pages/HomePage/components/CorretoresMap";
import { RealtorType } from "@/types/RealtorType";
import LoadingSpinner from "@/components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const libraries: any = ["places"];

const HomePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
      } catch (error) {
        console.error(error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "beta",
    libraries: libraries,
  });

  const isSmallScreen = useMediaQuery((theme: any) =>
    theme.breakpoints.down("md")
  );

  let bodyContainerStyle: any = {};
  let mapContainerStyle: any = {};

  if (isSmallScreen) {
    bodyContainerStyle = {
      display: "flex",
      flexDirection: "column-reverse",
      width: "100%",
      height: "180vh",
    };
    mapContainerStyle = {
      width: "100%",
      height: "100%",
    };
  } else {
    bodyContainerStyle = {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      height: "850px",
    };
    mapContainerStyle = {
      width: "75%",
      height: "100%",
    };
  }

  const LocationInput = styled(TextField)(({ theme }) => ({
    position: "absolute",
    zIndex: 10,
    backgroundColor: "#FFFFFF",
    border: "10px solid #FFFFFF",
    borderRadius: "5px",
    marginTop: "20px",
    boxShadow: "0 0 10px 0px rgba(0, 0, 0, 0.2)",
    right: "20px",
    [theme.breakpoints.down("md")]: {
      marginTop: "10px",
      right: "auto",
      left: "10px",
    },
  }));

  const ModalBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#fff",
    border: "2px solid #fff",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  }));

  const CapsulaInutil = styled("div")({
    display: "flex",
  });

  useEffect(() => {
    const successCallback = (position: any) => {
      setSearchMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const errorCallback = () => {
      return;
    };
    const options = {
      enableHighAccuracy: true,
    };

    navigator.geolocation.getCurrentPosition(
      successCallback,
      errorCallback,
      options
    );
  }, []);

  const [onlineRealtors, setOnlineRealtors] = useState<RealtorType[]>([]);
  const initialSearchBias = {
    lat: -12.98767014046349,
    lng: -38.48548147475881,
  };
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [filteredData, setFilteredData] =
    useState<RealtorType[]>(onlineRealtors);
  const [searchInputBias, setSearchInputBias] = useState<
    | {
        north: number;
        south: number;
        east: number;
        west: number;
      }
    | undefined
  >({
    north: initialSearchBias.lat + 0.3,
    south: initialSearchBias.lat - 0.3,
    east: initialSearchBias.lng + 0.3,
    west: initialSearchBias.lng - 0.3,
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

  useEffect(() => {
    if (searchMapCenter) {
      setSearchInputBias({
        north: searchMapCenter.lat + 0.3,
        south: searchMapCenter.lat - 0.3,
        east: searchMapCenter.lng + 0.3,
        west: searchMapCenter.lng - 0.3,
      });
    }
  }, [searchMapCenter]);

  useEffect(() => {
    fetch("http://localhost:8080/realtors/?is_online=true", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
        return response.json();
      })
      .then((json) => {
        setOnlineRealtors(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const autocompleteOptions = {
    bounds: searchInputBias,
    componentRestrictions: { country: "br" },
    strictBounds: false,
  };

  const handleSearchButtonClick = () => {
    alert("Digite e escolha uma sugestão");
  };

  if (loading || !isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBox>
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
            color="success"
            sx={{ mt: 2 }}
            onClick={handleClose}
          >
            Entendi
          </Button>
        </ModalBox>
      </Modal>

      <Navbar />

      <div className="BodyContainer" style={bodyContainerStyle}>
        <BrokerList
          key={onlineRealtors ? onlineRealtors.length : 0}
          data={filteredData}
          setSearchMapCenter={setSearchMapCenter}
        />
        <div className="MapContainer" style={mapContainerStyle}>
          <CapsulaInutil>
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteInstance = autocomplete;
              }}
              onPlaceChanged={handlePlaceChanged}
              options={autocompleteOptions}
            >
              <LocationInput
                id="outlined-basic"
                className="oi"
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
          </CapsulaInutil>

          <CorretoresMap
            data={onlineRealtors}
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
