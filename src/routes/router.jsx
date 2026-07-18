import { createBrowserRouter } from 'react-router-dom'; 
import Layout from '../Layout/Layout.jsx';
import Home from '../Pages/Home/Home.jsx';
import Profile from '../Pages/Profile/Profile.jsx';
import PostDetails from '../Components/Posts/PostDetails.jsx';
import PostDetailsUpdate from '../Components/Posts/PostDetailsUpdate.jsx';
import FriendsPage from '../Pages/Friends/FriendsPage.jsx';
import FriendDetails from '../Pages/Friends/FriendDetails.jsx';
import SavedPosts from '../Pages/SavedPosts/SavedPosts.jsx';
import EventsPage from '../Pages/EventsPage/EventsPage.jsx';
import Memories from '../Pages/Memories/Memories.jsx'; 
import ErrorPage from '../Pages/ErrorPage/ErrorPage.jsx';
import AuthPrivateRoutes from './AuthPrivateRoutes.jsx';
import ProfileImageUpload from '../Pages/ProfileImageUpload/ProfileImageUpload.jsx';
import AdminDashboard from '../Pages/Admin/AdminDashboard.jsx';
import Settings from '../Pages/Admin/Settings.jsx';
import AdminLayout from '../Pages/Admin/AdminLayout.jsx';
import ManageUsers from '../Pages/Admin/ManageUsers/ManageUsers.jsx';
import ManagePosts from '../Pages/Admin/ManagePosts/ManagePosts.jsx';
import ImageUploader from '../Pages/ImageUploader/ImageUploader.jsx';
import ProiflePage from '../Pages/ProiflePage/ProiflePage.jsx';


import PrivateRoute from './PrivateRoutes.jsx';
import AnimatedLayout from '../Layout/AnimatedLayout.jsx';import PageNotFound from '../Pages/ErrorPage/ErrorPage.jsx';
import api from '../services/api.js';
import Login from '../Pages/Authentication/Login.jsx';
import Signup from '../Pages/Authentication/Signup.jsx';
import ForgotPassword from '../Pages/Authentication/ForgotPassword.jsx';
import ResetPassword from '../Pages/Authentication/ResetPassword.jsx';
// import Chats from '../Pages/ChatBox/Chats.jsx';
// import ChatBox from '../Pages/ChatBox/ChatBox.jsx'; 


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
      // {
      //   path: '/profile/:id',
      //   element: <FriendDetails />,
      //   loader: async ({params}) => await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile/${params.id}`),
      // },
      // {
      //   path: '/profile-page',
      //   element: <ProiflePage />,
      // },
      // {
      //   path: '/imgupload',
      //   element: <ImageUploader />,
      // },
      // {
      //   path: '/post/update/:id',
      //   element: <PostDetailsUpdate />,
      //   loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKEND_URL}/post/update/${params.id}`),
      // },
      // {
      //   path: '/friends',
      //   element: <FriendsPage />,
      // },

      // {
      //   path: "/message",
      //   element: <Chats />,
      //   children: [
      //     {
      //       path: ":id",
      //       element: <ChatBox />,
      //     },
      //   ],
      // },

      // {
      //   path: '/savedposts',
      //   element: <SavedPosts />,
      // },
      // {
      //   path: '/eventsPage',
      //   element: <EventsPage />,
      // },
      // {
      //   path: '/memories',
      //   element: <Memories />,
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
  // {
  //   path: '/ppupload',
  //   element: <ProfileImageUpload />
  // },
]);
