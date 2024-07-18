import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e, fn) => {
    fn(e.target.value);
  };
  return (
    <div
      className={
        "flex justify-center items-center grow transition-all duration-200"
      }
    >
      <form
        className={
          "border-2 w-4/12  flex flex-col gap-y-5 border-blue-600 p-7 rounded-lg"
        }
      >
        <span className={"text-center text-blue-600 text-3xl font-bold"}>
          Signup
        </span>
        <input
          type="text"
          className={"border py-1 px-2 rounded-xl"}
          placeholder={"First Name"}
          value={firstname}
          onChange={(e) => handleChange(e, setFirstname)}
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
          hidden={password === confirmPassword}
        >
          {`password doesn't match`}
        </div>
        <button
          disabled={!(password === confirmPassword)}
          className={
            password === confirmPassword
              ? "border-2 transition-all duration-200 hover:bg-blue-600 hover:text-white border-blue-600 py-1 px-2 rounded-xl text-blue-600"
              : "cursor-not-allowed border-2 transition-all duration-200 border-blue-600 py-1 px-2 rounded-xl text-blue-600"
          }
        >
          Register
        </button>{" "}
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
