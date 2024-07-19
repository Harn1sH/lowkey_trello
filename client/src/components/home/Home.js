import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../utils/slice/user/reducer";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Body from "./Body";
import { fetchTaskAsync } from "../../utils/slice/task/reducer";

function Home() {
  const [redirect, setRedirect] = useState(false);
  const name = useSelector((store) => store.user.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    if (!name) {
      setRedirect(true);
    } else dispatch(fetchTaskAsync());
  }, [name]);

  return (
    <div className={"mx-5"}>
      <Header />
      <Body />
    </div>
  );
}

export default Home;
