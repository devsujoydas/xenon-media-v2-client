import { useEffect, useState, useCallback } from "react";
import UserCard from "./UserCard";
import { useUsers } from "../../hooks/userHooks/useUsers";



const AllUsersPage = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useUsers();
 

  return (
    <div className="min-h-screen md:mt-0 mt-10 bg-[#f1f5fa]">
      <div className="mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-xl md:text-3xl font-semibold text-[#14231F]">All Users</h1>
          <p className="text-[#5B6B65] mt-1">
            {data?.userCounts} {data?.userCounts === 1 ? "person" : "people"}{" "}
            on the platform
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

        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#E1E5E1] rounded-2xl p-5 h-52 animate-pulse"
              />
            ))}
          </div>
        )}


        {isLoading && data?.users.length === 0 && (
          <p className="text-center text-[#5B6B65] py-16">No users found</p>
        )}

        {!isLoading && data?.users.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {data?.users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersPage;
