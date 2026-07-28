import { BsImages } from "react-icons/bs";
import { useState } from "react";
import UploadPostModal from "../../Components/Modals/UploadPostModal";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthProviderNew";

const PostFrom = () => {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <UploadPostModal isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Post Form */}
      <div className="bg-white border border-zinc-200 rounded-xl shadow-sm p-4 flex items-center gap-3">
        {/* Avatar */}
        <Link to={"/profile"} className="shrink-0">
          <img
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            src={user?.profileImage?.url || "/default.jpg"}
            alt=""
          />
        </Link>

        {/* Input pill */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 text-left px-4 py-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 transition-colors text-sm text-zinc-500 cursor-pointer"
        >
          What's on your mind{user?.name ? `, ${user.name.split(" ")[0]}` : ""}?
        </button>

        {/* Photo action */}
        <button
          onClick={() => setIsOpen(true)}
          title="Add photo or video"
          className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-emerald-50 hover:bg-emerald-100 active:bg-emerald-200 text-emerald-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <BsImages className="text-lg md:text-xl" />
        </button>
      </div>
    </>
  );
};

export default PostFrom;