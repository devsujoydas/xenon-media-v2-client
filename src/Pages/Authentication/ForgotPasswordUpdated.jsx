 
import forgotPassImg from '../../../public/forgotpassword.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react' 

const ForgotPasswordUpdated = () => {
  const navigate = useNavigate()

  return (
    <div className='font-family-poppins min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-0'>
      <div className='w-full max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl  rounded-2xl overflow-hidden xl:grid xl:grid-cols-2 lg:shadow-lg lg:border border-zinc-100 p-4'>

        {/* Image Section */}
        <div className='hidden xl:block'>
          <img
            src={forgotPassImg}
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
                Forgot Password
              </h1>
              <p className='text-sm sm:text-base'>
                We'll send a verification link to your email address
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()} className='mt-8 sm:mt-10 grid gap-4 sm:gap-5 font-family-inter'>

              {/* Email */}
              <div>
                <label className='font-medium text-sm'>Email Address</label>
                <input
                  className='w-full mt-1 border rounded-full px-4 py-3 outline-none focus:border-zinc-400 border-zinc-300'
                  placeholder='Email Address'
                />
              </div>

              {/* Submit */}
              <button className='mt-2 bg-black text-white py-3 sm:py-4 rounded-full hover:bg-zinc-700 transition cursor-pointer'>
                Send Verification Link
              </button>
            </form>

            <div className='mt-5 flex gap-1 justify-center items-center'>
              Back to
              <Link to="/login" className='font-semibold text-sm hover:underline'>
                Log In
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordUpdated