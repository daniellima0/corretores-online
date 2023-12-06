import MapView from "./components/MapView";
import LearnMore from "./components/LearnMore";
import SearchAdress from "./components/SearchAdress";
import GetToKnow from "./components/GetToKnow";
import HowDoesItWork from "./components/HowDoesItWork";
import HiddenComponent from "../../components/HiddenComponent";
import { useState } from "react";
import Footer from "../../components/Footer";

const LandingPage: React.FC = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <SearchAdress showMap={setShowMap} />
      <HiddenComponent hidden={!showMap}>
        <MapView />
      </HiddenComponent>
      <LearnMore />
      <HowDoesItWork />
      <GetToKnow />
      <Footer />
    </>
  );
};

export default LandingPage;
