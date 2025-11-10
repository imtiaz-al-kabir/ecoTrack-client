import ActiveChallenges from "../Components/ActiveChallenges";
import Hero from "../Components/hero";
import HowItWorks from "../Components/HowItWorks";
import RecentTips from "../Components/RecentTips";
import Stats from "../Components/Stats";
import UpcomingEvents from "../Components/UpcomingEvents";
import WhyGoGreen from "../Components/WhyGoGreen";

const Home = () => {
  return (
    <div className="px-5 md:px-0">
      <Hero />
      <Stats />
      <ActiveChallenges />
      <RecentTips />
      <UpcomingEvents />
      <WhyGoGreen />
      <HowItWorks />
    </div>
  );
};

export default Home;
