import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://eco-track-server-lyart.vercel.app",
});
const useAxiosInstance = () => {
  return axiosInstance;
};

export default useAxiosInstance;
