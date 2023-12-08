import Navbar from "../../components/Navbar";
import RealtorInfo from "./components/RealtorInfo";
import Footer from "../../components/Footer";

interface SignUpProps {
  userType: "realtor" | "costumer";
}

const RealtorProfile: React.FC<SignUpProps> = (props) => {
  return (
    <>
      <Navbar />
      <RealtorInfo userType={props.userType} />
      <Footer />
    </>
  );
};

export default RealtorProfile;
