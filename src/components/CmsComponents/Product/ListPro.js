import { DownloadDone, DownloadDoneOutlined, DownloadOutlined, DownloadRounded } from '@mui/icons-material'
import { Download } from '@phosphor-icons/react'
import React from 'react'
import DownloadFile from '../../../utils/DownloadFile'
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2'
import alertA from '../../../utils/AlertFunc/AlertA'
import apiUrl from '../../../utils/ApiConfig'
import downloadExcel from '../../../utils/downloadExcel'

export default function ListPro() {
    const func = () => {
        alertA("")
    }
    const getExell = () => {
        ApiGetX2(`/api/CyProducts/getExellFromProduct`, func)
    }

    const downloadExcel = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/CyProducts/getExellFromProduct`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("خطا در دریافت فایل");
            }

            // تبدیل پاسخ به Blob
            const blob = await response.blob();

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
        } catch (error) {
            console.error("خطا:", error);
        }
    };

    const downloadExcelAll = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/CyProducts/getExellFromAllProduct`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("خطا در دریافت فایل");
            }

            // تبدیل پاسخ به Blob
            const blob = await response.blob();

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
        } catch (error) {
            console.error("خطا:", error);
        }
    };
    const downloadExcelByPrice = async (url) => {
        try {
            const response = await fetch(`${apiUrl}/api/CyProducts/getExellFromProductByAllPrice`, {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error("خطا در دریافت فایل");
            }

            // تبدیل پاسخ به Blob
            const blob = await response.blob();

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
        } catch (error) {
            console.error("خطا:", error);
        }
    };


    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12  mt-3'>

                    <button className='btn btn-primary listpro-btn'
                        onClick={() => {
                            downloadExcel()
                        }}
                    >لیست محصولات موجود (اکسل) <DownloadRounded style={{ color: "#fff" }}

                        /></button>
                </div>

                <div className='col-12  mt-3'>

                    <button className='btn btn-success listpro-btn'
                        onClick={() => {
                            downloadExcelAll()
                        }}
                    >لیست همه محصولات (اکسل) <DownloadRounded style={{ color: "#fff" }}

                        /></button>



                </div>

                <div className='col-12  mt-3'>
                    <button className='btn btn-warning listpro-btn'
                        onClick={() => {
                            downloadExcelByPrice()
                        }}
                    >لیست محصولات موجود با قیمت  (اکسل) <DownloadRounded style={{ color: "#fff" }}

                        /></button>
                </div>

            </div>

        </div>
    )
};
