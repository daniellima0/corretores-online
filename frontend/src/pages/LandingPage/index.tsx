import MapView from "./components/MapView";
import LearnMore from "./components/LearnMore";
import SearchAdress from "./components/SearchAdress";
import GetToKnow from "./components/GetToKnow";
import HowDoesItWork from "./components/HowDoesItWork";
import HiddenComponent from "../../components/HiddenComponent";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import ArmengueComponent from "./components/ArmengueComponent";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/Loading";

const LandingPage: React.FC = () => {
  const [showMap, setShowMap] = useState(false);

  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include",
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
        const json = await response.json();
        console.log(json);
        navigator("/home-page");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigator]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <SearchAdress showMap={setShowMap} />
      <ArmengueComponent hidden={!showMap} />
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
