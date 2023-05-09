import { useEffect, useRef, useState } from "react";
import "./App.css";
import BoardUpload from "./Upload";
import BoardItem from "./BoardItem";
import CreateBoard from "./CreateBoard";

const Board = ({ rows, onClick, type = "board" }) => {
  return (
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
                        onClick(indexRow, indexCol);
                        console.log(column !== "-" ? true : false);
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
  );
};

function isValidSudoku(rows) {
  // Check rows
  // ini untuk check di dalama array dan harus unik
  // cari penjelasan di w3school
  const rowSet = new Set();
  const columnSet = new Set();
  const boxSet = new Set();

  for (let i = 0; i < rows.length; i++) {
    // loop rows

    // console.log(rows);
    const row = rows[i];

    // column by rows
    for (let j = 0; j < row.length; j++) {
      const rowNumber = row[j];
      const columnNumber = rows[j][i];
      const boxCharacter =
        rows[3 * Math.floor(i / 3) + Math.floor(j / 3)][
          ((i * 3) % 9) + (j % 3)
        ];
      // check row null value
      if (rowNumber !== "-") {
        // check jika row number has value, if there thne return false
        if (rowSet.has(rowNumber)) {
          // console.log("row");
          return false;
        }

        // if no add value
        rowSet.add(rowNumber);
      }

      if (columnNumber !== "-") {
        // check jika row number has value, if there thne return false
        if (columnSet.has(columnNumber)) {
          // console.log("col");
          return false;
        }

        // if now add value
        columnSet.add(columnNumber);
      }

      if (boxCharacter !== "-") {
        // check jika row number has value, if there thne return false
        if (boxSet.has(boxCharacter)) {
          // console.log("box");
          return false;
        }
        // if now add value
        boxSet.add(boxCharacter);
      }
    }

    // clear rowSet
    rowSet.clear();
    columnSet.clear();
    boxSet.clear();
  }
  // console.log(rows);
  return true;
}

const Sudoku = ({ byUpload = [], handlePage }) => {
  // console.log("by upload", byUpload);
  const [dataIndex, setDataIndex] = useState({ row: null, col: null });
  const [currentValue, setCurrentValue] = useState(null);
  const [selectBoard, setSelectBoard] = useState([]);
  const choseBoardGame = JSON.parse(localStorage.getItem("BOARDGAME"));
  const defaultValue = [
    ["-", "3", "4", "6", "7", "8", "9", "1", "2"],
    ["6", "7", "-", "1", "9", "5", "3", "4", "8"],
    ["1", "9", "8", "3", "4", "-", "5", "6", "7"],
    ["8", "5", "9", "7", "6", "1", "4", "-", "3"],
    ["4", "-", "6", "8", "5", "3", "7", "9", "1"],
    ["7", "1", "3", "9", "-", "4", "8", "5", "6"],
    ["9", "6", "1", "5", "3", "7", "-", "8", "4"],
    ["-", "8", "7", "4", "1", "9", "6", "3", "5"],
    ["3", "4", "5", "-", "8", "6", "1", "7", "9"],
  ];

  var OldValue = defaultValue;
  const [data, setData] = useState(defaultValue);

  useEffect(() => {
    if (!isValidSudoku(data)) {
      const newData = [...data];

      newData[dataIndex.row][dataIndex.col] = "-";
      setTimeout(() => {
        setData(newData);
      }, 500);
    }
  }, [data]);

  const onSetValue = (row, col) => {
    --row;
    --col;

    setDataIndex({ row, col });
    const newData = [...data];
    // console.log('roww',row];
    const value = OldValue[row][col];

    if (value === "-" && currentValue != null) {
      newData[row][col] = currentValue;
      setData(newData);
    }
  };

  const onSelect = (item) => {
    setSelectBoard(item)
    setData(item.data)
    OldValue = item.data
  }

  if (selectBoard.length <= 0 && choseBoardGame.length > 0 && choseBoardGame) {
    return (
      <div className="flex h-screen justify-center items-center flex-wrap gap-4">
        {choseBoardGame?.map((item) => {
          return (
            <div className="hover:from-violet-800 hover:cursor-pointer border border-fuchsia-500 w-[150px] h-[200px] bg-gradient-to-tr flex items-center justify-center from-fuchsia-500 to-amber-500 " onClick={() => onSelect(item)}>
              <h1 className="text-cente text-white font-bold text-1xl ">
                {item.name}
              </h1>
            </div>
          );
        })}
      </div>
    );
  }

  if (selectBoard.name || choseBoardGame.length < 0) {
    return (
      <div className="flex flex-col gap-y-4 items-center justify-center h-screen">
        <Board rows={data} onClick={onSetValue} />

        <div className="w-[450px] flex py-2">
          {data.map((item, index) => {
            return (
              <div
                onClick={() => setCurrentValue(`${+index}`)}
                className={` ${
                  currentValue == index + 1 ? "bg-blue-400 text-white" : null
                } w-[45px] h-[50px] text-center border border-gray-500  flex items-center justify-center hover:bg-blue-400 mx-[2.5px] hover:text-white hover:cursor-pointer`}
              >
                {++index}
              </div>
            );
          })}
        </div>

        <h4>{currentValue}</h4>
        <div className="flex gap-x-2">
          <button
            className="bg-green-300 rounded-md text-white px-6 py-2 hover:bg-green-500"
            onClick={() => handlePage(null)}
          >
            Back
          </button>
          <button
            className="bg-red-300 rounded-md text-white px-6 py-2 hover:bg-yellow-500"
            onClick={() => setData(OldValue)}
          >
            Reset
          </button>
        </div>

        {/* <Ref/> */}
      </div>
    );
  }
};

