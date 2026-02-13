import React, { useEffect, useRef, useState } from 'react'
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2'
import BaseGrid from '../../Grid/BaseGrid'
import DateFormat from '../../../utils/DateFormat'
import Modal from "react-bootstrap/Modal";
import { useReactToPrint } from 'react-to-print';
import { Check } from '@mui/icons-material';

export default function RepairsList() {
    const [allRepair, setAllRepair] = useState([])
    const [allgaranty, setAllgaranty] = useState([])
  const [servicType, setServicetype] = useState(2)
      const [show, setShow] = useState(false);
      const [currentServic,setCurrentServic]=useState([])
    const printRef = useRef();
  
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "factor",
  });
    const [colDefs] = useState([
      { field: "id", headerName: "کدپذیرش ", Width: 50 ,
        cellRenderer:(params)=>(

            <button className='btn btn-info' onClick={()=>{
                getCurrentServic(params.data.id)
                setShow(true)
            }}>{params.data.id}</button>
        )
      },
      { field: "customerName", headerName: "نام مشتری", Width: 80 },
      { field: "mobile", headerName: "شماره همراه", Width: 80 },
            { field: "createDate", headerName: "تاریخ", Width: 120 ,
cellRenderer: (params) => <DateFormat dateString={params.value} />,
      },
          { field: "servicePrice", headerName: "هزینه سرویس", Width: 100 },
          { field: "productModel", headerName: "مدل", Width: 80 },
          { field: "productBrand", headerName: "برند", Width: 80 },
      { field: "productType", headerName: "نوع", Width: 80 },
  

    ])
