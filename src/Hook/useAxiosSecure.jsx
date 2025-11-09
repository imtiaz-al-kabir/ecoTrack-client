import axios from "axios";
import { use } from "react";
import { AuthContext } from "../Context/AuthContext";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = use(AuthContext);
  axiosSecure.interceptors.request.use((config) => {
    // Do something before request is sent

    config.headers.authorization = `Bearer ${user?.accessToken}`;
    return config;
  });
  return axiosSecure;
};

export default useAxiosSecure;
