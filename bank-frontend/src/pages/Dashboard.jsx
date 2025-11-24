import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  // Fetch customer data from backend
  const fetchCustomer = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/customers/me", {
        withCredentials: true, 
      });
      setCustomer(res.data);
    } catch (error) {
      console.error(error);
      navigate("/login"); 
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);


  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  if (!customer) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        Loading your account...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Welcome, {customer.fullName}
        </h1>

        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold">Account Number:</span> {customer.accountNumber}
          </p>
          <p>
            <span className="font-semibold">Phone Number:</span> {customer.phone}
          </p>
          <p>
            <span className="font-semibold">Aadhar:</span> {customer.aadhar}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {customer.address}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {customer.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
