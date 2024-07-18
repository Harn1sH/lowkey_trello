import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className={"flex justify-center items-center grow "}>
      <form
        className={
          "border-2 w-4/12  flex flex-col gap-y-5 border-blue-600 p-7 rounded-lg"
        }
      >
        <span className={"text-center text-blue-600 text-3xl font-bold"}>
          Login
        </span>
        <input
          type="text"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"you@mail.com"}
        />
        <input
          type="password"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"password"}
        />
        <button
          className={
            "border-2 transition-all duration-200 hover:bg-blue-600 hover:text-white border-blue-600 py-1 px-2 rounded-xl text-blue-600"
          }
        >
          Login
        </button>
        <div className={"flex justify-center space-x-2"}>
          <span>Dont have an account yet?</span>
          <Link to="/signup">
            <span className={"font-semibold text-blue-600 underline"}>
              Register
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
