import { BsThreeDotsVertical } from "react-icons/bs"
import { FaArrowTrendUp } from "react-icons/fa6";

const ProfileActivity = () => {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center pt-2">
        <h1 className="text-xl font-semibold">Profile Activity</h1>
        <BsThreeDotsVertical className="cursor-pointer active:scale-95 text-xl text-zinc-500 hover:text-black" />
      </div>

      <div className="text-lg p-5 rounded-3xl bg-[#d6e6f7] border border-blue-300 space-y-5">
        <div className="flex items-center">
          <img className="w-14 border-2 rounded-full border-white" src="/activity-avatar.png" alt="" />
          <img className="w-14 -ml-7 border-2 rounded-full border-white" src="/activity-avatar.png" alt="" />
          <img className="w-14 -ml-7 border-2 rounded-full border-white" src="/activity-avatar.png" alt="" />
          <img className="w-14 -ml-7 border-2 rounded-full border-white" src="/activity-avatar.png" alt="" />
          <img className="w-14 -ml-7 border-2 rounded-full border-white" src="/activity-avatar.png" alt="" />
          <img className="w-14 -ml-7 border-2 rounded-full border-white" src="/activity-avatar.png" alt="" />
          <img className="w-14 -ml-7 border-2 rounded-full border-white" src="/activity-avatar.png" alt="" />
        </div>

        <div>
          <h1 className="text-xl text-zinc-600"><span className="font-semibold text-2xl text-black">+1,158</span> Followers</h1>
          <h1 className=" text-zinc-600 flex items-center gap-2"><FaArrowTrendUp className="text-xl text-green-500"/> <span className="text-green-600 font-semibold">23%</span> vs last month</h1>
        </div>

        <p className="text-zinc-600 text-sm">You gained a substantial amount of followers this month!</p>
      </div>
    </div>
  )
}

export default ProfileActivity