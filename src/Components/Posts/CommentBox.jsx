    import CommentCard from './CommentCard'
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';

import { BiLike } from "react-icons/bi";
import { VscSend } from "react-icons/vsc";
import { FaRegSmile } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";
import { BiCommentDots } from "react-icons/bi";
import { PiShareFatBold } from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import ThreeDotMenu from './ThreeDotMenu.jsx';
// import { useAuth } from '../../hooks/useAuth.js';



const CommentBox = ({ post }) => {
    const { userData } = useAuth()
    const likeCommentStyle = "md:text-[16px] active:scale-95 w-full transition-all px-3 py-1 md:py-2 rounded-md hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1"
    // const editTrashBtnStyle = "active:scale-95 w-full transition-all px-3 py-1 rounded-md  hover:bg-zinc-200 active:bg-zinc-200 cursor-pointer flex items-center gap-1"

    const [showEdit, setShowEdit] = useState(1)
    const [showUsers, setShowUsers] = useState(false)
    const [like, setlike] = useState(false)
    const [reactorsUsers, setReactorsUsers] = useState([])
    const [likesCount, setLikesCount] = useState(post.likes.length)

    useEffect(() => {
        if (post?.likes.length > 0 && userData?._id) {
            setReactorsUsers(post.likes)
            const likedUser = post?.likes.find(likedUserId => likedUserId.userId == userData?._id);
            if (!likedUser) return
            setlike(true)
        }
    }, [post.likes, userData]);

    const likeHandler = () => {
        const userId = userData?._id;
        const username = userData?.username;
        const name = userData?.name;
        const fromData = { name, username, userId };

        axios.put(`${import.meta.env.VITE_BACKEND_URL}/post/like/${post._id}`, fromData)
            .then(res => {
                if (res.data.message === "Liked") {
                    setlike(true);
                    setLikesCount(prev => prev + 1);
                    toast.success('Liked!')
                }
                if (res.data.message === "Disliked") {
                    setlike(false);
                    setLikesCount(prev => prev - 1);
                    toast.success('Disliked!')
                }
            }).catch(err => console.error(err));

    };

    const url = `${import.meta.env.VITE_FRONTEND_URL}/post/${post._id}`

    const sharePostHandler = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success('Post Url Copied Successfully!')
            })
            .catch((err) => {
                console.error("Copy failed: ", err);
            });
    }


    const comment = false
    return (
        <div className='relative h-full overflow-hidden '>


            <div className='flex-1 overflow-y-auto'>
                {/* post img and menus */}
                <div className="md:px-5 md:py-3 p-3 flex justify-between items-center">
                    <Link to={post?.authorUsername === userData?.username ? "/profile" : `/profile/${post?.authorUsername}`}>
                        <div className="flex items-center gap-3">
                            <div className="active:scale-95 transition-all cursor-pointer w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full">
                                <img className="h-full w-full rounded-full object-cover" src={!post?.authorPhoto ? `/default.jpg` : `${post?.authorPhoto}`} alt="" />
                            </div>

                            <div>
                                <h1 className="font-semibold active:underline transition-all text-md cursor-pointer">{post?.authorName ? `${post?.authorName}` : "Your Name"}</h1>
                                <div className="flex justify-center items-center gap-2 text-zinc-500 text-sm ">
                                    <p className="">{new Date(post?.createdDate)?.toLocaleString()}</p>
                                    {post?.authorUsername === userData?.username &&
                                        <span className="text-emerald-700 font-semibold text-xs ">{!post?.lastUpdateDate == "" && "Updated"}</span>
                                    }
                                </div>
                            </div>
                        </div>
                    </Link>

                    <div className='relative md:text-sm text-xs'>
                        <button onClick={() => { setShowEdit(!showEdit) }}>
                            <BsThreeDotsVertical className="cursor-pointer active:scale-95 hover:bg-zinc-300 active:bg-zinc-300 text-4xl text-zinc-500 hover:text-black  rounded-full transition-all p-2" />
                        </button>
                        <div>
                            <ThreeDotMenu post={post} setShowEdit={setShowEdit} showEdit={showEdit} />
                        </div>
                    </div>
                </div>

                {/* Post Content */}
                <div className='px-3'>
                    <h1 className="space-x-2 px-2 cursor-pointer pt-2  text-sm flex text-wrap font-semibold flex-wrap">{post?.postContent}</h1>
                </div>


                {/* display likes */}
                <div className="flex justify-between items-center gap-3  text-sm px-3 py-1 md:mt-5 ">

                    <div className="flex items-center gap-1 ">
                        <img className="md:w-5 w-4 md:h-5 h-4 rounded-full overflow-hidden" src="/like.png" alt="" />

                        <div className="flex items-center gap-2 relative">
                            {reactorsUsers.length > 0 &&
                                <div onClick={() => setShowUsers(!showUsers)} onMouseEnter={() => setShowUsers(true)} onMouseLeave={() => setShowUsers(false)} className="text-xs md:text-sm flex gap-1 cursor-pointer hover:underline active:underline transition-all items-center " >

                                    <div className={`absolute bottom-8 -left-7 ${showUsers ? "z-10 opacity-100" : "-z-10 opacity-0"} transition-all text-xs  shadow-xl bg-[#000000a4] p-3 space-y-1 rounded-lg flex flex-col text-white font-semibold`}>
                                        {reactorsUsers.map((user, idx) => (
                                            <Link to={user?.username == userData?.username ? "/profile" : `/profile/${user._id}`} key={idx} className="cursor-pointer hover:underline transition-all">{user.name}</Link>
                                        ))}
                                    </div>

                                    <p className="text-sm text-zinc-600 md:block hidden">
                                        {(() => {
                                            const names = reactorsUsers.map(user => user.name);
                                            const displayNames = names.slice(0, 2).join(", ");
                                            const othersCount = names.length - 2;
                                            return othersCount > 0 ? `${displayNames} and ${othersCount} others` : displayNames;
                                        })()}
                                    </p>
                                </div>}

                            {reactorsUsers.length > 0 &&
                                <div className="text-xs md:text-sm flex md:hidden gap-1 cursor-pointer hover:underline transition-all items-center " >
                                    <p onClick={() => setShowUsers(!showUsers)} className=" -ml-2 text-zinc-600 ">
                                        {(() => {
                                            const names = reactorsUsers.map(user => user.name);
                                            const displayNames = names.slice(0, 1).join(", ");
                                            const othersCount = names.length - 1;
                                            return othersCount > 0 ? `${displayNames} and ${othersCount} others` : displayNames;
                                        })()}
                                    </p>
                                </div>}
                        </div>

                    </div>

                    <div className="flex items-center gap-3 text-sm ">
                        <div>
                            <h1 className="flex items-center gap-1">0 <span className="md:block hidden">Comments</span> <span className="block md:hidden"><BiCommentDots /></span></h1>
                        </div>
                        <div>
                            <h1 className="flex items-center gap-1">0 <span className="md:block hidden">Share</span>  <span className="block md:hidden"><PiShareFatBold /></span> </h1>
                        </div>
                    </div>
                </div>

                {/* like comment btns */}
                <div className='border-y-2 border-zinc-300 px-3 py-1'>
                    <div className="flex items-center md:gap-2">
                        <button onClick={likeHandler} className={`${likeCommentStyle} flex justify-center items-center`}>
                            <div className={`text-xl cursor-pointer active:scale-95 transition-all active:text-black ${!like ? "text-black" : "text-blue-500"}`}>
                                {like ? <BiSolidLike className="text-blue-500" /> : <BiLike />}
                            </div>
                            <span className={`flex items-center gap-1 ${like ? "text-blue-500" : "text-black"}`}>{likesCount}<span className="hidden md:flex">Like</span></span>
                        </button>

                        <button className={`${likeCommentStyle} flex justify-center items-center`}>
                            <div className="text-xl  cursor-pointer active:scale-95 transition-all  ">
                                <BiCommentDots />
                            </div>
                            <span className="flex items-center gap-1"><span className="hidden md:flex">Comments</span></span>
                        </button>

                        <button onClick={() => sharePostHandler()} className={`${likeCommentStyle} flex justify-center items-center`}>
                            <div className="text-xl  cursor-pointer active:scale-95 transition-all ">
                                <PiShareFatBold />
                            </div>
                            <span className="flex items-center gap-1"><span className="hidden md:flex">Shares</span></span>
                        </button>
                    </div>
                </div>

                {/* Comment card */}
                <div className="relative ">
                    {comment ? (
                        <div className='h-full w-full min-h-56 flex justify-center items-center border border-zinc-300 shadow-2xl rounded-md'>
                            <h1>Comment Loading. . .</h1>
                        </div>
                    ) : (
                        <div className='md:p-5 p-3 space-y-3 overflow-y-auto h-[calc(100dvh-360px)] md:pr-1'>
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                        </div>
                    )}
                </div>

            </div>

            {/* Comment form box */}
            <div className='absolute bottom-0   rounded-md overflow-hidden border-t border-zinc-300 w-full '>
                {/* comment container  */}
                <form action="" className="p-3  md:p-4 flex justify-between items-center gap-2 md:gap-20 bg-white">
                    <div className="flex items-center gap-2 md:gap-4 w-full ">
                        <Link to={`/profile`}>
                            <div className="cursor-pointer w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-full">
                                <img className="h-full w-full object-center object-cover" src={!userData?.profile.profilePhotoUrl ? `/default.jpg` : `${userData?.profile.profilePhotoUrl}`} alt="" />
                            </div>
                        </Link>
                        <div className='bg-zinc-200 w-full rounded-xl'>
                            <input className="w-full  outline-none md:text-[14px] text-xs py-2 md:py-4 md:px-4 px-2  " type="text" placeholder={`Comment as ${post.authorName}`} />


                            <div className="flex items-center text-lg justify-between px-2 pb-1 text-zinc-500 gap-3 ">
                                <div className='flex gap-2 '>
                                    <FaRegSmile className='cursor-pointer scale-95 transition-all duration-500' />
                                    <ImAttachment className='cursor-pointer scale-95 transition-all duration-500' />
                                </div>

                                <button className='border p-2 rounded-full bg-blue-600 text-white hover:bg-blue-400 active:scale-95  transition-all duration-500 cursor-pointer'>
                                    <VscSend />
                                </button>

                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </div>
    )
}

export default CommentBox