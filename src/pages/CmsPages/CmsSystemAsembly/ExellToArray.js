import React, { useContext, useState } from "react";
import * as XLSX from "xlsx";
import { CmsSistemAssembly } from "../../../context/CmsContext";

const ExellToArray = () => {
  const [data, setData] = useState([]);
  const { setDataProp } = useContext(CmsSistemAssembly);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });

      // گرفتن اولین شیت
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // تبدیل شیت به داده‌های JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // پردازش داده‌ها: ستون‌های فرد و زوج
      const formattedData = [];
      jsonData.forEach((row, rowIndex) => {
        for (let i = 0; i < row.length; i += 2) {
          const product = row[i];
          const price = row[i + 1];

          if (product && price) {
            formattedData.push({
              id: formattedData.length + 1,
              name: product.toString().trim(),
              price: price.toString().trim(),
            });
          }
        }
      });

      setData(formattedData);
      setDataProp(formattedData);
    };

    reader.readAsBinaryString(file);
  };

  // تابع حذف محصولاتی که قیمتشان شامل "call" است
  const handleRemoveCall = () => {
    const filteredData = data.filter(
      (item) => !item.price.toLowerCase().includes("call")
    );
    setData(filteredData); // بروزرسانی آرایه
    setDataProp(filteredData); // بروزرسانی کانتکست
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      <div className="centerr">
        <button type="button" className="btn btn-info" onClick={() => console.log(data)}>
        </button>
        <button type="button" className="btn btn-danger" onClick={handleRemoveCall}>
        </button>
      </div>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
};

export default ExellToArray;
