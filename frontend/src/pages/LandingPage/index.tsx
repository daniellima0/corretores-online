import MapView from "./components/MapView";
import NewMore from "./components/NewMore";
import SearchAdress from "./components/SearchAdress";
import GetToKnow from "./components/GetToKnow";

const LandingPage: React.FC = () => {
  return (
    <>
      <SearchAdress />
      <MapView />
      <NewMore />
      <GetToKnow />
    </>
  );
};

export default LandingPage;
