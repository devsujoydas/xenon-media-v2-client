import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../AuthProvider/AuthProviderNew'
// import { useAuth } from '../../../hooks/useAuth'

const MyFriendsCard = ({ friend }) => {
    const btnStyle = "block py-2 text-xs md:text-sm font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "
    const navigate = useNavigate()
    const [addStatus, setAddStatus] = useState(true)

    const unFriendHandler = async () => {
        try {
        
       } catch (error) {

        }
        setAddStatus(false)
    }


    return (
        <div className='border border-zinc-200 shadow-md overflow-hidden rounded-lg md:block flex '>

            <div className='md:p-0 p-2 '>
                <Link to={`/profile/${friend._id}`}>
                    <img className='md:w-full w-24 md:h-52 h-22 object-cover scale md:rounded-none rounded-full' src={!friend?.profile?.profilePhoto ? `/default.jpg` : `${friend?.profile?.profilePhoto}`} alt="" />
                </Link>
            </div>
            <div className='md:p-3 p-2 md:w-full w-3/4 relative'>
                <div className='flex flex-col justify-between h-full '>
                    <div className='flex flex-col gap-2'>
                        <Link to={`/profile/${friend?._id}`}>
                            <h1 className='text-[16px] flex items-center gap-2 text-wrap font-semibold'>{friend?.name}
                                {friend?.activeStatus.online && (
                                    <p className='bg-green-400 h-3.5 w-3.5 rounded-full  border border-white'></p>
                                )}
                            </h1>
                        </Link>
                        <h1 className='md:text-sm text-xs -mt-2'>@ {friend?.username}</h1>

                    </div>
                    <div className='flex md:flex-col  md:mt-2  gap-2'>
                        <button onClick={() => { navigate(`/profile/${friend?._id}`) }} className={`${btnStyle} bg-blue-600 hover:bg-blue-500 active:bg-blue-500 text-white`}  >View Profile</button>
                        {addStatus ?
                            <button onClick={() => unFriendHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Unfriend</button>
                            :
                            <button className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Unfriended</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyFriendsCard