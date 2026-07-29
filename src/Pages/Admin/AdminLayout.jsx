import { Link, NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Users, FileText } from "lucide-react";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/users", label: "Manage Users", icon: Users },
  { to: "/admin/posts", label: "Manage Posts", icon: FileText },
];

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight shrink-0"
          >
            Xenly <span className="text-gray-800 font-semibold">Admin</span>
          </Link>

          <nav>
            <ul className="flex items-center gap-1 md:gap-2 overflow-x-auto no-scrollbar">
              {navItems.map(({ to, label, icon: Icon }) => (
                <li key={to} className="shrink-0">
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                      }`
                    }
                  >
                    <Icon className="w-4 h-4" strokeWidth={2.2} />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;