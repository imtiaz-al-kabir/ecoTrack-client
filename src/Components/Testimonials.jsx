import Slider from "react-slick";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "Sarah Johnson",
            role: "Eco Activist",
            image: "https://i.pravatar.cc/150?img=5",
            text: "EcoTrack has completely transformed how I track my daily habits. The challenges are engaging and the community is so supportive!",
            rating: 5
        },
        {
            id: 2,
            name: "Michael Chen",
            role: "Student",
            image: "https://i.pravatar.cc/150?img=11",
            text: "I love the gamification aspect. It makes saving the planet feel like a fun game. Highly recommended for everyone!",
            rating: 5
        },
        {
            id: 3,
            name: "Emma Davis",
            role: "Sustainability Consultant",
            image: "https://i.pravatar.cc/150?img=9",
            text: "A professional tool wrapped in a beautiful design. The data insights help me understand my actual impact.",
            rating: 4
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
    };

    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
                    <p className="text-base-content/70">Join thousands of others making a difference.</p>
                </div>

                <Slider {...settings} className="testimonial-slider">
                    {testimonials.map((item) => (
                        <div key={item.id} className="px-4 pb-8 outline-none">
                            <div className="bg-base-100 p-8 rounded-2xl shadow-xl border border-base-300 relative flex flex-col items-center text-center">
                                <FaQuoteLeft className="text-primary text-4xl mb-6 opacity-30" />
                                <p className="text-xl italic text-base-content/80 mb-6">"{item.text}"</p>
                                <div className="flex gap-1 text-warning mb-4">
                                    {[...Array(item.rating)].map((_, i) => <FaStar key={i} />)}
                                </div>
                                <div className="flex items-center gap-4 mt-2">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full ring-2 ring-primary ring-offset-2" />
                                    <div className="text-left">
                                        <h4 className="font-bold text-lg">{item.name}</h4>
                                        <span className="text-sm text-primary">{item.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Testimonials;
