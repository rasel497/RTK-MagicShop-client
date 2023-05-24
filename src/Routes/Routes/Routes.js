import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import SignUp from "../../component/Pages/SignUp/SignUp";
import Login from "../../component/Pages/Login/Login";
import UserProfile from "../../component/Pages/Profile/UserProfile";
import PrivateRoute from "../PrivateRouter/PrivateRoute";
import Home from "../../component/Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/", element: <Home />
            },
            {
                path: "/signup", element: <SignUp />
            },
            {
                path: "/login", element: <Login />
            },
            {
                path: "/profile", element: <PrivateRoute><UserProfile /></PrivateRoute>
            }
        ]
    }
]);

export default router;