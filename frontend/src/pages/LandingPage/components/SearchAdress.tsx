import { styled } from "@mui/material/styles";
import background from "../../../assets/backadress.png";
import { Button, Input, InputBase, TextField, Typography } from "@mui/material";
import NavLogin from "./NavLogin";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import Footer from "../../../components/Footer";

const libraries: any = ["places"];

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "auto",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  width: "100%",
  height: "90vh",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ContentContainer = styled("div")(({ theme }) => ({
  height: "75%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const ContentFlexContainer = styled("div")(({ theme }) => ({
  width: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  backgroundSize: "cover",
  width: "fit-content",
  height: "6vh",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

/* const SearchText = styled(Typography)(({ theme }) => ({
  padding: "15px",
  width: "97%",
  color: "#999999",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "2.5vh",
  fontWeight: "500",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
})); */

const SearchButton = styled(Button)(({ theme }) => ({
  borderRadius: "0 10px 10px 0",
  width: "3%",
  height: "100%",
  textTransform: "none",
  backgroundColor: "#FF5E00",
  color: "#FFFFFF",
  fontSize: "3vh",
  fontWeight: 800,

  "&: hover": { backgroundColor: "#FF5E00", color: "#ffffff" },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const InputSearch = styled(InputBase)(({ theme }) => ({
  paddingLeft: "15px",
  width: "1250px", //preciso que esse valor equivalha a 100% da div pai, e não funciona % AQUI É O PROBLEMA
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Titulo = styled(Typography)(({ theme }) => ({
  width: "700px",
  height: "180px",
  color: "#FFFFFF",
  textShadow: "8px 8px 10px rgba(0, 0, 0, 0.50)",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "70px",
  fontWeight: "700",
  lineHeight: "75px",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SearchAdress: React.FC = () => {
  const name = "Encontre o seu Corretor Online";
  const busca = "Busque por um endereço...";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "beta",
    libraries: libraries,
  });

  let autocompleteInstance: google.maps.places.Autocomplete | null = null;

  const autocompleteOptions = {
    componentRestrictions: { country: "br" },
  };

  if (!isLoaded) {
    return (
      <div>
        <NavLogin />
        <div>Carregando Google Maps...</div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Container>
        <NavLogin />
        <ContentContainer>
          <ContentFlexContainer>
            <Titulo>
              <span>{name}</span>
            </Titulo>
            <SearchContainer>
              <Autocomplete
                onLoad={(autocomplete) => {
                  autocompleteInstance = autocomplete;
                }}
                onPlaceChanged={() => {
                  console.log(autocompleteInstance?.getPlace());
                }}
                options={autocompleteOptions}
              >
                <InputSearch placeholder={busca} />
              </Autocomplete>
              <SearchButton type="submit">
                <SearchOutlinedIcon></SearchOutlinedIcon>
              </SearchButton>
            </SearchContainer>
          </ContentFlexContainer>
        </ContentContainer>
      </Container>
    </>
  );
};

export default SearchAdress;
