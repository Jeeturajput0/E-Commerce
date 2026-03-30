import { Outlet } from "react-router-dom";
import ToastContainer from "../common/ToastContainer";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = () => (
  <>
    <Navbar />
    <main className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 lg:px-8">
      <Outlet />
    </main>
    <Footer />
    <ToastContainer />
  </>
);

export default MainLayout;

