import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/blancaley/api", // Backend Spring Boot
});

export default api;