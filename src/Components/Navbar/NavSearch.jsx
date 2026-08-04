import { useState, useRef, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { useUsers } from "../../hooks/userHooks/useUsers";
import { usePosts } from "../../hooks/postHooks/usePosts";

const NavSearch = () => {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Debounce so we don't hit the API on every keystroke
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
  } = usePosts({ search: debouncedQuery, limit: 5, enabled: searchEnabled });

  const loading = searchEnabled && (usersLoading || postsLoading);
  const error =
    searchEnabled && (usersError || postsError)
      ? "Failed to fetch results"
      : null;

  const users = usersData?.users || [];
  const posts = postsData || [];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
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
    <div ref={wrapperRef} className="relative">
      {/* Search Input */}
      <div className="w-full flex items-center gap-2 relative">
        <input
          type="search"
          aria-label="Search users, posts"
          className="lg:text-sm text-xs border placeholder:text-zinc-600 border-zinc-300 py-2 md:py-3 pl-4 pr-10 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for users, posts"
          value={query}
          onChange={handleChange}
          onFocus={() => query.trim() && setShowResults(true)}
          autoComplete="off"
        />
        <IoSearch
          className="absolute right-3 md:text-2xl text-zinc-600 cursor-pointer"
          aria-hidden="true"
        />

        {/* Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 bg-white border border-zinc-300 rounded-md mt-1 max-h-72 overflow-y-auto shadow-lg z-50 text-xs">
            {loading && (
              <p className="p-3 text-center text-gray-500">Loading...</p>
            )}

            {error && <p className="p-3 text-center text-red-500">{error}</p>}

            {!loading && !error && posts.length === 0 && users.length === 0 && (
              <p className="p-3 text-center text-gray-500">No results found</p>
            )}

            {/* Users Section */}
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

            {/* Posts Section */}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default NavSearch;
