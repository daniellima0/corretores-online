import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RealtorProfile from "./pages/RealtorProfile";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";

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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
