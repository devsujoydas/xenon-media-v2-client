import React, { useState } from 'react'
import resetpassimg from '../../../public/resetpassimg.png'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'

const ResetPasswordUpdated = () => {
    const [show, setShow] = useState(true)
    const navigate = useNavigate()


    return (
        <div className='  min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-0'>
            <Link to={"/"} className='fixed top-3 left-5 text-blue-700 font-bold font-momo-poppins text-2xl'>Xenly v2</Link>


            <div className='w-full max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl  rounded-2xl overflow-hidden xl:grid xl:grid-cols-2 lg:shadow-lg lg:border border-zinc-100 p-4'>

                {/* Image Section */}
                <div className='hidden xl:block'>
                    <img
                        src={resetpassimg}
                        alt="signup"
                        className='h-full w-full object-cover rounded-xl'
                    />
                </div>

                {/* Form Section */}
                <div className='px-4 sm:px-8 md:px-12 lg:px-14 py-8 sm:py-10 '>

                    <div className='w-full'>
                        <div className='mb-10'>
                            <button onClick={() => { navigate(-1) }} className='cursor-pointer'>
                                <ArrowLeft className='active:scale-95' />
                            </button>
                        </div>

                        {/* Header */}
                        <div>
                            <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-2'>
                                Reset Password
                            </h1>
                            <p className='text-sm sm:text-base mt-3'>
                                Your new password must be different from your previous passwords.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={(e) => e.preventDefault()} className='mt-8 sm:mt-10 grid gap-4 sm:gap-5 '>



                            {/* Password */}
                            <div>
                                <label className='font-medium text-sm'>New Password</label>
                                <div className='relative mt-1 border focus:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center'>
                                    <input
                                        type={show ? 'password' : 'text'}
                                        className='w-full outline-none'
                                        placeholder='New Password'
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        className='absolute cursor-pointer right-4 text-zinc-500'
                                    >
                                        {show ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label className='font-medium text-sm'>Confirm Password</label>
                                <div className='relative mt-1 border focus:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center'>
                                    <input
                                        type={show ? 'password' : 'text'}
                                        className='w-full outline-none'
                                        placeholder='Confirm Password'
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShow(!show)}
                                        className='absolute cursor-pointer right-4 text-zinc-500'
                                    >
                                        {show ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>



                            {/* Submit */}
                            <button className='mt-2 bg-black text-white py-3 sm:py-4 rounded-full hover:bg-zinc-700 transition cursor-pointer'>
                                Reset Password
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordUpdated
