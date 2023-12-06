import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/HomePage"
import RealtorProfile from "./pages/RealtorProfile";

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
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
