import React from 'react'
import { IoMdAdd } from 'react-icons/io'

const FriendSuggestedSkeleton = () => {



  return (
    <div className="">

      <div className='flex flex-col justify-between '>
      <hr className="text-zinc-300 mb-3 md:mb-5" />


        <div className='flex justify-between items-center'>
          <div className="flex items-center flex-row  gap-3">
            <div className="active:scale-95 transition-all cursor-pointer">
              <div className="w-12 h-12 bg-zinc-300 rounded-full" />
            </div>
            <div className='space-y-3'>
              <div className="w-32 h-4 bg-zinc-300 rounded"></div>
              <div className="w-24 h-3 bg-zinc-200 rounded"></div>
            </div>
          </div>

          <div>
            <IoMdAdd className="text-2xl text-zinc-400 active:scale-95 transition-all cursor-pointer hover:text-zinc-700" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default FriendSuggestedSkeleton