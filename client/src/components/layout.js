import React, { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/slice/user/userSlice";

function Layout() {
  const dispatch = useDispatch();
  const name = useSelector((store) => store.user.name);
  const [redirect, setRedirect] = useState(false);

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

  return (
    <div className={"min-h-screen flex flex-col"}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Layout;
