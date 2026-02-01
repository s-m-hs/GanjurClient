import React, { useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./fontcss.css";
import apiUrl from "../../utils/ApiConfig";

// کامپوننت تولبار سفارشی
const CustomToolbar = () => (
  <div id="toolbar">
    {/* دکمه‌های پیش‌فرض */}
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-link"></button>
    {/* دکمه سفارشی آپلود تصویر */}
    <button
      type="button"
      className="ql-custom-image"
      onClick={() => {
        console.log("object");
      }}
    >
      📷
    </button>
  </div>
);

const TextEditor = ({ value, onChange, isDark }) => {
  const quillRef = useRef(null); // ریفرنس به ادیتور

  // هندلر آپلود فایل
  const fileUploadHandler = async (file) => {
    const formData = new FormData();
    formData.append("File", file);

    try {
      const response = await fetch(`${apiUrl}/api/CyFiles/upload`, {
        method: "POST",
        credentials: "include",

        body: formData,
      });
      const result = await response.json();
      const imageUrl = result.adress;

      // افزودن تصویر به ادیتور
      const quillEditor = quillRef.current.getEditor();

      // اطمینان از فوکوس ادیتور
      quillEditor.focus();

      // گرفتن موقعیت نشانگر
      const range = quillEditor.getSelection();
      if (range) {
        // اگر موقعیت مشخص باشد، تصویر در همان مکان درج می‌شود
        quillEditor.insertEmbed(range.index, "image", imageUrl);
      } else {
        // اگر موقعیت مشخص نباشد، تصویر به انتهای متن اضافه می‌شود
        quillEditor.insertEmbed(quillEditor.getLength() - 1, "image", imageUrl);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // هندلر کلیک برای دکمه سفارشی
  const handleCustomImageClick = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        await fileUploadHandler(file);
      }
    };
    input.click();
  };

  // تنظیمات ماژول
  const modules = {
    toolbar: {
      toolbar: [
        [{ font: ["serif", "monospace"] }], // Custom font family list
        [{ size: ["small", false, "large", "huge"] }], // Custom font size list
        [{ color: [] }, { background: [] }], // Text color and background color
        [{ header: "1" }, { header: "2" }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ direction: "rtl" }],
        ["link", "image", "video"],
        ["clean"],
      ],
      container: "#toolbar", // اتصال به تولبار سفارشی
      handlers: {
        "custom-image": handleCustomImageClick, // اتصال هندلر کلیک
      },
    },
  };

  return (
    <div>
      {/* تولبار سفارشی */}
      <CustomToolbar />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        className={isDark ? "quill-dark" : "quill-light"}
        style={{ height: "400px", fontFamily: "Yekan, sans-serif" }}
      />
    </div>
  );
};

export default TextEditor;
