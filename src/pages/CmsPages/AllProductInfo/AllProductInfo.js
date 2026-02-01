import React, { useContext, useEffect, useState } from "react";
import { CmsContext } from "../../../context/CmsContext";
import apiUrl from "../../../utils/ApiConfig";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import vazirmatn from "./vazirmatn-normal-ttf";
import Btitr from "./Btitr";
import ProductTable from "./ProductTable";
import ApiGetX2 from "../../../utils/ApiServicesX/ApiGetX2";
import { TextAUnderline } from "@phosphor-icons/react";
export default function AllProductInfo() {
  let { setFlagClass } = useContext(CmsContext);
  const [allProduct, setAllProduct] = useState([]);
  const [manufacture, setManufacture] = useState([]);
  const allpro = allProduct
    ?.filter((filter) => filter.cyCategoryId != null && filter.partnerPrice != null && filter.supply != 0)
    .sort((a, b) => b.cyManufacturerId - a.cyManufacturerId)
    .sort((a, b) => a.cyProductCategoryId - b.cyProductCategoryId);
  const [allCategory, setAllCategory] = useState([]);
  console.log(allpro);
  const getAllProduct = () => {
    let obj = {
      cat: "string",
      pageNumber: 0,
      pageSize: 100000,
    };

    async function myAppPost() {
      try {
        const res = await fetch(`${apiUrl}/api/CyProducts/getAllProducts`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        if (res.ok) {
          const result = await res.json();
          setAllProduct(result.itemList);
        }
      } catch (err) {
        console.log(err);
      }
    }

    myAppPost();
  };

  const GetCategoryItem = () => {
    // setFlagpagin(true)
    let obj = {
      pageNumber: 0,
      pageSize: 1000,
    };
    async function myAppGetProduct() {
      const res = await fetch(`${apiUrl}/api/CyProductCategory/getPagedProductCategories`, {
        method: "POST",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result) {
            console.log(result);
            setAllCategory(result.itemList);
            // setAllCategory(result.allCount);

            //  setProductArray(result. itemList)
            //     setStateArray(result.allCount)
            //     setFlagpagin(false)
          }
        })
        .catch((error) => {
          console.log(error);
          // navigate("/errorpage");
        });
    }
    myAppGetProduct();
  };
  // const getImageAsBase64 = async (url) => {
  //   const response = await fetch(url);
  //   const blob = await response.blob();

  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result);
  //     reader.onerror = reject;
  //     reader.readAsDataURL(blob); // تبدیل به base64
  //   });
  // };
  // console.log(allpro);
  // console.log(manufacture);
  const getImageAsBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const fixMixedText = (text) => {
    return text.replace(/([a-zA-Z0-9\-_.]+)/g, (match) => {
      return match.split("").reverse().join("");
    });
  };
  const splitOnFirstEnglish = (text) => {
    const match = text.match(/[a-zA-Z0-9\-_\.]+/);

    if (match) {
      const index = match.index;
      const part1 = text.slice(0, index).trim();
      const part2 = text.slice(index).trim();
      return `${part1}\n${part2}`;
    }

    // اگه متن انگلیسی نداشت، خودش رو برگردون
    return text;
  };
  const exportPDF = async () => {
    const jsPDF = (await import("jspdf")).default;
    const autoTable = (await import("jspdf-autotable")).default;
    const doc = new jsPDF();

    doc.addFileToVFS("Vazirmatn.ttf", vazirmatn);
    doc.addFont("Vazirmatn.ttf", "Vazirmatn", "normal");
    doc.setFont("Vazirmatn");

    // فرض می‌کنیم تصویر لوگو در مسیر public هست
    const logoUrl = `${window.location.origin}/images/photo_2023-12-28_17-13-57.jpg`; // مسیر نسبی لوگو
    const logoBase64 = await getImageAsBase64(logoUrl);

    // درج تصویر لوگو
    doc.addImage(logoBase64, "JPEG", 20, 10, 20, 20); // x, y, width, height

    // محاسبه محل شروع جدول بعد از تصویر و تیتر
    const tableStartY = 35;

    doc.setFontSize(14);
    doc.setTextColor("#0daab5");
    doc.text("لیست کامل محصولات کامپیوترصانع", doc.internal.pageSize.getWidth() / 2, 10, { align: "center" });
    // doc.text(" محصولات", doc.internal.pageSize.getWidth() / 2, 20, { align: "left" });
    doc.setFontSize(10);

    doc.text(" تماس :02537835456-02537835457", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
    doc.text(" منتظری :09045443715  سیدی :09045443711", doc.internal.pageSize.getWidth() / 2, 25, { align: "center" });
    // doc.text(" منتظری :09381503344", doc.internal.pageSize.getWidth() / 3, 25, { align: "justify" });

    const url = `https://eitaa.com/sane_camputer`;
    // doc.setTextColor(0, 0, 255);
    doc.setFillColor("#0daab5");
    doc.textWithLink("@sanesale  : سفارش در ایتا ", doc.internal.pageSize.getWidth() / 2, 30, { align: "center", url });
    doc.setTextColor(0, 0, 0);

    // doc.text("@sanesale  : سفارش در ایتا ", doc.internal.pageSize.getWidth() / 2, 30, { align: "center" });

    // const tableColumn = ["IMAGE", "Part No", "Hamkar Price", "Link"];
    const tableColumn = ["دسته بندی", "شرکت", "محصول", "قیمت همکار تومان", "  قیمت مشتری (جزئیات)"];
    const tableRows = [];

    // تبدیل تصاویر محلی به base64
    // const getImageAsBase64 = async (url) => {
    //   const response = await fetch(url);
    //   const blob = await response.blob();
    //   return new Promise((resolve, reject) => {
    //     const reader = new FileReader();
    //     reader.onloadend = () => resolve(reader.result);
    //     reader.onerror = reject;
    //     reader.readAsDataURL(blob);
    //   });
    // };
    const imageCache = {};
    for (let item of allpro) {
      const imageUrl = `../../../../images/products/${item.id}.jpg`; // مسیر محلی تصویر
      // try {
      //   const base64 = await getImageAsBase64(imageUrl);
      //   imageCache[item.id] = base64;
      // } catch (err) {
      //   console.warn(`تصویر برای ${item.id} یافت نشد`);
      // }
      const categoryName = allCategory?.filter((filter) => filter.id == item.cyProductCategoryId)[0].name;
      const manufacturName = manufacture?.filter((filter) => filter.id == item.cyManufacturerId)[0]?.name;
      // console.log(manufacturName?.name);

      const fix = splitOnFirstEnglish(item.name);
      const rowData = [
        // "", // تصویر بعداً اضافه میشه
        categoryName,
        manufacturName,
        fix,
        item.partnerPrice ? (item.partnerPrice / 10).toLocaleString() : "استعلام قیمت",
        "", // لینک بعداً اضافه میشه
      ];
      tableRows.push(rowData);
    }
    // ایجاد جدول PDF
    autoTable(doc, {
      startY: tableStartY,
      head: [tableColumn],
      body: tableRows,
      styles: {
        font: "Vazirmatn",
        fontSize: 10,
        minCellHeight: 15, // حداقل ارتفاع ردیف‌ها
        halign: "right",
      },
      headStyles: {
        font: "Vazirmatn",
        fontStyle: "normal",
        // fillColor: [255, 179, 0],
        fillColor: "#0daab5",
        fontSize: 12,
        halign: "right",
        cellPadding: 5,
      },
      columnStyles: {
        0: { cellWidth: 25, textColor: "#000000", fontSize: 11 },
        1: { cellWidth: 25, textColor: "#0117fd", fontSize: 10 },
        2: { cellWidth: 50, textColor: "#0117fd" },
        3: { cellWidth: 30, textColor: "#47426f", fontSize: 12 },
        4: { cellWidth: 30 },
      },
      // didDrawCell: function (data) {
      //   const item = allpro[data.row.index];
      //   // درج تصویر
      //   if (data.column.index === 0 && data.cell.section === "body") {
      //     const imgData = imageCache[item.id];
      //     if (imgData) {
      //       doc.addImage(imgData, "JPEG", data.cell.x + 1, data.cell.y + 1, 30, 30);
      //     } else {
      //       doc.text("ندارد", data.cell.x + 2, data.cell.y + 10);
      //     }
      //   }

      //   // لینک کلیک‌پذیر
      //   if (data.column.index === 3 && data.cell.section === "body") {
      //     const url = `https://www.sanecomputer.com/product/${item.id}`;
      //     doc.setTextColor(0, 0, 255);
      //     doc.textWithLink("جزییات محصول", data.cell.x + 2, data.cell.y + 6, { url });
      //     doc.setTextColor(0, 0, 0);
      //   }
      // },
      didDrawCell: function (data) {
        // فقط روی body اجرا شود
        if (data.section === "body") {
          const rowIndex = data.row.index;
          const item = allpro[rowIndex];
          // تصویر
          // if (data.column.index === 0 && item != undefined) {
          //   const imgData = imageCache[item.id];
          //   if (imgData) {
          //     doc.addImage(imgData, "JPEG", data.cell.x + 1, data.cell.y + 1, 15, 10);
          //   } else {
          //     doc.text("ندارد", data.cell.x + 2, data.cell.y + 10);
          //   }
          // }

          // لینک
          if (data.column.index === 4 && item != undefined) {
            const url = `https://www.sanecomputer.com/product/${item.id}`;
            doc.setTextColor(0, 0, 255);
            doc.textWithLink("جزئیات محصول", data.cell.x + 2, data.cell.y + 6, { url });
            doc.setDrawColor(0, 0, 255); // رنگ خط زیر هم آبی
            doc.setLineWidth(0.2); // ضخامت خط زیر
            const textX = data.cell.x + 2;
            const textY = data.cell.y + 6;
            doc.textWithLink("جزئیات محصول", textX, textY, { url });
            const textWidth = doc.getTextWidth("جزئیات محصول");
            doc.line(textX, textY + 1, textX + textWidth, textY + 1);
            doc.setTextColor(0, 0, 0);
          }
        }
      },
    });

    doc.save("products.pdf");
  };

  const handleDownload = async (imageUrl, id) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${id}.jpg`; // Save as id.jpg
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  // console.log(allCategory);
  useEffect(() => {
    getAllProduct();
    setFlagClass(false);
    GetCategoryItem();
    ApiGetX2("/api/CyManufacturer", setManufacture);
    return () => setFlagClass(true);
  }, []);

  return (
    <div>
      {/* <ProductTable products={allpro} /> */}

      <button onClick={exportPDF} className="btn btn-primary mb-3">
        دانلود PDF
      </button>

      <div>
        <div className="allPro-title centerr">
          <img src="../../../images/photo_2023-12-28_17-13-57.jpg" alt="" style={{ width: "80px" }} />
          <span>sadas</span>
          <span>sadas</span>
          <span>sadas</span>
          <span>sadas</span>
        </div>

        <table className="table">
          <thead>
            <tr style={{ fontFamily: "sans-serif" }}>
              <th>image</th>
              <th>Part No</th>
              <th>Hamkar Price </th>
              <th>link</th>
            </tr>
          </thead>

          <tbody>
            {allProduct.length !== 0 &&
              allpro.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img style={{ width: "50px" }} src={item.smallImage} alt="" />
                  </td>
                  <td>{item.partNo}</td>
                  <td>{item.partnerPrice}</td>
                  <td>
                    <a href={`https://www.sanecomputer.com/product/${item.id}`} target="_blank" rel="noopener noreferrer"></a>
                  </td>

                  <td>
                    <button
                      onClick={() => {
                        handleDownload(item.smallImage, item.id);
                      }}
                    >
                      دانلود عکس
                    </button>
                  </td>

                  <td>
                    <a href={item.smallImage} target="_blank">
                      aaa
                    </a>
                    <br />
                    {item.id}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
