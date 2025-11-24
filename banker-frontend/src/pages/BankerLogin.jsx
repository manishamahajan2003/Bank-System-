import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bankerLogin } from "../api";

export default function BankerLogin() {
  const [form, setForm] = useState({ employeeId: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await bankerLogin(form);

      localStorage.setItem("bankerToken", res.data.token);
      localStorage.setItem("bankerName", res.data.name);

      navigate("/accounts");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-end p-10"
      style={{ backgroundImage: "url('/bank-background-image.jpg')" }}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Banker Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Employee ID */}
          <div>
            <label className="block text-gray-700 mb-1">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              placeholder="Enter your Employee ID"
              value={form.employeeId}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Error Message */}
          {message && (
            <p className="text-center mt-2 text-red-600 font-semibold">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
