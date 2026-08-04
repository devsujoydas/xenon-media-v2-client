import { useMemo, useState } from "react";
import UserCard from "./UserCard";
import { useUsers } from "../../hooks/userHooks/useUsers";
import PageHelmet from "../../Components/PageHelmet/PageHelmet";

const AllUsersPage = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useUsers();
  const users = data?.users || [];

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q),
    );
  }, [users, search]);

  return (
    <div className="min-h-screen md:pt-0 pt-16 bg-[#f1f5fa]">
      <PageHelmet
        title="People | Xenly"
        description="Discover and connect with people on Xenly."
      />
      <div className="mx-auto px-3 py-3">
        <header className="mb-8">
          <h1 className="text-xl md:text-3xl font-semibold text-[#14231F]">
            All Users
          </h1>
          <p className="text-[#5B6B65] mt-1">
            {data?.userCounts} {data?.userCounts === 1 ? "person" : "people"} on
            the platform
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

        {isLoading && filteredUsers.length === 0 && (
          <p className="text-center text-[#5B6B65] py-16">No users found</p>
        )}

        {!isLoading && data?.users.length > 0 && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
            {filteredUsers.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllUsersPage;
