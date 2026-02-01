import { motion } from "framer-motion";

const PrepPageLayout = ({ title, subtitle, emoji }) => {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white px-10 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-extrabold tracking-wide flex items-center gap-3">
          <span>{emoji}</span> {title}
        </h1>
        <p className="text-gray-400 mt-2 text-lg">{subtitle}</p>
      </motion.div>

      {/* Content Area */}
      <div className="bg-[#0f1422] border border-white/10 rounded-2xl p-10 shadow-xl min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Notes system coming soon. Start building your knowledge base here 🚀
        </p>
      </div>
    </div>
  );
};

export default PrepPageLayout;
