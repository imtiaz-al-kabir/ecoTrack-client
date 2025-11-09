import { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Register = () => {
  const { createUser, googleLogin } = use(AuthContext);
  const handleRegisterForm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    console.log(name, email, photo, password);
    createUser(email, password)
      .then((result) => console.log(result))
      .catch((err) => console.log(err.message));
  };

  const handleGoogle = () => {
    googleLogin()
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        <div className=" bg-[#f5f5f5] min-h-screen flex justify-center items-center">
          <div className="bg-white p-5 md:p-10 rounded-xl">
            <form
              onSubmit={handleRegisterForm}
              className="md:w-96 w-80 flex flex-col items-center justify-center"
            >
              <h2 className="text-4xl text-gray-900 font-medium">
                Join Eco<span className="text-emerald-400">Track </span>{" "}
              </h2>

              <p className="text-gray-500/90 text-md font-medium my-5">
                Already have an account?{" "}
                <Link className="text-emerald-400 hover:underline" to="/login">
                  Sign in
                </Link>
              </p>

              <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mb-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.311 16.406a9.64 9.64 0 0 0-4.748-4.158 5.938 5.938 0 1 0-7.125 0 9.64 9.64 0 0 0-4.749 4.158.937.937 0 1 0 1.623.938c1.416-2.447 3.916-3.906 6.688-3.906 2.773 0 5.273 1.46 6.689 3.906a.938.938 0 0 0 1.622-.938M5.938 7.5a4.063 4.063 0 1 1 8.125 0 4.063 4.063 0 0 1-8.125 0"
                    fill="#475569"
                  />
                </svg>
                <input
                  name="name"
                  type="text"
                  className="h-full px-2 w-full outline-none bg-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg
                  width="16"
                  height="11"
                  viewBox="0 0 16 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  name="email"
                  type="email"
                  placeholder="Email id"
                  className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  required
                />
              </div>

              <div className="flex items-center w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2 mt-5">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 13.172 3H10.83a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 7.172 5H4zm0 2h16v10H4V7zm8 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"
                    fill="#475569"
                  />
                </svg>
                <input
                  name="photo"
                  type="url"
                  className="h-full px-2 w-full outline-none bg-transparent"
                  placeholder="Enter photo URL"
                  required
                />
              </div>

              <div className="flex items-center mt-6 w-full bg-transparent border border-gray-300/60 h-12 rounded-full overflow-hidden pl-6 gap-2">
                <svg
                  width="13"
                  height="17"
                  viewBox="0 0 13 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="bg-transparent text-gray-500/80 placeholder-gray-500/80 outline-none text-sm w-full h-full"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl mt-8 bg-linear-to-r   from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white px-8 py-2.5 transition-all btn duration-500"
              >
                Sign up
              </button>
            </form>

            <div className="flex items-center gap-4 w-full my-5">
              <div className="w-full h-px bg-gray-300/90"></div>
              <p className="w-full text-nowrap text-sm text-gray-500/90">
                or sign up with email
              </p>
              <div className="w-full h-px bg-gray-300/90"></div>
            </div>

            <button
              onClick={handleGoogle}
              type="button"
              className="w-full mt-8 bg-gray-500/10 flex items-center justify-center h-12 rounded-xl btn"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                alt="googleLogo"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
