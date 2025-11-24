import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, setAuthToken } from "../api";

export default function Login() {
  const [form, setForm] = useState({ mobile: "", password: "" });
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

    if (!/^\d{10}$/.test(form.mobile)) {
      setMessage("Mobile number must be 10 digits");
      setLoading(false);
      return;
    }

    try {
      const res = await loginUser(form);
      const { token } = res.data;

      // Save token and set in axios headers
      localStorage.setItem("token", token);
      setAuthToken(token);

      navigate("/transactions");
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-end p-10"
      style={{ backgroundImage: "url('/src/assets/bank-background-image.jpg')" }}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Customer Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 mb-1">Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter your 10-digit mobile number"
              value={form.mobile}
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
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Error Message */}
          {message && (
            <p className="text-center mt-2 text-red-600 font-semibold">{message}</p>
          )}

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

