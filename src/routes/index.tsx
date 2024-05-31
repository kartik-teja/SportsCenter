import { createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";
import SignInPage from "../pages/User/Signin";
import SignUpPage from "../pages/User/Signup";

const router = createBrowserRouter([
    { path: '/*', element: <HomePage /> },
    { path: '/user/signin', element: <SignInPage /> },
    { path: '/user/signup', element: <SignUpPage /> },
]);

export default router;