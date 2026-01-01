import { FaPaperPlane } from "react-icons/fa6";

const Newsletter = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background with overlay */}
            <div className="absolute inset-0 bg-primary z-0">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10 text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Green Community</h2>
                <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Get weekly eco-tips, challenge updates, and success stories delivered straight to your inbox.
                </p>

                <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                    <div className="flex-grow relative">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-medium"
                            required
                        />
                    </div>
                    <button className="btn btn-secondary rounded-full px-8 h-auto py-4 text-secondary-content text-lg font-bold hover:scale-105 transition-transform flex items-center gap-2">
                        Subscribe <FaPaperPlane />
                    </button>
                </form>
                <p className="mt-4 text-sm text-white/60">No spam, just green vibes. Unsubscribe anytime.</p>
            </div>
        </section>
    );
};

export default Newsletter;
