import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

const router = createBrowserRouter([
  {
    path: "/landing-page",
    element: <LandingPage />,
  },
  {
    path: "/login-page",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
