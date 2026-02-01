import React, { useState } from "react";
import TableGridSelector from "./TableGridSelector"; // مسیر درست رو بذار

const TableInsertButton = ({ editor, onInsert }) => {
  const [showGrid, setShowGrid] = useState(false);
  const [borderShow, setBorderShow] = useState(false);
  const toggleGrid = () => {
    setShowGrid((prev) => !prev);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div className="centerr">
        <button type="button" onClick={toggleGrid}>
          <i class="fa-solid fa-plus"></i>
          <i class="fa-solid fa-border-all "></i>
        </button>

        <button
          type="button"
          onClick={() => setBorderShow(!borderShow)}
          aria-label="Toggle table border"
        >
          {!borderShow ? (
            <i class="fa-solid fa-border-none"></i>
          ) : (
            <i class="fa-solid fa-border-all"></i>
          )}
        </button>
      </div>
      {showGrid && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            zIndex: 10,
            width: "100%",
          }}
        >
          {/* <TableGridSelector onSelect={onInsert} /> */}
          <TableGridSelector
            onSelect={(rows, cols) => {
              editor
                ?.chain()
                .focus()
                .insertTable({
                  rows,
                  cols,
                  withHeaderRow: true,
                })
                .updateAttributes("table", {
                  class: !borderShow
                    ? "table table-borderless"
                    : "table  table-bordered ",
                  style:
                    "width: 100%; table-layout: fixed; border-collapse: collapse;text-align: center,",
                })
                .run();

              setShowGrid(false); // Close the grid after inserting the table
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TableInsertButton;
