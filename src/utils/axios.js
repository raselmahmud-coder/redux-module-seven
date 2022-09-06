import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://rm-lws-json-server.herokuapp.com/",
});

export default axiosInstance;
