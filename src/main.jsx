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
import { Protected } from "./pages/protected";
import { Public } from "./pages/public";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Public Comp={Root} />,
    errorElement: <ErrorPage />,
    loader: rootLoader,

    children: [
      {
        index: true, // This renders the Index component at the root path
        element: <Public Comp={Index} />,
      },
      {
        path: "/sign-in",
        element: <Public Comp={SignIn} />,
        action: signInAction,
      },
      {
        path: "/sign-up",
        element: <Public Comp={SignUp} />,
        action: signUpAction,
      },
      {
        path: "/verify-email",
        element: <Protected Component={VerifyEmail} />,
      },
      {
        path: "/account-created",
        element: <Protected Component={AccountCreated} />,
      },
      {
        path: "/dashboard",
        element: <Protected Component={DashboardRoot} />,
        loader: dashboardLoader,

        children: [
          {
            index: true,
            element: <Protected Component={Post} />,
          },
          {
            path: ":postId",
            element: <Protected Component={PostDescription} />,
          },
          {
            path: "create-post",
            element: <Protected Component={CreatePost} />,
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
