import { CheckCircle, XCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const ourFeatures = [
  "DSA + Notes + Smart Revision",
  "Aptitude + CS Fundamentals",
  "Placement Focused Learning",
  "One Unified Dashboard",
  "Progress & Analytics",
  "Interview Preparation",
];

const otherFeatures = [
  "Only problem solving",
  "No structured notes",
  "No revision system",
  "No aptitude or CS prep",
  "No progress tracking",
  "Scattered resources",
];

const Comparison = () => {
  return (
    <section className="py-28 px-6 bg-[#0e1322]">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Why Students Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Our Platform
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Stop juggling between 5 different websites.  
            Everything you need for placements — in one powerful system.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-12">

          {/* Our Platform */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-500/10 to-cyan-400/10 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="text-cyan-400" size={32} />
              <h3 className="text-2xl font-bold">Our Platform</h3>
            </div>

            <div className="space-y-5">
              {ourFeatures.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle className="text-green-400" size={22} />
                  <span className="text-lg">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Other Platforms */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10"
          >
            <div className="flex items-center gap-3 mb-8">
              <XCircle className="text-red-400" size={32} />
              <h3 className="text-2xl font-bold">Other Platforms</h3>
            </div>

            <div className="space-y-5">
              {otherFeatures.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <XCircle className="text-red-400" size={22} />
                  <span className="text-lg text-gray-400">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Comparison;
