import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ChooseSignup from "./pages/ChooseSignup";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import TermsAndConditions from "./pages/TermsAndConditions";
import EmailInputForm from "./pages/EmailInputPasswordReset";
import { createContext, useEffect, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home-page",
    element: <Homepage />,
  },
  {
    path: "/profile/:user_id",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/choose-signup",
    element: <ChooseSignup />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/realtor-signup",
    element: <SignUp userType="realtor" />,
  },
  {
    path: "/user-signup",
    element: <SignUp userType="user" />,
  },
  {
    path: "/terms-and-conditions",
    element: <TermsAndConditions />,
  },
  {
    path: "/reset-password-email",
    element: <EmailInputForm />,
  },
]);

type UserType = "realtor" | "user" | null;

export const UserTypeContext = createContext<{
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
}>({
  userType: null,
  setUserType: () => {},
});

function App() {
  const [userType, setUserType] = useState<UserType>(null);

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
        setUserType(json.auth_status);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      <RouterProvider router={router} />
    </UserTypeContext.Provider>
  );
}

export default App;
