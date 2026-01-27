import React, { useState } from 'react'
import signupPhoto from '../../../public/loginphoto.png'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import SignInWithGoogle from './SignInWithGoogle'
import api from '../../services/api'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

const LoginUpdated = () => {
  const [show, setShow] = useState(true)
  const navigate = useNavigate()
const queryClient = useQueryClient();

  const logInHandler = (e) => {
    e.preventDefault() 
    const email = e.target.email.value
    const password = e.target.password.value

    api.post("/auth/signin", { email, password })
      .then(res => {
        console.log(res.data)
        queryClient.setQueryData(["profile"], res.data.user);
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message)
        navigate("/profile")
      })
      .catch(err => {
        console.log(err.response?.data?.message);
        toast.error(err.response?.data?.message)
      });
  }

  return (
    <div className=' min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-0'>
      <Link to={"/"} className='fixed top-3 left-5 text-blue-700 font-bold font-momo-poppins text-2xl'>Xenon Media v2</Link>

      <div className='w-full max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl  rounded-2xl overflow-hidden xl:grid xl:grid-cols-2 lg:shadow-lg lg:border border-zinc-100 p-4'>

        {/* Image Section */}
        <div className='hidden xl:block'>
          <img
            src={signupPhoto}
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
                Log In
              </h1>
              <p className='text-sm sm:text-base mt-3'>
                Don't have an account?{' '}
                <Link to="/signup" className='font-semibold hover:underline'>
                  Create an Account
                </Link>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => logInHandler(e)} className='mt-8 sm:mt-10 grid gap-4 sm:gap-5 '>

              {/* Email */}
              <div>
                <label className='font-medium text-sm'>Email Address</label>
                <input
                  name='email'
                  className='w-full mt-1 border rounded-full px-4 py-3 outline-none focus:border-zinc-400 border-zinc-300'
                  placeholder='Email Address'
                />
              </div>

              {/* Password */}
              <div>
                <label className='font-medium text-sm'>Password</label>
                <div className='relative mt-1 border focus:border-zinc-400 border-zinc-300 rounded-full px-4 py-3 flex items-center'>
                  <input
                    name='password'
                    type={show ? 'password' : 'text'}
                    className='w-full outline-none'
                    placeholder='Password'
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

              {/* Terms */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2 text-sm'>
                  <input
                    type="checkbox" id='checkbox'
                    className='cursor-pointer w-4 h-4 accent-black'
                  />
                  <label htmlFor='checkbox' className='cursor-pointer'>
                    I agree to the{' '}
                    <span className='font-semibold hover:underline tracking-tighter'>
                      Terms & Conditions
                    </span>
                  </label>
                </div>

                <div>
                  <Link to={"/forgot-password"} className='font-semibold hover:underline tracking-tighter text-sm'>Forgot Password</Link>
                </div>
              </div>


              {/* Submit */}
              <button className='mt-2 bg-black text-white py-3 sm:py-4 rounded-full hover:bg-zinc-700 transition cursor-pointer'>
                Log In
              </button>
            </form>

            {/* Divider */}
            <div className='flex items-center my-6'>
              <div className='flex-1 border-t'></div>
              <span className='px-4 text-sm text-zinc-400'>or</span>
              <div className='flex-1 border-t'></div>
            </div>

            {/* Google */}
            <SignInWithGoogle />

          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginUpdated
