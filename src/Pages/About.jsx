import { motion } from "motion/react";

const About = () => {
    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Hero Section */}
            <div className="relative h-[400px] flex items-center justify-center bg-emerald-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1518531933037-91b2f5fe8fa5?q=80&w=2727&auto=format&fit=crop')] bg-cover bg-center"></div>
                <div className="relative z-10 text-center max-w-2xl px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold mb-6"
                    >
                        Our Mission
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl opacity-90"
                    >
                        We are dedicated to empowering individuals to make small changes that collectively create a massive positive impact on our planet.
                    </motion.p>
                </div>
            </div>

            {/* Our Story */}
            <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
                        alt="Team meeting"
                        className="rounded-2xl shadow-2xl"
                    />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">Who We Are</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        EcoTrack started as a small community project in 2024 with a simple goal: to make sustainability accessible and fun. We realized that many people want to help the environment but don't know where to start or feel like their individual actions don't matter.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Today, we are a global platform connecting thousands of eco-warriors who track their habits, participate in challenges, and support each other in living a greener life. We believe in progress over perfection.
                    </p>
                </motion.div>
            </div>

            {/* Team Section */}
            <div className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-12">Meet The Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah Jenkins", role: "Founder & CEO", img: "https://i.pravatar.cc/150?img=5" },
                            { name: "David Chen", role: "Head of Community", img: "https://i.pravatar.cc/150?img=11" },
                            { name: "Maria Gonzalez", role: "Sustainability Expert", img: "https://i.pravatar.cc/150?img=9" },
                        ].map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-shadow"
                            >
                                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                                <p className="text-emerald-600">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
