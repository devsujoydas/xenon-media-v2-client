import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  reauthenticateWithCredential,
  signOut,
  EmailAuthProvider,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import toast from "react-hot-toast";  
import Swal from "sweetalert2";
export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState({});
  const [savedPosts, setSavedPosts] = useState([]);
  const [usersPostsData, setUsersPostsData] = useState([]);
  const [myFriends, setMyFriends] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [friendsRequest, setFriendRequests] = useState([]);
  const [youMayKnowFriends, setYouMayKnowFriends] = useState([]);

  const [friendsData, setFriendsData] = useState([]);
  const [postsData, setPostsData] = useState([]);


  const addFriendBtnHanlder = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/addfriend`, data)
      .then((res) => {
        toast.success(res.data.message);

        if (res.data.message === "Request sent") {
          const remaining = youMayKnowFriends.filter(
            (fr) => fr._id !== friend._id
          );
          setYouMayKnowFriends(remaining);
          setSentRequests([...sentRequests, friend]);
        } else {
          const remainingSentRequests = sentRequests.filter(
            (fr) => fr._id !== friend._id
          );
          setSentRequests(remainingSentRequests);
          const remainingFriendsRequests = friendsRequest.filter(
            (fr) => fr._id !== friend._id
          );
          setFriendRequests(remainingFriendsRequests);
          setYouMayKnowFriends([...youMayKnowFriends, friend]);
        }
      })
      .catch((err) => console.error("Add friend failed:", err));
  };
  const unFriendBtnHanlder = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/unfriend`, data)
      .then((res) => {
        toast.success(res.data.message);
        if (res.data.message === "Unfriend successful") {
          const remainingMyFriend = myFriends.filter(
            (fr) => fr._id !== friend._id
          );
          setMyFriends(remainingMyFriend);
          setYouMayKnowFriends([...youMayKnowFriends, friend]);
        }
      })
      .catch((err) => console.error("Unfriend failed:", err));
  };
  const confrimFriendBtnHanlder = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/confirmFriend`, data)
      .then((res) => {
        toast.success(res.data.message);
        if (res.data.message == "Request accepted") {
          const remainingFriendsRequests = friendsRequest.filter(
            (fr) => fr._id !== friend._id
          );
          setFriendRequests(remainingFriendsRequests);
          setMyFriends([...myFriends, friend]);
        }
      })
      .catch((err) => console.error("Friend confirm failed:", err));
  };
  const cancelReceivedRequestBtnHandler = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/cancelreceivedrequest`, data)
      .then((res) => {
        toast.success(res.data.message);
        const remaining = friendsRequest.filter((fr) => fr._id !== friend._id);
        setFriendRequests(remaining);
        setYouMayKnowFriends([...youMayKnowFriends, friend]);
      })
      .catch((err) => console.error("Cancel received request failed:", err));
  };
  const cancelSentRequestBtnHandler = (friend) => {
    const data = { userId: userData._id, friendId: friend._id };
    axiosInstance
      .put(`/cancelsentrequest`, data)
      .then((res) => {
        toast.success(res.data.message);
        const remaining = sentRequests.filter((fr) => fr._id !== friend._id);
        setSentRequests(remaining);
        setYouMayKnowFriends([...youMayKnowFriends, friend]);
      })
      .catch((err) => console.error("Cancel sent request failed:", err));
  };



  const deletePostHandler = async (postId, onSuccess) => {
    if (!postId) return toast.error("Invalid post ID");
    try {

      const swalWithTailwind = Swal.mixin({
        customClass: {
          confirmButton:
            "bg-green-600 hover:bg-green-700 ml-2 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2",
          cancelButton:
            "bg-red-600 hover:bg-red-700 mr-2 cursor-pointer text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });


      swalWithTailwind
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete Post!",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const res = await api.delete(`/post/${postId}`);

            if (res.data?.deletedCount > 0) {
              api.get(`/posts?authorId=${userData?._id}`)
                .then(res => {
                  setUsersPostsData(res.data)
                  // swalWithTailwind.fire({
                  //   title: "Post Deleted!",
                  //   text: "Post has been deleted.",
                  //   icon: "success",
                  // });
                  toast.success("Post deleted successfully!");
                })
              if (onSuccess) onSuccess();
            } else {
              toast.error(res.data?.message || "Failed to delete post.");
            }


          }
        });

    } catch (error) {
      console.error("Delete post error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const savePostHandler = (post) => {
    const data = { userId: userData._id, postId: post._id };
    axiosInstance
      .put(`/savePost`, data)
      .then((res) => {
        axiosInstance.get(`/savedPosts?userId=${userData._id}`)
          .then(res => {
            setSavedPosts(res.data)
          })

        toast.success(res.data.message);
      })
      .catch((err) => console.error("Friend confirm failed:", err));
  };
  const removeSavedPostHandler = (post) => {
    const data = { userId: userData._id, postId: post._id };
    axiosInstance
      .put(`/removeSavedPost`, data)
      .then((res) => {
        axiosInstance.get(`/savedPosts?userId=${userData._id}`)
          .then(res => {
            setSavedPosts(res.data)
          }) 
        toast.success(res.data.message);
      })
      .catch((err) => console.error("Friend confirm failed:", err));
  };

  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await axiosInstance.post(`/logout`, {});
      localStorage.removeItem("email");
      localStorage.removeItem("accessToken");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  const deleteAccount = async () => {
    try {
      // confirm before delete
      const confirm = await Swal.fire({
        title: "Are you sure?",
        text: "This will permanently delete your account and all related data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (!confirm.isConfirmed) return;

      const password = await Swal.fire({
        title: "Re-enter your password",
        input: "password",
        inputLabel: "You must confirm your identity before deleting your account.",
        inputPlaceholder: "Enter your password",
        inputAttributes: { autocapitalize: "off", autocorrect: "off" },
        showCancelButton: true,
      });

      if (!password.value) {
        Swal.fire("Cancelled", "Account deletion was cancelled.", "info");
        return;
      }

      // 🔑 Reauthenticate
      const credential = EmailAuthProvider.credential(user.email, password.value);
      await reauthenticateWithCredential(user, credential);

      // 🗑️ Delete from Firebase Auth
      await deleteUser(user);

      // 🗃️ Delete from MongoDB backend
      await axiosInstance.delete(`/profile/delete/${userData._id}`);

      // 🚪 Sign out
      await signOut(auth);
      await axiosInstance.post(`/logout`);

      // 🧹 Clean up local storage
      localStorage.removeItem("email");
      localStorage.removeItem("accessToken");

      Swal.fire("Deleted!", "Your account and data have been removed.", "success");
    } catch (error) {
      console.error("❌ Error deleting account:", error);
      Swal.fire("Error", error.message || "Failed to delete account.", "error");
    }
  };






useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser?.email) {
      setUser(null);
      setUserData(null);
      setLoading(false);
      return;
    }

    try {
      setUser(currentUser);
      const email = currentUser.email;
      localStorage.setItem("email", email);
 
      const jwtRes = await axiosInstance.post("/jwt", { email });
      localStorage.setItem("accessToken", jwtRes.data.accessToken);

      
      const userDataRes = await axiosInstance.get(`/profile?email=${email}`);
      setUserData(userDataRes.data);

    } catch (err) {
      console.error("Auth/Profile error:", err);
    } finally {
      setLoading(false);
    }
  });

  return () => unsubscribe();
}, []);


