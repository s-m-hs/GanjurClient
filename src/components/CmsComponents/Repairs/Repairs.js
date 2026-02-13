import React, { useContext, useEffect, useRef, useState } from "react";
import "./Repairs.css";
import { useForm } from "react-hook-form";
import apiUrl from "../../../utils/ApiConfig";
import { CmsContext } from "../../../context/CmsContext";
import { Check, Update } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import Swal from "sweetalert2";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import DateFormat from "../../../utils/DateFormat";
import { useReactToPrint } from "react-to-print";
import { Blocks, Watch } from "react-loader-spinner";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX";
import ApiPostX0 from "../../../utils/ApiServicesX/ApiPostX0";

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
  const [servicType, setServicetype] = useState(2)
  const [dnaflag, setDnaflag] = useState(false)

  const printRef = useRef();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "factor",
  });
  const [paginationArray, setPaginationArray] = useState(
    Array.from({ length: 10 })
  );


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
    })



  //  console.log(value4)
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      acceDevices:[],
      productErrorDetail:[]

    },
  });
  const resetAllSatates = () => {
    // reset(setValue(''))
    // setValue4(new Date())
  }
  const handleError = (errors) => { };
  const registerOptions = {
    customerName: { required: "Name is required" },
    phonenumber: { required: "phonenumber is required" },
    productName: { required: "productName is required" },
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
  const AccesDevices = [
    { id: 7, status: "باطری" },
    { id: 6, status: "آداپتور" },
    { id: 5, status: "کیف" },
    { id: 5, status: "مانیتور" },
    { id: 5, status: "هارد" },
  ];
  console.log(garantyId);

  const funcA = (result) => {
    alertA('')
    setGarantyId(result)
    console.log(garantyId);
    setTimeout(() => {
      handlePrint()
      resetAllSatates()
      setDnaflag(false)

    }, 1000);
  }

  const handleRegistration = (data) => {
    setDnaflag(true)
    window.scrollTo(0, 0);
    let obj = {
      id: 0,
      customerName: data.customerName,
      mobile: data.phonenumber,
      productType: data.productNameTitle,
      productBrand: data.productBrand,
      productModel: data.productName,
      acceDevices: getValues("acceDevices"),
      productProblem: getValues("productErrorDetail"),
      productProblemB: data.productProblem,
      serviceDescription: null,
      servicePrice: null,
      deliveryDate: "2026-02-11T12:51:45.678Z",
      type: servicType
    }
    // console.log(obj);
    ApiPostX0(`/api/CyCervice/addService`, obj, funcA)
  };

  const resetUpdatField2 = () => {
    window.scrollTo(0, 0);

    // setMobile("");
    // setFlagReg(false);
    // reset(setValue(""));
    // setValue4("");
    // setValue5("");
    // setValue6("");
    // setValue7("");
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
    if (mobile) {
      // getWarranty();
    }
  }, [allWarranty]);

  useEffect(() => {
    // getUserDetail();
  }, [userId]);

  const proplemWathed = watch("productErrorDetail")
  const accDevicesWathed = watch("acceDevices")
  const modelWathed = watch("productName")
  const brandwatch = watch("productBrand")
  const typewatch = watch("productNameTitle")
  const mobilewatch = watch("phonenumber")
  const namewatch = watch("customerName")
  const productProblemwatch = watch("productProblem")


  return (
    <div className="container">
      <div className="row">

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


        <div className="col-8">
          <div className="centerr">
            {warrantyArray?.length != 0 &&
              mobile &&
              warrantyArray?.map((item) => (
                <button
                  key={item.id}
                  className="btn btn-info  m-1"
                  onClick={() => {
                    setFlagReg(true);

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
                <button className={servicType == 1 ? 'btn btn-success' : 'btn btn-warning'}
                  onClick={() => {
                    if (servicType == 1) {
                      setServicetype(2)
                    } else if (servicType == 2) {
                      setServicetype(1)
                    }
                  }}
                >
                  {servicType == 1 ? 'گارانتی' : 'تعمیرات'}
                </button>

                <div className="col-4 login-label-float">
                  <input
                    className={flagReg ? "warranty-input-disable" : ""}
                    name="customerName"
                    type="text"
                    placeholder=""
                    {...register(
                      !flagReg ? "customerName" : "update.customerName",
                      registerOptions.customerName
                    )}
                  />
                  <label> نام مشتری </label>
                </div>

                <div className="col-4 login-label-float">
                  <input
                    className={flagReg ? "warranty-input-disable" : ""}
                    name="phonenumber"
                    type="text"
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
                  style={{border:'1px gray',outline:'none'}}
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
                                    style={{border:'1px gray',outline:'none'}}

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
                  <label> مدل دستگاه</label>
                </div>


                <div className="col-12 textarea_div ">
                  <span>لوازم همراه :</span>
                  {AccesDevices.map((item) => (
                    <>
                      <span key={item.id} className="productDetailRepair">
                        {" "}
                        <span>{item.status}</span>
                        <input
                          type="checkbox"
                          value={`${item.status}`}
                          {...register(
                            !flagReg
                              ? "acceDevices"
                              : "update.acceDevices",
                          )}
                        />
                      </span>
                    </>
                  ))}
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

        <div className="col-4 boxSh repair-form-div-main p-2 ">
          {/* <button onClick={() => handlePrint()}>Print</button> */}
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
              <span>شماره پذیرش :{garantyId}</span>
              <span >تاریخ پذیرش : <DateFormat dateString={value4} /></span>

            </div>

            <div className="repai-form-title repair-span">
              <span>نام مشتری :آقای/خانم {namewatch}</span>
              <span> شماره همراه :{mobilewatch}</span>
            </div>

            <div className="repai-form-title">
              <span> نوع کالا : {typewatch}</span>
              <span>  عنوان کالا :{brandwatch}</span>
            </div>

            <div className="repai-form-title">
              <span>   مدل :{modelWathed}</span>
            </div>

            <div className="repair-problem-div ">
              <span> لوازم همراه:</span>
              <div className="repair-problem-divaccdevices">
                {accDevicesWathed && getValues("acceDevices")?.map(item => (
                  <span><Check style={{ fontSize: "10px" }} />{item}</span>
                ))}
              </div>

            </div>


            <div className="repair-problem-div centerc">
              <span>ایراد کالا طبق اظهار مشتری:</span>
              <div className="repair-problem-divaccdevices ">

                {proplemWathed && getValues("productErrorDetail")?.map(item => (
                  <span>◼{item}</span>
                ))}
              </div>
            </div>

            <div className="repair-description-div ">
              ملاحظات :
              <p
              >{productProblemwatch}</p>
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
              {servicType==1 ? "ارتباط در ایتا : 09045443715" : " ارتباط در ایتا : 09045443714"}

              </li>
            </ul>

            <hr />




            <div className="repair-footer-maindiv">

              <div className="repair-footer-personel">

                <span>مشتری:{namewatch}</span>
                <span>تلفن:{mobilewatch}</span>
                <span >تاریخ  : <DateFormat dateString={value4} /></span>
              </div>

              <div className="repair-footer-personel">
                <span> نوع کالا : {typewatch}</span>
                <span>  عنوان کالا :{brandwatch}</span>

                <span>   مدل :{modelWathed}</span>
              </div>
              <div className="repair-problem-div repair-span ">
                <div className="repair-problem-divaccdevices">
                  {accDevicesWathed && getValues("acceDevices")?.map(item => (
                    <span><Check style={{ fontSize: "10px" }} />{item}</span>
                  ))}
                </div>

              </div>


              <div className="repair-problem-div repair-span centerc">
                <div className="repair-problem-divaccdevices">

                  {proplemWathed && getValues("productErrorDetail")?.map(item => (
                    <span>◼{item}</span>
                  ))}
                </div>
              </div>


              <div className="repair-descriptionb-div ">
                <p
                >{productProblemwatch}</p>
              </div>

              <div > هزینه خدمات :</div>

            </div>

   <div className="repiar-footer-span">
    <p>کالای فوق تحویل اینجانب گردید</p>
    <p>نام خانوادگی <p>امضاء</p>
</p>
    </div>
           

          </div>


        </div>
      </div>
    </div>
  );
}
