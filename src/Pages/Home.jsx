import ActiveChallenges from "../Components/ActiveChallenges";
import Hero from "../Components/hero";
import HowItWorks from "../Components/HowItWorks";
import Stats from "../Components/Stats";
import WhyGoGreen from "../Components/WhyGoGreen";

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <ActiveChallenges />

      <WhyGoGreen />
      <HowItWorks />
    </div>
  );
};

export default Home;
