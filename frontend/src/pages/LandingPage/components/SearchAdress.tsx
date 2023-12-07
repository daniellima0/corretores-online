import { styled } from "@mui/material/styles";
import background from "../../../assets/backadress.png";
import { Button, InputBase, Typography } from "@mui/material";
import NavLogin from "./NavLogin";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";

const libraries: any = ["places"];

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  width: "100%",
  height: "90vh",
  [theme.breakpoints.down("md")]: { height: "90vh" },
}));

const ContentContainer = styled("div")(({ theme }) => ({
  height: "75%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("md")]: {},
}));

const ContentFlexContainer = styled("div")(({ theme }) => ({
  width: "70%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: "20px",
  [theme.breakpoints.down("md")]: { width: "80%" },
}));

const SearchContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "10px",
  flexDirection: "row",
  backgroundColor: "#FFFFFF",
  backgroundSize: "cover",
  width: "100%",
  height: "6vh",
  [theme.breakpoints.down("md")]: {},
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
  [theme.breakpoints.down("md")]: {},
}));

const InputSearch = styled(InputBase)(({ theme }) => ({
  paddingLeft: "15px",
  width: "100%",
  [theme.breakpoints.down("md")]: { fontSize: "13px" },
}));

const Titulo = styled(Typography)(({ theme }) => ({
  width: "100%",
  height: "fit-content",
  color: "#FFFFFF",
  textShadow: "8px 8px 10px rgba(0, 0, 0, 0.20)",
  fontFamily: "${({ theme }) => theme.customTypography.bold}",
  fontSize: "70px",
  fontWeight: "700",
  maxWidth: "550px",

  [theme.breakpoints.down("md")]: { fontSize: "50px", lineHeight: "60px" },
}));

const AutocompleteStyled = styled(Autocomplete)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {},
}));

type SearchAdressProps = {
  showMap: (value: boolean) => void;
};

const SearchAdress: React.FC<SearchAdressProps> = ({ showMap }) => {
  const name = "Encontre o seu Corretor Online";
  const busca = "Busque por um endereço...";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "beta",
    libraries: libraries,
  });

  const autocompleteOptions = {
    componentRestrictions: { country: "br" },
  };

  if (!isLoaded) {
    return <Container></Container>;
  }

  const handleClick = () => {
    showMap(true);

    const targetElement = document.getElementById("mapa");

    if (targetElement) {
      window.scrollTo({
        behavior: "smooth",
        top: targetElement.offsetTop,
      });
    }
  };

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
              <AutocompleteStyled
                onLoad={(autocomplete) => {
                  let autocompleteInstance: google.maps.places.Autocomplete | null =
                    null;
                  autocompleteInstance = autocomplete;
                }}
                onPlaceChanged={() => {
                  showMap(true);
                  handleClick();
                }}
                options={autocompleteOptions}
              >
                <InputSearch placeholder={busca} />
              </AutocompleteStyled>
              <SearchButton type="submit" onClick={handleClick}>
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