function App() {
  // game, create, upload
  const [page, setPage] = useState(null);
  const [file, setFile] = useState({ filename: null, content: null });
  const [dataBoard, setDataBoard] = useState([]);
  const [makeBoard, setMakeBoard] = useState([
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ]);
  const resetBoard = [
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-", "-", "-", "-", "-"],
  ];
  const [itemMakeBoard, setItemMakeBoard] = useState(null);
  const [nameBoard, setNameBoard] = useState("");
  const handleUpload = (data) => {
    const fileContent = data.target.files[0];
    // console.log(file[0]);
    if (fileContent) {
      const reader = new FileReader();

      reader.readAsText(fileContent);

      reader.onload = () => {
        setFile({ filename: fileContent.name, content: reader.result });
      };

      reader.onerror = () => {
        console.log("erro-", reader.error);
      };
    }
  };

  const changeBoadFileToArray = () => {
    let board = [];
    let itemBoard = [];
    file.content.split(" ").map((item, i) => {
      item.replace(/\\n([0-9]|\-)/g, "");
      // console.log(item);
      itemBoard[itemBoard.length] = item;

      if (++i % 9 == 0) {
        board[board.length] = itemBoard;
        itemBoard = [];
      }
    });

    setDataBoard(board);

    return isValidSudoku(board);
  };

  useEffect(() => {
    if (file.content !== null) {
      changeBoadFileToArray() ? alert("Data true") : alert("Data false");
    }
  }, [file]);

  const handlePage = (page) => {
    setPage(page);
  };

  const handleMakeBoard = (row, col) => {
    --row;
    --col;

    const newBoard = [...makeBoard];
    newBoard[row][col] = itemMakeBoard;

    if (isValidSudoku(newBoard) && itemMakeBoard != null) {
      setDataBoard(newBoard);
    } else {
      const newBoard = [...makeBoard];
      newBoard[row][col] = "-";
      setDataBoard(newBoard);

      // alert("board not valid");
    }
  };

  const saveBoard = (BOARDGAME) => {
    let dataOnSave = JSON.parse(localStorage.getItem("BOARDGAME"));
    let save = [{name : nameBoard, data : BOARDGAME}]
    if(dataOnSave.length > 0) {
        save = dataOnSave.concat(save)
    }

    // // merge data

    localStorage.setItem('BOARDGAME', JSON.stringify(save));
    alert('save success')
  };

  const handleReset = () => {
    setMakeBoard(resetBoard);
  };

  if (page === null) {
    return (
      <>
        <div className="flex flex-col gap-y-4 items-center justify-center h-screen">
          <button
            className="bg-blue-400 hover:bg-green-500 hover:cursor-pointer rounded-md  text-white px-4 py-2 "
            onClick={() => setPage("game")}
          >
            Game
          </button>
          <button
            className="bg-green-400 hover:bg-green-500 hover:cursor-pointer rounded-md  text-white px-4 py-2 "
            onClick={() => setPage("upload")}
          >
            Upload
          </button>
          <button
            className="bg-orange-400 hover:bg-green-500 hover:cursor-pointer rounded-md  text-white px-4 py-2 "
            onClick={() => setPage("create")}
          >
            Create
          </button>
        </div>
      </>
    );
  }

  if (page === "game") {
    return <Sudoku byUpload={dataBoard} handlePage={handlePage} />;
  }

  if (page === "create") {
    return (
      <CreateBoard
        rows={makeBoard}
        handleMakeBoard={handleMakeBoard}
        saveBoard={saveBoard}
        handleItemMakeBoard={setItemMakeBoard}
        itemMakeBoard={itemMakeBoard}
        setNameBoard={setNameBoard}
        handleReset={handleReset}
        handlePage={handlePage}
      />
    );
  }

  if (page === "upload") {
    return (
      <BoardUpload
        file={file}
        handleUpload={handleUpload}
        handlePage={handlePage}
        saveBoard={saveBoard}
        dataBoard={dataBoard}
        setNameBoard={setNameBoard}
      />
    );
  }
}

export default App;
