import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { Resizable } from "re-resizable";

const ResizableImageComponent = ({ node, updateAttributes, selected }) => {
  const { src, alt, width, alignment } = node.attrs;

  // console.log("node.attrs:", node.attrs); // برای دیباگ
  const wrapStyle = {
    display: "flex",
    justifyContent: alignment === "left" ? "flex-start" : alignment === "right" ? "flex-end" : "center",
    position: "relative",
  };

  const imgStyle = {
    width: width || "100%",
    height: "auto",
    display: "block",
  };

  const setAlign = (align) => updateAttributes({ alignment: align });
  return (
    <NodeViewWrapper className="resizable-image" style={wrapStyle}>
      <Resizable
        size={{ width: width || "300px", height: "auto" }}
        onResizeStop={(e, direction, ref, d) => {
          updateAttributes({ width: ref.style.width });
        }}
        style={{
          display: "inline-block",
          border: selected ? "1px solid #0070f3" : "none",
        }}
      >
        <img src={src} alt={alt} style={{ width: "100%", display: "block" }} />
        {/* <img
          src={src}
          alt={alt}
          style={{
            width: width || "300px",
            height: "auto",
            display: "block",
          }}
        /> */}
        <div
          className="image-toolbar"
          onMouseDown={(e) => e.preventDefault()} // نذار selection از بین بره
        >
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            type="button"
            className={alignment === "left" ? "active" : ""}
            title="چپ‌چین"
            onClick={() => setAlign("left")}
          >
            {/* <i className="fas fa-align-left"></i> */}
            ▶️
          </button>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            type="button"
            className={alignment === "center" ? "active" : ""}
            title="وسط‌چین"
            onClick={() => setAlign("center")}
          >
            {/* <i className="fas fa-align-center"></i> */}
            ↔️
          </button>
          <button
            style={{ border: "none", backgroundColor: "transparent" }}
            type="button"
            className={alignment === "right" ? "active" : ""}
            title="راست‌چین"
            onClick={() => setAlign("right")}
          >
            {/* <i className="fas fa-align-right"></i> */}
            ◀️
          </button>
        </div>
      </Resizable>
      {/* نوار ابزار روی تصویر */}
    </NodeViewWrapper>
  );
};

export default ResizableImageComponent;
