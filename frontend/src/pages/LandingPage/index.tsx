import MapView from "./components/MapView";
import NewMore from "./components/NewMore";
import SearchAdress from "./components/SearchAdress";
import GetToKnow from "./components/GetToKnow";
import HowDoesItWork from "./components/HowDoesItWork";

const LandingPage: React.FC = () => {
  return (
    <>
      <SearchAdress />
      <MapView />
      <NewMore />
      <HowDoesItWork />
      <GetToKnow />
    </>
  );
};

export default LandingPage;
