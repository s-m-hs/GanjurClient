import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ExportToExcel = ({ phoneNumbers }) => {
  const exportExcel = () => {
    // تبدیل آرایه به فرمت ستونی
    const worksheet = XLSX.utils.aoa_to_sheet(
      phoneNumbers.map((number) => [Number(number)])
    );

    // تنظیم فرمت سلول‌ها به number
    Object.keys(worksheet).forEach((key) => {
      if (key.startsWith("A")) {
        worksheet[key].t = "n"; // type: number
      }
    });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Phone Numbers");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(data, "PhoneNumbers.xlsx");
  };

  return <button onClick={exportExcel}>دانلود فایل اکسل</button>;
};

export default ExportToExcel;
