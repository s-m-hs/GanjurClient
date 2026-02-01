import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelProcessor = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startRow, setStartRow] = useState(1);
  const [endRow, setEndRow] = useState(500);

  // تابع برای خواندن فایل اکسل
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // فرض بر اینکه داده‌ها در اولین شیت قرار دارند
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // به صورت آرایه 2 بعدی
      setData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  // انتخاب ردیف‌های خاص
  const filterRows = () => {
    // تبدیل اندیس‌ها به 0-based
    const start = Math.max(0, startRow - 1);
    const end = Math.min(data.length, endRow);
    const selectedRows = data.slice(start, end);
    setFilteredData(selectedRows);
  };

  // دانلود داده‌های فیلتر شده
  const downloadFilteredData = () => {
    const worksheet = XLSX.utils.aoa_to_sheet(filteredData); // ذخیره به صورت آرایه 2 بعدی
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data");

    XLSX.writeFile(workbook, "filtered_data.xlsx");
  };

  return (
    <div>
      <h4>آپلود و پردازش فایل اکسل</h4>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div>
        <label>
          شروع ردیف:
          <input
            type="number"
            value={startRow}
            onChange={(e) => setStartRow(parseInt(e.target.value))}
            min="1"
          />
        </label>
        <label>
          پایان ردیف:
          <input
            type="number"
            value={endRow}
            onChange={(e) => setEndRow(parseInt(e.target.value))}
            min="1"
          />
        </label>
      </div>
      <button onClick={filterRows}>انتخاب ردیف‌های دلخواه</button>
      {filteredData.length > 0 && (
        <button onClick={downloadFilteredData}>دانلود داده‌های فیلتر شده</button>
      )}
    </div>
  );
};

export default ExcelProcessor;
