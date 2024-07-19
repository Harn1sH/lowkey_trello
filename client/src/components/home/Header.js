import React from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../utils/slice/viewDetail/viewDetailSlice";

function Header() {
  const dispatch = useDispatch();

  return (
    <div className={"w-full my-4 p-3 shadow-xl rounded-lg"}>
      <div className={"flex flex-col justify-center gap-y-3"}>
        <div className={"grid grid-cols-11"}>
          <button
            onClick={() => dispatch(addTask())}
            className={
              "px-4 rounded-lg hover:bg-blue-700 col-span-1 transition-all duration-200 py-1 text-white bg-blue-600"
            }
          >
            Add Task
          </button>
        </div>
        <div>
          <div className={"flex justify-between"}>
            <div className={"flex gap-x-3 px-2 justify-center items-center"}>
              <label htmlFor="Search">Search:</label>
              <input
                type="text"
                id="Search"
                className={"px-2 py-1 border border-gray-400 rounded-lg"}
                placeholder="Search"
              />
            </div>
            <div className={"flex gap-x-3 items-center justify-center"}>
              <label htmlFor="sort">Sort By:</label>
              <select
                name="sort"
                id="sort"
                className={"p-1 border border-gray-300 rounded-lg"}
              >
                <option value="recent" className={"py-1 rounded-xl"}>
                  Recent
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
