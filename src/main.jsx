import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { loader as rootLoader } from "./routes/root";
import ErrorPage from "./pages/error_page";
import Index from "./pages/index";
import SignIn, { action as signInAction } from "./pages/signIn";
import SignUp, { action as signUpAction } from "./pages/signUp";
// import SignUpOtp from "./routes/signUpOtp";
import VerifyEmail from "./pages/verifyEmail";
import AccountCreated from "./pages/accountCreated";

import DashboardRoot, { loader as dashboardLoader } from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import PostDescription from "./pages/PostDescription";
import Post from "./pages/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,

    children: [
      {
        index: true, // This renders the Index component at the root path
        element: <Index />,
      },
      {
        path: "/sign-in",
        element: <SignIn />,
        action: signInAction,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        // path: "/sign-up-otp",
        // element: <SignUpOtp />,
        path: "/verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "/account-created",
        element: <AccountCreated />,
      },
      {
        path: "/dashboard",
        element: <DashboardRoot />,
        loader: dashboardLoader,

        children: [
          {
            index: true,
            element: <Post />,
          },
          {
            path: ":postId",
            element: <PostDescription />,
          },
          {
            path: "create-post",
            element: <CreatePost />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
