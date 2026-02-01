const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-gray-200 px-10 py-8 animate-pulse">
      <div className="h-10 w-1/3 bg-white/10 rounded-lg mb-8"></div>

      <div className="grid grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-40 bg-white/5 border border-white/10 rounded-xl"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PageSkeleton;
