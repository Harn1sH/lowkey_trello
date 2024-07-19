import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import login from "../login/Login";

function CardContainer({ containerTitle }) {
  const tasks = useSelector((store) => store.task.tasks);
  const filteredArray = tasks.filter((task) =>
    task
      ? task?.progress?.toLowerCase() === containerTitle.toLowerCase()
      : false,
  );
  console.log(containerTitle, filteredArray);
  return (
    <div className={"col-span-1  border rounded-lg min-h-screen shadow"}>
      <div className={"p-3 flex flex-col"}>
        <span className={"bg-blue-600 text-white p-1 rounded-md"}>
          {containerTitle}
        </span>

        {filteredArray.map((task) => (
          <Card task={task} key={task?._id} />
        ))}
      </div>
    </div>
  );
}

export default CardContainer;
