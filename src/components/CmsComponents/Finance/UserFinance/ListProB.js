import { DownloadDone, DownloadDoneOutlined, DownloadOutlined, DownloadRounded } from '@mui/icons-material'
import { Download } from '@phosphor-icons/react'
import React, { useState } from 'react'
import ApiGetX2 from '../../../../utils/ApiServicesX/ApiGetX2'
import alertA from '../../../../utils/AlertFunc/AlertA'
import apiUrl from '../../../../utils/ApiConfig'
import { Blocks } from 'react-loader-spinner'

export default function ListProB() {
    const [dnaflag, setDnaflag] = useState(false)
    const downloadExcel = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/Account/getExellFromUserBalance?code=8000`, {
                method: "GET",
            });

            if (!response.ok) {
                setDnaflag(false)
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
            setDnaflag(false)
        } catch (error) {
            console.error("خطا:", error);
            setDnaflag(false)
        }
    };



    return (
        <div className='container'>
            <div className='row'>
                {dnaflag &&
                    <div className='dnaa-div'>
                        <span className='dnaaa'>
                            <Blocks
                                height="300"
                                width="300"
                                color="#4fa94d"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                visible={true}
                            />
                        </span>
                    </div>
                }
                <div className='col-12  mt-3'>

                    <button className='btn btn-primary listpro-btn'
                        onClick={() => {
                            setDnaflag(true)
                            downloadExcel()
                        }}
                    >لیست مانده کاربران (اکسل) <DownloadRounded style={{ color: "#fff" }}

                        /></button>
                </div>



            </div>

        </div>
    )
};
