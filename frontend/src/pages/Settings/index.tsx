import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Content from "./components/Content";
import LoadingSpinner from "../../components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
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
      } catch (error) {
        console.error(error);
        navigator("/login");
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
      <Navbar />
      <Content />
      <Footer />
    </>
  );
};

export default Settings;
