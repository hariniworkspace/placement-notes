import { Brain, BarChart, BookOpen, CalendarCheck, Briefcase, Cpu } from "lucide-react";

const features = [
  { icon: Brain, title: "Smart DSA Notes", desc: "Organize your problem-solving journey with structured notes." },
  { icon: BarChart, title: "Progress Tracking", desc: "Visual dashboards to track topic-wise mastery." },
  { icon: BookOpen, title: "CS Fundamentals", desc: "OS, DBMS, CN, OOPS — everything covered." },
  { icon: CalendarCheck, title: "Revision Planner", desc: "Never forget concepts with smart revision cycles." },
  { icon: Briefcase, title: "Interview Prep", desc: "Company-wise and role-based preparation." },
  { icon: Cpu, title: "AI Resume Analyzer", desc: "Get instant feedback on your resume (coming soon)." },
];

const Features = () => {
  return (
    <section className="py-24 px-6 bg-[#0e1322]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">
          Everything You Need To Crack Placements
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-105 transition"
            >
              <f.icon className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
