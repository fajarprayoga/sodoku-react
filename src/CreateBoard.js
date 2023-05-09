import React from "react";
import BoardItem from "./BoardItem";

function CreateBoard({
  rows,
  handleItemMakeBoard,
  handleMakeBoard,
  itemMakeBoard,
  saveBoard,
  setNameBoard,
  handleReset,
  handlePage,
}) {
  return (
    <div className="flex flex-col h-screen items-center justify-center ">
      <div className="bg-white h-[450px] w-[450px] ">
        <div id="board" className="flex flex-wrap items-center justify-center">
          {rows.map((row, indexRow) => {
            let limitRow = ++indexRow % 3;
            return (
              <div className="text-center flex items-center justify-center">
                {row.map((column, indexCol) => {
                  return (
                    <>
                      <BoardItem
                        value={column}
                        emptyBox={column !== "-" ? true : false}
                        className={`${++indexCol % 3 == 0 ? "mr-2" : null} ${
                          limitRow % 3 == 0 ? "mb-2" : null
                        }  w-[50px] h-[50px] flex items-center justify-center border border-gray-500 hover:bg-slate-500 hover:text-white hover:cursor-pointer bg-white `}
                        idItem={`${indexRow}${indexCol}`}
                        onClick={() => {
                          handleMakeBoard(indexRow, indexCol);
                        }}
                      />
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[450px] flex py-2">
        {rows.map((item, index) => {
          return (
            <div
              onClick={() => handleItemMakeBoard(`${+index}`)}
              className={`
                    ${
                      itemMakeBoard == index + 1
                        ? "bg-blue-400 text-white"
                        : null
                    } 
                    mt-8 w-[45px] h-[50px] text-center border border-gray-500  flex items-center justify-center hover:bg-blue-400 mx-[2.5px] hover:text-white hover:cursor-pointer`}
            >
              {++index}
            </div>
          );
        })}
      </div>

      <label className="mt-4">Name Board</label>
      <input
        type="text"
        className="border border-slate-700 w-[300px] mb-6"
        onChange={(value) => setNameBoard(value.target.value)}
      />
      <div className="flex gap-x-3">
        <button
          onClick={() => saveBoard(rows)}
          className="border border-black rounded-lg hover:bg-slate-200 p-4 hover:border-white hover:text-white"
        >
          Save
        </button>
        <button
          onClick={handleReset}
          className="border border-black rounded-lg hover:bg-slate-200 p-4 hover:border-white hover:text-white"
        >
          Reset
        </button>
        <button
          onClick={() => handlePage(null)}
          className="border border-black rounded-lg hover:bg-slate-200 p-4 hover:border-white hover:text-white"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default CreateBoard;
