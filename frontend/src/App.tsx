import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/HomePage";
import RealtorProfile from "./pages/RealtorProfile";
import Settings from "./pages/Settings";
import ChooseSignup from "./pages/ChooseSignup";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import SignUp from "./pages/SignUp";

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
    path: "/realtor-profile",
    element: <RealtorProfile />,
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
    path: "/realtor-signup",
    element: <SignUp userType="realtor"/>,
  },
  {
    path: "/costumer-signup",
    element: <SignUp userType="costumer"/>,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
