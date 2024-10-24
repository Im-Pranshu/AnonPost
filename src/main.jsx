import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root, { loader as rootLoader } from "./Root";
import ErrorPage from "./routes/Error_page";
import Index from "./routes/Index";
import SignIn, { action as signInAction } from "./routes/SignIn";
import SignUp, { action as signUpAction } from "./routes/SignUp";
// import SignUpOtp from "./routes/signUpOtp";
import VerifyEmail from "./routes/VerifyEmail";
import AccountCreated from "./routes/AccountCreated";

import DashboardRoot, { loader as dashboardLoader } from "./routes/Dashboard";
import CreatePost from "./routes/CreatePost";
import PostDescription from "./routes/PostDescription";
import Post from "./routes/Posts";
import { Protected } from "./components/Protected";
import { Public } from "./components/Public";

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
