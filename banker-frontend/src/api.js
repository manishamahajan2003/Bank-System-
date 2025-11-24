import axios from "axios";

const API = axios.create({
  baseURL: "https://bank-system-pq3p.onrender.com/api",
  withCredentials: true
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("bankerToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const bankerLogin = (data) => API.post("/banker/login", data);

export const getAllCustomers = () => API.get("/banker/customers");

export const getAllAccounts = () => API.get("/banker/accounts");

export const getCustomerTransactions = (customerId) =>
  API.get(`/banker/customer/${customerId}/transactions`);
