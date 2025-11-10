import { motion } from "motion/react";
import { FaChartLine, FaLightbulb, FaUsers } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaLightbulb className="text-3xl text-green-600" />,
      title: "Discover",
      desc: "Explore eco-friendly challenges, tips, and community projects.",
    },
    {
      icon: <FaUsers className="text-3xl text-green-600" />,
      title: "Join",
      desc: "Participate in sustainability challenges with like-minded people.",
    },
    {
      icon: <FaChartLine className="text-3xl text-green-600" />,
      title: "Track Progress",
      desc: "Monitor your impact and see how your actions help the planet.",
    },
  ];

  return (
    <section className="py-16 bg-linear-to-b from-white to-green-50 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-transform duration-300"
          >
            <div className="flex justify-center mb-4">{step.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
