import ActiveChallenges from "../Components/ActiveChallenges";
import Hero from "../Components/hero";
import HowItWorks from "../Components/HowItWorks";
import RecentTips from "../Components/RecentTips";
import Stats from "../Components/Stats";
import WhyGoGreen from "../Components/WhyGoGreen";

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <ActiveChallenges />
      <RecentTips />
      <WhyGoGreen />
      <HowItWorks />
    </div>
  );
};

export default Home;
