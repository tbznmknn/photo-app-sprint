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
// axiosInstance.interceptors.request.use(
//   async (config) => {
//     try {
//       const cookieStore = await getToken();
//       const token = cookieStore.get("TOKEN")?.value || null;

//       if (token) {
//         config.headers["Authorization"] = `Bearer ${token}`;
//       }
//     } catch (error) {
//       console.error("Error adding token to request:", error);
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