const getCurrentServic=(id)=>{
    ApiGetX2(`/api/CyCervice/getService?id=${id}`,setCurrentServic)
}
    useEffect(() => {
        ApiGetX2(`/api/CyCervice/getAllServicesByType?type=2`, setAllRepair)
        ApiGetX2(`/api/CyCervice/getAllServicesByType?type=1`, setAllgaranty)
    }, [])
    return (
        <div className='container'>
    <div className='row m-1' >

        <button className={servicType==1 ? 'btn btn-success col-3' : 'btn btn-warning col-3'}  onClick={()=>{
            if(servicType==1){
setServicetype(2)
            }else if(servicType==2){
setServicetype(1)
            }
        }}>{servicType==1 ? "گارانتی": 'تعمیرات'}</button>
    <div className='col-4'></div>

                </div>

            <div className='row'>
            

                <div className='col-12' style={{ height: '800px' }}>

                    <BaseGrid
                        // rowData={allRepair}
                        rowData={servicType==2 ? allRepair : allgaranty}
                        colDefs={colDefs} 
                         rtl={true} />
                       

                </div>




            </div>


      <Modal show={show} fullscreen={false} onHide={() =>{
setShow(false)
setCurrentServic([])

      } }>
                                        <Modal.Header closeButton></Modal.Header>
                                        <Modal.Body >
                                            <>
                                            {currentServic?.length !=0 && 
                                                                         <div className="col boxSh repair-form-div-main p-2 ">
          <button onClick={() => handlePrint()}>Print</button>
          <div ref={printRef} className="repair-form-div m-1">
            <div className=" repair-form-div-sarbarg centercc">

              <div >
                <span>رسید خدمات کامپیوتر صانع</span>
                <img src="../../../../images/Screenshot_۲۰۲۵۰۹۲۲_۱۹۵۲۰۳_Logo Maker.jpg"
                  style={{ width: '30px' }}
                />
              </div>
            </div>
            <br />
            <div className="repai-form-title repair-span">
              <span>شماره پذیرش :{currentServic.id}</span>
              <span >تاریخ پذیرش : <DateFormat dateString={currentServic.createDate} /></span>

            </div>

            <div className="repai-form-title repair-span">
              <span>نام مشتری :آقای/خانم {currentServic.customerName}</span>
              <span> شماره همراه :{currentServic.mobile}</span>
            </div>

            <div className="repai-form-title">
              <span> نوع کالا : {currentServic.productType}</span>
              <span>  عنوان کالا :{currentServic.productBrand}</span>
            </div>

            <div className="repai-form-title">
              <span>   مدل :{currentServic.productModel}</span>
            </div>

            <div className="repair-problem-div ">
              <span> لوازم همراه:</span>
              <div className="repair-problem-divaccdevices">
                {currentServic?.acceDevices?.length!=0  && currentServic?.acceDevices?.map(item => (
                  <span><Check style={{ fontSize: "10px" }} />{item}</span>
                ))}
              </div>

            </div>


            <div className="repair-problem-div centerc">
              <span>ایراد کالا طبق اظهار مشتری:</span>
              <div className="repair-problem-divaccdevices">

                {currentServic?.productProblem?.length!=0 && currentServic?.productProblem?.map(item => (
                  <span>◼{item}</span>
                ))}
              </div>
            </div>

            <div className="repair-description-div ">
              ملاحظات :
              <p
              >{currentServic.productProblemB}</p>
            </div>

            <hr />
            <ul className="repair-footer" >
              <li>دارنده این رسید مالک دستگاه شناخته میشود لذا در حفط آن کوشا باشید.</li>

{servicType==1 && <>
           <li>زمان بازگشت کالا از گارانتی به عهده شرکت گارانتی کننده می باشد.</li>
              <li>هزینه ارسال محصول جهت گارانتی به عهده مشتری میباشد.</li>
              <li>گارانتی کلیه محصولات به عهده شرکت گارانتی کننده میباشد.</li></>}
{servicType==2 && <>
              <li>کامپیوتر صانع در قبال ضربه،آبخوردگی ودستگاههایی که به صورت خاموش تحویل میگرددهیچ تعهدی ندارد.</li>
              <li>این رسید به مدت 30 روز از تاریخ ثبت آن معتبر است و پس از آن تاریخ فروشگاه هیچ گونه مسولیتی در قبال دستگاه ندارد.</li>
              <li>مسولیت آسیبهای اجتناب ناپذیر در حین تعمیر(شکستگی،خاموشی و ...) به عهده کامپیوتر صانع نمیباشد.</li>
</>}
   
              <li>آدرس :بلوار سمیه -نبش کوچه 5----   37835456/ 37835457</li>

              <li>
              {currentServic.type==1 ? "ارتباط در ایتا 09045443715" : " ارتباط در ایتا : 09045443714"}

              </li>
            </ul>

            <hr />
            <div className="repair-footer-maindiv">

              <div className="repair-footer-personel">

                <span>مشتری:{currentServic.customerName}</span>
                <span>تلفن:{currentServic.mobile}</span>
                <span >تاریخ  : <DateFormat dateString={currentServic.createDate} /></span>
              </div>

              <div className="repair-footer-personel">
                <span> نوع کالا : {currentServic.productType}</span>
                <span>  عنوان کالا :{currentServic.productBrand}</span>

                <span>   مدل :{currentServic.productModel}</span>
              </div>
              <div className="repair-problem-div repair-span ">
                <div className="repair-problem-divaccdevices">
                  {currentServic?.acceDevices?.length!=0 && currentServic?.acceDevices?.map(item => (
                    <span><Check style={{ fontSize: "10px" }} />{item}</span>
                  ))}
                </div>

              </div>


              <div className="repair-problem-div repair-span centerc">
                <div className="repair-problem-divaccdevices">

                  {currentServic?.productProblem?.length!=0 && currentServic?.productProblem?.map(item => (
                    <span>◼{item}</span>
                  ))}
                </div>
              </div>


              <div className="repair-descriptionb-div ">
                <p
                >{currentServic.productProblemB}</p>
              </div>

              <div > هزینه خدمات :</div>

   <div className="repiar-footer-span">
    <p>کالای فوق تحویل اینجانب گردید</p>
    <p>نام خانوادگی <p>امضاء</p>
</p>
    </div>            </div>


          </div>


        </div> }
    
                                            </>

                                        </Modal.Body>
                                    </Modal>


        </div>
    )
}