useEffect(() => {
  if (!userData?._id) return;

  const fetchPrimaryData = async () => {
    try {
      const [
        postsRes,
        allUsersRes,
        myFriendsRes,
      ] = await Promise.all([
        axiosInstance.get(`/posts`),
        axiosInstance.get(`/allUsers?userId=${userData._id}`),
        axiosInstance.get(`/myfriends?userId=${userData._id}`),
      ]);

      setPostsData(postsRes.data);
      setFriendsData(allUsersRes.data);
      setMyFriends(myFriendsRes.data);
    } catch (err) {
      console.error("Primary data error:", err);
    }
  };

  fetchPrimaryData();
}, [userData?._id]);


useEffect(() => {
  if (!userData?._id) return;

  const fetchSecondaryData = async () => {
    try {
      const [
        sentReqRes,
        friendReqRes,
        youMayKnowRes,
        usersPostsRes,
        savedPostsRes,
      ] = await Promise.all([
        axiosInstance.get(`/sentrequest?userId=${userData._id}`),
        axiosInstance.get(`/requests?userId=${userData._id}`),
        axiosInstance.get(`/youMayKnow?userId=${userData._id}`),
        axiosInstance.get(`/posts?authorId=${userData._id}`),
        axiosInstance.get(`/savedPosts?userId=${userData._id}`),
      ]);

      setSentRequests(sentReqRes.data);
      setFriendRequests(friendReqRes.data);
      setYouMayKnowFriends(youMayKnowRes.data);
      setUsersPostsData(usersPostsRes.data);
      setSavedPosts(savedPostsRes.data);
    } catch (err) {
      console.error("Secondary data error:", err);
    }
  };

  fetchSecondaryData();
}, [userData?._id]);


useEffect(() => {
  if (!userData?._id) return;

  const ping = async () => {
    try {
      await axiosInstance.post(`/activeStatus?userId=${userData._id}`);
    } catch (err) {
      console.error("Active ping error:", err);
    }
  };

  ping();
  const interval = setInterval(ping, 5000);

  return () => clearInterval(interval);
}, [userData?._id]);






  const dataList = {
    user,
    setUser,
    userData,
    setUserData,
    usersPostsData,
    setUsersPostsData,

    loading,
    setLoading,

    signUpUser,
    logInUser,
    signOutUser,
    signInWithGoogle,
    deleteAccount,

    addFriendBtnHanlder,
    unFriendBtnHanlder,
    confrimFriendBtnHanlder,

    deletePostHandler,
    postsData,
    setPostsData,

    savedPosts,
    setSavedPosts,
    savePostHandler,
    removeSavedPostHandler,

    friendsData,
    setFriendsData,
    myFriends,
    setMyFriends,
    friendsRequest,
    setFriendRequests,
    sentRequests,
    setSentRequests,
    youMayKnowFriends,
    setYouMayKnowFriends,
    cancelSentRequestBtnHandler,
    cancelReceivedRequestBtnHandler,


  };

  return (
    <AuthContext.Provider value={dataList}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;


