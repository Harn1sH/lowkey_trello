import React from "react";
import { useDispatch } from "react-redux";
import { viewTask } from "../../utils/slice/viewDetail/viewDetailSlice";

function Card() {
  const dispatch = useDispatch();
  const temp = { task: "null", description: "null", createdAt: "null" };
  return (
    <div className="my-2 flex flex-col gap-y-5 bg-blue-200 px-2 py-3  rounded-md">
      <div className={" flex flex-col"}>
        <span className={"font-bold text-xl"}>Task</span>
        <span className={"font-semibold"}>desxription</span>
      </div>
      <div>
        <span className={"text-gray-600"}>created At</span>
        <div className={"flex gap-x-3 justify-end text-white"}>
          <button
            className={
              "bg-red-400 hover:bg-red-500 active:bg-red-600 duration-200 py-1 px-2 rounded-lg"
            }
          >
            Delete
          </button>
          <button
            className={
              "bg-blue-400 hover:bg-blue-500 active:bg-blue-600 duration-200 py-1 px-2 rounded-lg"
            }
          >
            Edit
          </button>
          <button
            onClick={() => dispatch(viewTask(temp))}
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
