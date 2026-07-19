import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import api from "../services/api";

const swalWithTailwind = Swal.mixin({
  customClass: {
    confirmButton:
      "bg-red-600 hover:bg-red-700 ml-2 cursor-pointer text-white font-bold py-2 px-4 rounded",
    cancelButton:
      "bg-gray-600 hover:bg-gray-700 mr-2 cursor-pointer text-white font-bold py-2 px-4 rounded",
  },
  buttonsStyling: false,
});

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  const deleteAccountHandler = async () => {
    const { isConfirmed } = await swalWithTailwind.fire({
      title: "Delete Account?",
      html: `
        <p>This action is permanent.</p>
        <p class="mt-2 font-semibold text-red-500">
          All your posts, comments, likes and profile data may be removed.
        </p>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });

    if (!isConfirmed) return;

    try {
      await api.delete("/users/profile");
      localStorage.removeItem("accessToken");

      queryClient.clear();

      toast.success("Account deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    }
  };

  return deleteAccountHandler;
};
