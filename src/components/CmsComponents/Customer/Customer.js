import React, { useState, useEffect, useContext, useRef } from "react";
import "./Customer.css";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import { useForm as useFormA } from "react-hook-form";
import { useForm as useFormB } from "react-hook-form";
import { useForm as useFormC } from "react-hook-form";
import { sha512 } from "js-sha512";
import BaseGrid from '../../Grid/BaseGrid';
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DataTable from "../DataTable/DataTable";
import Swal from "sweetalert2";
import DotLoader from "react-spinners/DotLoader";
import { useForm } from "react-hook-form";
import apiUrl from "../../../utils/ApiConfig";
import mode from "../../../utils/ModsB";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX";

import ApiGetX2 from "../../../utils/ApiServicesX/ApiGetX2";
import DateFormat from "../../../utils/DateFormat";
import Modal from "react-bootstrap/Modal";
import { useReactToPrint } from "react-to-print";


export default function Customer() {
  let { themContext } = useContext(HomeContext);
  const printRef = useRef();

  const [customerArray, setcustomerArray] = useState([]);
  const [userVouchur, setUserVouchur] = useState([])
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [show, setShow] = useState(false);
  const [orderDetails, setOrderDetails] = useState([])
  const cmsContext = useContext(CmsContext);
  const homeContext = useContext(HomeContext);
  /////search state===>
  const [searchUser, setSearchUser] = useState("");
  const [searchUserB, setSearchUserB] = useState("");
  const [searchUserArray, setSearchUserArray] = useState([]);
  const [searchUserArrayB, setSearchUserArrayB] = useState([]);

  /////////////////////

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useFormA({
    defaultValues: {},
  });
  const registerOptions = {
    userStatus: { required: "userStatus is required" },
    userUserType: { required: "userUserType is required" },
    PartnerStatus: { required: "PartnerStatus is required" },
    UserName: { required: "UserName is required" },
  };
  ////////////////////////////
  const userStatus = [
    { id: 1, status: "فعال", statusId: 0 },
    { id: 2, status: "مسدود", statusId: 1 },
    { id: 3, status: "غیرفعال", statusId: 2 },
  ];
  const userUserType = [
    { id: 4, UserType: " تامین کننده", UserTypeId: 3 },
    { id: 5, UserType: "مشتری", UserTypeId: 4 },
    { id: 6, UserType: "همکار", UserTypeId: 5 },
  ];
  const PartnerStatus = [
    { id: 1, UserType: " مشتری", UserTypeId: 0 },
    { id: 2, UserType: " همکار 1", UserTypeId: 1 },
    { id: 3, UserType: " همکار 2", UserTypeId: 2 },
    { id: 4, UserType: " همکار 3", UserTypeId: 3 },
    { id: 5, UserType: " همکار 4", UserTypeId: 4 },

  ];
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "factor",
  });

  ///////////////////
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  const getOrerDetails = (factorNum) => {
    setOrderDetails([])
    ApiGetX2(`/api/CyOrders/getOrderDetail?factorNum=${factorNum}`, setOrderDetails)
  }

  const searchHandler = () => {
    let searchCustomer = customerArray?.filter((filter) => {
      return filter.cyUsNm?.includes(`${searchUser.trim()}`);
    });
    setSearchUserArray(searchCustomer);
  };
  useEffect(() => {
    if (searchUser.length > 1) {
      searchHandler();
    } else if (searchUser.length < 1) {
      setSearchUserArray([]);
    }
  }, [searchUser]);

  const searchHandlerB = () => {
    let searchCustomerB = customerArray?.filter((filter) => {
      return filter.mobile?.includes(`${searchUserB}`);
    });
    setSearchUserArrayB(searchCustomerB);
  };
  useEffect(() => {
    if (searchUserB.length > 1) {
      searchHandlerB();
    } else if (searchUserB.length < 1) {
      setSearchUserArrayB([]);
    }
  }, [searchUserB]);
  ///////////////////////
  const showUserVouchur = (id) => {
    ApiGetX2(`/api/CyUsers/getUserVoucherItem?AccountId=${id}`, setUserVouchur)
  }




  // const [rowData] = useState([
  //   { id: 1, name: 'Ali', age: 25 },
  //   { id: 2, name: 'Reza', age: 30 },
  // ]);

  const [colDefs] = useState([
    { field: "cyUsNm", headerName: "نام", Width: 200 },
    { field: "mobile", headerName: "موبایل", Width: 200 },
    { field: "phone", headerName: "تلفن" },
    { field: "id", headerName: "شناسه" },
    {
      field: "createDate",
      headerName: "تاریخ ایجاد",
      width: 200,
      cellRenderer: (params) => <DateFormat dateString={params.value} />,
    },
    { field: "accountId", headerName: "AccountId", Width: 50 },
    { field: "userAddress", headerName: "آدرس" },
    {
      headerName: 'عملیات', width: 200,
      cellRenderer: (params) => (
        <>
          <button className='btn btn-info' style={{ width: "30px", height: "15px", margin: "1px", fontSize: "8px", padding: "1px" }} onClick={() => {
            setUserVouchur([])
            setShow(true)
            showUserVouchur(params.data.accountId)
          }
          }>...</button>
          <button className='btn btn-danger' style={{ width: "30px", height: "15px", margin: "1px", fontSize: "8px", padding: "1px" }} onClick={() => deleteHandler(params.data.id)}>×</button>
        </>
      )
    }
  ])


  const [colDefsB] = useState([
    {
      field: "refrenceId", headerName: "شماره فاکتور ", Width: 200, cellRenderer: (params) => {
        if (params.data.refrenceId) {
          return (
            <>
              <button className="btn btn-info"
                onClick={() => getOrerDetails(params.data.refrenceId)}
              >{params.data.refrenceId}</button>
            </>
          )
        }
      }
    },
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


  const handleRegistration = (data) => {
    // console.log(data)
    if (!flagUpdate) {
      let obj = {
        cyUsNm: data.UserName,
        userCodeA: data.UserCodeA,
        mobile: data.Mobile,
        phone: data.Phone,
        melliCode: data.MelliCode,
        userAddress: data.UserAddress,
        status: Number(data.userStatus),
        userType: Number(data.userUserType),
        partnerStatus: Number(data.PartnerStatu)
      };

      async function myAppPost() {
        ApiPostX("/api/Customer/addUserB", obj, function () {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "کاربر با موفقیت اضافه شد",
            showConfirmButton: false,
            timer: 1500,
          });
          reset(setValue(""));
          getcustomerItem();
        });
      }
      myAppPost();
    }
  };


  /////////////////////////////////
  const getcustomerItem = () => {
    async function myAppGetcustomer() {
      const res = await fetch(`${apiUrl}/api/CyUsers/GetUserByType/1`, {
        method: "GET",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((result) => {
          setcustomerArray(result);
        });
    }
    myAppGetcustomer();
  };
  //////////////////////
  const deleteHandler = (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "آیا از حذف اطمینان دارید؟",
        icon: "warning",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر ",
        reverseButtons: true,
        preConfirm: (value) => {
          if (value.toLowerCase() !== "ok") {
            Swal.showValidationMessage("کلمه عبور را وارد");
          }
          return value.toLowerCase() === "ok";
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          async function myAppDelet() {
            const res = await fetch(`${apiUrl}/api/CyUsers/${id}`, {
              method: "DELETE",
              credentials: "include",
            })
              .then((res) => console.log(res))
              .then((result) => {
                swalWithBootstrapButtons
                  .fire({
                    title: "حذف انجام شد!",
                    icon: "success",
                  })
                  .then((result) => {
                    getcustomerItem();
                  });
              });
          }
          myAppDelet();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "حذف انجام نشد",
            icon: "error",
          });
        }
      });
    reset(setValue(""));
  };

  /////////////////
  const resetUpdatField = () => {
    setFlagUpdate(false);
    reset(setValue(""));
  };
  useEffect(() => {
    if (show == false) {
      setOrderDetails([])
    }
  }, [show])

  useEffect(() => {
    cmsContext.setFlagClass(false);
    homeContext.setSideMenueFlag(false)
    getcustomerItem();
    return () => cmsContext.setFlagClass(true);
  }, []);

  return (
    <div className="container ">
      <div className="row">


        <div className='col-lg-2 customer-col3 '>

          <form action=""
            onSubmit={handleSubmit(handleRegistration)

            }
            className='customer-col3-form'
          >


            <label className="user-col3-selectlabel"> وضعیت کاربر:</label>
            <select
              className={
                errors.userStatus
                  ? "user-col3-select formerror"
                  : "user-col3-select"
              }
              {...register(
                !flagUpdate ? "userStatus" : "update.userStatus",
                registerOptions.userStatus
              )}
            >
              <option value="">انتخاب کنید...</option>
              {userStatus.map((item) => (
                <option key={item.id} value={item.statusId}>
                  {" "}
                  {item.status}
                </option>
              ))}
            </select>



            <label className="user-col3-selectlabel"> نوع کاربر:</label>
            <select
              className={
                errors.userUserType
                  ? "user-col3-select formerror"
                  : "user-col3-select"
              }
              {...register(
                !flagUpdate ? "userUserType" : "update.userUserType",
                registerOptions.userUserType
              )}
            >
              <option value="">انتخاب کنید...</option>
              {userUserType.map((item) => (
                <option key={item.id} value={item.UserTypeId}>
                  {" "}
                  {item.UserType}
                </option>
              ))}
            </select>

            <label className="user-col3-selectlabel"> سطح ارتباط:</label>
            <select
              className={
                errors.PartnerStatus
                  ? "user-col3-select formerror"
                  : "user-col3-select"
              }
              {...register(
                !flagUpdate ? "PartnerStatus" : "update.PartnerStatus",
                registerOptions.PartnerStatus
              )}
            >
              <option value="">انتخاب کنید...</option>
              {PartnerStatus.map((item) => (
                <option key={item.id} value={item.UserTypeId}>
                  {" "}
                  {item.UserType}
                </option>
              ))}
            </select>


            <div className="login-label-float">
              <input
                // disabled
                name="UserName"
                type="text"
                placeholder=""
                className={errors.customerName ? 'formerror' : ''}
                {...register(!flagUpdate ? 'UserName' : 'update.UserName', registerOptions.UserName)}
              />
              <label> نام کاربری</label>
            </div>


            <div className="login-label-float">
              <input
                // disabled
                name="UserCodeA"
                type="text"
                placeholder=""
                className={errors.customerName ? 'formerror' : ''}
                {...register(!flagUpdate ? 'UserCodeA' : 'update.UserCodeA', registerOptions.UserCodeA)}
              />
              <label> کد کاربر</label>
            </div>



            <div className="login-label-float">
              <input
                // disabled
                name="Mobile"
                type="text"
                placeholder=""
                className={errors.customerName ? 'formerror' : ''}
                {...register(!flagUpdate ? 'Mobile' : 'update.Mobile', registerOptions.Mobile)}
              />
              <label> موبایل</label>
            </div>


            <div className="login-label-float">
              <input
                // disabled
                name="Phone"
                type="text"
                placeholder=""
                className={errors.customerName ? 'formerror' : ''}
                {...register(!flagUpdate ? 'Phone' : 'update.Phone', registerOptions.Phone)}
              />
              <label> تلفن ثابت</label>
            </div>


            <div className="login-label-float">
              <input
                // disabled
                name="MelliCode"
                type="text"
                placeholder=""
                className={errors.customerName ? 'formerror' : ''}
                {...register(!flagUpdate ? 'MelliCode' : 'update.MelliCode', registerOptions.MelliCode)}
              />
              <label>  کدملی</label>
            </div>


            <div className="login-label-float">
              <input
                // disabled
                name="UserAddress"
                type="text"
                placeholder=""
                className={errors.customerName ? 'formerror' : ''}
                {...register(!flagUpdate ? 'UserAddress' : 'update.UserAddress', registerOptions.UserAddress)}
              />
              <label> آدرس</label>
            </div>


            {flagUpdate && <div className='customer-resticon'>
              <i class="fa-solid fa-rotate-left fa-2xl" style={{ color: ' #74C0FC' }} onClick={resetUpdatField}></i>
            </div>
            }

            <Button className='customer-regbutton'
              type='submit'
              variant="contained"
              color='info'
              endIcon={<SendIcon />}
            >

              <span>افزودن</span>

            </Button>
          </form>



        </div>



        <div className="col-lg-10  customer-col9">
          {customerArray.length == 0 ? (
            <div className="customer-colsm9-div">
              <DotLoader
                color="#0d6efd"
                loading
                size={150}
                speedMultiplier={1}
              />
            </div>
          ) : (
            <>

              <div style={{ height: "800px" }}>
                <BaseGrid rowData={customerArray} colDefs={colDefs} rtl={true} />
              </div>



            </>
          )}
        </div>


        <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <div className="customer-voucherTitle ">
              <span>{userVouchur?.result?.balance?.toLocaleString()} ریال </span>
              <span>{userVouchur?.result?.balanceStatus}</span>

              <button
                type="button"
                onClick={() => {
                  handlePrint()

                }}
                className="btn btn-warning no-print "
              >
                خروجی PDF
              </button>

            </div>
          </Modal.Header>
          <Modal.Body>


            <div className="customerDetail-modal" ref={printRef} style={{ height: "1000px" }}>
              <BaseGrid rowData={userVouchur?.currentVouchurs} colDefs={colDefsB} rtl={true} />

              {orderDetails?.length != 0 &&
                <div className="orderDetail-div boxSh">

                  <div className="orderDetail-div-B ">
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th>شماره فاکتور</th>
                          <th>مبلغ نهایی</th>
                          <th>شناسه </th>
                          <th>تاریخ</th>
                        </tr>
                      </thead>

                      <tbody>

                        <tr>
                          <td>{orderDetails?.factorNumber}</td>
                          <td>{orderDetails?.fanalTotalAmount?.toLocaleString()}ریال</td>
                          <td>{orderDetails?.id}</td>
                          <td><DateFormat dateString={orderDetails?.creatDate} /></td>

                        </tr>
                      </tbody>


                    </table>


                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th> کالا</th>
                          <th> قیمت</th>
                          <th>تعداد </th>
                          <th>مجموع</th>
                        </tr>
                      </thead>

                      <tbody>

                        {orderDetails?.orderItems?.length != 0 && orderDetails?.orderItems?.map((item) => (
                          <tr>
                            <td>{item.partNumber}</td>
                            <td>{item.unitPrice?.toLocaleString()}ریال</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice?.toLocaleString()}ریال</td>

                          </tr>
                        ))}

                      </tbody>


                    </table>



                  </div>

                </div>}



            </div>


          </Modal.Body>
        </Modal>



        <>

        </>

      </div>
    </div>
  );
}
