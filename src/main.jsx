import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// Router
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Root from "./routes/root";
import ErrorPage from './routes/error_page';
import Index from "./routes/index";
import SignIn from './routes/signIn';
import SignUp from './routes/signUp'
import SignUpOtp from './routes/signUpOtp'
import {loader as rootLoader} from "./routes/root"
import AccountCreated from './routes/accountCreated';
import DashboardRoot from './routes/Dashboard';
import DashboardIndex from './routes/DashboardIndex';
import CreatePost from './routes/CreatePost';
import PostDescription from './routes/PostDescription';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage/>,
    loader: rootLoader,

    children: [
      {
        index: true, // This renders the Index component at the root path
        element: <Index />,
      },
      {
        path: "/sign-in",
        element: <SignIn/>,
      },
      {
        path: "/sign-up",
        element: <SignUp/>,
      },
      {
        path: "/sign-up-otp",
        element: <SignUpOtp/>,
      },
      {
        path: "/account-created",
        element: <AccountCreated/>,
      },
      {
        path: "/dashboard",
        element: <DashboardRoot/>,

        children: [
          {
            index: true,
            element: <DashboardIndex />,
            
            // children: [
            //   // {
            //   //   index:true,
            //   //   element: <PostDescription/>,
            //   // },
            //   {
            //     path: '/dashboard/post1',
            //     element: <PostDescription/>,
            //   },
            // ],
          },
          {
            path: '/dashboard/:postId',
            element: <PostDescription/>,
          },
          {
            path: "/dashboard/create-post",
            element: <CreatePost/>,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
