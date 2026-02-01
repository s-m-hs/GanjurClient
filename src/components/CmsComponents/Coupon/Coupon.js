import React, { useContext, useEffect, useState } from "react";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "./Coupon.css";
import { useForm } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX";
import alertA from "../../../utils/AlertFunc/AlertA";
import ApiGetX2 from "../../../utils/ApiServicesX/ApiGetX2";
import DateFormat from "../../../utils/DateFormat";
import ApiDeleteX from "../../../utils/ApiServicesX/ApiDeleteX";
import ApiDeleteX2 from "../../../utils/ApiServicesX/ApiDeleteX2";
import DotLoader from "react-spinners/DotLoader";
import "react-multi-date-picker/styles/backgrounds/bg-gray.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import ModalFull from "../../../utils/ModalFull";
import ExportToExcel from "../../../utils/Excel/ExportToExcel";
export default function Coupon() {
  let { setFlagClass } = useContext(CmsContext);
  let { themContext, setSideMenueFlag } = useContext(HomeContext);
  const [expireDate, setExpireDate] = useState();
  const [allCoupon, setAllCoupon] = useState([]);
  const [dataNumber, setDataNumber] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const offerState = [
    { id: 1, offer: 10, price: 0.9 },
    { id: 2, offer: 12, price: 0.88 },
    { id: 3, offer: 15, price: 0.85 },
    { id: 4, offer: 18, price: 0.82 },
    { id: 5, offer: 20, price: 0.8 },
    { id: 6, offer: 22, price: 0.78 },
    { id: 7, offer: 25, price: 0.75 },
  ];

  function handleChange(value) {
    setExpireDate(value && value.toDate());
    // console.log(value.format());   /// convert  to persian format
  }
  const funcA = () => {
    alertA("کدتخفیف با موفقیت اضافه شد");
    allCouponbySort();
    reset(setValue(""));
    setExpireDate("");
  };

  const handleRegistration = (data) => {
    let obj = {
      id: 0,
      code: data.couponName,
      discountAmount: data.couponOffer,
      expireDate: expireDate,
      isActive: true,
    };
    console.log(obj);
    ApiPostX("/api/CyCoupon/addCoupon", obj, funcA);
  };

  const calculateRemainingTime = (expireDateString) => {
    const expireDateTime = new Date(expireDateString).getTime();
    const currentTime = new Date().getTime();
    const difference = expireDateTime - currentTime;

    if (difference <= 0) {
      return "منقضی شده";
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    return `${days} روز و ${hours} ساعت و ${minutes} دقیقه باقی مانده`;
  };

  const allCouponbySort = () => {
    ApiGetX2("/api/CyCoupon/getAllCoupon", (data) => {
      // Sort the data by expireDate before setting the state
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.expireDate).getTime();
        const dateB = new Date(b.expireDate).getTime();
        return dateA - dateB; // Sort in ascending order of expiration date
      });
      setAllCoupon(sortedData);
      const reversedData = sortedData.reverse();
      setAllCoupon(reversedData);
    });
  };

  const getMobilSByCouponID = (id) => {
    const url = `/api/CyCoupon/getMobilSByCouponID?CouponId=${id}`;
    ApiGetX2(url, (data) => {
      console.log(data);
      setDataNumber(data);
    });
  };

  const deleteCoupon = (id) => {
    const url = `/api/CyCoupon/deletCoupon?couponId=${id}`;
    ApiDeleteX2(url, allCouponbySort);
  };

  useEffect(() => {
    allCouponbySort();
  }, []);

  useEffect(() => {
    setFlagClass(false);
    setSideMenueFlag(false)
    return () => setFlagClass(true);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className=" col-md-3 boxSh">
          <form
            action=""
            onSubmit={handleSubmit(handleRegistration)}
            className="coupon-col3-form"
          >
            <div className="login-label-float">
              <input
                name="couponName"
                type="text"
                placeholder=""
                {...register("couponName", { required: "required" })}
                isInvalid={!!errors.couponName}
              />
              <label> عنوان کدتخفیف </label>
              {errors.couponName?.message}
            </div>

            <div className="login-label-float">
              <select
                name="couponOffer"
                {...register("couponOffer", { required: "required" })}
                className="coupon-offstate-select"
              >
                <option value="" key="">
                  درصدتخفیف
                </option>
                {offerState.map((item) => (
                  <option value={item.price} key={item.id}>
                    {item.offer} %
                  </option>
                ))}
              </select>

              {/* <input name="couponOffer" type="number" step="any" placeholder="" {...register("couponOffer", { required: "required" })} />
              <label>میزان تخفیف</label> */}
              {errors.couponOffer?.message}
            </div>

            <div className="mt-5 coupon-expir-div ">
              <span
                className={
                  !themContext
                    ? "newsubject-form-col3-span"
                    : "newsubject-form-col3-span darkthem-color"
                }
              >
                تاریخ انقضا:
              </span>
              <DatePicker
                // className="custom-input"
                // className="bg-gray"
                className={!themContext ? "" : "bg-dark"}
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                value={expireDate}
                onChange={handleChange}
                animations={[
                  opacity(),
                  transition({ from: 35, duration: 800 }),
                ]}
                render={<InputIcon />}
              // style={{
              //   backgroundColor: "red",
              //   color: "red",
              //   height: "24px",
              //   borderRadius: "8px",
              //   fontSize: "30px",
              //   padding: "3px 10px",
              // }}
              />
            </div>

            <Button
              className="coupon-regbutton"
              type="submit"
              variant="contained"
              color="info"
              endIcon={<SendIcon />}
            >
              <span> افزودن </span>
            </Button>
          </form>{" "}
        </div>

        <div className="col-md-9 boxSh">
          {allCoupon.length == 0 ? (
            <div className="category-col-sm-9-div">
              <DotLoader
                color="#0d6efd"
                loading
                size={150}
                speedMultiplier={1}
              />
            </div>
          ) : (
            <div className="coupon-table">
              <table
                className={
                  !themContext
                    ? "table table-striped "
                    : "table table-striped table-dark "
                }
              >
                <thead>
                  <tr>
                    <th scope="col">عنوان کدتخفیف</th>
                    <th scope="col">میزان تخفیف</th>
                    <th scope="col">تاریخ انقضا</th>
                    <th className="element-hide" scope="col">زمان مانده</th>{" "}
                    {/* Added new column header */}
                    <th scope="col">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {allCoupon.map((item, index) => (
                    <tr key={index}>
                      <td>{item.code}</td>
                      <td> {item.discountAmount}</td>
                      <td>
                        <DateFormat dateString={item.expireDate} />
                      </td>
                      <td className="element-hide">
                        {calculateRemainingTime(item.expireDate)}{" "}
                        {/* Display remaining time */}
                      </td>

                      <td
                        onClick={() => {
                          getMobilSByCouponID(item.id);
                        }}
                      >
                        <ModalFull text="کاربران">
                          {dataNumber.length > 0 && (
                            <ExportToExcel phoneNumbers={dataNumber} />
                          )}
                        </ModalFull>
                      </td>

                      <td>
                        <Button
                          className="coupon-editbutton"
                          variant="contained"
                          color="error"
                          onClick={() => {
                            deleteCoupon(item.id);
                          }}
                        >
                          <span>حذف</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
