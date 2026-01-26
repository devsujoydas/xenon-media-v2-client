import React from 'react'

const PhotoSection = () => {
    return (
        <div className='text-xs md:text-[14px]  text-zinc-600 bg-white  border p-4 border-zinc-300 rounded-lg h-fit'>
            <div className='flex justify-between items-start'>
                <h1 className='font-semibold text-lg'>Photos</h1>
                <button className=' font-semibold hover:bg-zinc-200  active:scale-95 cursor-pointer px-4 py-2 rounded-sm transition-all flex justify-center items-center gap-1'>See All Photos</button>
            </div>

            <div className='grid grid-cols-3 gap-2 mt-3'>
                <div><img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" /></div>
                <div><img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" /></div>
                <div><img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" /></div>
                <div><img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" /></div>
                <div><img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" /></div>
                <div><img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" /></div>
                <div><img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" /></div>
                <div><img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" /></div>
                <div><img className='hover:opacity-85 rounded-md cursor-pointer ' src="/default.jpg" alt="" /></div>
            </div>

        </div>
    )
}

export default PhotoSection