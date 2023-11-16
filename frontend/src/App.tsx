import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RealtorProfile from "./pages/RealtorProfile";
import Settings from "./pages/Settings";
import Choice from "./pages/Choice";

const router = createBrowserRouter([
  {
    path: "/landing-page",
    element: <LandingPage />,
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
    path: "/choose-login",
    element: <Choice componentType="login" />,
  },
  {
    path: "/choose-signup",
    element: <Choice componentType="signup" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
