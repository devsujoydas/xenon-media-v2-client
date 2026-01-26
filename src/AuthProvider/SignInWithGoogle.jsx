import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth, GoogleAuthProvider, signInWithPopup, fetchSignInMethodsForEmail, linkWithCredential, EmailAuthProvider } from "firebase/auth";
// // import { useAuth } from "../hooks/useAuth";

const SignInWithGoogle = () => {
    const navigate = useNavigate();
    const { setUserData } = useAuth();
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const logInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            if (!user.email) return;
            const methods = await fetchSignInMethodsForEmail(auth, user.email);

            if (methods.includes("password")) {
                const password = prompt("Enter your password to link your Google account:");
                if (!password) return alert("Password is required to link accounts!");

                const credential = EmailAuthProvider.credential(user.email, password);
                await linkWithCredential(user, credential);
            }

            const formData = {
                email: user.email,
                name: user.displayName,
                username: user.displayName.replace(/[^a-zA-Z]/g, "").toLowerCase(),
                address: "",
                bio: "",
                profilephotourl: user.photoURL || "",
                coverphotourl: "default-cover.jpg",
                phone: "",
                website: "",
                role: "user",
                onlineStatus: true,
                createdDate: new Date(),
                posts: [],
                savePosts: [],
                myFriends: [],
                friendRequests: [],
                sentRequests: [],
            };
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signinwithgoogle`, formData);

            setUserData(res.data);
            localStorage.setItem("email", res.data.email);

            navigate("/profile");

        } catch (err) {
            console.error("Google Sign-In Error:", err.message);
        }
    };

    return (
        <button
            onClick={logInWithGoogle}
            className="flex justify-center items-center gap-1 border border-zinc-300 w-full py-1 rounded-md hover:bg-zinc-100 cursor-pointer active:scale-95 transition-all"
        >
            <img
                className="w-10 h-10 rounded-full"
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google"
            />
            <h1 className="text-black font-medium">Sign in with Google</h1>
        </button>
    );
};

export default SignInWithGoogle;
