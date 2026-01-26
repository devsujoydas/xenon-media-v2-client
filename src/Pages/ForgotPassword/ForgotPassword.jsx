import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { sendPasswordResetEmail } from "firebase/auth";
// import auth from "../../Firebase/firebase.config";
import toast from 'react-hot-toast';


const ForgotPassword = () => {
  const navigate = useNavigate()


  const [loadingSpiner, setLoadingSpiner] = useState(true)


  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingSpiner(false)
    const email = e.target.email.value;

    const formData = { email }
    fetch(`${import.meta.env.VITE_BACKEND_URL}/forgotPass`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(async (data) => { 

        if (data.message == "User not found") {
          toast.error(data?.message)
          setLoadingSpiner(true)
        }
        else {
          try {
            await sendPasswordResetEmail(auth, email)
              .then(() => {
                toast.success('Password reset email sent. Check your inbox')
              })

          } catch (error) {
            toast.success(error.message)
          }

        }

      })

  }



  return (
    <div className="  bg-white h-screen overflow-hidden grid grid-cols-1 md:grid-cols-2">
    
      
      <div className="md:col-span-1 h-screen p-8   ">
        <div className="">
          <Link to={"/"} className="text-3xl font-semibold   text-blue-600">Xenon Media</Link>
        </div>

        <div className="h-full  flex justify-center items-center">

          <div className="md:space-y-10 space-y-8 lg:w-2/4 w-full">
            <div className="">
              <h1 className="md:text-5xl text-3xl md:mb-3 mb-2 font-semibold">Forgot Password</h1>
              <p className="text-sm">Please fill your email to access your password.</p>
            </div>
            <div className="flex  justify-center flex-col gap-5  items-center">
              <form onSubmit={submitHandler} className="w-full space-y-4">

                <div>
                  <label className="text-slate-800 text-sm font-medium mb-1 block">Email</label>
                  <input required name="email" type="text" className=" text-slate-800 bg-white border border-slate-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
                </div>



                <button type="submit"
                  className={`text-white font-medium ${loadingSpiner ? "bg-blue-700" : "bg-blue-500"} hover:bg-blue-500 w-full py-3 rounded-md cursor-pointer active:scale-95 transition-all flex justify-center items-center gap-5 `}>
                  <p className={`${loadingSpiner ? "hidden" : "block"} border-t-2 border-b-2 rounded-full w-6 h-6 animate-spin`} />
                  <p className={`${loadingSpiner ? "block" : "hidden"}`}>Reset Password</p>
                </button>

              </form>

              <p className="text-slate-800 text-sm text-center">Back to
                <Link to={"/login"} className="text-violet-600 font-semibold hover:underline ml-1">Login</Link>
              </p>

            </div>
          </div>

        </div>
      </div>

      <div className="md:col-span-1 hidden h-screen md:flex justify-center items-center">
        <img className="" src="https://img.freepik.com/premium-vector/forget-password-illustrations_887068-224.jpg?w=1380" alt="" />
        {/* <img className="rounded-2xl" src="https://demos.creative-tim.com/material-tailwind-dashboard-react/img/pattern.png" alt="" /> */}
      </div>

    </div>
  )
}

export default ForgotPassword