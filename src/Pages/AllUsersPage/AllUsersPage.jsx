import { useEffect, useState, useCallback } from "react";
import { fetchAllUsers } from "../../hooks/userHooks/useUser";
import UserCard from "./UserCard";
 

// Simple debounce so we don't hit the search API on every keystroke
const useDebouncedValue = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
};

const AllUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [userCounts, setUserCounts] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);

  const debouncedSearch = useDebouncedValue(search);

  const loadUsers = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const { users, userCounts } = await fetchAllUsers(query);
      setUsers(users);
      setUserCounts(userCounts);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers(debouncedSearch);
  }, [debouncedSearch, loadUsers]);

 

  return (
    <div className="min-h-screen bg-[#F6F7F5]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className=" text-3xl font-semibold text-[#14231F]">
            All Users
          </h1>
          <p className="text-[#5B6B65] mt-1">
            {userCounts} {userCounts === 1 ? "person" : "people"} on the platform
          </p>
        </header>

        <div className="relative mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, username or email..."
            className="w-full bg-white border border-[#E1E5E1] rounded-full px-5 py-3 text-sm text-[#14231F] placeholder:text-[#9AA6A0] focus:outline-none focus:ring-2 focus:ring-[#1F6F5C]/30 focus:border-[#1F6F5C]"
          />
        </div>

        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#E1E5E1] rounded-2xl p-5 h-52 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-[#C1502E] py-16">{error}</p>
        )}

        {!loading && !error && users.length === 0 && (
          <p className="text-center text-[#5B6B65] py-16">
            Kono user paoa jayni.
          </p>
        )}

        {!loading && !error && users.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {users.map((user) => (
              <UserCard
                key={user._id}
                user={user}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersPage;