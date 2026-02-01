import React from "react";

const LineHeightSelect = ({ editor }) => {
  if (!editor) return null;

  const options = ["0.5", "1", "1.25", "1.5", "1.75", "2", "2.5", "3"];

  const currentLineHeight =
    editor.getAttributes("paragraph")?.lineHeight || "default";

  const handleChange = (e) => {
    const value = e.target.value;
    if (value === "default") {
      editor.chain().focus().setLineHeight(null).run();
    } else {
      editor.chain().focus().setLineHeight(value).run();
    }
  };

  return (
    <select
      onChange={handleChange}
      value={currentLineHeight}
      className="border rounded px-2 py-1 text-sm"
    >
      <option value="default">Line Height</option>
      {options.map((val) => (
        <option key={val} value={val}>
          {val}
        </option>
      ))}
    </select>
  );
};

export default LineHeightSelect;
