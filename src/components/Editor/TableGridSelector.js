// components/TableGridSelector.js
import { useState } from "react";
import "./table-grid-selector.css";

const TableGridSelector = ({ onSelect }) => {
  const [hovered, setHovered] = useState({ rows: 0, cols: 0 });

  const rows = 8;
  const cols = 8;

  return (
    <div className="grid-selector">
      {[...Array(rows)].map((_, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {[...Array(cols)].map((_, colIdx) => {
            const isSelected = rowIdx <= hovered.rows && colIdx <= hovered.cols;
            return (
              <div
                key={colIdx}
                className={`grid-cell ${isSelected ? "selected" : ""}`}
                onMouseEnter={() => setHovered({ rows: rowIdx, cols: colIdx })}
                onClick={() => onSelect(rowIdx + 1, colIdx + 1)}
              ></div>
            );
          })}
        </div>
      ))}
      <div className="grid-label">
        {hovered.rows + 1} × {hovered.cols + 1}
      </div>
    </div>
  );
};

export default TableGridSelector;
