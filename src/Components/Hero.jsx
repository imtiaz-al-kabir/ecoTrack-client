import { use, useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowRightLong, FaChevronLeft, FaChevronRight, FaArrowDown } from "react-icons/fa6";
import { Link } from "react-router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useAxiosInstance from "../Hook/useAxiosInstance";
import { AuthContext } from "../Context/AuthContext";

const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer 
               btn btn-circle btn-neutral bg-black/30 hover:bg-primary border-none text-white
               transition-all hover:scale-110 backdrop-blur-sm"
  >
    <FaChevronRight size={22} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 cursor-pointer 
               btn btn-circle btn-neutral bg-black/30 hover:bg-primary border-none text-white
               transition-all hover:scale-110 backdrop-blur-sm"
  >
    <FaChevronLeft size={22} />
  </div>
);

const Hero = () => {
  const { user } = use(AuthContext);
  const axiosInstance = useAxiosInstance();
  const [challenges, setChallenges] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    axiosInstance.get("/challenges").then((data) => {
      // Ensure we have at least some data or fallback
      if (data.data && data.data.length > 0) {
        setChallenges(data.data.slice(0, 5)); // Limit to 5 slides
      } else {
        // Fallback data if API empty
        setChallenges([{
          _id: "demo1",
          photo: "https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=2628&auto=format&fit=crop",
          title: "Join the Eco Movement",
          target: "Start your journey towards a sustainable future today."
        }]);
      }
    }).catch(() => {
      setChallenges([{
        _id: "demo1",
        photo: "https://images.unsplash.com/photo-1542601906990-24ccd08d7455?q=80&w=2628&auto=format&fit=crop",
        title: "Join the Eco Movement",
        target: "Start your journey towards a sustainable future today."
      }]);
    });
  }, [axiosInstance]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (_, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div className={`w-3 h-3 rounded-full mt-4 transition-all duration-300 ${i === currentSlide ? "bg-primary scale-125" : "bg-white/50 hover:bg-white"}`} />
    ),
    appendDots: dots => (
      <div style={{ bottom: "50px" }}>
        <ul className="m-0 flex justify-center gap-2"> {dots} </ul>
      </div>
    )
  };

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-base-100">
      {challenges.length > 0 ? (
        <Slider {...settings} className="h-full hero-slider">
          {challenges.map((challenge, index) => (
            <div key={index} className="relative w-full h-[70vh] outline-none">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[5000ms] ease-out scale-100"
                style={{
                  backgroundImage: `url(${challenge.photo})`,
                  animation: currentSlide === index ? 'kenburns 15s infinite alternate' : 'none'
                }}
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-center items-center text-white text-center px-4">
                <div className="max-w-4xl space-y-6 animate-fade-in-up">
                  <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary text-primary-content text-sm font-semibold tracking-wider uppercase mb-2 backdrop-blur-md">
                    Featured Challenge
                  </span>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                    {challenge.title}
                  </h1>
                  <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto drop-shadow-md">
                    {challenge.target}
                  </p>

                  <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      to="/challenges"
                      className="btn btn-primary btn-lg border-none shadow-lg shadow-primary/30 hover:scale-105 transition-transform"
                    >
                      Explore Challenges <FaArrowRightLong className="ml-2" />
                    </Link>
                    {/* Secondary CTA - disabled when logged in */}
                    <Link
                      to={user ? "#" : "/register"}
                      className={`btn btn-outline text-white hover:bg-white hover:text-black btn-lg hover:scale-105 transition-transform backdrop-blur-sm ${user ? "btn-disabled opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {user ? "Already Joined" : "Join Now"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <div className="h-full flex items-center justify-center bg-base-300">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* Visual Hint to Next Section */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer opacity-80 hover:opacity-100">
        <div className="p-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white">
          <FaArrowDown size={20} />
        </div>
      </div>

      <style>{`
        .hero-slider .slick-list, .hero-slider .slick-track { height: 100%; }
        @keyframes kenburns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};
export default Hero;
