import React, { useContext, useEffect, useState } from "react";
import "./Repairs.css";
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

export default function Repairs() {
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
  const [value6, setValue6] = useState("");
  const [value7, setValue7] = useState("");
  const [garantyId, setGarantyId] = useState("");

  const [paginationArray, setPaginationArray] = useState(
    Array.from({ length: 10 })
  );
  const [page, setPage] = React.useState(1);
  const pageCount = 100;

  console.log(allWarranty);
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
  function handleChangeB(value) {
    setValue6(value && value.toDate());
    // console.log(value.format());   /// convert  to persian format
  }

  const alertA = (title) =>
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      getAllWarranty(page, pageCount);
      reset(setValue(""));
      setValue4("");
      setValue5("");
      setValue6("");
      setValue7("");
    });
  const alertB = (title) =>
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      getAllWarranty(page, pageCount);
      setFlagReg(false);
      reset(setValue(""));
      setValue4("");
      setValue5("");
      setValue6("");
      setValue7("");
    });

  //  console.log(value4)
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
    { id: 2, status: " تعمیر شده ، آماده تحویل به مشتری" },
    { id: 3, status: "تعمیر نشده ،آماده تحویل به مشتری" },
  ];
  const productKind = [
    { id: 1, status: "لپ تاپ" },
    { id: 2, status: "کیس" },
    { id: 3, status: "مانیتور" },
    { id: 4, status: "هارد" },
    { id: 5, status: "All in one" },
    { id: 6, status: "گرافیک" },
    { id: 7, status: "پاور" },
    { id: 8, status: "مادربرد" },
  ];
  const productBrand = [
    { id: 1, status: "ASUS" },
    { id: 2, status: "LENOVO" },
    { id: 3, status: "HP" },
    { id: 4, status: "DELL" },
    { id: 5, status: "ACER" },
    { id: 6, status: "MSI" },
    { id: 7, status: "FUJITSU" },
    { id: 8, status: "GREEN" },
    { id: 9, status: "SANSUNG" },
    { id: 10, status: "LG" },
  ];
  const productErrorDetail = [
    { id: 1, status: "نیاز به بررسی " },
    { id: 2, status: "نیاز به ارتقا" },
    { id: 3, status: "روشن میشود ،تصویر ندارد" },
    { id: 4, status: "روشن نمیشود" },
    { id: 5, status: "آبخوردگی" },
    { id: 6, status: "شکستگی قاب " },
    { id: 7, status: "ضربه خوردگی" },
    { id: 8, status: "نیاز به تعویض ویندوز" },
    { id: 9, status: "ویندوز مشکل دارد" },
    { id: 10, status: "ال ای دی ایراد دارد " },
    { id: 11, status: "هارد مشکل دارد" },
  ];
  const productDetailRepair = [
    // {id:1,status:'SSD 128'},
    // {id:2,status:'SSD 256'},
    // {id:3,status:'SSD 512'},
    // {id:4,status:'SSD 1T'},
    // {id:5,status:'RAM 4G'},
    // {id:6,status:'RAM 8G'},
    // {id:7,status:'RAM 16G'},
    { id: 8, status: "CADDY BOX" },
    { id: 9, status: "باکس هارد اکسترنال" },
    { id: 10, status: "تعویض ویندوز -نصب درایورها-نصب برنامه " },
    { id: 11, status: "نصب برنامه تخصصی" },
    { id: 12, status: "نصب آنتی ویروس" },
    { id: 13, status: "سرویس کامل" },
    { id: 14, status: "تعمیر ورفع ایراد " },
    // {id:1,status:''},
    // {id:1,status:''}
  ];
  const productDetailRepair2 = [
    { id: 1, status: "SSD 128" },
    { id: 2, status: "SSD 256" },
    { id: 3, status: "SSD 512" },
    { id: 4, status: "SSD 1T" },
  ];
  const productDetailRepair3 = [
    { id: 5, status: "RAM 4G" },
    { id: 6, status: "RAM 8G" },
    { id: 7, status: "RAM 16G" },
  ];

  const handleRegistration = (data) => {
    window.scrollTo(0, 0);
    if (!flagReg) {
      let obj = {
        id: 0,
        guaranteeID: data.guaranteeID,
        phonenumber: data.phonenumber,
        productName: `${data.productNameTitle}${data.productBrand} ${data.productName}`,
        productStatus: data.productStatus,
        guaranteeCompany: value6,
        guarantreePrice: data.guarantreePrice
          ? `تومان ${data.guarantreePrice}`
          : "",
        recievedDate: value4,
        productProblem: data.productErrorDetail
          ? `${data.productErrorDetail} - ${data.productProblem}`
          : data.productProblem,
        details: data.productDetailRepair
          ? `${data.productDetailRepair2}-${data.productDetailRepair3}- ${data.productDetailRepair}-  ${data.details}`
          : data.details,
        companyExplaination: data.companyExplaination,
        type: 1,
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
              alertA("گارانتی جدید با موفقیت ثبت شد");
              return res.json();
            }
          })
          .then((result) => {
            // console.log(result);
            // alertA('گارانتی جدید با موفقیت ثبت شد')
            // getAllWarranty(page,pageCount)
            // reset(setValue(""))
            // setValue4('')
            // setValue5('')
            // setValue6('')
            // setValue7('')
          })
          .catch((err) => {
            // getAllWarranty(page,pageCount)
            // alertA('گارانتی جدید با موفقیت ثبت شد')
            // reset(setValue(""))
            // setValue4('')
            // setValue5('')
            // setValue6('')
            // setValue7('')
            console.log(err);
          });
      }
      myApp();
    } else {
      let obj = {
        id: data.update.id,
        guaranteeID: data.update.guaranteeID,
        phonenumber: data.phonenumber,
        productName: data.update.productNameTitle
          ? `${data.update.productNameTitle} ${data.update.productBrand} ${data.update.productName}`
          : data.update.productName,
        productStatus: data.update.productStatus,
        guaranteeCompany: value6 ? value6 : value7,
        guarantreePrice: data.update.guarantreePrice
          ? `تومان ${data.update.guarantreePrice}`
          : "",
        recievedDate: value5,
        productProblem: data.update.productErrorDetail
          ? `${data.update.productErrorDetail} - ${data.update.productProblem}`
          : data.update.productProblem,
        details:
          data.update.productDetailRepair ||
          data.update.productDetailRepair2 ||
          data.update.productDetailRepair3
            ? ` ${data.update.productDetailRepair2} ${data.update.productDetailRepair3} ${data.update.productDetailRepair}  ${data.update.details}`
            : data.update.details,
        companyExplaination: data.update.companyExplaination,
        type: 1,
      };
      console.log(obj);
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
            if (res.status == 200) {
              alertB("ویرایش با موفقیت انجام شد");
              return res.json();
            }
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
            //   alertA('ویرایش با موفقیت انجام شد')

            //   getAllWarranty(page,pageCount)
            //   setFlagReg(false)
            //   reset(setValue(""))
            //   setValue4('')
            //   setValue5('')
            //         setValue6('')
            // setValue7('')
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
          headers: {
            Authorization: `Bearer ${cmsContext.token.token}`,
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
    window.scrollTo(0, 0);

    setMobile("");
    setFlagReg(false);
    reset(setValue(""));
    setValue4("");
    setValue5("");
    setValue6("");
    setValue7("");
  };

  const changInput = (e) => {
    setWarrantyArray([]);
    setMobile(e.target.value);
  };

  const editHandler = (...data) => {
    setValue7(data[2]);
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
      productDetailRepair: "",
      productDetailRepair2: "",
      productDetailRepair3: "",
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
                reset(setValue(""));
                setValue4("");
                setValue5("");
                setValue6("");
                setValue7("");
                window.scrollTo(0, 0);
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
              <label> جستجو تعمیرات با شماره همراه </label>
            </div>
            <button className="btn btn-warning" onClick={getWarranty}>
              تایید
            </button>
          </div>
          <hr />
          <span className="centerr">
            {" "}
            <i
              className="fa-solid fa-rotate-left fa-2xl newsubject-form-col3-icon1"
              onClick={resetUpdatField2}
            ></i>
          </span>
          <hr />
          <h3>لیست تعمیرات :</h3>
          {allWarranty?.length != 0 &&
            allWarrantyRevers?.map((item) => (
              <>
                {item.type == 1 ? (
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
                    {item.username}/پذیرش:{item.guaranteeID}
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
                        <span>تاریخ دریافت از مشتری :</span>
                        <DateFormat dateString={`${value5}`} />
                      </div>
                    </>
                  ) : (
                    <>
                      <span>تاریخ دریافت از مشتری :</span>
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
                    </>
                  )}
                </div>

                <div className="col-4 login-label-float">
                  <select
                    name="productNameTitle"
                    id=""
                    {...register(
                      !flagReg ? "productNameTitle" : "update.productNameTitle",
                      registerOptions.productNameTitle
                    )}
                  >
                    <option value="" key=""></option>
                    {productKind.map((item) => (
                      <option key={item.id} value={item.status}>
                        {" "}
                        {item.status}
                      </option>
                    ))}
                  </select>

                  <select
                    name="productBrand"
                    id=""
                    {...register(
                      !flagReg ? "productBrand" : "update.productBrand",
                      registerOptions.productBrand
                    )}
                  >
                    <option value="" key=""></option>

                    {productBrand.map((item) => (
                      <option key={item.id} value={item.status}>
                        {" "}
                        {item.status}
                      </option>
                    ))}
                  </select>

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

                <div className="col-4 login-label-float centerc">
                  {flagReg ? (
                    <>
                      <div className="warranty-dateformat centerr">
                        <span>تاریخ تحویل به مشتری :</span>
                        <DateFormat dateString={`${value7}`} />
                      </div>

                      <DatePicker
                        className="custom-input"
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        value={value6}
                        onChange={handleChangeB}
                        animations={[
                          opacity(),
                          transition({ from: 35, duration: 800 }),
                        ]}
                        render={<InputIcon />}
                      />
                    </>
                  ) : (
                    <>
                      <span>تاریخ تحویل به مشتری :</span>
                      <DatePicker
                        className="custom-input"
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        value={value6}
                        onChange={handleChangeB}
                        animations={[
                          opacity(),
                          transition({ from: 35, duration: 800 }),
                        ]}
                        render={<InputIcon />}
                      />
                    </>
                  )}
                </div>

                {/* <div className="col-4 login-label-float">
                  <input
                    name="guaranteeCompany"
                    type="text"
                    placeholder=""
                    {...register(
                      !flagReg ? "guaranteeCompany" : "update.guaranteeCompany",
                      registerOptions.guaranteeCompany
                    )}
                  />
                  <label>شرکت گارانتی </label> */}
                {/* </div> */}

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
                  <label> هزینه تعمیرات </label>
                </div>

                <div className="col-12 ">
                  <div className="textarea_div centerc">
                    <span>ایراد کالا طبق اظهار مشتری:</span>
                    <div>
                      {productErrorDetail.map((item) => (
                        <>
                          <span key={item.id}>
                            <span>{item.status}</span>
                            <input
                              type="checkbox"
                              value={item.status}
                              {...register(
                                !flagReg
                                  ? "productErrorDetail"
                                  : "update.productErrorDetail",
                                registerOptions.productErrorDetail
                              )}
                            />
                          </span>
                        </>
                      ))}
                    </div>

                    <textarea
                      name="productProblem"
                      {...register(
                        !flagReg ? "productProblem" : "update.productProblem",
                        registerOptions.productProblem
                      )}
                    />
                  </div>
                </div>

                <div className="col-12 ">
                  <div className="textarea_div centerc">
                    <span>ملاحظات:</span>
                    <div>
                      <select
                        name="productDetailRepair2"
                        id=""
                        {...register(
                          !flagReg
                            ? "productDetailRepair2"
                            : "update.productDetailRepair2",
                          registerOptions.productBrand
                        )}
                      >
                        <option value="" key="">
                          SSD
                        </option>

                        {productDetailRepair2.map((item) => (
                          <option key={item.id} value={item.status}>
                            {" "}
                            {item.status}
                          </option>
                        ))}
                      </select>

                      <select
                        name="productDetailRepair3"
                        id=""
                        {...register(
                          !flagReg
                            ? "productDetailRepair3"
                            : "update.productDetailRepair3",
                          registerOptions.productBrand
                        )}
                      >
                        <option value="" key="">
                          RAM
                        </option>

                        {productDetailRepair3.map((item) => (
                          <option key={item.id} value={item.status}>
                            {" "}
                            {item.status}
                          </option>
                        ))}
                      </select>

                      {productDetailRepair.map((item) => (
                        <>
                          <span key={item.id} className="productDetailRepair">
                            {" "}
                            <span>{item.status}</span>
                            <input
                              type="checkbox"
                              value={`${item.status}`}
                              {...register(
                                !flagReg
                                  ? "productDetailRepair"
                                  : "update.productDetailRepair",
                                registerOptions.productDetailRepair
                              )}
                            />
                          </span>
                        </>
                      ))}
                    </div>

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
                    <span>ملاحظات صرفا جهت تعمیرات :</span>

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
