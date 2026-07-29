import { useState, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthProvider/AuthProviderNew"; 

const NavSearch = () => {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ posts: [], users: [] });
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults({ posts: [], users: [] });
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
        params: { q: searchText, limit: 5, email: userData.email },
      });
      setResults(data);
    } catch {
      setError("Failed to fetch results");
      setResults({ posts: [], users: [] });
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

  const handleSelectPost = (post) => {
    setShowResults(false);
    setQuery(post.postContent.length > 50 ? post.postContent.slice(0, 50) + "..." : post.postContent);
    navigate(`/post/${post._id}`);
  };

  const handleSelectUser = (user) => {
    setShowResults(false);
    setQuery(user.name);
    navigate(`/profile/${user.username}`);
  };

  return (
    <div
      ref={wrapperRef}
      className="relative"
    >
      {/* Search Input */}
      <div className="w-full flex items-center gap-2 relative">
        <input
          type="search"
          aria-label="Search friends, groups, pages"
          className="lg:text-sm text-xs border placeholder:text-zinc-600 border-zinc-300 py-2 md:py-3 pl-4 pr-10 w-full rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search for friends, groups, pages"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowResults(true)}
          autoComplete="off"
        />
        <IoSearch className="absolute right-3 md:text-2xl text-zinc-600 cursor-pointer" aria-hidden="true" />

        {/* Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 bg-white border border-zinc-300 rounded-md mt-1 max-h-72 overflow-y-auto shadow-lg z-50 text-xs">
            {loading && <p className="p-3 text-center text-gray-500">Loading...</p>}

            {error && <p className="p-3 text-center text-red-500">{error}</p>}

            {!loading && !error && results.posts.length === 0 && results.users.length === 0 && (
              <p className="p-3 text-center text-gray-500">No results found</p>
            )}

            {/* Posts Section */}
            {results.posts.length > 0 && (
              <div className="border-b border-zinc-200">
                <h3 className="px-3 py-2 font-semibold text-gray-700 bg-gray-50 sticky top-0">Posts</h3>
                <ul>
                  {results.posts.map((post) => (
                    <li
                      key={post._id}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 truncate"
                      title={post.postContent}
                      onClick={() => handleSelectPost(post)}
                    >
                      {post.postContent.length > 50 ? post.postContent.slice(0, 50) + "..." : post.postContent}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Users Section */}
            {results.users.length > 0 && (
              <div>
                <h3 className="px-3 py-2 font-semibold text-gray-700 bg-gray-50 sticky top-0">Users</h3>
                <ul>
                  {results.users.map((user) => (
                    <li
                      key={user._id}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 truncate"
                      title={user.name}
                      onClick={() => handleSelectUser(user)}
                    >
                      {user.name}
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
