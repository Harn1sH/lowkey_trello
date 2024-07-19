import React, { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/slice/user/userSlice";
import ViewDetails from "./home/ViewDetails";
import AddTask from "./home/AddTask";

function Layout() {
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.name);
  const [redirect, setRedirect] = useState(false);

  const isViewModalOpen = useSelector((store) => store.task.isViewModalOpen);
  const isAddModalOpen = useSelector((store) => store.task.isAddModalOpen);

  const fetchData = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVICE_URL}/login/validate`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const data = response.json();
    if (data) {
      dispatch(addUser(data));
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  if (isViewModalOpen) return <ViewDetails />;
  if (isAddModalOpen) return <AddTask />;

  return (
    <div className={"min-h-screen flex flex-col"}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
