import React from "react";
import { useDispatch } from "react-redux";
import { closeTask } from "../../utils/slice/viewDetail/viewDetailSlice";

function ViewDetails() {
  const dispatch = useDispatch();
  return (
    <div
      className={
        "w-screen h-screen flex justify-center items-center bg-gray-500 "
      }
    >
      <div className={"bg-white p-4 rounded-md w-4/12 h-5/6"}>
        <div className={"flex flex-col justify-between h-full"}>
          <div className={"flex flex-col"}>
            <span className={"text-xl font-bold my-3"}>Task Details</span>
            <div className={"flex flex-col gap-y-2"}>
              <span className={"text-lg font-semibold flex gap-x-3"}>
                <span>Title:</span>
                <span>{}</span>
              </span>
              <span className={"text-md flex gap-x-3"}>
                <span>Description:</span>
                <span>{}</span>
              </span>
              <span className={"text-gray-500 flex gap-x-3"}>
                <span>Created at:</span>
                <span>{}</span>
              </span>
            </div>
          </div>
          <div className={"flex justify-end"}>
            <button
              onClick={() => {
                dispatch(closeTask());
              }}
              className={" bg-blue-600 rounded-md py-1 px-2 text-white"}
            >
              close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
