import { BsFileImage } from "react-icons/bs";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { BiSolidMoviePlay } from "react-icons/bi";
import { useState } from "react"; 
import UploadPostModal from "../../Components/Modals/UploadPostModal";
import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthProviderNew";

const PostFromAndPost = () => {
  const { user } = useAuth()


  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <UploadPostModal isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Post Form */}
      <div className="border p-3 bg-white border-zinc-300 rounded-lg grid gap-3">
        <div className="flex items-center gap-2 text-zinc-500">
          <div className="md:w-13 w-10 md:h-12.5 h-8.5 cursor-pointer overflow-hidden">
            <Link to={"/profile"}>
              <img
                className="h-full w-full object-cover rounded-full"
                src={!user?.profile?.profilePhoto ? `/default.jpg` : `${user?.profile.profilePhoto}`
                }
                alt=""
              />
            </Link>
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className="border bg-zinc-100 text-sm hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer border-zinc-200 px-4 py-2 md:py-2.5 w-full transition-all rounded-full"
          >
            <h1 className=" text-xs md:text-[14px]">Whats on your mind</h1>
          </div>
        </div>

        <hr className="border text-zinc-300 " />

        <div className="flex justify-center items-center gap-2 text-xs md:text-sm">
          <button
            onClick={() => setIsOpen(true)}
            className="font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer w-full py-1.5 md:py-3 rounded-sm transition-all flex justify-center items-center gap-1"
          >
            <BsFillCameraReelsFill className=" text-md md:text-2xl text-red-500" />
            Live Video
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className=" font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer w-full py-1.5 md:py-3 rounded-sm transition-all flex justify-center items-center gap-1"
          >
            <BsFileImage className=" text-md md:text-2xl text-emerald-500" />
            Photo/Video
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className=" font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer w-full py-1.5 md:py-3 rounded-sm transition-all flex justify-center items-center gap-1"
          >
            <BiSolidMoviePlay className=" text-md md:text-2xl text-red-500" />
            Reel
          </button>
        </div>
      </div>
    </>
  );
};

export default PostFromAndPost;
