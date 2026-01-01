import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How does EcoTrack measure my impact?",
            answer: "We use standard emission factors and resource usage data to calculate the environmental impact of your logged activities, giving you real-time feedback on your carbon footprint reduction."
        },
        {
            question: "Is EcoTrack free to use?",
            answer: "Yes! The core features of EcoTrack are completely free. We believe sustainability should be accessible to everyone."
        },
        {
            question: "Can I compete with friends?",
            answer: "Absolutely! You can join challenges, create teams, and compare your progress on the leaderboards to stay motivated together."
        },
        {
            question: "How accurate is the data?",
            answer: "We continuously update our database with the latest scientific research to ensure the most accurate estimations possible, though actual impact may vary based on local factors."
        }
    ];

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-3xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                    <p className="text-base-content/70">Everything you need to know about getting started.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`collapse collapse-plus border border-base-300 bg-base-100 rounded-xl transition-all duration-300 ${activeIndex === index ? 'shadow-lg border-primary/50' : 'hover:border-base-content/20'}`}
                        >
                            <input
                                type="radio"
                                name="my-accordion-3"
                                checked={activeIndex === index}
                                onChange={() => setActiveIndex(activeIndex === index ? null : index)}
                            />
                            <div className="collapse-title text-xl font-medium flex items-center gap-4">
                                {faq.question}
                            </div>
                            <div className="collapse-content text-base-content/70">
                                <p className="pb-4">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
