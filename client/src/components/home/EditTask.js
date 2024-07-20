import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTask } from "../../utils/slice/task/taskSlice";
import { editTaskAsync } from "../../utils/slice/task/reducer";
import { errorHandler } from "../../utils/errorHandler";
import { Navigate } from "react-router-dom";

function EditTask() {
  const dispatch = useDispatch();
  const Task = useSelector((store) => store.task.task);
  const [task, setTask] = useState(Task?.task);
  const [description, setDescription] = useState(Task?.description);

  const classChooser = (value) =>
    value === Task?.progress.toLowerCase() ? "bg-blue-600 text-white" : "";

  const handleChange = async (progress) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVICE_URL}/task/edit/progress`,
        {
          method: "PUT",
          body: JSON.stringify({ _id: Task._id, progress: progress }),
          credentials: "include",
          headers: { "content-type": "application/json" },
        },
      );
      if (response.ok) {
        dispatch(closeTask());
      } else throw new Error(await response.json());
    } catch (e) {
      errorHandler(e);
    }
  };

  return (
    <div
      className={
        "w-screen h-screen flex justify-center items-center bg-gray-500 "
      }
    >
      <div className={"bg-white p-4 rounded-md w-9/12 md:w-4/12 h-5/6"}>
        <div className={"flex flex-col justify-between h-full"}>
          <div className={"flex flex-col"}>
            <span className={"text-xl font-bold my-3"}>Task Details</span>
            <div className={"flex flex-col gap-y-2"}>
              <div className={"text-lg font-semibold flex flex-col gap-y-3"}>
                <span>Title:</span>
                <input
                  type={"text"}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className={"border p-2"}
                  placeholder={"title"}
                />
              </div>
              <div className={"text-md flex flex-col gap-y-3"}>
                <span>Description:</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={"border p-2"}
                  placeholder={"description"}
                />
              </div>
              <span className={"text-gray-500 flex gap-x-3"}>
                <span>Created at:</span>
                <span>{Task?.createdAt}</span>
              </span>
            </div>
          </div>
          <div className={"md:hidden"}>
            <div className={"flex "}>
              <button
                onClick={() => handleChange("todo")}
                className={`border hover:bg-blue-200 duration-200 rounded-tl-lg rounded-bl-lg border-black p-2 active:bg-blue-600 ${classChooser("todo")}`}
              >
                todo
              </button>
              <button
                onClick={() => handleChange("in progress")}
                className={`border hover:bg-blue-200 duration-200  border-black p-2 ${classChooser("in progress")} active:bg-blue-600`}
              >
                in progress
              </button>
              <button
                onClick={() => handleChange("done")}
                className={`border hover:bg-blue-200 duration-200 rounded-tr-lg rounded-br-lg border-black p-2 ${classChooser("done")} active:bg-blue-600`}
              >
                done
              </button>
            </div>
          </div>
          <div className={"flex justify-end gap-x-3"}>
            <button
              onClick={() => {
                dispatch(closeTask());
              }}
              className={
                " bg-red-500 hover:bg-red-600 duration-200 rounded-md py-1 px-2 text-white"
              }
            >
              close
            </button>
            <button
              onClick={() =>
                dispatch(
                  editTaskAsync({
                    task: task,
                    description: description,
                    _id: Task?._id,
                  }),
                )
              }
              className={
                " bg-blue-500 hover:bg-blue-600 duration-200 rounded-md py-1 px-2 text-white"
              }
            >
              save edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
