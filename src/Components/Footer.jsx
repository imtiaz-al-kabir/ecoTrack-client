import { Link } from "react-router";

const Footer = () => {
  return (
    <footer
      className="flex flex-col items-center justify-center w-full py-20
bg-linear-to-r from-emerald-700/90 via-teal-600/80 to-cyan-500/70
hover:from-emerald-600 hover:via-teal-500 hover:to-cyan-400
text-white transition-colors"
    >
      {/* 🌱 EcoTrack logo */}
      <div className="flex items-center">
        {" "}
        <svg
          className="size-12"
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
      {/* 🧾 Copyright */}
      <p className="mt-4 text-center">
        Copyright © {new Date().getFullYear()}{" "}
        <Link to="/" className="hover:text-white">
          Eco<span className="text-emerald-400">Track</span>
        </Link>
        . All rights reserved.
      </p>

      {/* 🌐 Social icons */}
      <div className="flex items-center gap-4 mt-6">
        {/* Facebook */}
        <a
          href="#"
          aria-label="Facebook"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Instagram */}
        <a
          href="#"
          aria-label="Instagram"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* LinkedIn */}
        <a
          href="#"
          aria-label="LinkedIn"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* Twitter */}
        <a
          href="#"
          aria-label="Twitter"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="#"
          aria-label="GitHub"
          className="hover:-translate-y-0.5 transition-all duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 18c-4.51 2-5-2-7-2"
              stroke="#fff"
              strokeOpacity=".5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
