import React, { useEffect, useState } from "react";
import CardContainer from "./CardContainer";
import { useDispatch, useSelector } from "react-redux";
import ViewDetails from "./ViewDetails";

function Body() {
  const progressLevel = ["TODO", "IN PROGRESS", "DONE"];

  return (
    <div className={"grid grid-cols-3 gap-x-3"}>
      {progressLevel.map((containerTitle, index) => (
        <CardContainer containerTitle={containerTitle} key={containerTitle} />
      ))}
    </div>
  );
}

export default Body;
