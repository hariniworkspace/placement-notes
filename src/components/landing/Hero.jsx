import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hero from "../../assets/hero.png"

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Crack IT Placements with  
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              {" "}One Powerful Platform
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            DSA • Aptitude • CS Fundamentals • Notes • Revision • Interview Prep  
            Everything you need in one dashboard.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold hover:scale-105 transition"
            >
              Get Started Free
            </button>

            <button className="px-6 py-3 rounded-xl border border-gray-700 hover:bg-white/5 transition flex items-center gap-2">
              View Demo <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* RIGHT */}
        {/* RIGHT */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8 }}
  className="relative flex justify-center"
>
  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 w-full max-w-2xl">
    <img
      src={hero}
      alt="dashboard"
      className="rounded-2xl w-full h-[420px] object-cover"
    />
  </div>
</motion.div>


      </div>
    </section>
  );
};

export default Hero;
