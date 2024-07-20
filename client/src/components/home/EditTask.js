import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTask } from "../../utils/slice/task/taskSlice";
import { editTaskAsync } from "../../utils/slice/task/reducer";

function EditTask() {
  const dispatch = useDispatch();
  const Task = useSelector((store) => store.task.task);
  const [task, setTask] = useState(Task?.task);
  const [description, setDescription] = useState(Task?.description);

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
