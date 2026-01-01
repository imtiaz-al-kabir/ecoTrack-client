import { use } from "react";
import ActiveChallenges from "../Components/ActiveChallenges";
import Hero from "../Components/hero";
import HowItWorks from "../Components/HowItWorks";
import Loading from "../Components/Loading";
import RecentTips from "../Components/RecentTips";
import Stats from "../Components/Stats";
import UpcomingEvents from "../Components/UpcomingEvents";
import WhyGoGreen from "../Components/WhyGoGreen";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const { loading } = use(AuthContext);

  if (loading) {
    return <Loading />;
  }

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
