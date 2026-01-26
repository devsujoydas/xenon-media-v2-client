import ProfileTopSection from "./ProfileTopSection";
import ProfileIntroSection from "./ProfileIntroSection";
import ProfilePostSection from "./ProfilePostSection";
import PhotoSection from "./PhotoSection";
import ProfileFriendSection from "./ProfileFriendSection"; 
import PostFromAndPost from "../Profile/PostFromAndPost";

const ProiflePage = () => {
    
    return (
        <div className='p-2 md:pt-2 pt-18 min-h-screen bg-[#F2F4F7] '>
            {/* Profile Info */}
            <ProfileTopSection />

            {/* Post info */}
            <div className='md:mt-5 mt-2 lg:mx-20 md:mx-10 flex lg:flex-row flex-col gap-5'>
                <div className="lg:w-2/5">
                <div className="grid gap-5">

                    <ProfileIntroSection />
                    <PhotoSection />
                    <ProfileFriendSection />
                </div>
                </div>

                <div className="lg:w-3/5 space-y-5">
                    {/* <ProfilePostSection /> */}
                    <PostFromAndPost/>
                </div>
            </div>
        </div>
    )
}

export default ProiflePage