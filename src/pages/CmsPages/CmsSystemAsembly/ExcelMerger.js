import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExcelMerger = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleFileUpload = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const extractNumbers = (text) => {
    if (!text) return "";
    const match = text.toString().match(/\d+/g);
    return match ? match.join("") : "";
  };

  const handleMerge = async () => {
    if (!file1 || !file2) {
      alert("لطفاً هر دو فایل را انتخاب کنید!");
      return;
    }

    try {
      const data1 = await fileToSheet(file1);
      const data2 = await fileToSheet(file2);

      const map = new Map();
      const removedItems = [];
      const remainingItems = [];

      // پر کردن نقشه با داده‌های فایل اول
      data1.forEach((row) => {
        if (!row["نام كالا"]) return;
        const numberPart = extractNumbers(row["نام كالا"]);
        map.set(numberPart, { ...row });
      });

      // پردازش داده‌های فایل دوم
      data2.forEach((row) => {
        if (!row["نام كالا"]) return;
        const numberPart = extractNumbers(row["نام كالا"]);
        if (map.has(numberPart)) {
          const existingRow = map.get(numberPart);
          const groupMatch =
            row["گروه فرعي"] === existingRow["گروه فرعي"] ||
            row["گروه اصلي"] === existingRow["گروه اصلي"];

          if (groupMatch) {
            removedItems.push({ ...row, color: "red" });
          } else {
            remainingItems.push({ ...row });
          }
        } else {
          remainingItems.push({ ...row });
        }
      });

      // ترکیب داده‌های اکسل اول، باقی‌مانده‌های اکسل دوم و موارد حذف‌شده
      const combinedData = [...data1, ...remainingItems, ...removedItems];

      // ایجاد فایل اکسل جدید
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(combinedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "Combined");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "combined_data.xlsx");
    } catch (error) {
      console.error("خطا در ترکیب فایل‌ها:", error);
    }
  };

  const fileToSheet = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        resolve(sheetData);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <h1>ترکیب فایل‌های اکسل</h1>
      <input type="file" accept=".xlsx" onChange={(e) => handleFileUpload(e, setFile1)} />
      <input type="file" accept=".xlsx" onChange={(e) => handleFileUpload(e, setFile2)} />
      <button onClick={handleMerge}>ترکیب فایل‌ها</button>
    </div>
  );
};

export default ExcelMerger;








// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const ExcelMerger = () => {
//   const [file1, setFile1] = useState(null);
//   const [file2, setFile2] = useState(null);

//   const handleFileUpload = (e, setFile) => {
//     setFile(e.target.files[0]);
//   };

//   const normalizeName = (name) => {
//     if (!name) return ""; // اگر مقدار undefined یا null باشد، رشته خالی برگردان
//     return name
//       .toString()
//       .trim()
//       .replace(/[-./]/g, "") // حذف خط فاصله، نقطه، ممیز
//       .toLowerCase(); // حروف کوچک
//   };

//   const handleMerge = async () => {
//     if (!file1 || !file2) {
//       alert("لطفاً هر دو فایل را انتخاب کنید!");
//       return;
//     }

//     try {
//       const data1 = await fileToSheet(file1);
//       const data2 = await fileToSheet(file2);

//       const map = new Map();
//       const removedItems = [];

//       // پر کردن نقشه با داده‌های فایل اول
//       data1.forEach((row) => {
//         if (!row["نام كالا"]) return; // بررسی خالی بودن ستون
//         const normalizedName = normalizeName(row["نام كالا"]);
//         map.set(normalizedName, { ...row });
//       });

//       // پردازش داده‌های فایل دوم
//       data2.forEach((row) => {
//         if (!row["نام كالا"]) return; // بررسی خالی بودن ستون
//         const normalizedName = normalizeName(row["نام كالا"]);
//         if (map.has(normalizedName)) {
//           // افزودن موجودی به فایل اول
//           const existingRow = map.get(normalizedName);
//           existingRow["موجودي"] =
//             (existingRow["موجودي"] || 0) + (row["موجودي"] || 0);
//           map.set(normalizedName, existingRow);
//           removedItems.push(row); // ثبت آیتم حذف‌شده
//         } else {
//           // اضافه کردن آیتم جدید به نقشه
//           map.set(normalizedName, { ...row });
//         }
//       });

//       // نمایش موارد حذف‌شده در کنسول
//       console.log("موارد حذف‌شده از فایل دوم:", removedItems);

//       // تبدیل نقشه به آرایه
//       const combinedData = Array.from(map.values());

//       // ایجاد فایل اکسل جدید
//       const workbook = XLSX.utils.book_new();
//       const worksheet = XLSX.utils.json_to_sheet(combinedData);
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Combined");

//       const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
//       const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
//       saveAs(blob, "combined_data.xlsx");
//     } catch (error) {
//       console.error("خطا در ترکیب فایل‌ها:", error);
//     }
//   };

//   const fileToSheet = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
//         resolve(sheetData);
//       };
//       reader.onerror = reject;
//       reader.readAsArrayBuffer(file);
//     });
//   };

//   return (
//     <div>
//       <h1>ترکیب فایل‌های اکسل</h1>
//       <input type="file" accept=".xlsx" onChange={(e) => handleFileUpload(e, setFile1)} />
//       <input type="file" accept=".xlsx" onChange={(e) => handleFileUpload(e, setFile2)} />
//       <button onClick={handleMerge}>ترکیب فایل‌ها</button>
//     </div>
//   );
// };

// export default ExcelMerger;
