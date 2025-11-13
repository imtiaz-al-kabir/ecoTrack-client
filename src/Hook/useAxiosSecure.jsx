import axios from "axios";
import { use, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";

const axiosSecure = axios.create({
  baseURL: "https://eco-track-server-lyart.vercel.app",
});

const useAxiosSecure = () => {
  const { user } = use(AuthContext);
  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.authorization = `Bearer ${user?.accessToken}`;
      return config;
    });
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
