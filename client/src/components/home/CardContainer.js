import React, { useState } from "react";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { errorHandler } from "../../utils/errorHandler";
import { fetchTaskAsync } from "../../utils/slice/task/reducer";

function CardContainer({ containerTitle, setRedirect }) {
  const tasks = useSelector((store) => store.task.tasks);

  const dispatch = useDispatch();

  const addItemToSection = async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_SERVICE_URL}/task/edit/progress`,
      {
        method: "PUT",
        body: JSON.stringify({
          _id: id,
          progress: containerTitle.toLowerCase(),
        }),
        credentials: "include",
        headers: { "content-type": "application/json" },
      },
    );
    if (response.ok) dispatch(fetchTaskAsync());
    else {
      errorHandler(await response.json());
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={"col-span-1  border rounded-lg md:min-h-screen shadow"}
    >
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
