const steps = [
  { step: "01", title: "Create Account", desc: "Sign up and access your personal dashboard." },
  { step: "02", title: "Start Learning", desc: "Solve problems, take notes, track progress." },
  { step: "03", title: "Crack Placements", desc: "Revise smartly and ace interviews." },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-16">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-10">
          {steps.map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-10">
              <div className="text-cyan-400 text-4xl font-bold mb-4">{s.step}</div>
              <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
