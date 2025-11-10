import { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowRightLong, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router"; 
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useAxiosInstance from "../Hook/useAxiosInstance";


const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer 
               bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg 
               transition-transform hover:scale-110"
  >
    <FaChevronRight size={22} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer 
               bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg 
               transition-transform hover:scale-110"
  >
    <FaChevronLeft size={22} />
  </div>
);

const Hero = () => {
  const axiosInstance = useAxiosInstance();
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axiosInstance.get("/challenges").then((data) => setChallenges(data.data));
  }, [axiosInstance]);

 
  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="pb-10 relative">
      <Slider {...settings}>
        {challenges.map((challenge, index) => (
          <div key={index} className="relative w-full">
            <img
              src={challenge.photo}
              alt={challenge.title}
              className="w-full h-[500px] object-cover rounded-lg"
            />

            {/* Overlay content */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center rounded-lg p-10">
              <h2 className="text-4xl font-bold">{challenge.title}</h2>
              <p className="mt-2 text-lg">{challenge.target}</p>
              <Link
                to="/challenges"
                className="mt-5 flex items-center gap-2 btn bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold transition-colors"
              >
                Explore Challenges
                <FaArrowRightLong size={18} />
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
