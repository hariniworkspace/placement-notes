import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const data = await registerUser(formData);
      localStorage.setItem("token", data.token);
      toast.success("Account created successfully 🎉");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed 😟");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex flex-col lg:flex-row">

      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex w-1/2 items-center justify-center px-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 to-purple-500/10 blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-xl"
        >
          <h1 className="text-5xl font-extrabold leading-tight text-white mb-6">
            Start Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Placement Journey
            </span>
          </h1>

          <p className="text-gray-400 text-lg">
            Join thousands of students preparing for top IT companies with a
            structured learning system.
          </p>
        </motion.div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 lg:px-12">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl w-full max-w-md p-10"
        >
          <h2 className="text-4xl font-extrabold text-center mb-2 text-white">
            Create Account
          </h2>

          <p className="text-center text-gray-400 mb-10">
            Get started with your placement preparation
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name */}
            <div className="relative">
              <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                name="name"
                onChange={handleChange}
                placeholder="Full name"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                name="email"
                onChange={handleChange}
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
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
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-400 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-lg bg-gradient-to-r from-pink-600 to-purple-600 hover:scale-105 transition"
            >
              Create Account <ArrowRight size={20} />
            </button>
          </form>

          <p className="text-center text-gray-400 mt-8">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-400 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
