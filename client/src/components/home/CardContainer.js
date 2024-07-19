import React from "react";
import Card from "./Card";
import { useSelector } from "react-redux";
import login from "../login/Login";

function CardContainer({ containerTitle }) {
  const tasks = useSelector((store) => store.task.tasks);
  return (
    <div className={"col-span-1  border rounded-lg min-h-screen shadow"}>
      <div className={"p-3 flex flex-col"}>
        <span className={"bg-blue-600 text-white p-1 rounded-md"}>
          {containerTitle}
        </span>

        {tasks.map((task) => {
          if (task?.progress === containerTitle.toLowerCase()) {
            return <Card task={task} key={task?._id} />;
          }
        })}
      </div>
    </div>
  );
}

export default CardContainer;
