import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/HomePage"

const router = createBrowserRouter([
    {
        path: "/landing-page",
        element: <LandingPage />,
    },
    {
        path: "/home-page",
        element: <Homepage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
