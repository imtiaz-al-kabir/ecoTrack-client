import { motion } from "motion/react";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import Swal from "sweetalert2";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'We will get back to you shortly.',
            showConfirmButton: false,
            timer: 1500
        });
        e.target.reset();
    };

    return (
        <div className="bg-white min-h-screen pt-20">
            {/* Header */}
            <div className="bg-emerald-900 text-white py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="opacity-90 max-w-2xl mx-auto px-4">Have questions about our challenges specifically or sustainability generally? We'd love to hear from you.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-8">Contact Information</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                                <FaMapMarkerAlt size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Our Office</h3>
                                <p className="text-gray-600">123 Eco Avenue, Green City, Planet Earth 10101</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                                <FaPhone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Phone</h3>
                                <p className="text-gray-600">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                                <FaEnvelope size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">Email</h3>
                                <p className="text-gray-600">support@ecotrack.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="mt-12 bg-gray-200 rounded-2xl h-64 w-full flex items-center justify-center text-gray-500">
                        Map Integration (Google Maps)
                    </div>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
                >
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Your Name" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="your@email.com" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                            <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="How can we help?" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400" placeholder="Write your message here..." required></textarea>
                        </div>
                        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/30">
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
