import apiUrl from "./ApiConfig";


const downloadExcel = async (urll) => {

    async function myApp() {
        const res = await fetch(`${apiUrl}${urll}`, {
            method: 'GET',
            headers: {
                // Authorization: headerAuth,
                "Content-Type": "application/json",
            },
        }).then(res => {
            if (res.ok) {
                // تبدیل پاسخ به Blob
                const blob = res.blob();

                // ساخت لینک دانلود
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "Products.xlsx"; // نام فایل دانلودی
                document.body.appendChild(link);
                link.click();

                // پاکسازی
                link.remove();
                window.URL.revokeObjectURL(url);

            }
        })
    }
    myApp()
}


//     try {
//         const response = await fetch(`${apiUrl}${url}`, {
//             method: "GET",
//         });

//         if (!response.ok) {
//             throw new Error("خطا در دریافت فایل");
//         }

//         // تبدیل پاسخ به Blob
//         const blob = await response.blob();

//         // ساخت لینک دانلود
//         const url = window.URL.createObjectURL(blob);
//         const link = document.createElement("a");
//         link.href = url;
//         link.download = "Products.xlsx"; // نام فایل دانلودی
//         document.body.appendChild(link);
//         link.click();

//         // پاکسازی
//         link.remove();
//         window.URL.revokeObjectURL(url);
//     } catch (error) {
//         console.error("خطا:", error);
//     }
// };


export default downloadExcel