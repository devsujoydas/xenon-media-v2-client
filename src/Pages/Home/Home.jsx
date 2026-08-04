import Posts from "../../Components/Posts/Posts";
import SearchBar from "../../Components/SearchBar/SearchBar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Storybox from "../../Components/Storybox/Storybox";
import SideNavbar from "../../Components/SideNavbar/SideNavbar";
import { usePosts } from "../../hooks/postHooks/usePosts";
import PageHelmet from "../../Components/PageHelmet/PageHelmet";
import { useState } from "react";
import UploadPostModal from "../../Components/Modals/UploadPostModal";

const Home = () => {
  const { data: posts, isLoading, isFetching } = usePosts();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-9 bg-[#f1f5fa] relative min-h-screen">
      <PageHelmet
        title="Home | Xenly"
        description="Discover posts, connect with people, and stay updated with the Xenly community."
      />

      <UploadPostModal isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="lg:col-span-6 flex flex-col h-screen">
        <div className="md:sticky top-0 z-">
          <SearchBar  setIsOpen={setIsOpen}/>
        </div>

        {/* Left scrollable area */}
        <div className="flex-1 overflow-y-auto scroll-smooth py-3 px-3 md:space-y-3 space-y-1">
          <Storybox />
          <Posts posts={posts} isLoading={isLoading} isFetching={isFetching} />
        </div>
      </div>

      {/* Right side: Fixed width with own scroll */}
      <div className="lg:col-span-3 bg-white border-l border-zinc-300 flex flex-col h-fit md:h-screen  sticky top-0">
        <SideNavbar />

        {/* Sidebar scrollable area */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Home;
