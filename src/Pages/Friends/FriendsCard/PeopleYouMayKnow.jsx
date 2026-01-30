import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../../../AuthProvider/AuthProviderNew';
// import { useAuth } from '../../../hooks/useAuth';


const PeopleYouMayKnow = ({ friend }) => {
    const { addFriendBtnHanlder } = useAuth()
    const btnStyle = "block py-2  text-sm font-medium rounded-sm w-full text-center cursor-pointer active:scale-95 transition-all "
    const [addStatus, setAddStatus] = useState(true)


    const addFriendHandler = () => {
        addFriendBtnHanlder(friend)
        setAddStatus(false)
    }
    const cencelBtnHandler = () => {
        setAddStatus(true)
    }


    return (
        <div className='border border-zinc-200 shadow-md overflow-hidden rounded-lg md:block flex '>

            <div className='md:p-0 p-2 '>
                <Link to={`/profile/${friend?._id}`}>
                    <img className='md:w-full w-24 md:h-52 h-22 object-cover scale md:rounded-none rounded-full' src={!friend?.profile?.profilePhoto ? `/default.jpg` : `${friend?.profile.profilePhoto}`} alt="" />
                </Link>
            </div>
            <div className='md:p-3 p-2 md:w-full w-3/4'>
                <div className='flex flex-col justify-between h-full '>
                    <Link to={`/profile/${friend._id}`} className='space-y-1 '>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[16px] flex items-center gap-2 text-wrap font-semibold'>{friend?.name}
                                {friend?.activeStatus.online && (
                                    <p className='bg-green-400 h-3.5 w-3.5 rounded-full  border border-white'></p>
                                )}
                            </h1>
                            <h1 className='md:text-sm text-xs mb-1 -mt-2'>@ {friend.username}</h1>
                        </div>
                    </Link>
                    <div className='flex md:flex-col md:mt-2 gap-2'>
                        {addStatus ?
                            <button onClick={() => addFriendHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Add friend</button>
                            :
                            <button onClick={() => cencelBtnHandler()} className={`${btnStyle} bg-blue-200 hover:bg-blue-100 active:bg-blue-100 text-blue-800 font-semibold`}  >Sent Request</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PeopleYouMayKnow