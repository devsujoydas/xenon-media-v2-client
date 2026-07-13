
import { Link, NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <div className="min-h-screen   bg-gray-50">
          
            <div className=" bg-white shadow-md flex md:flex-row flex-col items-baseline justify-between gap-2 p-3 md:p-6 sticky top-0 z-50">
                <Link to={"/"} className="md:text-3xl text-xl font-semibold   text-blue-600">Xenly Admin Panel</Link>
                <ul className=" flex items-baseline md:gap-2 md:flex-row flex-wrap md:text-[16px] text-xs">
                    {[
                        { to: "/admin/dashboard", label: "Dashboard" },
                        { to: "/admin/users", label: "Manage Users" },
                        { to: "/admin/posts", label: "Manage Posts" },
                    ].map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `block md:px-3 px-2 md:py-2 py-1 rounded transition font-medium ${isActive ? " text-blue-700" : "text-gray-700"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            {/* Main Content */}
            <main className="max-w-screen-2xl mx-auto  p-3 md:p-6 overflow-y-auto">
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;