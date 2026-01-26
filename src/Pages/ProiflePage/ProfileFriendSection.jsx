import React from 'react'

const ProfileFriendSection = () => {
    return (
        <div className='text-xs md:text-[14px]  text-zinc-600 bg-white  border p-4 border-zinc-300 rounded-lg h-fit'>
            <div className='flex justify-between items-start'>
                <div>
                    <h1 className='font-semibold text-lg'>Friends</h1>
                    <p>1,834 friends</p>
                </div>
                <button className=' font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer px-4 py-2 rounded-sm transition-all flex justify-center items-center gap-1'>See All Friends</button>
            </div>

            <div className='grid grid-cols-3 gap-y-5 gap-x-2 mt-3 text-black font-medium'>
                <div>
                    <img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" />
                    <h1 className='mt-1'>Demo User </h1>
                </div>
                <div>
                    <img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" />
                    <h1 className='mt-1'>Demo User </h1>
                </div>
                <div>
                    <img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" />
                    <h1 className='mt-1'>Demo User </h1>
                </div>
                <div>
                    <img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" />
                    <h1 className='mt-1'>Demo User </h1>
                </div>
                <div>
                    <img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" />
                    <h1 className='mt-1'>Demo User </h1>
                </div>
                <div>
                    <img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" />
                    <h1 className='mt-1'>Demo User </h1>
                </div>
                <div>
                    <img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" />
                    <h1 className='mt-1'>Demo User </h1>
                </div>
                <div>
                    <img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" />
                    <h1 className='mt-1'>Demo User </h1>
                </div>
                <div>
                    <img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" />
                    <h1 className='mt-1'>Demo User </h1>
                </div>
            </div>

        </div>
    )
}

export default ProfileFriendSection