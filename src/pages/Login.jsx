import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";

const Login = () => {
  const token = localStorage.getItem("token");

  // ✅ BLOCK LOGIN PAGE IF ALREADY LOGGED IN
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      toast.success("Login successful 🎉");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed 😟");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex">

      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-400/10 blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h1 className="text-5xl font-extrabold leading-tight text-white mb-6">
            Welcome Back to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Your Placement Platform
            </span>
          </h1>

          <p className="text-gray-400 text-lg max-w-lg">
            Continue your journey towards cracking top IT placements with
            structured preparation, smart notes, and progress tracking.
          </p>
        </motion.div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl w-full max-w-md p-10"
        >
          <h2 className="text-4xl font-extrabold text-center mb-2 text-white">
            Login
          </h2>
          <p className="text-center text-gray-400 mb-10">
            Access your dashboard and continue learning
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                name="email"
                onChange={handleChange}
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition"
            >
              Login <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-gray-400 mt-8">
            Don’t have an account?{" "}
            <Link to="/register" className="text-cyan-400 font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
