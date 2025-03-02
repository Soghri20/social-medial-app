import { Outlet } from "react-router-dom";
import Navbar from './Navbar'
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* Renders the current page inside this layout */}
    </>
  );
};

export default Layout;
