import React from "react";

function BoardUpload({
  handleUpload,
  file,
  handlePage,
  saveBoard,
  dataBoard,
  setNameBoard,
}) {
  return (
    <div className="flex flex-col text-center items-center justify-center gap-y-4 h-screen">
      <div>Name : {file.filename}</div>
      {/* <div>Content : {file.content}</div> */}
      <form className="flex flex-col gap-y-4 ">
        <label>Upload File</label>
        <input
          type="file"
          className="border p-4 border-slate-300 rounded-lg"
          onChange={handleUpload}
        />
        <div className="flex items-center justify-center gap-x-2">
          <label>Title</label>
          <input
            type="text"
            className="border p-4 border-slate-300 rounded-lg"
            onChange={(value) => setNameBoard(value.target.value)}
          />
        </div>
        <button
          className="border border-black rounded-lg hover:bg-slate-200 p-4 hover:border-white hover:text-white"
          type="button"
          onClick={() => saveBoard(dataBoard)}
        >
          Save
        </button>
        <button
          className="border border-black rounded-lg hover:bg-slate-200 p-4 hover:border-white hover:text-white"
          type="reset"
        >
          Reset
        </button>
        {/* {file.content && (
          <button
            className="border border-black rounded-lg hover:bg-slate-200 p-4 hover:border-white hover:text-white"
            type="button"
            onClick={() => handlePage("game")}
          >
            Start Game
          </button>
        )} */}
        <button
          className="border border-black rounded-lg hover:bg-slate-200 p-4 hover:border-white hover:text-white"
          type="button"
          onClick={() => handlePage(null)}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default BoardUpload;
