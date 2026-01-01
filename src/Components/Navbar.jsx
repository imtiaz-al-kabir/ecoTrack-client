import { use, useEffect, useState } from "react";
import {
  FiLayout,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Challenges", path: "/challenges" },
    { name: "Events", path: "/events" },
    { name: "Tips", path: "/tips" },
  ];

  const handleLogout = () => {
    logoutUser()
      .then(() => console.log("logout successfully"))
      .catch((err) => console.log(err.message));
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-base-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative z-50">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <svg
              className="w-10 h-10 group-hover:scale-105 transition-transform"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              fill="none"
            >
              <mask
                id="nav_mask0"
                maskUnits="userSpaceOnUse"
                x="35"
                y="0"
                width="130"
                height="200"
              >
                <path d="M164.283 0H35.5469V200H164.283V0Z" fill="white" />
              </mask>
              <g mask="url(#nav_mask0)">
                <path
                  d="M99.9142 199.999C100.399 199.999 100.884 199.993 101.366 199.982C136.17 199.137 164.251 167.995 164.282 129.821C164.282 129.632 164.282 129.442 164.281 129.253C164.264 126.057 164.083 122.819 163.743 119.54C159.982 142.123 140.769 160.505 115.897 166.066C110.787 167.208 105.432 167.815 99.9147 167.815C94.4666 167.815 89.1767 167.223 84.1245 166.108C59.1583 160.599 39.8547 142.181 36.0841 119.54C35.7439 122.833 35.564 126.086 35.548 129.295C35.5474 129.471 35.547 129.647 35.5469 129.823C35.5768 167.993 63.6579 199.137 98.4625 199.982C98.945 199.993 99.4291 199.999 99.9142 199.999Z"
                  fill="url(#nav_paint0)"
                />
                <path
                  d="M101.723 2.08267L99.9143 0L98.2124 2.08267C86.96 14.9497 77.2805 27.7094 68.8545 40.2299C82.6274 55.862 95.3632 76.628 100.009 85.057C116.214 110.851 116.359 133.151 116.149 152.992C116.125 155.219 116.101 157.43 116.101 159.63C116.101 161.82 116.032 163.97 115.897 166.066C140.769 160.506 159.982 142.123 163.743 119.54C160.053 84.0032 137.95 43.6864 101.723 2.08267Z"
                  fill="url(#nav_paint1)"
                />
                <path
                  d="M84.1255 166.109C83.9894 164.001 83.9186 161.838 83.9186 159.635C83.9186 157.436 83.8951 155.226 83.8717 152.999C83.6615 133.159 83.8066 110.845 100.011 85.0574C95.3641 76.6284 82.6282 55.8624 68.8553 40.2302C50.0472 68.1776 38.6191 95.0017 36.085 119.541C39.8556 142.182 59.1592 160.6 84.1255 166.109Z"
                  fill="url(#nav_paint2)"
                />
              </g>
              <defs>
                <linearGradient
                  id="nav_paint0"
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
                  id="nav_paint1"
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
                  id="nav_paint2"
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
            <span className="font-bold text-2xl tracking-tight">
              Eco<span className="text-primary">Track</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-lg font-semibold tracking-wide transition-all duration-300 hover:text-primary relative py-2 
                  ${isActive
                    ? "text-primary after:w-full"
                    : "text-base-content/70 after:w-0"
                  }
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm text-base-content/70 hover:text-primary transition-colors"
            >
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border border-base-200 hover:border-primary transition-colors"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User"
                      src={user.photoURL || "https://i.pravatar.cc/150?img=2"}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100/90 backdrop-blur-md rounded-box w-56 border border-base-200/50"
                >
                  <li className="menu-title px-4 py-2 border-b border-base-200 mb-2">
                    <span className="text-primary font-bold">
                      {user.displayName}
                    </span>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <FiUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard"
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <FiLayout /> Dashboard
                    </Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error hover:bg-error/10 hover:text-error"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="btn btn-outline btn-primary text-md btn-ghost  font-semibold "
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary  text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm"
            >
              {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="btn btn-ghost btn-circle"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-base-100/95 backdrop-blur-xl transition-transform duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {navLinks.map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `text-2xl font-bold transition-colors ${isActive
                ? "text-primary"
                : "text-base-content/60 hover:text-base-content"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}

        {user ? (
          <div className="flex flex-col items-center gap-6 mt-4 w-full px-8">
            <div className="flex items-center gap-3 p-4 bg-base-200/50 rounded-2xl w-full">
              <img
                src={user.photoURL}
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div className="flex flex-col text-left">
                <span className="font-bold">{user.displayName}</span>
                <span className="text-xs opacity-60">User</span>
              </div>
            </div>
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-outline btn-block"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="btn btn-error btn-outline btn-block"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col w-full px-8 gap-4 mt-8">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-outline btn-block"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsMenuOpen(false)}
              className="btn btn-primary btn-block text-white"
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
