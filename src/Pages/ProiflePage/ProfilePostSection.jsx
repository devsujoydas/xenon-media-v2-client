import { BsFileImage } from "react-icons/bs";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { BiSolidMoviePlay } from "react-icons/bi";
// import { useAuth } from "../../hooks/useAuth";

const ProfilePostSection = () => {
    const { userData, setLoading } = useAuth()

    if (!userData) { setLoading(true) }

    return (
        <>
            {/* Post Form */}
            <div className="border p-3 bg-white border-zinc-300 rounded-lg grid gap-3">
                <div className="flex items-center gap-2 text-zinc-500">
                    <div className="w-11 h-10 cursor-pointer overflow-hidden">
                        <img className="h-full w-full object-cover rounded-full" src={userData?.profile.profilePhotoUrl ? `${userData?.profile.profilePhotoUrl}` : `/default.jpg`} alt="" />
                    </div>
                    <div className="border bg-zinc-100 text-sm hover:bg-zinc-200 active:bg-zinc-300 cursor-pointer border-zinc-200 px-4 py-2.5 w-full transition-all rounded-full">
                        <h1>Whats on your mind</h1>
                    </div>
                </div>

                <hr className='border text-zinc-300' />

                <div className="flex justify-center items-center gap-2 text-sm">
                    <button className='font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer w-full py-3 rounded-sm transition-all flex justify-center items-center gap-1'><BsFillCameraReelsFill className="text-2xl text-red-500" />Live Video</button>
                    <button className=' font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer w-full py-3 rounded-sm transition-all flex justify-center items-center gap-1'><BsFileImage className="text-2xl text-emerald-500" />Photo/Video</button>
                    <button className=' font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer w-full py-3 rounded-sm transition-all flex justify-center items-center gap-1'><BiSolidMoviePlay className="text-2xl text-red-500" />Reel</button>
                </div>
            </div>


            {/* Post filter */}
            <div className="border p-3 bg-white border-zinc-300 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                    <h1 className="text-zinc-600 font-semibold text-lg">Posts</h1>
                    <div className="flex gap-2 text-sm">
                        <button className=' font-semibold bg-zinc-200 hover:bg-zinc-300 active:scale-95 cursor-pointer px-4 py-2 rounded-sm transition-all'>Filter</button>
                        <button className=' font-semibold bg-zinc-200 hover:bg-zinc-300 active:scale-95 cursor-pointer  px-4 py-2 rounded-sm transition-all'>Manage Posts</button>
                    </div>
                </div>

                <hr className="text-zinc-300" />

                <div className="flex justify-center items-center gap-2 text-sm">
                    <button className='mt-3 font-semibold  hover:bg-zinc-300 active:scale-95 cursor-pointer w-full py-2 rounded-sm transition-all'>List View</button>
                    <button className='mt-3 font-semibold  hover:bg-zinc-300 active:scale-95 cursor-pointer w-full py-2 rounded-sm transition-all'>Grid View</button>
                </div>

            </div>

        </>
    )
}

export default ProfilePostSection