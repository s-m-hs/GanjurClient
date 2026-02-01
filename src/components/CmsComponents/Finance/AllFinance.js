import React, { useContext, useEffect, useState } from 'react'
import { CmsContext, HomeContext } from '../../../context/CmsContext';
import BaseGrid from '../../Grid/BaseGrid';
import DateFormat from '../../../utils/DateFormat';
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
export default function AllFinance() {
        const cmsContext = useContext(CmsContext);
        const homeContext = useContext(HomeContext);
        const [voucherS, setvoucherS] = useState([])
        const [voucherItems,setVoucherItems]=useState([])
 const [value4, setValue4] = useState();
    const [value5, setValue5] = useState();

    function handleChange(value) {
        setValue4(value && value.toDate());
        // console.log(value.format());   /// convert  to persian format
    }
    function handleChangeB(value) {
        setValue5(value && value.toDate());
    }


    const [colDefs] = useState([
        { field: "id", headerName: "شناسه", cellRenderer: (params) => (
      <>
      <button className="btn btn-info"
      onClick={()=>{
        setVoucherItems([])
        setVoucherItems(params.data.items)}}
      >{params.data.id}</button>
      </>
    ) },
        { field: "referenceId", headerName: "referenceId", Width: 100 },
        { field: "referenceType", headerName: " referenceType", cellRenderer: (params) => params.value?.toLocaleString() },
        { field: "description", headerName: "شرح", Width: 100 },
                  {
            field: "voucherDate",
            headerName: "تاریخ سند",
            width: 300,
            cellRenderer: (params) => <DateFormat dateString={params.value} />,
        },
        {
            field: "createDate",
            headerName: "تاریخ ایجاد",
            width: 300,
            cellRenderer: (params) => <DateFormat dateString={params.value} />,
        },
  ])



            useEffect(() => {
                cmsContext.setFlagClass(false);
                homeContext.setSideMenueFlag(false)
                return () => cmsContext.setFlagClass(true);
            }, [])

                useEffect(() => {
                    if (value4 && value5 && value4 <= value5) {
                        ApiGetX2(`/api/Voucher/?fromDate=${value4?.toISOString()}&toDate=${value5?.toISOString()}`, setvoucherS)
            
                    } else if (value4 >= value5) {
                        setvoucherS([])
                    }
                }, [value4, value5])
  return (

<>
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


                    <div className='col' style={{ height: "1000px", }}>
                    <BaseGrid rowData={voucherS} colDefs={colDefs} rtl={true} fontSize='18px' />

                    {voucherItems?.length!= 0 &&        
                         <div className="orderDetail-div boxSh">
                    
                    <div className="orderDetail-div-B ">
                    
                    <table className="table table-dark">
                    <thead>
                      <tr>
                        <th> طرف حساب اول</th>
                        <th> طرف حساب دوم</th>
                        <th>بدهکاری  </th>
                        <th>بستانکاری</th>
                        <th>مانده سند</th>
                      </tr>
                    </thead>
                    
                    <tbody>
                    
                    {voucherItems?.length !=0 && voucherItems?.map((item)=>(
                      <tr>
                    <td>{item.accountId}:{item.accountName}</td>
                    <td>{item.toAccountId}</td>
                    <td>{item.debit?.toLocaleString()}ریال</td>
                    <td>{item.credit?.toLocaleString()}ریال</td>
                    <td>{item.mandehHesab}</td>
                    
                      </tr>
                    ))}
                    
                    </tbody>
                    
                    
                    </table>
                    
                    
                    
                    </div>
                    
                            </div>}
                </div> 

</>
    
             )
}
