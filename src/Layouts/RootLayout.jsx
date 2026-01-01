import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content font-sans">
      <Navbar />
      <div className="flex-grow pt-20">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
