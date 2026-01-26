import { useState } from "react"
import { Link } from 'react-router-dom'
import { HiDotsHorizontal } from "react-icons/hi";
import { RiUserFollowFill } from "react-icons/ri"; 
import { MdReport } from "react-icons/md";
import { RiUserForbidFill } from "react-icons/ri";


const AllFriends = ({ friend }) => {
    const likeCommentStyle = "md:text-xl active:scale-95 w-full transition-all px-4 py-2 rounded-md hover:bg-zinc-200 cursor-pointer flex items-center gap-2"
    const [showEdit, setShowEdit] = useState(1)


    return (
        <div className='border cursor-pointer border-zinc-300 rounded-md px-5 py-3 flex justify-center items-center  gap-3 hover:shadow-lg active:shadow-none duration-300 transition-all  '>

            <Link to={`/message/${friend?._id}`} className='flex w-full justify- items-center gap-5'>
                <div className='w-18 h-18  rounded-full overflow-hidden'>
                    <img className='w-full object-cover h-full scale-105 ' src={friend?.profile?.profilePhotoUrl ? friend?.profile?.profilePhotoUrl : "/default.jpg"} alt="" />
                </div>

                <div className=''>
                    <h1 className='md:text-lg text-sm font-bold'>{friend?.name}</h1>
                    <h1 className='text-sm'>{friend?.username}</h1>
                </div>
            </Link>

            <div className='relative'>
                <button onClick={() => { setShowEdit(!showEdit) }}>
                    <HiDotsHorizontal className="cursor-pointer active:scale-95 hover:bg-zinc-300 active:bg-zinc-300 text-4xl text-zinc-500 hover:text-black  rounded-full transition-all p-2" />
                </button>
                <div onClick={() => { setShowEdit(!showEdit) }} className={`absolute right-7 top-5 bg-white  w-40 border border-zinc-300 shadow-2xl p-3  rounded-md space-y-1 transition-all duration-500 ${showEdit ? '-z-10 opacity-0' : ' opacity-100 z-10'}`} >
                    <button className={likeCommentStyle}>
                        <h1 className='flex justify-center items-center gap-2 text-sm '> {<RiUserFollowFill />} Add Friend</h1>
                    </button>
                    <hr />
                    <button className={likeCommentStyle}>
                        <h1 className='flex justify-center items-center gap-2 text-sm '> {<MdReport />} Report</h1>
                    </button>
                    <button className={likeCommentStyle}>
                        <h1 className='flex justify-center items-center gap-2 text-sm '> {<RiUserForbidFill />} Block </h1>
                    </button>
                </div>


            </div>
        </div>
    )
}

export default AllFriends