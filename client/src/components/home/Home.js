import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../utils/slice/user/reducer";
import { Navigate } from "react-router-dom";

function Home() {
  const [redirect, setRedirect] = useState(false);
  const name = useSelector((store) => store.user.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
    if (!name) {
      setRedirect(true);
    }
  }, [name]);

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return <div>Home</div>;
}

export default Home;
