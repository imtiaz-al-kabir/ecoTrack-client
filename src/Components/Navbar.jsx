import { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user } = use(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Challenges", path: "/challenges" },
    ...(user
      ? [
          { name: "Tips", path: "/tips" },

          { name: "Events", path: "/events" },
          { name: "My Activities", path: "/my-activities" },
        ]
      : []),
  ];

  return (
    <nav
      className=" bg-white w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-100 z-50 py-6 shadow
     "
    >
      {/* Logo */}
      <Link to="/" className="font-bold text-2xl">
        Eco<span className="text-emerald-400">Track</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            className={({ isActive }) =>
              `text-lg font-medium hover:border-b-2 border-emerald-400 transition-all duration-500 ${
                isActive ? " text-emerald-400" : "  "
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      {/* Desktop Right */}
      <div>
        {user ? (
          <div className="dropdown hidden md:block ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box left-1/2 -translate-x-1/2 z-1 mt-2 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between">Profile</Link>
              </li>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-x-5 hidden md:block">
            <Link
              to="/login"
              className="btn btn-outline btn-accent  px-8 py-2.5  transition-all duration-500"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-linear-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white px-8 py-2.5 transition-all btn duration-500"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-6 w-6 cursor-pointer`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <NavLink
            className={({ isActive }) =>
              `text-xl font-medium hover:border-b-2 border-emerald-400 transition-all duration-500 ${
                isActive ? "border-b-2 border-emerald-400" : "  "
              }`
            }
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
          >
            {link.name}
          </NavLink>
        ))}

        {user ? (
          <div className="dropdown ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box left-1/2 -translate-x-1/2 z-1 mt-2   w-52 p-2 shadow"
            >
              <li>
                <Link className="">Profile</Link>
              </li>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        ) : (
          <div className="space-x-5 ">
            <Link
              to="/login"
              className="btn btn-outline btn-accent  px-8 py-2.5  transition-all duration-500"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-linear-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white px-8 py-2.5 transition-all btn duration-500"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
