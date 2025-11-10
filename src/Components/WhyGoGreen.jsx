import { FaLeaf, FaRecycle, FaHeartbeat } from "react-icons/fa";

const WhyGoGreen = () => {
  const items = [
    {
      icon: <FaLeaf className="text-3xl text-green-600" />,
      title: "Save Energy",
      desc: "Reduce your carbon footprint and contribute to a healthier planet.",
    },
    {
      icon: <FaRecycle className="text-3xl text-green-600" />,
      title: "Reduce Waste",
      desc: "Make mindful choices that minimize environmental impact.",
    },
    {
      icon: <FaHeartbeat className="text-3xl text-green-600" />,
      title: "Improve Health",
      desc: "Create a cleaner environment for you and future generations.",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Go Green?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyGoGreen;
