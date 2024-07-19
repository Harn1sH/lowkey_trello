import React, { useState } from "react";
import { closeTask } from "../../utils/slice/task/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAsync } from "../../utils/slice/task/reducer";
import { errorHandler } from "../../utils/errorHandler";

function AddTask() {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (task && description) {
      dispatch(addTaskAsync({ task, progress: "todo", description }));
    } else errorHandler("give valid inputs");
  };

  return (
    <div
      className={
        "w-screen h-screen flex justify-center items-center bg-gray-500 "
      }
    >
      <div className={"bg-white p-4 rounded-md w-4/12 h-5/6"}>
        <div className={"flex flex-col justify-between h-full"}>
          <div className={"flex flex-col"}>
            <span className={"text-xl font-bold my-3"}>Add Task </span>
            <div className={"flex flex-col gap-y-2"}>
              <span className={"text-lg font-semibold flex flex-col gap-x-3"}>
                <span>Title:</span>
                <input
                  type={"text "}
                  placeholder={"title"}
                  className={"border text-md p-2"}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </span>
              <span className={"text-md flex flex-col gap-x-3"}>
                <span>Description:</span>
                <textarea
                  className={"border p-2"}
                  placeholder={"details about the task"}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </span>
            </div>
          </div>
          <div className={"flex gap-x-3 justify-end"}>
            <button
              onClick={() => {
                dispatch(closeTask());
              }}
              className={
                " bg-red-500 hover:bg-red-600 duration-200 rounded-md py-1 px-2 text-white"
              }
            >
              cancel
            </button>
            <button
              onClick={handleSave}
              className={
                " bg-blue-500 hover:bg-blue-600 duration-200 rounded-md py-1 px-2 text-white"
              }
            >
              save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
