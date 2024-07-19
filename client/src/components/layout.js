import React, { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import ViewDetails from "./home/ViewDetails";
import AddTask from "./home/AddTask";
import EditTask from "./home/EditTask";

function Layout() {
  const isViewModalOpen = useSelector((store) => store.task.isViewModalOpen);
  const isAddModalOpen = useSelector((store) => store.task.isAddModalOpen);
  const isEditModalOpen = useSelector((store) => store.task.isEditModalOpen);

  if (isViewModalOpen) return <ViewDetails />;

  if (isEditModalOpen) return <EditTask />;
  if (isAddModalOpen) return <AddTask />;
  //return <AddTask />;
  return (
    <div className={"min-h-screen flex flex-col"}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
