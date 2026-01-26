
import { useEffect,  useState } from "react";
import UserTableCard from "./UserTableCard";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
// import { useAuth } from "../../../hooks/useAuth";

const ManageUsers = () => {
  const { userData, friendsData } = useAuth()
  const [displayUsers, setDisplayUsers] = useState(friendsData);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!query.trim()) {
      setDisplayUsers(friendsData);
      return;
    }

    const handler = setTimeout(() => {
      fetchSearchResults(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  const fetchSearchResults = async (searchText) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search`, {
        params: { q: searchText, email: userData.email },
      });
      setDisplayUsers(data.users);
    } catch {
      toast.error("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async (email) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/make-admin/${email}`);
      toast.success("Admin made successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to make admin");
    }
  };

  const removeAdmin = async (email) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/remove-admin/${email}`);
      toast.success("Admin removed successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove admin");
    }
  };

  return (
    <div>
      <div className="bg-white shadow p-4 md:p-6 rounded-xl mb-5 flex justify-between items-center">
        <div>
          <h2 className="md:text-2xl font-bold">Manage Users</h2>
          <p className="md:text-sm text-xs mt-1 text-zinc-500">View and manage all users</p>
        </div>
        <h1 className="md:text-[16px] text-xs">Total Users: <span className="text-blue-600 font-bold ">{friendsData.length}</span></h1>
      </div>

      <div className="bg-white shadow p-3 md:p-6 rounded-xl mb-5">
        <div className="flex gap-5 relative">
          <IoSearch className="absolute top-3 left-2 md:text-xl text-zinc-400" />
          <input
            type="search"
            placeholder="Search by name, email, username"
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              if (!val.trim()) setDisplayUsers(friendsData);
            }}
            className="text-sm border outline-none p-3 border-zinc-300 rounded-lg placeholder:text-sm pl-8 w-full"
          />
          <button className="flex justify-center items-center gap-1 border rounded-lg  px-4 bg-blue-500 text-white  "><IoSearch className="" aria-hidden="true" />Search</button>
        </div>
        {query && (
          <div className="text-sm mt-2">
            Search results for: <span className="font-semibold">{query}</span>
            <button
              onClick={() => {
                setQuery("");
                setDisplayUsers(friendsData);
              }}
              className="ml-2 text-red-600 hover:underline"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="bg-white shadow overflow-y-auto  p-2 md:p-4 rounded-2xl">
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          </div>
        ) : displayUsers.length ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Action</th>
                <th scope="col" className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {displayUsers.map((friend) => (
                <UserTableCard
                  key={friend.email}
                  friend={friend}
                  makeAdmin={makeAdmin}
                  removeAdmin={removeAdmin}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center text-gray-500 py-8">No users found.</div>
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
