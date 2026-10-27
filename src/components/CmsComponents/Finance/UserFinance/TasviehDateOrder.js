import { DownloadDone, DownloadDoneOutlined, DownloadOutlined, DownloadRounded } from '@mui/icons-material'
import { Download } from '@phosphor-icons/react'
import React, { useEffect, useState } from 'react'
import ApiGetX2 from '../../../../utils/ApiServicesX/ApiGetX2'
import alertA from '../../../../utils/AlertFunc/AlertA'
import apiUrl from '../../../../utils/ApiConfig'
import { Blocks } from 'react-loader-spinner'
import BaseGrid from '../../../Grid/BaseGrid'
import DateFormat from '../../../../utils/DateFormat'

export default function TasviehDateOrder() {
    const [dnaflag, setDnaflag] = useState(false)
    const [tasviehDateOrders, setTasviehDateOrders] = useState([])

    const [colDefs] = useState([
        { field: "userName", headerName: "نام کاربر", Width: 150 },
        { field: "mobile", headerName: "شماره موبایل", Width: 150 },
        { field: "phone", headerName: "شماره تلفن", Width: 150 },
        {
            field: "tasviehDate", headerName: "تاریخ تسویه", Width: 150, width: 250,
            cellRenderer: (params) => <DateFormat dateString={params.value} />,
        },
        { field: "orderMount", headerName: "مبلغ سفارش", Width: 150 },
        { field: "orderId", headerName: "شماره سفارش", Width: 150 },
    ])

    const downloadExcel = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/Account/getExellTasviehDate`, {
                method: "POST",
                body: JSON.stringify(tasviehDateOrders),
                headers: {
                    "Content-Type": "application/json",
                },
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
            link.download = "فاکتورهای سررسید شده .xlsx"; // نام فایل دانلودی
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

    const getTasviehDateOrders = () => {
        console.log("getTasviehDateOrders")
        ApiGetX2(`/api/Account/getTasviehDate`, setTasviehDateOrders)
    }


    useEffect(() => {
        getTasviehDateOrders()
    }, [])
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
                    <div className='col' style={{ height: "1000px", }}>
                        <BaseGrid rowData={tasviehDateOrders} colDefs={colDefs} rtl={true} fontSize='18px' />
                    </div>



                </div>



            </div>

        </div>
    )
};
