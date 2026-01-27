import { createBrowserRouter } from 'react-router-dom';
import Login from '../Pages/Login/Login.jsx';
import Signup from '../Pages/Signup/Signup.jsx';
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
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword.jsx';
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
import LoginUpdated from '../Pages/Authentication/LoginUpdated.jsx';
import SignupUpdated from '../Pages/Authentication/SignupUpdated.jsx';
import ForgotPasswordUpdated from '../Pages/Authentication/ForgotPasswordUpdated.jsx';
import ResetPasswordUpdated from '../Pages/Authentication/ResetPasswordUpdated.jsx';
import PrivateRoute from './PrivateRoutes.jsx';
// import Chats from '../Pages/ChatBox/Chats.jsx';
// import ChatBox from '../Pages/ChatBox/ChatBox.jsx'; 


export const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><Layout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      // {
      //   path: '/profile/:id',
      //   element: <FriendDetails />,
      //   loader: async ({ params }) => await fetch(`${import.meta.env.VITE_BACKEND_URL}/profile/${params.id}`),
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
      //   path: '/post/:id',
      //   element: <PostDetails />,
      //   loader: ({ params }) => fetch(`${import.meta.env.VITE_BACKEND_URL}/post/${params.id}`),
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
    path: '/login',
    element: <AuthPrivateRoutes><LoginUpdated /></AuthPrivateRoutes>
  },
  {
    path: '/signup',
    element: <AuthPrivateRoutes><SignupUpdated /></AuthPrivateRoutes>
  },
  {
    path: '/forgot-password',
    element: <AuthPrivateRoutes><ForgotPasswordUpdated /></AuthPrivateRoutes>
  },
  {
    path: '/reset-password',
    element: <AuthPrivateRoutes><ResetPasswordUpdated /></AuthPrivateRoutes>
  },
  // {
  //   path: '/ppupload',
  //   element: <ProfileImageUpload />
  // },
]);
