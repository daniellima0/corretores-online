import MapView from "./components/MapView";
import NewMore from "./components/NewMore";
import SearchAdress from "./components/SearchAdress";
import GetToKnow from "./components/GetToKnow";
import HowDoesItWork from "./components/HowDoesItWork";
import HiddenComponent from "../../components/HiddenComponent";
import { useRef, useState } from "react";
import Footer from "../../components/Footer";

const LandingPage: React.FC = () => {
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);

  return (
    <>
      <SearchAdress showMap={setShowMap} mapRef={mapRef} />
      <HiddenComponent hidden={!showMap}>
        <MapView ref={mapRef} />
      </HiddenComponent>
      <NewMore />
      <HowDoesItWork />
      <GetToKnow />
      <Footer />
    </>
  );
};

export default LandingPage;
