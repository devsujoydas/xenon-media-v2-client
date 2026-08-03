import { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { useUsers } from "../../hooks/userHooks/useUsers";
import { usePosts } from "../../hooks/postHooks/usePosts";
import UploadPostModal from "../Modals/UploadPostModal";

const SearchBar = () => {
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const searchEnabled = debouncedQuery.length > 0;

  const {
    data: usersData,
    isLoading: usersLoading,
    error: usersError,
  } = useUsers({ search: debouncedQuery, enabled: searchEnabled });

  const {
    data: postsData,
    isLoading: postsLoading,
    error: postsError,
  } = usePosts({ search: debouncedQuery, limit: 10, enabled: searchEnabled });

  const loading = searchEnabled && (usersLoading || postsLoading);
  const error =
    searchEnabled && (usersError || postsError)
      ? "Something went wrong while searching"
      : null;

  const users = usersData?.users || [];
  const posts = postsData || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(value.trim().length > 0);
  };

  const handleSelectPost = (post) => {
    setShowResults(false);
    setQuery("");
    navigate(`/post/${post._id}`);
  };

  const handleSelectUser = (user) => {
    setShowResults(false);
    setQuery("");
    navigate(`/profile/${user.username}`);
  };

  return (
    <div>
      <UploadPostModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        ref={wrapperRef}
        className="lg:mt-0 mt-16 bg-white lg:py-6 py-4 md:px-10 px-5 flex md:gap-5 gap-3 justify-between items-center border-b border-zinc-400 relative"
      >
        <div className="lg:w-8/12 md:w-10/12 w-9/12 flex items-center gap-2 relative">
          <input
            type="search"
            aria-label="Search for users, posts"
            className="lg:text-sm text-xs border placeholder:text-zinc-600 border-zinc-300 py-2 md:py-3 pl-4 pr-10 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for users, posts"
            autoComplete="off"
            value={query}
            onChange={handleChange}
            onFocus={() => query.trim() && setShowResults(true)}
          />
          <IoSearch
            className="absolute right-3 md:text-2xl text-zinc-600 cursor-pointer"
            aria-hidden="true"
          />

          {showResults && (
            <div className="absolute top-full left-0 right-0 bg-white border border-zinc-300 rounded-md mt-1 max-h-72 overflow-y-auto shadow-lg z-50 text-xs">
              {loading && (
                <p className="p-3 text-center text-gray-500">Loading...</p>
              )}

              {error && <p className="p-3 text-center text-red-500">{error}</p>}

              {!loading && !error && posts.length === 0 && users.length === 0 && (
                <p className="p-3 text-center text-gray-500">No results found</p>
              )}

              {posts.length > 0 && (
                <div className="border-b border-zinc-200">
                  <h3 className="px-3 py-2 font-semibold text-gray-700 bg-gray-50 sticky top-0">
                    Posts
                  </h3>
                  <ul>
                    {posts.map((post) => (
                      <li
                        key={post._id}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 truncate"
                        title={post.content}
                        onClick={() => handleSelectPost(post)}
                      >
                        {post.content?.length > 50
                          ? post.content.slice(0, 50) + "..."
                          : post.content}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {users.length > 0 && (
                <div>
                  <h3 className="px-3 py-2 font-semibold text-gray-700 bg-gray-50 sticky top-0">
                    Users
                  </h3>
                  <ul>
                    {users.map((user) => (
                      <li
                        key={user._id}
                        className="px-3 py-2 cursor-pointer hover:bg-gray-100 truncate"
                        title={user.name}
                        onClick={() => handleSelectUser(user)}
                      >
                        {user.name}
                        {user.username && (
                          <span className="text-zinc-400"> @{user.username}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="lg:w-fit md:w-4/12 w-6/12 flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center md:gap-2 gap-1 bg-blue-700 hover:bg-blue-600 text-white lg:text-sm text-xs px-4 md:px-6 py-2 lg:py-3 rounded-full cursor-pointer active:scale-95 transition-transform"
          >
            Create <IoMdAdd className="md:text-2xl text-sm" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;