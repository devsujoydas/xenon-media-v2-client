import { useState } from "react"
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
// import { useAuth } from "../../hooks/useAuth";

const AllFriends = ({ friend }) => {
    const { addFriendBtnHanlder } = useAuth()

    const [addStatus, setAddStatus] = useState(true)
    const btnStyle = "block  py-1.5  text-sm font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "



    const addFriendHandler = () => {
        addFriendBtnHanlder(friend)
        setAddStatus(false)
    }
    const cencelBtnHandler = () => {
        toast.success('Cencel!')
        setAddStatus(true)
    }
 
    return (
        <div className='border border-zinc-200 shadow-md overflow-hidden rounded-lg flex'>

            <div className=' p-2 '>
                <Link to={`/profile/${friend._id}`}>
                    <img className=' w-20 h-20 object-cover rounded-full' src={!friend?.profileImage.url} alt="" />
                </Link>
            </div>
            <div className=' p-2  w-3/4'>
                <div className=''>
                    <Link to={`/profile/${friend?._id}`} className='space-y-1 mb-2'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[16px]  text-wrap font-semibold'>{friend?.name}</h1>
                            <h1 className='md:text-sm text-xs -mt-2 mb-2'>@ {friend?.username}</h1>
                        </div>
                    </Link>
                    <div className='flex   gap-2'>
                        {addStatus ?
                            <button onClick={() => addFriendHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Add friend</button>
                            :
                            <button onClick={() => cencelBtnHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Sent Request</button>
                        }
                        <button className={`${btnStyle} bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-300`} >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllFriends