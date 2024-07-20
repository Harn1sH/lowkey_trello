import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { viewTask, editTask } from "../../utils/slice/task/taskSlice";
import { deleteTaskAsync } from "../../utils/slice/task/reducer";
import { Navigate } from "react-router-dom";
import { useDrag } from "react-dnd";

function Card({ task, containerTitle }) {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  if (redirect) return <Navigate to={`/`} />;

  return (
    <div
      ref={drag}
      className={`my-2 flex flex-col gap-y-5 bg-blue-200 px-2 py-3  rounded-md ${isDragging ? "opacity-75" : "opacity-100"}`}
    >
      <div className={" flex flex-col"}>
        <span className={"font-bold text-xl"}>{task?.task}</span>
        <span className={"font-semibold"}>{task?.description}</span>
      </div>
      <div>
        <span className={"text-gray-600"}>{task?.createdAt}</span>
        <div className={"flex gap-x-3 justify-end text-white"}>
          <button
            onClick={() => {
              dispatch(deleteTaskAsync({ _id: task._id }));
              setRedirect(true);
            }}
            className={
              "bg-red-400 hover:bg-red-500 active:bg-red-600 duration-200 py-1 px-2 rounded-lg"
            }
          >
            Delete
          </button>
          <button
            onClick={() => {
              dispatch(
                editTask({
                  _id: task._id,
                  task: task.task,
                  description: task.description,
                  createdAt: task.createdAt,
                  progress: containerTitle,
                }),
              );
              setRedirect(true);
            }}
            className={
              "bg-blue-400 hover:bg-blue-500 active:bg-blue-600 duration-200 py-1 px-2 rounded-lg"
            }
          >
            Edit
          </button>
          <button
            onClick={() =>
              dispatch(
                viewTask({
                  task: task.task,
                  description: task.description,
                  createdAt: task.createdAt,
                }),
              )
            }
            className={
              "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 duration-200 py-1 px-2 rounded-lg"
            }
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
