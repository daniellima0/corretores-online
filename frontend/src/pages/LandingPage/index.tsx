import MapView from "./components/MapView";
import SearchAdress from "./components/SearchAdress";

const LandingPage: React.FC = () => {
  return (
    <>
      <SearchAdress />
      <MapView />
    </>
  );
};

export default LandingPage;
