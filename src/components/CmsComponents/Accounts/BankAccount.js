import React, { useContext, useEffect, useState } from 'react'
import BaseGrid from '../../Grid/BaseGrid'
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2'
import { CmsContext, HomeContext } from '../../../context/CmsContext';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import DateFormat from '../../../utils/DateFormat';
import { colorSchemeLightCold } from 'ag-grid-community';
export default function BankAccount() {
    const cmsContext = useContext(CmsContext);
    const homeContext = useContext(HomeContext);
    const [accountS, setAccountS] = useState([])
    const [value4, setValue4] = useState();
    const [value5, setValue5] = useState();
    const [bankId, setBankId] = useState(0)
    const [accuontItems, setAccuontItems] = useState([])

    function handleChange(value) {
        setValue4(value && value.toDate());
        // console.log(value.format());   /// convert  to persian format
    }
    function handleChangeB(value) {
        setValue5(value && value.toDate());
    }
    const [colDefs] = useState([
        { field: "accountName", headerName: "طرف حساب عامل", Width: 300 },
        { field: "debit", headerName: "تراکنش بدهکار", cellRenderer: (params) => params.value?.toLocaleString() },
        { field: "credit", headerName: "تراکنش بستانکار", cellRenderer: (params) => params.value?.toLocaleString() },
        { field: "refrenceType", headerName: "نوع تراکنش", Width: 100 },
         {
            field: "voucherDate",
            headerName: "تاریخ سند",
            width: 250,
            cellRenderer: (params) => <DateFormat dateString={params.value} />,
        },

        { field: "description", headerName: " شرح سند", Width: 100 },
        { field: "accountId", headerName: "شناسه  A", Width: 50 },
        { field: "toAccountId", headerName: "شناسه  B", Width: 50 },
                {
            field: "creatDate",
            headerName: "تاریخ ایجاد",
            width: 200,
            cellRenderer: (params) => <DateFormat dateString={params.value} />,
        },


        // {
        //     headerName: 'عملیات', width: 200,
        //     cellRenderer: (params) => (
        //         <>
        //             <button className='btn btn-info' style={{ width: "30px", height: "15px", margin: "1px", fontSize: "8px", padding: "1px" }} onClick={() => {
        //             }
        //             }>...</button>

        //         </>
        //     )
        // }
    ])

    useEffect(() => {
        ApiGetX2(`/api/Account/getAccountByCode?code=1110`, setAccountS)
        // ApiGetX2(`/api/Account/getAccountById?id=${id}`,setAccountS)
        cmsContext.setFlagClass(false);
        homeContext.setSideMenueFlag(false)
        return () => cmsContext.setFlagClass(true);
    }, [])
    useEffect(() => {
        if (value4 && value5 && value4 <= value5) {
            ApiGetX2(`/api/Account/getAccountById?id=${bankId}&fromDate=${value4?.toISOString()}&toDate=${value5?.toISOString()}`, setAccuontItems)

        } else if (value4 >= value5) {
            setAccuontItems([])
        }
    }, [value4, value5, bankId])
    return (
        <div className='container'>

            <div className='row'>
                <div className='col-4'>
                    <label className="user-col3-selectlabel">  انتخاب بانک </label>
                    <select
                        onChange={(e) => setBankId(e.target.value)}
                        className={
                            "user-col3-select"
                        }
                    >
                        <option value="">انتخاب کنید...</option>
                        {accountS?.map((item) => (
                            <option key={item.id} value={item.id}>
                                {" "}
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-8 centerr allFactor-date ">

                    <div className="m-3"
                        style={{ direction: "rtl" }}
                    >
                        <span className="newsubject-form-col3-span">از:</span>
                        <DatePicker
                            className="custom-input"
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            value={value4}
                            onChange={handleChange}
                            animations={[
                                opacity(),
                                transition({ from: 35, duration: 800 }),
                            ]}
                            render={<InputIcon />}
                        />
                    </div>


                    <div className="m-3"
                        style={{ direction: "rtl" }}
                    >
                        <span className="newsubject-form-col3-span"> تا:</span>
                        <DatePicker
                            className="custom-input"
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            value={value5}
                            onChange={handleChangeB}
                            animations={[
                                opacity(),
                                transition({ from: 35, duration: 800 }),
                            ]}
                            render={<InputIcon />}
                        />
                    </div>


                </div>

            </div>

            <div className='row'>


                <div className='col' style={{ height: "1000px", }}>
                    <BaseGrid rowData={accuontItems} colDefs={colDefs} rtl={true} fontSize='18px' />
                </div>

            </div>

        </div>
    )
}
