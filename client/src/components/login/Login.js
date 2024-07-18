import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { errorHandler } from "../../utils/errorHandler";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/slice/user/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const handleGoogleLogin = async (userResponse) => {
    const userData = jwtDecode(userResponse.credential);
    const { given_name: firstName, family_name: lastName, email } = userData;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVICE_URL}/login/google`,
        {
          method: "POST",
          body: JSON.stringify({ firstName, lastName, email }),
          headers: { "content-type": "application/json" },
          credentials: "include",
        },
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(addUser(data));
        setRedirect(true);
      } else {
        throw new Error(data);
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVICE_URL}/login`,
        {
          method: "post",
          body: JSON.stringify({ email, password }),
          headers: { "content-type": "application/json" },
          credentials: "include",
        },
      );
      if (response.ok) {
        const data = await response.json();
        dispatch(addUser(data));
        setRedirect(true);
      } else {
        throw new Error(response.json());
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className={"flex justify-center items-center grow "}>
      <form
        onSubmit={handleLogin}
        className={
          "border-2 w:6/12 md:w-4/12  flex flex-col gap-y-5 border-blue-600 p-7 rounded-lg"
        }
      >
        <span className={"text-center text-blue-600 text-3xl font-bold"}>
          Login
        </span>
        <input
          type="email"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"you@mail.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type={"submit"}
          className={
            "border-2 transition-all duration-200 hover:bg-blue-600 hover:text-white border-blue-600 py-1 px-2 rounded-xl text-blue-600"
          }
        >
          Login
        </button>
        <span className={"flex text-gray-500 justify-center"}>or</span>
        <GoogleLogin onSuccess={handleGoogleLogin} onError={errorHandler} />
        <div className={"grid grid-cols-3 mx-auto gap-x-2"}>
          <span className={"col-span-3 "}>
            Dont have an account yet?
            <Link to="/signup">
              <span className={"font-semibold text-blue-600 underline"}>
                Register
              </span>
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default Login;
