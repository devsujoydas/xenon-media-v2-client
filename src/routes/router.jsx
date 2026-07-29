import { createBrowserRouter } from 'react-router-dom'; 
import api from '../services/api.js';

import Layout from '../Layout/Layout.jsx';
import Home from '../Pages/Home/Home.jsx';
import Profile from '../Pages/Profile/Profile.jsx';
import PostDetails from '../Components/Posts/PostDetails.jsx';

import SavedPosts from '../Pages/SavedPosts/SavedPosts.jsx';  

import AdminDashboard from '../Pages/Admin/AdminDashboard.jsx';
import Settings from '../Pages/Admin/Settings.jsx';
import AdminLayout from '../Pages/Admin/AdminLayout.jsx';
import ManageUsers from '../Pages/Admin/ManageUsers/ManageUsers.jsx';
import ManagePosts from '../Pages/Admin/ManagePosts/ManagePosts.jsx';


import PrivateRoute from './PrivateRoutes.jsx';
import AnimatedLayout from '../Layout/AnimatedLayout.jsx';
import PageNotFound from '../Pages/ErrorPage/ErrorPage.jsx';

import AuthPrivateRoutes from './AuthPrivateRoutes.jsx';
import Signup from '../Pages/Authentication/Signup.jsx';
import Login from '../Pages/Authentication/Login.jsx';
import ForgotPassword from '../Pages/Authentication/ForgotPassword.jsx';
import ResetPassword from '../Pages/Authentication/ResetPassword.jsx';
import AllUsersPage from '../Pages/AllUsersPage/AllUsersPage.jsx';
import UserDetailsPage from '../Pages/AllUsersPage/Userdetailspage.jsx';



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
        loader: async ({ params }) => await api.get(`/posts/post/${params.id}`),
      },
      {
        path: '/users',
        element: <AllUsersPage />,
      },
      {
        path: '/profile/:username',
        element: <UserDetailsPage />,
        loader: async ({params}) => await api.get(`/users/profile/${params.username}`),
      },
   

      {
        path: '/savedposts',
        element: <SavedPosts />,
      },

    ], 
  },
  {
    path: '/admin',
    element: <PrivateRoute requiredRole="admin"><AdminLayout /></PrivateRoute>,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />
      },
      {
        path: "/admin/settings",
        element: <Settings />
      },
      {
        path: "/admin/posts",
        element: <ManagePosts />
      },
      {
        path: "/admin/users",
        element: <ManageUsers />
      },
    ]
  },
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
