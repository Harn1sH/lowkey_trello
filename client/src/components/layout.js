import React from "react";
import Navbar from "./navbar/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className={"min-h-screen flex flex-col"}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
