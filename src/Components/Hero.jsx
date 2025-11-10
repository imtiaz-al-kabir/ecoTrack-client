import { useEffect, useState } from "react";
import Slider from "react-slick";

// in your index.js or App.js
import { Link } from "react-router";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import useAxiosInstance from "../Hook/useAxiosInstance";

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
  };

  const axiosInstance = useAxiosInstance();
  const [challenges, setChallenges] = useState([]);
  console.log(challenges);

  useEffect(() => {
    axiosInstance.get("/challenges").then((data) => setChallenges(data.data));
  }, [axiosInstance]);

  return (
    <div className="  py-10">
      <Slider {...settings}>
        {challenges.map((challenge, index) => (
          <div key={index} className="relative w-full">
            <img
              src={challenge.photo}
              alt={challenge.title}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center p-10 bg-opacity-30 text-white text-center">
              <h2 className="text-4xl font-bold">{challenge.title}</h2>
              <p className="mt-2 text-lg">{challenge.target}</p>
              <Link
                to="/challenges"
                className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-semibold"
              >
                Explore Challenges
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
