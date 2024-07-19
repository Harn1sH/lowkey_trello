import React, { useState } from "react";
import CardContainer from "./CardContainer";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Body() {
  const progressLevel = ["TODO", "IN PROGRESS", "DONE"];
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Navigate to={"/"} />;

  return (
    <div className={"grid grid-rows-3 md:grid-cols-3 gap-x-3"}>
      {progressLevel.map((containerTitle, index) => (
        <CardContainer
          containerTitle={containerTitle}
          key={containerTitle}
          setRedirect={setRedirect}
        />
      ))}
    </div>
  );
}

export default Body;
