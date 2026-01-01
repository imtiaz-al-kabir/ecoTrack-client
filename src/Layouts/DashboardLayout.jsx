import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import {
    FaBars,
    FaHome,
    FaPlus,
    FaSignOutAlt,
    FaTimes,
    FaTrophy,
    FaUser,
    FaList,
} from "react-icons/fa";
import { use } from "react";
import { AuthContext } from "../Context/AuthContext";

const DashboardLayout = () => {
    const { user, logoutUser } = use(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser()
            .then(() => {
                navigate("/");
            })
            .catch((err) => console.log(err));
    };

    const navLinks = [
        { name: "Overview", path: "/dashboard", icon: <FaHome /> },
        { name: "My Profile", path: "/dashboard/profile", icon: <FaUser /> },
        { name: "Add Challenge", path: "/dashboard/add-challenge", icon: <FaPlus /> },
        { name: "My Created Challenges", path: "/dashboard/my-challenges", icon: <FaList /> },
        { name: "My Joined Challenges", path: "/dashboard/my-activities", icon: <FaTrophy /> },
    ];

    return (
        <div className="min-h-screen bg-base-200 flex font-sans">
            {/* Sidebar for Desktop */}
            <aside className="w-64 bg-white shadow-xl hidden md:flex flex-col fixed inset-y-0 z-50">
                <div className="p-6 border-b border-gray-100 flex items-center justify-center">
                    <Link to="/" className="text-2xl font-bold tracking-tight">
                        Eco<span className="text-emerald-500">Track</span>
                    </Link>
                </div>

                {/* User Info */}
                <div className="p-6 flex flex-col items-center border-b border-gray-100">
                    <div className="avatar mb-3">
                        <div className="w-16 rounded-full ring ring-emerald-500 ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL} alt="User" />
                        </div>
                    </div>
                    <h3 className="font-bold text-gray-800">{user?.displayName}</h3>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                    ? "bg-emerald-50 text-emerald-600 shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-emerald-500"
                                }`
                            }
                        >
                            {link.icon}
                            {link.name}
                        </NavLink>
                    ))}
                    <div className="divider my-2"></div>
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-emerald-500 transition-all font-medium"
                    >
                        <FaHome /> Home
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 md:hidden ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-4 flex justify-between items-center border-b border-gray-100">
                    <Link to="/" className="text-xl font-bold">
                        Eco<span className="text-emerald-500">Track</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500">
                        <FaTimes size={24} />
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive
                                    ? "bg-emerald-50 text-emerald-600 shadow-sm"
                                    : "text-gray-600 hover:bg-gray-50"
                                }`
                            }
                        >
                            {link.icon}
                            {link.name}
                        </NavLink>
                    ))}
                    <div className="divider my-2"></div>
                    <Link
                        to="/"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all font-medium"
                    >
                        <FaHome /> Home
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium mt-4"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Topbar for Mobile */}
                <header className="bg-white shadow-sm p-4 flex items-center justify-between md:hidden sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-gray-600">
                        <FaBars size={24} />
                    </button>
                    <span className="font-bold text-gray-800">Dashboard</span>
                    <div className="avatar">
                        <div className="w-8 rounded-full">
                            <img src={user?.photoURL} alt="User" />
                        </div>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6 lg:p-10 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
