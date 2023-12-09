import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/HomePage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ChooseSignup from "./pages/ChooseSignup";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";
import { createContext, useEffect, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/landing-page",
    element: <LandingPage />,
  },
  {
    path: "/home-page",
    element: <Homepage />,
  },
  {
    path: "/profile",
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
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

type UserType = "realtor" | "costumer" | null;

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
    const userType = localStorage.getItem("userType") as UserType;
    setUserType(userType);
    console.log(userType);
  }, [userType]);

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      <RouterProvider router={router} />
    </UserTypeContext.Provider>
  );
}

export default App;
