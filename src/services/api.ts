import axios from "axios";

const axiosService = axios.create({
  baseURL: "http://localhost:4000/api",
});

export default axiosService;
