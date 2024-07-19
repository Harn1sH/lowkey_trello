import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { passwordValidator } from "../../utils/validator";
import { errorHandler } from "../../utils/errorHandler";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (confirmPassword) {
      passwordValidator(password, confirmPassword, setError);
    }
  }, [password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVICE_URL}/signup`,
        {
          method: "POST",
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
          headers: { "content-type": "application/json" },
        },
      );
      if (response.ok) {
        setRedirect(true);
      } else {
        throw new Error(await response.json());
      }
    } catch (e) {
      errorHandler(e);
    }
  };
  const handleChange = (e, fn) => {
    fn(e.target.value);
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  const handleGoogleLogin = async (loginResponse) => {
    const userData = jwtDecode(loginResponse.credential);
    const { given_name: firstName, family_name: lastName, email } = userData;
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVICE_URL}/signup/google`,
        {
          method: "POST",
          body: JSON.stringify({ firstName, lastName, email }),
          headers: { "content-type": "application/json" },
        },
      );
      if (response.ok) {
        setRedirect(true);
      } else {
        throw new Error(await response.json());
      }
    } catch (e) {
      errorHandler(e);
    }
  };

  return (
    <div
      className={
        "flex justify-center items-center grow transition-all duration-200"
      }
    >
      <form
        className={
          "border-2 w:6/12 md:w-4/12 lg:4/12  flex flex-col gap-y-5 border-blue-600 p-7 rounded-lg"
        }
        onSubmit={handleSubmit}
      >
        <span className={"text-center text-blue-600 text-3xl font-bold"}>
          Signup
        </span>
        <input
          type="text"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"First Name"}
          value={firstName}
          onChange={(e) => handleChange(e, setFirstName)}
        />
        <input
          type="text"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"last Name"}
          value={lastName}
          onChange={(e) => handleChange(e, setLastname)}
        />
        <input
          type="email"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"E-mail"}
          value={email}
          onChange={(e) => handleChange(e, setEmail)}
        />
        <input
          type="password"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"password"}
          value={password}
          onChange={(e) => handleChange(e, setPassword)}
        />
        <input
          type="password"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"confirm password"}
          value={confirmPassword}
          onChange={(e) => handleChange(e, setConfirmPassword)}
        />
        <div
          className={"text-red-500 font-semibold"}
          hidden={error.length === 0}
        >
          {error}
        </div>
        <button
          type="submit"
          disabled={error.length > 0}
          className={
            error.length === 0
              ? "border-2 transition-all duration-200 hover:bg-blue-600 hover:text-white border-blue-600 py-1 px-2 rounded-xl text-blue-600"
              : "cursor-not-allowed border-2 transition-all duration-200 border-blue-600 py-1 px-2 rounded-xl text-blue-600"
          }
        >
          Register
        </button>
        <span className={"flex text-gray-500 justify-center"}>or</span>
        <div className={"flex justify-center"}>
          <GoogleLogin onSuccess={handleGoogleLogin} onError={errorHandler} />
        </div>
        <div className={"flex justify-center space-x-2"}>
          <span>Already a member?</span>
          <Link to="/login">
            <span className={"font-semibold text-blue-600 underline"}>
              Login
            </span>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
