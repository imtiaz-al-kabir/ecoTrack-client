import { use } from "react";
import ActiveChallenges from "../Components/ActiveChallenges";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import Loading from "../Components/Loading";
import RecentTips from "../Components/RecentTips";
import Stats from "../Components/Stats";
import UpcomingEvents from "../Components/UpcomingEvents";
import WhyGoGreen from "../Components/WhyGoGreen";
import Testimonials from "../Components/Testimonials";
import FAQ from "../Components/FAQ";
import Newsletter from "../Components/Newsletter";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const { loading } = use(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-hidden">
      <Hero />
      <Stats />
      <WhyGoGreen />
      <ActiveChallenges />
      <HowItWorks />
      <UpcomingEvents />
      <Testimonials />
      <RecentTips />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
