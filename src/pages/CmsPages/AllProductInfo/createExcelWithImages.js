const ExcelJS = require("exceljs");
const fs = require("fs");
const path = require("path");

const funcadasd = () => {
  async function createExcelWithImages({ product, images }) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("محصولات");

    // تعریف هدرها
    worksheet.columns = [
      { header: "Part No", key: "partNo", width: 20 },
      { header: "قیمت همکار", key: "partnerPrice", width: 15 },
      { header: "لینک محصول", key: "productLink", width: 40 },
      { header: "تصویر", key: "image", width: 20 },
    ];

    // داده‌های فرضی نمونه (جایگزین کن با دیتابیس یا ورودی واقعی)
    const products = [
      {
        id: 1,
        partNo: "ABC123",
        partnerPrice: 120000,
        smallImage: "images/abc123.jpg",
      },
      {
        id: 2,
        partNo: "DEF456",
        partnerPrice: 250000,
        smallImage: "images/def456.jpg",
      },
    ];

    // اضافه کردن داده‌ها و تصاویر
    for (let i = 0; i < products.length; i++) {
      const item = products[i];

      worksheet.addRow({
        partNo: item.partNo,
        partnerPrice: item.partnerPrice,
        productLink: `https://www.sanecomputer.com/product/${item.id}`,
      });

      const imagePath = path.join(__dirname, item.smallImage);

      if (fs.existsSync(imagePath)) {
        const imageId = workbook.addImage({
          filename: imagePath,
          extension: "jpeg", // یا "png" بسته به نوع فایل
        });

        // درج عکس در سلول خاص، فرض بر این است که ستون D برای عکس است
        worksheet.addImage(imageId, {
          tl: { col: 3, row: i + 1 }, // ستون D معادل index = 3 (صفر مبنا)
          ext: { width: 50, height: 50 },
        });
      }
    }

    // ذخیره فایل
    await workbook.xlsx.writeFile("products_with_images.xlsx");
    console.log("فایل اکسل با موفقیت ساخته شد");
  }

  createExcelWithImages();
};

export default funcadasd;
