import { Brain } from "lucide-react";

const CoderNavbar = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#0b0f1a]/80 backdrop-blur border-b border-white/10">
      <div className="flex items-center gap-4 px-8 py-5">

        {/* Logo Icon */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-pink-600 to-purple-600 text-white shadow-lg">
          <Brain size={22} />
        </div>

        {/* Brand Text */}
        <div className="flex flex-col leading-tight">
          <h1 className="text-xl font-bold tracking-wide text-white">
            Coder Notes
          </h1>
          <p className="text-sm text-gray-400">
            Recall-optimized notes for coding concepts
          </p>
        </div>

        {/* Right Spacer (future actions) */}
        <div className="ml-auto flex items-center gap-3">
          {/* future: search, profile, theme toggle */}
        </div>
      </div>
    </header>
  );
};

export default CoderNavbar;
