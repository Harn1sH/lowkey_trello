import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler } from "../../utils/errorHandler";
import { removeUser } from "../../utils/slice/user/userSlice";

function Navbar() {
  const name = useSelector((store) => store.user.name);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  const handleLogOut = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVICE_URL}/logout`,
        {
          method: "GET",
          credentials: "include",
        },
      );
      if (response.ok) {
        dispatch(removeUser());
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div
      className={
        "p-3 flex justify-between items-center bg-blue-600 text-white "
      }
    >
      <Link to={"/"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={"1.5"}
          stroke="white"
          className="size-6"
        >
          <path
            strokeLinecap={"round"}
            strokeLinejoin={"round"}
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </Link>

      {name ? (
        <div>
          <button
            onClick={() => {
              handleLogOut();
            }}
            className={
              "text-white bg-red-500 py-1 px-2 rounded-xl active:bg-red-600 duration-200"
            }
          >
            log out
          </button>
        </div>
      ) : (
        <div className={"flex gap-x-10"}>
          <Link to={"/login"}>
            <button
              className={
                "text-white rounded-xl py-1 px-2 active:bg-blue-700 duration-200"
              }
            >
              Login
            </button>
          </Link>
          <Link to={"/signup"}>
            <button
              className={
                "text-blue-700 bg-white py-1 px-2 rounded-xl active:bg-stone-200 duration-200"
              }
            >
              Sign-up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
