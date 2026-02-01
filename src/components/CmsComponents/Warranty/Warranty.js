import React, { useContext, useEffect, useState } from "react";
import "./Warranty.css";
import { useForm } from "react-hook-form";
import apiUrl from "../../../utils/ApiConfig";
import { CmsContext } from "../../../context/CmsContext";
import { Update } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import Swal from "sweetalert2";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import DateFormat from "../../../utils/DateFormat";

export default function Warranty() {
  const [flagReg, setFlagReg] = useState(false);
  const [mobile, setMobile] = useState("");
  const [warrantyArray, setWarrantyArray] = useState([]);
  const [userId, setUserId] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const [allWarrantyA, setAllWarrantyA] = useState([]);
  const [allWarranty, setAllWarranty] = useState([]);
  const allWarrantyRevers = allWarranty?.slice().reverse();
  const [value4, setValue4] = useState("");
  const [value5, setValue5] = useState("");
  const [garantyId, setGarantyId] = useState("");

  const [paginationArray, setPaginationArray] = useState(
    Array.from({ length: 10 })
  );
  const [page, setPage] = React.useState(1);
  const pageCount = 100;

  const cmsContext = useContext(CmsContext);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  function handleChange(value) {
    setValue4(value && value.toDate());
    // console.log(value.format());   /// convert  to persian format
  }

  const alertA = (title) =>
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500,
    });

  console.log(value4);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const handleError = (errors) => {};
  const registerOptions = {
    ItemCategoryTitle: { required: "Name is required" },
    itemOrderValue: { required: "nameCode is required" },
    productCount: { required: "productCount is required" },
    itemImageUrl: { required: "" },
    itemCode: { required: "itemCode is required" },
  };

  const WarantyStatus = [
    { id: 1, status: "تحویل گرفته شده از مشتری" },
    { id: 2, status: "ارسال شده به شرکت گارانتی کننده" },
    { id: 3, status: "تحویل داده شده به مشتری" },
  ];
  const handleRegistration = (data) => {
    if (!flagReg) {
      let obj = {
        id: 0,
        guaranteeID: data.guaranteeID,
        phonenumber: data.phonenumber,
        productName: data.productName,
        productStatus: data.productStatus,
        guaranteeCompany: data.guaranteeCompany,
        guarantreePrice: data.guarantreePrice,
        recievedDate: value4,
        productProblem: data.productProblem,
        details: data.details,
        companyExplaination: data.companyExplaination,
        type: 0,
      };
      console.log(obj);
      async function myApp() {
        const res = await fetch(`${apiUrl}/api/CyGuarantee`, {
          method: "POST",
          credentials: "include",

          headers: {
            // Authorization: `Bearer ${cmsContext.token.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            console.log(res);
            if (res.status == 200) {
              return res.json();
            }
          })
          .then((result) => {
            // console.log(result);
            getAllWarranty(page, pageCount);
            alertA("گارانتی جدید با موفقیت ثبت شد");
            reset(setValue(""));
            setValue4("");
            setValue5("");
          })
          .catch((err) => {
            getAllWarranty(page, pageCount);
            alertA("گارانتی جدید با موفقیت ثبت شد");
            reset(setValue(""));
            setValue4("");
            setValue5("");
            console.log(err);
          });
      }
      myApp();
    } else {
      let obj = {
        id: data.update.id,
        guaranteeID: data.update.guaranteeID,
        phonenumber: data.phonenumber,
        productName: data.update.productName,
        productStatus: data.update.productStatus,
        guaranteeCompany: data.update.guaranteeCompany,
        guarantreePrice: data.update.guarantreePrice,
        recievedDate: value5,
        productProblem: data.update.productProblem,
        details: data.update.details,
        companyExplaination: data.update.companyExplaination,
        type: 0,
      };
      async function myApp() {
        const res = await fetch(
          `${apiUrl}/api/CyGuarantee/updateGuarantee?id=${data.update.guaranteeID}`,
          {
            method: "PUT",
            credentials: "include",

            headers: {
              // Authorization: `Bearer ${cmsContext.token.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(obj),
          }
        )
          .then((res) => {
            console.log(res);
            return res.json();
          })
          .then((result) => {
            console.log(result);
            // getAllWarranty(page,pageCount)
            // alertA('ویرایش با موفقیت انجام شد')
            // setFlagReg(false)
            // reset(setValue(""))
            // setValue4('')
            // setValue5('')
          })
          .catch((err) => {
            console.log(err);
            getAllWarranty(page, pageCount);
            alertA("ویرایش با موفقیت انجام شد");
            setFlagReg(false);
            reset(setValue(""));
            setValue4("");
            setValue5("");
          });
      }
      myApp();
    }
  };

  const getAllWarranty = (page, pageCount) => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyGuarantee/getAll?page=0&size=100000000`,
        {
          method: "GET",
          credentials: "include",

          headers: {
            // Authorization: `Bearer ${cmsContext.token.token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((result) => {
          console.log(result);
          setAllWarranty(result.itemList);
        });
    }
    myApp();
  };

  const getWarranty = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyGuarantee?phoneNumber=${mobile}`,
        {
          method: "GET",
          credentials: "include",

          headers: {
            // Authorization: `Bearer ${cmsContext.token.token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((result) => {
          console.log(result);
          setWarrantyArray(result);
          setUserId(result[0]?.cyUserID);
        });
    }
    myApp();
  };

  const resetUpdatField2 = () => {
    setMobile("");
    setFlagReg(false);
    reset(setValue(""));
    setValue4("");
    setValue5("");
  };

  const changInput = (e) => {
    setWarrantyArray([]);
    setMobile(e.target.value);
  };

  const editHandler = (...data) => {
    setValue5(data[10]);
    setValue("update", {
      guaranteeID: data[0],
      productName: data[1],
      guaranteeCompany: data[2],
      productStatus: data[3],
      guarantreePrice: data[4],
      productProblem: data[5],
      details: data[6],
      companyExplaination: data[7],
      id: data[8],
      phonenumber: data[9],
      recievedDate: data[10],
    });
  };

  const getUserDetail = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyUsers/${userId}`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .then((result) => {
          console.log(result);
          setUserDetail(result);
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  const deletHandler = () => {
    console.log("first");
    swalWithBootstrapButtons
      .fire({
        title: "آیا از حذف اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر ",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          async function myApp() {
            const res = await fetch(
              `${apiUrl}/api/CyGuarantee/deleteGuarantee?id=${garantyId}`,
              {
                method: "DELETE",
                credentials: "include",

                headers: {
                  // Authorization: `Bearer ${cmsContext.token.token}`,
                  "Content-Type": "application/json",
                },
              }
            )
              .then((res) => {
                console.log(res);
                getAllWarranty(page, pageCount);
              })
              .then((err) => console.log(err));
          }
          myApp();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "حذف انجام نشد",
            icon: "error",
          });
        }
      });
  };
  useEffect(() => {
    getAllWarranty(page, pageCount);
  }, []);

  // console.log(page)
  // console.log(pageCount)
  useEffect(() => {
    if (mobile) {
      getWarranty();
    }
  }, [allWarranty]);

  useEffect(() => {
    getUserDetail();
  }, [userId]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-3 centerc mt-1 warranty-right-row">
          <div className="warranty-right-row-ok-button centerr mb-2">
            {" "}
            <div className="col-12 login-label-float">
              <input
                onChange={(e) => {
                  changInput(e);
                }}
                value={mobile}
                name="phonenumber"
                type="number"
                placeholder=""
              />
              <label> جستجو گارانتی با شماره همراه </label>
            </div>
            <button className="btn btn-warning" onClick={getWarranty}>
              تایید
            </button>
          </div>
          <hr />

          <h3>لیست گارانتی ها :</h3>
          {allWarranty?.length != 0 &&
            allWarrantyRevers?.map((item) => (
              <>
                {item.type == 0 ? (
                  <button
                    key={item.id}
                    className="btn btn-info mt-1 centerr allwarranty-button-right"
                    onClick={() => {
                      setFlagReg(true);
                      setGarantyId(item.id);
                      editHandler(
                        item.guaranteeID,
                        item.productName,
                        item.guaranteeCompany,
                        item.productStatus,
                        item.guarantreePrice,
                        item.productProblem,
                        item.details,
                        item.companyExplaination,
                        item.id,
                        item.phonenumber,
                        item.recievedDate
                      );
                    }}
                  >
                    {item.username}/ پذیرش:{item.guaranteeID}
                  </button>
                ) : (
                  ""
                )}
              </>
            ))}
        </div>

        <div className="col-9">
          <div className="centerr">
            {warrantyArray?.length != 0 &&
              mobile &&
              warrantyArray?.map((item) => (
                <button
                  key={item.id}
                  className="btn btn-info  m-1"
                  onClick={() => {
                    setFlagReg(true);
                    editHandler(
                      item.guaranteeID,
                      item.productName,
                      item.guaranteeCompany,
                      item.productStatus,
                      item.guarantreePrice,
                      item.productProblem,
                      item.details,
                      item.companyExplaination,
                      item.id,
                      item.phonenumber,
                      item.recievedDate
                    );
                  }}
                >
                  {item.guaranteeID}
                </button>
              ))}
          </div>

          <form
            className=" warranty-main-form"
            onSubmit={handleSubmit(handleRegistration, handleError)}
          >
            <div className="container ">
              <div className="row ">
                <div className="col-12 mb-3">
                  {userId && (
                    <button
                      className="btn btn-info mt-1 warranty-name-botton "
                      disabled
                    >
                      {userDetail?.cyUsNm}
                    </button>
                  )}
                </div>

                <div className="col-4 login-label-float">
                  <input
                    className={flagReg ? "warranty-input-disable" : ""}
                    name="guaranteeID"
                    type="number"
                    placeholder=""
                    {...register(
                      !flagReg ? "guaranteeID" : "update.guaranteeID",
                      registerOptions.guaranteeID
                    )}
                  />
                  <label> شماره پذیرش </label>
                </div>

                <div className="col-4 login-label-float">
                  <input
                    className={flagReg ? "warranty-input-disable" : ""}
                    name="phonenumber"
                    type="number"
                    placeholder=""
                    {...register(
                      !flagReg ? "phonenumber" : "update.phonenumber",
                      registerOptions.phonenumber
                    )}
                  />
                  <label> شماره همراه </label>
                </div>

                <div className="col-4 login-label-float centerc">
                  {flagReg ? (
                    <>
                      <div className="warranty-dateformat centerr">
                        <span>تاریخ تحویل :</span>
                        <DateFormat dateString={`${value5}`} />

                        {/* <input
                  className={flagReg ? 'warranty-input-disable' : ''} 
  value={value5}
  type="text"

/> */}
                        {/* <label> تاریخ تحویل </label> */}
                      </div>
                    </>
                  ) : (
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
                  )}
                </div>

                <div className="col-4 login-label-float">
                  <input
                    name="productName"
                    type="text"
                    placeholder=""
                    {...register(
                      !flagReg ? "productName" : "update.productName",
                      registerOptions.productName
                    )}
                  />
                  <label> نام محصول</label>
                </div>

                <div className="col-4 login-label-float">
                  <input
                    name="guaranteeCompany"
                    type="text"
                    placeholder=""
                    {...register(
                      !flagReg ? "guaranteeCompany" : "update.guaranteeCompany",
                      registerOptions.guaranteeCompany
                    )}
                  />
                  <label>شرکت گارانتی </label>
                </div>

                <div className="col-4 login-label-float">
                  <select
                    className={
                      errors.userStatus
                        ? "user-col3-select formerror"
                        : "user-col3-select"
                    }
                    {...register(
                      !flagReg ? "productStatus" : "update.productStatus",
                      registerOptions.productStatus
                    )}
                  >
                    <option value=""> وضعیت کالا...</option>
                    {WarantyStatus.map((item) => (
                      <option key={item.id} value={item.status}>
                        {" "}
                        {item.status}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-4 login-label-float">
                  <input
                    name="guarantreePrice"
                    type="text"
                    placeholder=""
                    {...register(
                      !flagReg ? "guarantreePrice" : "update.guarantreePrice",
                      registerOptions.guarantreePrice
                    )}
                  />
                  <label> هزینه گارانتی </label>
                </div>

                <div className="col-12 login-label-float">
                  <div className="textarea_div centerc">
                    <span>ایراد کالا طبق اظهار مشتری:</span>

                    <textarea
                      name="productProblem"
                      {...register(
                        !flagReg ? "productProblem" : "update.productProblem",
                        registerOptions.productProblem
                      )}
                    />
                  </div>
                </div>

                <div className="col-12 login-label-float">
                  <div className="textarea_div centerc">
                    <span>ملاحظات:</span>

                    <textarea
                      name="details"
                      {...register(
                        !flagReg ? "details" : "update.details",
                        registerOptions.details
                      )}
                    />
                  </div>
                </div>

                <div className="col-12 login-label-float">
                  <div className="textarea_div centerc">
                    <span>توضیحات شرکت گارانتی کننده:</span>

                    <textarea
                      name="companyExplaination"
                      {...register(
                        !flagReg
                          ? "companyExplaination"
                          : "update.companyExplaination",
                        registerOptions.companyExplaination
                      )}
                    />
                  </div>
                </div>
                <div className="col-12 mb-3 mt-3 centerc">
                  <span className="centerr">
                    {" "}
                    <i
                      className="fa-solid fa-rotate-left fa-2xl newsubject-form-col3-icon1"
                      onClick={resetUpdatField2}
                    ></i>
                  </span>

                  <button className="btn btn-primary mt-4 warranty-name-botton ">
                    {!flagReg ? "تایید" : "ویرایش"}
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="centerc">
            <button
              className="btn btn-danger mt-3 warranty-delete-botton"
              onClick={() => {
                deletHandler();
              }}
            >
              حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
