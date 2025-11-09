import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {" "}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
