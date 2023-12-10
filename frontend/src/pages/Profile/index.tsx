import Navbar from "../../components/Navbar";
import RealtorInfo from "./components/RealtorInfo";
import Footer from "../../components/Footer";
import LoadingSpinner from "../../components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/check");
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
      <RealtorInfo />
      <Footer />
    </>
  );
};

export default Profile;
