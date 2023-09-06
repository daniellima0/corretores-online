import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
    {
        path: "/landing-page",
        element: <LandingPage />,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
