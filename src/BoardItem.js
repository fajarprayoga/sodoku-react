import React from "react";

const BoardItem = ({ value, idItem, onClick, className }) => {
  return (
    <div onClick={onClick} className={className} id={idItem}>
      {value == "-" ? "" : value}
    </div>
  );
};

export default BoardItem;
