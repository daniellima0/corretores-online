import MapView from "./components/MapView";
import NewMore from "./components/NewMore";
import SearchAdress from "./components/SearchAdress";

const LandingPage: React.FC = () => {
  return (
    <>
      <SearchAdress />
      <MapView />
      <NewMore />
    </>
  );
};

export default LandingPage;
