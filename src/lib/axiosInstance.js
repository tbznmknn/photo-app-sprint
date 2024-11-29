import axios from "axios";
// import getToken from "./getToken";
const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`,
  //   timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  credentials: "include",
});

export default axiosInstance;
