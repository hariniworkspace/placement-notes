const GlobalLoader = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0b0f1a]/80 backdrop-blur-md flex flex-col">
      
      {/* neon top line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 animate-pulse" />

      {/* blur overlay */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-64 h-2 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full w-1/2 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 animate-loading" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
