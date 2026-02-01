import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Start Your Placement Journey Today 🚀
      </h2>
      <p className="text-gray-400 mb-10">
        Build discipline. Build consistency. Build success.
      </p>

      <button
        onClick={() => navigate("/register")}
        className="px-10 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold text-lg hover:scale-105 transition"
      >
        Start Free Now
      </button>
    </section>
  );
};

export default CTA;
