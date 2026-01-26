import { Link } from "react-router-dom"
const Friend = ({ friend }) => {

    return (
        <div>
            <Link to={`/profile/${friend?._id}`}>
                <div className='border cursor-pointer border-zinc-300 rounded-md p-3 flex justify-center items-center flex-col gap-3 hover:shadow-lg active:shadow-none duration-300 transition-all  '>
                    <div className='md:h-56 h-36 w-full overflow-hidden'>
                        <img className='w-full object-cover h-full scale-105' src={friend?.profilephotourl} alt="" />
                    </div>
                    <div className='text-center'>
                        <h1 className='md:text-md text-sm font-medium'>{friend?.name}</h1>
                        <h1 className='text-sm'>@{friend?.username}</h1>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Friend