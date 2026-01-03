import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://eco-track-server-lyart.vercel.app",
  // baseURL: "http://localhost:3000",
});
const useAxiosInstance = () => {
  return axiosInstance;
};

export default useAxiosInstance;
