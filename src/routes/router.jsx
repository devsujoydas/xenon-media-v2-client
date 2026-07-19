import { createBrowserRouter } from 'react-router-dom'; 
import api from '../services/api.js';

import Layout from '../Layout/Layout.jsx';
import Home from '../Pages/Home/Home.jsx';
import Profile from '../Pages/Profile/Profile.jsx';
import PostDetails from '../Components/Posts/PostDetails.jsx';
import FriendsPage from '../Pages/Friends/FriendsPage.jsx';
import FriendDetails from '../Pages/Friends/FriendDetails.jsx';

import SavedPosts from '../Pages/SavedPosts/SavedPosts.jsx';  

import AdminDashboard from '../Pages/Admin/AdminDashboard.jsx';
import Settings from '../Pages/Admin/Settings.jsx';
import AdminLayout from '../Pages/Admin/AdminLayout.jsx';
import ManageUsers from '../Pages/Admin/ManageUsers/ManageUsers.jsx';
import ManagePosts from '../Pages/Admin/ManagePosts/ManagePosts.jsx';
import ProiflePage from '../Pages/ProiflePage/ProiflePage.jsx';


import PrivateRoute from './PrivateRoutes.jsx';
import AnimatedLayout from '../Layout/AnimatedLayout.jsx';
import PageNotFound from '../Pages/ErrorPage/ErrorPage.jsx';

import AuthPrivateRoutes from './AuthPrivateRoutes.jsx';
import Signup from '../Pages/Authentication/Signup.jsx';
import Login from '../Pages/Authentication/Login.jsx';
import ForgotPassword from '../Pages/Authentication/ForgotPassword.jsx';
import ResetPassword from '../Pages/Authentication/ResetPassword.jsx';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><Layout /></PrivateRoute>,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: (
          <AnimatedLayout>
            <Home />
          </AnimatedLayout>
        ),
      },
      {
        path: "/profile",
        element: (
            <Profile />
        ),
      },
      {
        path: '/post/:id',
        element: (
          <AnimatedLayout>
            <PostDetails />
          </AnimatedLayout>
        ),
        loader: async ({ params }) => await api.get(`${import.meta.env.VITE_BACKEND_URL}/posts/post/${params.id}`),
      },
      {
        path: '/friends',
        element: <FriendsPage />,
      },
      {
        path: '/profile/:id',
        element: <FriendDetails />,
        loader: async ({params}) => await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile/${params.id}`),
      },
      // {
      //   path: '/profile-page',
      //   element: <ProiflePage />,
      // },
      

      // {
      //   path: '/savedposts',
      //   element: <SavedPosts />,
      // },

    ],
  },
  // {
  //   path: '/admin',
  //   element: <PrivateRoutes requiredRole="admin"><AdminLayout /></PrivateRoutes>,
  //   children: [
  //     {
  //       path: "/admin/dashboard",
  //       element: <AdminDashboard />
  //     },
  //     {
  //       path: "/admin/settings",
  //       element: <Settings />
  //     },
  //     {
  //       path: "/admin/posts",
  //       element: <ManagePosts />
  //     },
  //     {
  //       path: "/admin/users",
  //       element: <ManageUsers />
  //     },
  //   ]
  // },
  {
    path: "/login",
    element: (
      <AuthPrivateRoutes>
        <AnimatedLayout>
          <Login />
        </AnimatedLayout>
      </AuthPrivateRoutes>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthPrivateRoutes>
        <AnimatedLayout>
          <Signup />
        </AnimatedLayout>
      </AuthPrivateRoutes>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthPrivateRoutes>
        <AnimatedLayout>
          <ForgotPassword />
        </AnimatedLayout>
      </AuthPrivateRoutes>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <AuthPrivateRoutes>
        <AnimatedLayout>
          <ResetPassword />
        </AnimatedLayout>
      </AuthPrivateRoutes>
    ),
  },
]);
