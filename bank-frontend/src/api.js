import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export const registerUser = (userData) =>
  API.post("/auth/register", userData);

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const getTransactions = () =>
  API.get("/transactions");
