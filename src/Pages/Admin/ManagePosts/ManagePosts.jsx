
import { useEffect, useRef, useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import PostTableCard from "./PostTableCard";
import Swal from "sweetalert2";
// import { useAuth } from "../../../hooks/useAuth";


const ManagePosts = () => {
  const { userData, postsData } = useAuth()
  const [displayPosts, setDisplayPosts] = useState(postsData);
  const wrapperRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ posts: [] });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ posts: [] });
      setError(null);
      return;
    }
    const handler = setTimeout(() => {
      fetchSearchResults(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);
  const fetchSearchResults = async (searchText) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search`, {
        params: { q: searchText, email: userData.email },
      });
      setResults(data);
      setDisplayPosts(data.posts);
    } catch {
      setError("Failed to fetch results");
      setResults({ posts: [] });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);




  return (
    <div>
      <div className="bg-white shadow p-4 md:p-6 rounded-xl mb-5 flex justify-between items-center">
        <div>
          <h2 className="md:text-2xl font-bold ">Manage Posts</h2>
          <p className="md:text-sm text-xs mt-1 text-zinc-500">View and manage all Posts</p>
        </div>
        <h1 className="md:text-[16px] text-xs">Total Posts: <span className="text-blue-600 font-bold"> {postsData.length}</span></h1>
      </div>


      <div className="bg-white shadow p-6 rounded-xl mb-5 flex justify-between items-center">
        <div className="w-full">
          <div className="flex gap-5 relative w-full">
            <IoSearch className="absolute top-3 left-2 md:text-xl text-zinc-400 cursor-pointer" aria-hidden="true" />
            <input
              type="search"
              aria-label="Search post by caption, authorname"
              placeholder="Search post by caption, authorname "
              value={query} autoComplete="off"
              onChange={(e) => {
                setQuery(e.target.value)
                if (e.target.value == "") {
                  setDisplayPosts(postsData)
                }
              }}
              onFocus={() => setShowResults(true)}
              className="text-sm border outline-none p-3 border-zinc-300 rounded-lg placeholder:text-sm pl-8 w-full "
            />
            <button className="flex justify-center items-center gap-1 border rounded-lg  px-4 bg-blue-500 text-white  "><IoSearch className="" aria-hidden="true" />Search</button>
          </div>

          {query &&
            <div className="text-sm flex items-center gap-2 mt-2">
              <h1>Search results for: <span>{query}</span></h1>
              <button
                onClick={() => {
                  setDisplayPosts(postsData);
                  setQuery("")
                }}
                className="text-red-600 hover:font-semibold cursor-pointer active:scale-95 transition-all"> Clear</button>
            </div>
          }


        </div>
      </div>



      <div className="bg-white shadow p-2 md:p-4 rounded-2xl overflow-y-auto">
        <div className="">
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          )}

          {!loading && displayPosts.length > 0 && (
            <table className="w-full text-sm text-left rtl:text-right ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 md:py-3">Image</th>
                  <th scope="col" className="px-6 md:py-3">Content</th>
                  <th scope="col" className="px-6 md:py-3">likes</th>
                  <th scope="col" className="px-6 md:py-3">shares</th>
                  <th scope="col" className="px-6 md:py-3">comments</th>
                  <th scope="col" className="px-6 md:py-3">Author</th>
                  <th scope="col" className="px-6 md:py-3">Date</th>
                  <th scope="col" className="px-6 md:py-3">Delete Post</th>
                </tr>
              </thead>
              <tbody className="">
                {displayPosts.map((post,idx) => (
                  <PostTableCard key={idx} post={post} />
                ))}
              </tbody>
            </table>
          )}

          {!loading && displayPosts.length === 0 && (
            <div className="text-center text-gray-500 py-8">No users found.</div>
          )}
        </div>
      </div>


    </div >
  );
};

export default ManagePosts;