import React from 'react'

const CommentCard = () => {
    return (
        <div className='flex gap-2 items-start'>
            <div>
                <img className='w-9 h-9 rounded-full border  border-zinc-200' src="/default.jpg" alt="" />
            </div>
            <div className='grid gap-2'>
                <div className='bg-zinc-200 p-3 rounded-2xl'>
                    <h1 className='font-semibold cursor-pointer text-[15px]'>Sujoy Das</h1>
                    <p className='text-sm text-zinc-600'>Good work hard work keep it up babes</p>
                </div>
                <div className='flex text-xs gap-5'>
                    <p className='text-zinc-500 font-bold'>5h</p>
                    <button className='font-semibold cursor-pointer hover:text-blue-600'>like</button>
                </div>
            </div>
        </div>
    )
}

export default CommentCard