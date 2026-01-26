import { useState } from "react";
import Swal from "sweetalert2";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../../AuthProvider/AuthProviderNew"; 

const UpdateUsernameModal = ({ showUsernameModal, setShowUsernameModal }) => {
    const { userData, setUserData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState("");

    const updateUsernameHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const username = e.target.username.value.trim();
        const email = userData?.email;

        if (!username) {
            setUsernameMessage("Username cannot be empty!");
            setLoading(false);
            return;
        }

        try {


            api.put("/updateUsername", { email, username })
                .then(res => {
                    setLoading(false);

                    if (res.data?.modifiedCount > 0) {
                        Swal.fire({
                            title: "Username updated successfully!",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        api.get(`/profile?email=${email}`)
                            .then(res => setUserData(res.data))

                        setShowUsernameModal(false);
                    } else {
                        setUsernameMessage("Something went wrong!");
                        Swal.fire({
                            title: "Username already taken!",
                            icon: "warning",
                        });
                    }
                })



        } catch (err) {
            console.error(err);
            Swal.fire({
                title: "Error updating username!",
                icon: "error",
            });
            setLoading(false);
        }
    };

    if (!showUsernameModal) return null;

    return (
        <div
            onClick={() => setShowUsernameModal(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all animate-fadeIn"
        >
            {/* Modal Box */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white w-full max-w-md mx-4 rounded-2xl shadow-xl p-6 md:p-8 transition-all"
            >
                {/* Close Button */}
                <button
                    onClick={() => setShowUsernameModal(false)}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition-all"
                >
                    <IoClose className="text-2xl text-gray-700 hover:text-gray-900" />
                </button>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-semibold text-center text-blue-600 mb-6">
                    Update Username
                </h1>

                {/* Form */}
                <form onSubmit={updateUsernameHandler} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Username
                        </label>
                        <input
                            onClick={() => setUsernameMessage("")}
                            defaultValue={userData?.username}
                            name="username"
                            type="text"
                            placeholder="Enter new username"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
                        />
                        {usernameMessage && (
                            <p className="text-sm text-red-600 font-medium mt-2">
                                {usernameMessage}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 rounded-lg text-white font-medium flex justify-center items-center gap-3 transition-all active:scale-95 ${loading
                            ? "bg-blue-500 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-500"
                            }`}
                    >
                        {loading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Updating...</span>
                            </>
                        ) : (
                            "Update"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUsernameModal;
