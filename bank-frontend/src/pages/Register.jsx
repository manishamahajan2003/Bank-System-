import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    aadhar: "",
    address: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-end p-10"
      style={{ backgroundImage: "url('/src/assets/bank-background-image.jpg')" }}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          Open New Bank Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="mobile"
                placeholder="Phone number"
                value={form.mobile}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Aadhar Card</label>
              <input
                type="text"
                name="aadhar"
                placeholder="Aadhar No."
                value={form.aadhar}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter full address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700"
          >
            Register
          </button>

          {message && (
            <p className="text-center mt-3 font-semibold text-green-700">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
