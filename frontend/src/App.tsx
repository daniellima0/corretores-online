import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RealtorProfile from "./pages/RealtorProfile";
import SignUp from "./pages/SignUp";

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
        path: "/signup",
        element: <SignUp />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
