import ThreeDotMenu from "../Posts/ThreeDotMenu"; 
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link } from "react-router-dom";

 
const AuthorInfo = ({ post, userData, showMenu, setShowMenu, variant, onRemove, }) => {
  return (
    <div className="md:px-5 md:py-3 p-3 flex justify-between items-center">
      <Link
        to={
          post?.author?._id === userData?._id
            ? "/profile"
            : `/profile/${post?.author?._id}`
        }
      >
        <div className="flex items-center gap-3">
          <img
            src={post.author?.profilePhotoUrl || "/default.jpg"}
            alt={post?.author?.name}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer"
          />
          <div>
            <h1 className="font-semibold text-sm md:text-[16px] cursor-pointer ">
              {post?.author?.name}
            </h1>
            <p className="text-zinc-500 text-xs md:text-sm">
              {new Date(post.createdAt).toLocaleString()}
              {post.updatedAt && (
                <span className="text-emerald-700 font-semibold ml-2">
                  Updated
                </span>
              )}
            </p>
          </div>
        </div>
      </Link>

      <div className="relative">
        <button onClick={() => setShowMenu(!showMenu)}>
          <BsThreeDotsVertical className="text-4xl text-zinc-500 hover:text-black rounded-full transition-all p-2 cursor-pointer" />
        </button>
        {showMenu && (
          <ThreeDotMenu
            post={post}
            variant={variant}
            onRemove={onRemove}
            setShowMenu={setShowMenu}
          />
        )}
      </div>
    </div>
  );
};

export default AuthorInfo