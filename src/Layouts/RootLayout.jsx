import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen -100px">
        {" "}
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
