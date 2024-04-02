import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="w-full flex">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
