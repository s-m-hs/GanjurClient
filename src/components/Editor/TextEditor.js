import React, { useRef, useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize";
import "react-quill/dist/quill.snow.css";
import "./fontcss.css";
import apiUrl from "../../utils/ApiConfig";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CustomToolbar from "./CustomToolbar";

// Import necessary Quill modules
const BlockEmbed = Quill.import("blots/block/embed");

// Blot for resizable HTML
class ResizableHTMLBlot extends BlockEmbed {
  static create(value) {
    const node = super.create();
    node.innerHTML = value.html || ""; // Insert the HTML content
    node.setAttribute("contenteditable", false);
    node.style.position = "relative";
    node.style.display = "inline-block";
    node.style.width = value.width || "300px";
    node.style.height = value.height || "150px";
    node.style.border = "1px solid #ccc";

    // Add a resize handle
    const resizeHandle = document.createElement("div");
    resizeHandle.style.position = "absolute";
    resizeHandle.style.right = "0";
    resizeHandle.style.bottom = "0";
    resizeHandle.style.width = "5px";
    resizeHandle.style.height = "5px";
    resizeHandle.style.backgroundColor = "#000";
    resizeHandle.style.cursor = "nwse-resize";

    resizeHandle.addEventListener("mousedown", (e) => {
      e.preventDefault();
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = parseInt(window.getComputedStyle(node).width, 10);
      const startHeight = parseInt(window.getComputedStyle(node).height, 10);

      const onMouseMove = (event) => {
        const newWidth = startWidth + (event.clientX - startX);
        const newHeight = startHeight + (event.clientY - startY);
        node.style.width = `${newWidth}px`;
        node.style.height = `${newHeight}px`;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });

    node.appendChild(resizeHandle);
    return node;
  }

  static value(node) {
    return {
      html: node.innerHTML,
      width: node.style.width,
      height: node.style.height,
    };
  }
}

ResizableHTMLBlot.blotName = "resizableHTML";
ResizableHTMLBlot.tagName = "div";
Quill.register(ResizableHTMLBlot);

////////////////////
// Create a Custom Image Blot
const ImageBlot = Quill.import("formats/image");
class CustomImageBlot extends ImageBlot {
  static create(value) {
    const node = super.create(value);
    if (typeof value === "object") {
      node.setAttribute("src", value.src);
      if (value.style) node.setAttribute("style", value.style);
      if (value.align) node.setAttribute("align", value.align);
      if (value.width) node.setAttribute("width", value.width);
      if (value.alt) node.setAttribute("alt", value.alt);
    }
    return node;
  }

  static value(node) {
    return {
      src: node.getAttribute("src"),
      style: node.getAttribute("style") || "",
      align: node.getAttribute("align") || "",
      width: node.getAttribute("width") || "",
      alt: node.getAttribute("alt") || "",
    };
  }
}

const Font = Quill.import("formats/font");
Font.whitelist = [
  "serif",
  "monospace",
  "vazir",
  "Yekan",
  "BMitra",
  "BTITRBD",
  "BNazanin",
];
Quill.register(Font, true);

CustomImageBlot.blotName = "customImage";
CustomImageBlot.tagName = "img";
Quill.register(CustomImageBlot);

Quill.register("modules/imageResize", ImageResize);

//////////////////////////////
const HtmlBlot = Quill.import("blots/block");
class CustomHTMLBlot extends HtmlBlot {
  static create(value) {
    const node = super.create(value);
    return node;
  }

  static formats(node) {
    return {};
  }
}

CustomHTMLBlot.blotName = "html";
CustomHTMLBlot.tagName = "div"; // یا هر تگ دلخواه دیگر
Quill.register(CustomHTMLBlot);

///////////////////////////

const TextEditor = ({ value, onChange, isDark, height, image }) => {
  const editorRef = useRef(null);
  const [altText, setAltText] = useState("");
  const changAlttext = (e) => {
    setAltText(e.target.value);
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "link",
    "image",
    "resizableHTML",
  ];
  const modules = {
    toolbar: "#toolbar",

    imageResize: {},
    clipboard: {
      matchVisual: false,
    },
  };

  const handleInsertHTML = () => {
    const html = prompt("Enter your HTML code (e.g., <iframe>):");
    if (html && editorRef.current) {
      const quill = editorRef.current.getEditor();
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, "resizableHTML", {
        html,
        width: "300px",
        height: "150px",
      });
      quill.setSelection(range.index + 1, Quill.sources.SILENT);
    }
  };
  const fileUploadHandler = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    let formData = new FormData();
    formData.append("File", file);

    const res = await fetch(`${apiUrl}/api/CyFiles/upload`, {
      method: "POST",
      credentials: "include",

      body: formData,
    });

    const result = await res.json();
    const imageUrl = `${apiUrl}/${result.adress}`;

    if (editorRef.current) {
      const quill = editorRef.current.getEditor();
      const range = quill.getSelection();

      if (range) {
        quill.insertEmbed(range.index, "customImage", {
          src: imageUrl,
          alt: altText,
          style:
            "display: inline; margin: 0px 0px 1em 1em; float: revert-layer;",
          width: "311",
        });
        quill.setSelection(range.index + 1);
        setAltText("");
      } else {
        const length = quill.getLength();
        quill.insertEmbed(length, "customImage", {
          src: imageUrl,
          alt: altText,
          style:
            "display: inline; margin: 0px 0px 1em 1em; float: revert-layer;",
          width: "311",
        });
        quill.setSelection(length + 1);
        setAltText("");
      }
    }
  };

  useEffect(() => {
    if (editorRef.current) {
      const quill = editorRef.current.getEditor();
      quill.clipboard.dangerouslyPasteHTML(value); // Add HTML content to the editor
    }
  }, []);
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className="textEditor-img-div">
          {image ? (
            <>
              <AddPhotoAlternateIcon className="textEditor-img-icon" />
              {/* <img src="../../../../images/40166.png" alt="" className="textEditor-img-icon"/> */}
              {/* <i class="fa-solid fa-file-image"></i> */}
              <input
                className="textEditor-img-input"
                type="file"
                onChange={fileUploadHandler}
                accept="image/*"
              />
              <input
                type="text"
                className="textEditor-alttext-input"
                placeholder="alt text"
                onChange={changAlttext}
                value={altText}
              />
            </>
          ) : (
            ""
          )}
          <CustomToolbar onInsertHTML={handleInsertHTML} />
          <ReactQuill
            ref={editorRef}
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            // formats={formats}
            className={isDark ? "quill-dark" : "quill-light"}
            style={{ height: height, fontFamily: "Yekan, sans-serif" }}
          />
        </div>
      </div>
    </>
  );
};

export default TextEditor;
