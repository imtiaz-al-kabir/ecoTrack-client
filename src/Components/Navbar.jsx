import { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Challenges", path: "/challenges" },
    ...(user
      ? [
          { name: "Add New Challenge", path: "/challenges/add" },
          { name: "Tips", path: "/tips" },
          { name: "User Challenges", path: "/user-challenge" },
          { name: "Events", path: "/events" },
          { name: "My Activities", path: "/my-activities" },
        ]
      : []),
  ];

  const handleLogout = () => {
    logoutUser()
      .then(() => console.log("logout successfully"))
      .catch((err) => console.log(err.message));
  };

  return (
    <nav
      className=" bg-white w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-100 z-50 py-6 shadow
     "
    >
      {/* Logo */}

      <div className="flex items-center">
        <svg
          className="size-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          fill="none"
        >
          <mask
            id="mask0"
            maskUnits="userSpaceOnUse"
            x="35"
            y="0"
            width="130"
            height="200"
          >
            <path d="M164.283 0H35.5469V200H164.283V0Z" fill="white" />
          </mask>
          <g mask="url(#mask0)">
            <path
              d="M99.9142 199.999C100.399 199.999 100.884 199.993 101.366 199.982C136.17 199.137 164.251 167.995 164.282 129.821C164.282 129.632 164.282 129.442 164.281 129.253C164.264 126.057 164.083 122.819 163.743 119.54C159.982 142.123 140.769 160.505 115.897 166.066C110.787 167.208 105.432 167.815 99.9147 167.815C94.4666 167.815 89.1767 167.223 84.1245 166.108C59.1583 160.599 39.8547 142.181 36.0841 119.54C35.7439 122.833 35.564 126.086 35.548 129.295C35.5474 129.471 35.547 129.647 35.5469 129.823C35.5768 167.993 63.6579 199.137 98.4625 199.982C98.945 199.993 99.4291 199.999 99.9142 199.999Z"
              fill="url(#paint0)"
            />
            <path
              d="M101.723 2.08267L99.9143 0L98.2124 2.08267C86.96 14.9497 77.2805 27.7094 68.8545 40.2299C82.6274 55.862 95.3632 76.628 100.009 85.057C116.214 110.851 116.359 133.151 116.149 152.992C116.125 155.219 116.101 157.43 116.101 159.63C116.101 161.82 116.032 163.97 115.897 166.066C140.769 160.506 159.982 142.123 163.743 119.54C160.053 84.0032 137.95 43.6864 101.723 2.08267Z"
              fill="url(#paint1)"
            />
            <path
              d="M84.1255 166.109C83.9894 164.001 83.9186 161.838 83.9186 159.635C83.9186 157.436 83.8951 155.226 83.8717 152.999C83.6615 133.159 83.8066 110.845 100.011 85.0574C95.3641 76.6284 82.6282 55.8624 68.8553 40.2302C50.0472 68.1776 38.6191 95.0017 36.085 119.541C39.8556 142.182 59.1592 160.6 84.1255 166.109Z"
              fill="url(#paint2)"
            />
          </g>
          <defs>
            <linearGradient
              id="paint0"
              x1="35.5469"
              y1="119.54"
              x2="164.282"
              y2="119.54"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#54CB76" />
              <stop offset="1" stopColor="#8CE2A6" />
            </linearGradient>
            <linearGradient
              id="paint1"
              x1="116.298"
              y1="0"
              x2="116.298"
              y2="166.066"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7DD474" />
              <stop offset="1" stopColor="#59C04F" />
            </linearGradient>
            <linearGradient
              id="paint2"
              x1="68.0478"
              y1="40.2302"
              x2="68.0478"
              y2="166.109"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#90E342" />
              <stop offset="1" stopColor="#AEEC66" />
            </linearGradient>
          </defs>
        </svg>
        <Link to="/" className="font-bold text-2xl">
          Eco<span className="text-emerald-400">Track</span>
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8">
        {navLinks.map((link, i) => (
          <NavLink
            key={i}
            to={link.path}
            end={link.path === "/challenges"}
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
                <img alt="user image" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box left-1/2 -translate-x-1/2 z-1 mt-2 w-52 p-2 shadow"
            >
              <li className="text-center font-semibold">{user.displayName}</li>
              <li>
                <Link>Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-xs text-white bg-linear-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 transition-all duration-300 "
                >
                  Logout
                </button>
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
                <img alt="user image" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box left-1/2 -translate-x-1/2 z-1 mt-2   w-52 p-2 shadow"
            >
              <li className="text-center font-semibold">{user.displayName}</li>
              <li>
                <Link>Profile</Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="btn btn-xs text-white bg-linear-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 transition-all duration-300 "
                >
                  Logout
                </button>
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
