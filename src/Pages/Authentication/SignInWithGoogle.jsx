import googlePhoto from '/google.png'

const SignInWithGoogle = () => {
    return (
        <div>
            <button className='w-full border border-zinc-300 rounded-full py-3 sm:py-4 flex items-center justify-center gap-2 hover:bg-zinc-100 cursor-pointer'>
                <img src={googlePhoto} className='w-5' />
                Continue with Google
            </button>
        </div>
    )
}

export default SignInWithGoogle