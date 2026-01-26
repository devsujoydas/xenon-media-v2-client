import Posts from "../../Components/Posts/Posts"
import SearchBar from "../../Components/SearchBar/SearchBar"
import Sidebar from "../../Components/Sidebar/Sidebar"
import Storybox from "../../Components/Storybox/Storybox"
import SideNavbar from "../../Components/SideNavbar/SideNavbar"


const Home = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-9 bg-[#f1f5fa] relative min-h-screen">

      {/* Left side: Scrollable content */}
      <div className="lg:col-span-6 flex flex-col h-screen">
        <div className="md:sticky top-0 z-10">
          <SearchBar />
        </div>

        {/* Left scrollable area */}
        <div className="flex-1 overflow-y-auto scroll-smooth md:py-5 py-3 lg:px-5 px-3 md:space-y-5 space-y-2">
          <Storybox />
          <Posts />
        </div>
      </div>

      {/* Right side: Fixed width with own scroll */}
      <div className="lg:col-span-3 bg-white border-l border-zinc-300 flex flex-col h-screen sticky top-0">

        <SideNavbar />

        {/* Sidebar scrollable area */}
        <div className="flex-1 overflow-y-auto px-2 py-3">
          <Sidebar />
        </div>
      </div>

    </div>
  );
};


export default Home