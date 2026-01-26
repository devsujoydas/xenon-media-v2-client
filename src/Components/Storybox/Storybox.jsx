import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';  
import { useAuth } from '../../AuthProvider/AuthProviderNew'; 

const Storybox = () => {

  const { myFriends } = useAuth()

  return (
    <div className='bg-white md:p-5 p-2 rounded-xl shadow-xl'>
      <div className='w-full  overflow-hidden ' >
        {myFriends == "" ?
          <div>
            <h1 className='text-center md:text-[16px] text-xs py-3 text-zinc-300'>You have no friend here. Add them first</h1>
          </div>
          :
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-2 py-2">
            {/* {myFriends.map((friend, idx) => (
              <div key={idx} className="shrink-0">
                <Link to={`/profile/${friend?._id}`} className="relative">
                  <img
                    className={`md:w-20 w-16 md:h-20 h-16 object-cover border-3 border-purple-500 ${friend?.onlineStatus ? "hover:border-emerald-500 border-emerald-500" : "hover:border-red-500"} active:scale-95 transition-all duration-500 cursor-pointer rounded-full`}
                    src={friend?.profile?.profilePhotoUrl || "/default.jpg"} alt=""
                  />
                  {friend?.onlineStatus && (
                    <div className="bg-green-400 h-3.5 w-3.5 rounded-full  border border-white absolute bottom-1 right-2"></div>
                  )}
                </Link>
              </div>
            ))} */}
          </div>
        }
      </div>
    </div>
  )
}

export default Storybox