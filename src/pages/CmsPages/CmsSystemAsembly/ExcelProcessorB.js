import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExcelProcessorB = () => {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const processFile = async () => {
    if (!file) {
      alert("لطفاً یک فایل اکسل انتخاب کنید!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // فرض می‌کنیم اولین شیت اکسل شما مورد نظر است
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const newData = [["Name", "Quantity", "Price"]]; // عنوان ستون‌های جدید

      jsonData.forEach((row) => {
        for (let i = 0; i < row.length; i += 2) {
          const name = row[i] || ""; // ستون‌های فرد
          const price = row[i + 1] || ""; // ستون‌های زوج
          newData.push([name, 1, price]);
        }
      });

      // ساخت اکسل جدید
      const newSheet = XLSX.utils.aoa_to_sheet(newData);
      const newWorkbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(newWorkbook, newSheet, "Processed Data");

      // ذخیره فایل
      const excelBuffer = XLSX.write(newWorkbook, {
        bookType: "xlsx",
        type: "array",
      });
      const blob = new Blob([excelBuffer], {
        type: "application/octet-stream",
      });
      saveAs(blob, "ProcessedFile.xlsx");
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <h5>پردازش فایل اکسل</h5>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <button onClick={processFile}>ایجاد فایل جدید</button>
    </div>
  );
};

export default ExcelProcessorB;
