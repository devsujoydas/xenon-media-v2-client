import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import api from "../services/api";
import toast from "react-hot-toast";

const swalWithTailwind = Swal.mixin({
  customClass: {
    confirmButton:
      "bg-green-600 hover:bg-green-700 ml-2 cursor-pointer text-white font-bold py-2 px-4 rounded mr-2",
    cancelButton:
      "bg-red-600 hover:bg-red-700 mr-2 cursor-pointer text-white font-bold py-2 px-4 rounded",
  },
  buttonsStyling: false,
});


export const useLogOut = () => {
  const queryClient = useQueryClient(); 
 
  const logOutHandler = async () => {
    const result = await swalWithTailwind.fire({
      title: "Logout! Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      localStorage.removeItem("accessToken");
      await api.post("/auth/logout");
      queryClient.setQueryData(["profile"], null); 
      toast.success("Logged out successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  return logOutHandler; 
};
