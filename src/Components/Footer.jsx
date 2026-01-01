import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full bg-linear-to-br from-slate-900 via-emerald-950 to-slate-900 text-gray-300 py-16 font-sans border-t border-emerald-900/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* 1. Brand Section */}
          <div className="space-y-6 lg:col-span-1">
            <div className="flex items-center gap-2">
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
              <h2 className="font-bold text-3xl text-white tracking-tight">
                Eco<span className="text-emerald-400">Track</span>
              </h2>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">
              Empowering individuals to make sustainable choices. Track your
              impact, join challenges, and build a greener future together.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { Icon: FaFacebookF, label: "Facebook" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaXTwitter, label: "X (Twitter)" },
                { Icon: FaLinkedinIn, label: "LinkedIn" },
              ].map(({ Icon, label }, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={label}
                  className="p-2.5 bg-gray-800/50 hover:bg-emerald-500 hover:text-white rounded-full transition-all duration-300 border border-gray-700 hover:border-emerald-400 group"
                >
                  <Icon
                    size={16}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {["Home", "Challenges", "Tips", "Events", "About Us"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      to={
                        item === "About Us"
                          ? "/about"
                          : item === "Challenges"
                          ? "/challenges"
                          : item === "Tips"
                          ? "/tips"
                          : item === "Events"
                          ? "/events"
                          : "/"
                      }
                      className="hover:text-emerald-400 transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* 3. Support */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Support
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Help Center",
                "Community Guidelines",
                "Contact Support",
                "Feedback",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Contact Support" ? "/contact" : "#"}
                    className="hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Legal & Newsletter (Optional/Combined) */}
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-lg mb-6 relative inline-block">
              Legal
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-emerald-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm mb-8">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Accessibility Statement",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={
                      item === "Privacy Policy" || item === "Terms of Service"
                        ? "/privacy"
                        : "#"
                    }
                    className="hover:text-emerald-400 transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="text-xs text-gray-500">
              <p>Designed for a sustainable planet. 🌍</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2025 EcoTrack. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Made with 💚 by IMTIAZ AL KABIR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
