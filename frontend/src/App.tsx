import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/landing-page",
    element: <LandingPage />,
  },
  {
    path: "/realtor-login",
    element: <LoginPage userType="realtor" />,
  },
  {
    path: "/costumer-login",
    element: <LoginPage userType="costumer" />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
