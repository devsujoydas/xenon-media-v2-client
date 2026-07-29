import { FaRegTrashCan } from "react-icons/fa6";
import { Link } from "react-router-dom";
// import { useAuth } from "../../../hooks/useAuth";


const PostTableCard = ({ post }) => {
    const { userData, deletePostHandler } = useAuth()
  
    return (
        <>
            <tr className="bg-white border-b border-gray-200">
                <td scope="row" className=" md:py-3 font-medium  whitespace-nowrap">
                    <Link to={`/post/${post._id}`}>
                        <img className="w-28 h-18 object-cover" src={post?.content.postImageUrl} alt="" />
                    </Link>
                </td>

                <td className="px-6 md:py-3 text-black">
                    {post?.content?.text?.length > 12
                        ? post.content.text.slice(0, 12) + "..."
                        : post?.content?.text}
                </td>
                <td className="px-6 md:py-3">{post?.likes.length}</td>
                <td className="px-6 md:py-3">{post?.shares.length}</td>
                <td className="px-6 md:py-3">{post?.comments.length}</td>


                <td className="md:py-3 px-6 ">
                    <Link to={post?.author?._id === userData?._id ? "/profile" : `/profile/${post?.author?.username}`} className="flex items-center gap-3">
                        <div>
                            <img
                                className="md:w-10 w-8 md:h-10 h-8 rounded-full border-2 border-zinc-300 object-cover "
                                src={`${post?.author?.profileImage.profileImage.url}`}
                                alt="authorPhoto" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="font-semibold ">{post?.author?.name}</h1>
                        </div>
                    </Link>
                </td>
                <td className="md:py-3 px-6 md:text-[14px] text-xs">
                    Posted on{" "}
                    {new Date(post?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </td>
                <td className="md:py-3 px-6 md:text-sm text-xs">
                    <button onClick={() => deletePostHandler(post._id)} className="flex items-center gap-1 border border-zinc-300 rounded-md py-2 px-2 bg-[#a60000] text-white hover:bg-[#ff6565] cursor-pointer active:scale-95 duration-300 transition-all">
                        <FaRegTrashCan className="" />
                        <p className="text-xs">Delete</p>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default PostTableCard