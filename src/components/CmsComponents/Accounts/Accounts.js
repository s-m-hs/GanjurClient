

import React, { useContext, useEffect, useState } from 'react'
import './Accounts.css'
import { CmsContext, HomeContext } from '../../../context/CmsContext';
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SearchBox from '../SearchBox/SearchBox';
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import ApiPostX from '../../../utils/ApiServicesX/ApiPostX';
import alertA from '../../../utils/AlertFunc/AlertA';
import apiUrl from '../../../utils/ApiConfig';
import DateFormat from "../../../utils/DateFormat";
import AlertError from '../../../utils/AlertFunc/AlertError';
import BaseGrid from '../../Grid/BaseGrid';
import { Modal } from 'react-bootstrap';
export default function Accounts() {
  let { xtSearchI, setXtSearchI,
    xtSearchJ, setXtSearchJ, setResetSearchbox } = useContext(CmsContext)

  const cmsContext = useContext(CmsContext);
  const homeContext = useContext(HomeContext);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [parerntAccount, setParerntAccount] = useState([])
  const [value1, setValue1] = useState(0);
  const [parentFilter, setParentFilter] = useState([])
  const [allAccount, setAllAccount] = useState([])
  const [voucherDate, setVochurDate] = useState(new Date())
  const [vouchurDetail, setVouchurDetail] = useState([])
  const [accountVouchur, setAccountVouchur] = useState([])

  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  console.log(allAccount);

  const registerOptions = {
    title: { required: "title is required" },
    code: { required: "code is required" },
    accountType: { required: "accountType is required" },
  };
  const handleError = (errors) => { };

  function handleChange(value) {
    setVochurDate(value && value.toDate());
    // console.log(value.format());   /// convert  to persian format
  }
  // Asset = 1,       // دارایی
  // Liability = 2,   // بدهی
  // Equity = 3,      // سرمایه
  // Revenue = 4,     // درآمد
  // Expense = 5,      // هزینه
  //      Person = 6 //اشخاص
  const accountType = [
    { id: 1, status: "دارایی", statusId: 1, code: '***1' },
    { id: 2, status: "بدهی", statusId: 2, code: '***2' },
    { id: 3, status: "سرمایه", statusId: 3, code: '***3' },
    { id: 3, status: "درآمد", statusId: 4, code: '***4' },
    { id: 3, status: "هزینه", statusId: 5, code: '***5' },
    { id: 3, status: "اشخاص", statusId: 8, code: '***8' },

  ];
  const handleRegistration = (data) => {



    let obj = {
      code: data.code,
      title: data.title,
      accountType: Number(data.accountType),
      parentId: data.parentId ? Number(data.parentId) : null

    }
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/Account`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      }).then(res => {
        if (res.ok) return res.json().then(result => {
          reset(setValue(''))
          alertA("حساب با موفقیت ثبت شد ")
          getAllAccount()
          ApiGetX2('/api/Account/getParenetAccount', setParerntAccount)
        })
      })
    }
    myApp()
  }


  const accountWatch = watch("accountType")

  const [colDefs] = useState([
    {
      field: "id", headerName: "شناسه ", Width: 80, cellRenderer: (params) => (
        <>
          <button className='btn btn-info' style={{ width: "70px", height: "30px", margin: "1px", fontSize: "15px", padding: "1px" }} onClick={() => {
            setAccountVouchur([])
            setShow(true)
            showAccountVouchur(params.data.id)
          }
          }>{params.data.id}</button>

        </>
      )
    },
    { field: "code", headerName: "کد", Width: 80 },
    { field: "title", headerName: "عنوان", Width: 400 },
    { field: "accountType", headerName: "نوع", Width: 80 },
    { field: "parentId", headerName: "والد", Width: 80 },

  ])


  const [colDefsB] = useState([

    { field: "debit", headerName: "بدهکاری ریال", Width: 200, cellRenderer: (params) => params.value?.toLocaleString() },
    { field: "credit", headerName: "بستانکاری ریال", Width: 200, cellRenderer: (params) => params.value?.toLocaleString() },
    { field: "mandeh2", headerName: "مانده سند", Width: 200, cellRenderer: (params) => params.value?.toLocaleString() },
    { field: "description", headerName: "شرح", Width: 200 },
    { field: "referenceType", headerName: "نوع مرجع", Width: 200 },
    {
      field: "voucherDate",
      headerName: "تاریخ سند",
      width: 200,
      cellRenderer: (params) => <DateFormat dateString={params.value} />,
    },
    { field: "id", headerName: "شناسه آیتم", Width: 200 },
  ])

  const showAccountVouchur = (id) => {
    ApiGetX2(`/api/CyUsers/getUserVoucherItem?AccountId=${id}`, setAccountVouchur)
  }

  const getAllAccount = () => {
    ApiGetX2('/api/Account', setAllAccount)

  }


  useEffect(() => {
    const filtered = parerntAccount.filter(item =>
      item.code?.startsWith(`${getValues("accountType")}`)
    );
    setParentFilter(filtered)
  }, [accountWatch]);

  useEffect(() => {
    cmsContext.setFlagClass(false);
    homeContext.setSideMenueFlag(false)
    ApiGetX2('/api/Account/getParenetAccount', setParerntAccount)
    getAllAccount()
    return () => cmsContext.setFlagClass(true);
  }, []);



  useEffect(() => {
    return () => {
      setResetSearchbox(true)
    }
  }, [])

  console.log(accountType)
  return (
    <div className="container">
      <div className="row">

        <div className="col-12 col-lg-3 user-col3">

          <form
            action=""
            onSubmit={handleSubmit(handleRegistration)}
          >

            <label className="user-col3-selectlabel">نوع حساب</label>
            <select
              className={
                errors.accountType
                  ? "user-col3-select formerror"
                  : "user-col3-select"
              }
              {...register(
                !flagUpdate ? "accountType" : "update.accountType",
                registerOptions.accountType
              )}
            >
              <option value="">انتخاب کنید...</option>
              {accountType.map((item) => (
                <option key={item.id} value={item.statusId}>
                  {" "}
                  {item.status}-----{item.code}
                </option>
              ))}
            </select>



            <label className="user-col3-selectlabel"> حساب والد</label>
            <select
              className={
                "user-col3-select"
              }
              {...register(
                !flagUpdate ? "parentId" : "update.parentId",
              )}
            >
              <option value="">انتخاب کنید...</option>
              {parentFilter.map((item) => (
                <option key={item.id} value={item.id}>
                  {" "}
                  {item.title}-----***{item.code}
                </option>
              ))}
            </select>

            <hr />


            <div className="login-label-float">
              <input
                name="title"
                type="text"
                placeholder=""

                className={errors.title ? "formerror" : ""}
                {...register(
                  !flagUpdate ? "title" : "title.title",
                  registerOptions.title
                )}
              />
              <label> عنوان حساب </label>


            </div>

            <div className="login-label-float">
              <input
                name="code"
                type="text"
                placeholder=""
                className={errors.code ? "formerror" : ""}
                {...register(
                  !flagUpdate ? "code" : "update.code", registerOptions.code

                )}
              />
              <label>کد حساب</label>
            </div>


            <hr />

            <button
              className="btn btn-primary"
              // className={(typeof xtSearchI === "number" && typeof xtSearchJ === "number" && value1) ? "user-regbutton " : "user-regbutton disable"}
              type="submit"
            >
              {!flagUpdate ? <span> افزودن </span> : <span> ویرایش </span>}
            </button>
          </form>
        </div>


        <div className="col-12 col-lg-9 user-col9">

          <div style={{ height: "1000px" }}>
            <BaseGrid rowData={allAccount} colDefs={colDefs} rtl={true} />
          </div>
        </div>

      </div>


      <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <div className="customer-voucherTitle ">
            <span>{accountVouchur?.result?.balance?.toLocaleString()} ریال </span>
            <span>{accountVouchur?.result?.balanceStatus}</span>

            {/* <button
              type="button"
              onClick={() => {
                handlePrint()

              }}
              className="btn btn-warning no-print "
            >
              خروجی PDF
            </button> */}

          </div>
        </Modal.Header>
        <Modal.Body>


          <div className="customerDetail-modal" style={{ height: "1000px" }}>
            <BaseGrid rowData={accountVouchur?.currentVouchurs} colDefs={colDefsB} rtl={true} />



          </div>


        </Modal.Body>
      </Modal>
    </div>
  )
}
