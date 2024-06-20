import Navbar from "@/components/Navbar";
import RealtorInfo from "@/pages/Profile/components/RealtorInfo";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/Loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/check", {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch research data");
        }
        const json = await response.json();
        setUserId(json.user_id);
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
      <RealtorInfo loggedUserId={userId} />
      <Footer />
    </>
  );
};

export default Profile;
