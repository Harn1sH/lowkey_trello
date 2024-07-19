import React from "react";
import Card from "./Card";

function CardContainer({ containerTitle }) {
  return (
    <div className={"col-span-1  border rounded-lg min-h-screen shadow"}>
      <div className={"p-3 flex flex-col"}>
        <span className={"bg-blue-600 text-white p-1 rounded-md"}>
          {containerTitle}
        </span>
        <Card />
      </div>
    </div>
  );
}

export default CardContainer;
