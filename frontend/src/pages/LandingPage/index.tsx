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
  const [onlineRealtors, setOnlineRealtors] = useState([]);

  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchAuthData = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/check", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch research data");
      }
      navigator("/home-page");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOnlineRealtors = async () => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAuthData();
    fetchOnlineRealtors();
  }, [navigator]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <SearchAdress showMap={setShowMap} />
      <ArmengueComponent hidden={!showMap} />
      <HiddenComponent hidden={!showMap}>
        <MapView onlineRealtors={onlineRealtors} />
      </HiddenComponent>
      <LearnMore />
      <HowDoesItWork />
      <GetToKnow />
      <Footer />
    </>
  );
};

export default LandingPage;
