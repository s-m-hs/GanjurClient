import React, { useContext, useEffect, useState, useRef } from "react";
import "./Order.css";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import DataTable from "../DataTable/DataTable";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DateFormat from "../../../utils/DateFormat";
import DotLoader from "react-spinners/DotLoader";
import Pagination from "@mui/material/Pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiUrl from "../../../utils/ApiConfig";
import { Sidebar } from "primereact/sidebar";
import { Toast } from "primereact/toast";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChangeUplode from "../../../utils/ChangeUplode";
import DownloadFile from "../../../utils/DownloadFile";
import ApiPostX2 from "../../../utils/ApiServicesX/ApiPostX2";
import ApiPostX3 from "../../../utils/ApiServicesX/ApiPostX3";
import ApiPuX2 from "../../../utils/ApiServicesX/ApiPutX2";
import ApiPutX3 from "../../../utils/ApiServicesX/ApiPutX3";
import ApiPostX4 from "../../../utils/ApiServicesX/ApiPostX4";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";
import mode from "../../../utils/ModsB";
import Modal from "react-bootstrap/Modal";
import alertC from "../../../utils/AlertFunc/AlertC";
import ApiGetX2 from "../../../utils/ApiServicesX/ApiGetX2";

export default function Order() {
  const [stateId, setStateId] = useState(2);

  const [orderId, setOrderID] = useState("");
  const [statearray, setStateArray] = useState("");
  const [ordeDetail, setOrdeDetail] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const [resultArrayFlag, setResultArrayFlag] = useState(false);
  const [textArea, setTextArea] = useState("");
  const [messageArray, setMessageArray] = useState([]);
  const messageArrayRevers = messageArray.slice().reverse();
  const [flag, setFlag] = useState(false);
  const [paginationArray, setPaginationArray] = useState([]);
  const [userId, setUserId] = useState("");
  const cmsContext = useContext(CmsContext);
  const classRef = useRef();
  const classRefB = useRef();
  const classRefC = useRef();
  const [page, setPage] = React.useState(1);
  const [guId, setGuId] = useState("");
  const [guIdB, setGuIdB] = useState("");
  const [file, setFile] = useState({});
  const [flagButton, setFlagButton] = useState(false);
  const [visible, setVisible] = useState(false);
  const [inputValues, setInputValues] = useState({});
  const [inputValuesB, setInputValuesB] = useState({});
  const pageCount = 30;
  const [allCount, setAllCount] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  const [postState, setPostState] = useState(0)

  const homeContext = useContext(HomeContext);
  // const headerAuth = `Bearer ${cmsContext.token.token}`;
  ///for SaneComputer==>
  const [showB, setShowB] = useState(false);
  const handleCloseB = () => setShowB(false);
  /////////
  const [profile, setProfile] = useState({});
  const handleChange = (event, value) => {
    setPage(value);
    getBGetOrdersByStatus(value - 1, pageCount);
  };
  useEffect(() => {
    if (statearray.length != 0) {
      let x = allCount;
      let countInPage = pageCount;
      let z = Math.ceil(x / countInPage);
      z
        ? setPaginationArray(Array.from({ length: z }))
        : setPaginationArray([]);
    }
  }, [statearray]);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const registerOptions = {
    text: { required: "text is required" },
    code: { required: "code is required" },
  };

  const handleError = (errors) => { };

  const notify = () => {
    // toast.success(`${title}`);
    setFile({});
    setGuId("");
    // setFlag((prev) => !prev);
    setTextArea("");
  };
  // const  notifyB = (title) => {
  //   toast.success(`${title}`);

  // };
  const toastB = useRef(null);

  const show = (stat, title) => {
    toastB.current.show({ severity: stat, summary: stat, detail: title });
  };
  ////////////////////////////
  const stateArraySelect = [
    // { id: 1, state: "ارسال جهت استعلام گیری  " },
    // { id: 2, state: "سفارشات آنلاین" },
    // { id: 3, state: "تایید مشتری" },
    // { id: 4, state: "در حال تامین" },
    { id: 5, state: "تحویل داده شده" },
    // { id: 6, state: "لغو شده" },
    { id: 0, state: " همه سفارشات" },
  ];
  //////////////////////////
  const changeTextArea = (e) => {
    setTextArea(e.target.value);
  };

  const changeSMSbox = (e) => {
    setIsChecked(e.target.checked);
  };
  // console.log(SMScheck)

  ///////////////////////////
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };
  ////////////////////////
  const resetBasketTable = () => {
    setFlagButton(false);
    setTotalPrice(0);
    reset(setValue(""));
  };

  ///for SaneComputer ==>
  const getprofile = (id) => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyUsers/${id}`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            setProfile(result);
            setShowB(true);
          });
        }
      });
    }
    myApp();
  };
  ////////////////////
  const sendSMS = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyOrderMessage/sendSms?OrderId=${orderId}`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
        }
      ).catch((err) => console.log(err));
    }
    myApp();
  };

  /////////////////////////
  const funcC = () => {
    if (isChecked) {
      // sendSMS()
      show("info", " پیام با موفقیت ارسال شد");
      notify();

      classRefC.current.classList.add("order-hide");
    } else {
      show("info", " پیام با موفقیت ارسال شد");
      notify();

      classRefC.current.classList.add("order-hide");
    }
  };
  const sendHandler = () => {
    let obj = {
      id: 0,
      senderID: 0,
      orderID: orderId,
      description: textArea ? textArea : guId ? "ارسال فایل" : "",
      status: 1,
      sentDate: "2024-07-17T19:41:14.487Z",
      seenDate: "2024-07-17T19:41:14.487Z",
      fileID: guId ? guId : null,
    };
    // console.log(obj);
    async function myapp() {
      const res = await fetch(`${apiUrl}/api/CyOrderMessage/SendMessageAdmin`, {
        method: "POST",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.status == 200) {
            if (isChecked) {
              sendSMS();
              show("info", " پیام با موفقیت ارسال شد");
              notify();

              classRefC.current.classList.add("order-hide");
              return res.json();
            } else {
              show("info", " پیام با موفقیت ارسال شد");
              notify();

              classRefC.current.classList.add("order-hide");
              return res.json();
            }
          }
        })
        .then((result) => {
          setFile({});
        });
    }
    myapp();
  };

  const getMessageHandler = () => {
    ApiPostX3(
      "/api/CyOrderMessage/GetMessagesByOrderIDAdmin?OrderID=",
      orderId,
      setMessageArray
    );
  };

  {
    /* //////////////////section 2 =>>*/
  }

  const seeOrderDetail = (id, quantity) => {
    setOrdeDetail([]);
    reset(setValue(""));
    ApiPostX3("/api/CyOrders/GetOrderDetailsAdmin?OrderId=", id, setOrdeDetail);
  };
  const handleInputChange = (id, value) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const funcD = () => {
    show("info", "وضعیت جدید ثت شد");
  };
  const changeStatusText = (id, e) => {
    e.preventDefault();

    const statusText = inputValues[id] || ""; // دریافت مقدار ورودی
    const obj = { itemID: id, statusText };
    // console.log(obj); // چاپ شیء

    ApiPuX2("/api/CyOrders/updateItemStatus", obj, funcD);
  };

  const handleInputChangeB = (id, value) => {
    setInputValuesB((prev) => ({ ...prev, [id]: value }));
  };

  const funcG = () => {
    show("success", "توضیحات جدید ثبت شد");
  };
  const changeStatusTextB = (id, e) => {
    e.preventDefault();

    const statusText = inputValuesB[id] || ""; // دریافت مقدار ورودی
    const obj = { itemID: id, statusText };

    // console.log(obj); // چاپ شیء

    ApiPuX2("/api/CyOrders/updateItemInfo", obj, funcG);
  };

  {
    /* //////////////////section 2 ^^^^^*/
  }

  /////////////////////////////
  const [totalPrice, setTotalPrice] = useState(0);
  const calculateTotalPrice = (itemList) => {
    // Check for any item with unitPrice == 0
    const hasZeroUnitPrice = itemList.some(
      (item) => (item.unitPrice === 0 || !item.duration) && item.status === 1
    );

    // Trigger SweetAlert if there is an item with unitPrice == 0
    if (hasZeroUnitPrice) {
      setVisible(false);
      Swal.fire({
        icon: "warning",
        text: "...فیلدهای محصول به درستی پرنشده است ",
        confirmButtonText: "باشه",
      }).then((res) => {
        setVisible(true);

        setFlagButton(false);
      });
    }

    // Calculate the total price for items with status == 1
    const total = itemList
      .filter((item) => item.status === 1)
      .reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

    setTotalPrice(total);
    setFlagButton(true); // Assuming you want to set this to true after calculation
  };

  const handleRegistration = (data) => {
    // setResultArray([])
    const result = [];

    // Iterate over the keys of the object
    Object.keys(data).forEach((key) => {
      // Check if the key is related to quantity (starts with 'quantity')
      if (key.startsWith("quantity")) {
        // Extract the ID from the key
        const id = key.match(/\d+$/)[0]; // Extracts the digits from the end of the string

        // Create corresponding keys for unitPrice and status
        const unitPriceKey = `unitPrice${id}`;
        const statusKey = `status${id}`;
        const durationKey = `duration${id}`;

        // Check if the unitPrice and status keys exist
        if (data[unitPriceKey] !== undefined && data[statusKey] !== undefined) {
          // Push the new object to the result array
          result.push({
            id: Number(id), // Convert to number
            quantity: Number(data[key]),
            unitPrice: Number(data[unitPriceKey]),
            status: Number(data[statusKey]),
            duration: data[durationKey],
          });
        }
      }
    });
    setResultArray(result);
  };

  useEffect(() => {
    if (resultArray?.length !== 0 && !flagButton) {
      calculateTotalPrice(resultArray);
    } else if (flagButton) {
      setResultArrayFlag((prev) => !prev);
      setTotalPrice(0);
    }
  }, [resultArray]);

  const funcF = () => {
    setResultArray([]);
    setOrdeDetail([]);
    reset(setValue(""));
  };

  const DeliveredOrder = () => {
    console.log(orderId);
    let id = `${orderId}&status=5`;
    ApiPutX3("/api/CyOrders/sendToInProccess?orderId=", id, funcF);
  };

  const searchOrdersAddress = (id) => {
    let filterOrder = statearray.itemList.filter((item) => item.id == id);
    setUserAddress(filterOrder[0].address);
  };
  ///////////////////////////////// {/* //////////////////section 1 */}

  const getBGetOrdersByStatus = (pageNumber, pageSize) => {
    let obj = {
      orderStatus: Number(stateId),
      pageNumber: pageNumber,
      pageSize: pageSize,
    };

    ApiPostX4(
      "/api/CyOrders/GetOrdersByStatusAdmin",
      obj,
      setStateArray,
      setAllCount
    );
  };
  /////////////////////////////
  const funcA = () => {
    classRefC.current.classList.remove("order-hide");
  };
  const funcB = (id) => {
    setGuId(id);
    classRefC.current.classList.remove("order-hide");
  };
  useEffect(() => {
    if (file?.name) {
      ChangeUplode(file, funcA, funcB);
      // changeUplode();
    }
  }, [file]);
  //////////////////////////
  useEffect(() => {
    getBGetOrdersByStatus(0, pageCount);
  }, [stateId, resultArray, inputValues]);

  useEffect(() => {
    if (orderId) {
      Swal.fire({
        title: "از تحویل سفارش اطمینان دارید؟؟؟",
        // text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "حله ✌️",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "سفارش در لیست تحویل داده شده ها قرار گرفت...",
            // text: "Your file has been deleted.",
            icon: "success",
          });
          DeliveredOrder();
        }
      });

      // Swal.fire("از تحویل سفارش اطمینان دارید؟؟؟").then(res=>{

      // });
    }
  }, [flag]);

  useEffect(() => {
    const chekKey2 = (e) => {
      if (e.keyCode == 13) {
        sendHandler();
      } else if (e.keyCode == 27) {
        classRef.current?.classList.remove("order-message-show");
        classRefB.current?.classList.remove("pagination-ref");
      }
      // if(e.keyCode==13 && logInput=='1'){
      //   setIsEnter(true)
      // }
    };
    window.addEventListener("keydown", chekKey2);
    return () => window.removeEventListener("keydown", chekKey2);
  });

  console.log(statearray);

  useEffect(() => {
    if (orderId) {

      ApiGetX2(`/api/CyOrders/userPostStatusForAdmin?orderId=${orderId}`, setPostState)
      console.log(postState)
    }
  }, [orderId])

  return (
    <div className="container">
      <div className="card flex justify-content-center">
        <Toast ref={toastB} />
      </div>
      <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
        <div className="container order-modal-container">
          <div className="row order-modal-row">
            <div className="col-9 order-left-maindiv">
              <div className="basket-table">
                <form
                  action=""
                  onSubmit={handleSubmit(handleRegistration, handleError)}
                >
                  {/* //////////////////section 2 */}
                  <>
                    <DataTable title={`لیست سبد خرید : ${orderId}`}>
                      {/* <table className="table table-striped"> */}
                      <div className="centerr">
                        <p>نحوه ارسال  :  </p>
                        <span style={{ fontSize: '20px', fontWeight: '700' }}>   {postState.postState == 1 ? `  پست  📬 ` : 'غیره'}</span>
                      </div>
                      <table
                        className={
                          !homeContext.themContext
                            ? "table table-striped   product-table"
                            : "table table-striped table-dark  product-table"
                        }
                      >
                        <thead>
                          <tr key="">
                            <th>تصویر </th>
                            {/* <th>شناسه سفارش</th> */}
                            {/* <th>شناسه محصول</th> */}
                            <th>شرکت سازنده </th>
                            <th>سریال محصول </th>
                            <th> وضعیت</th>
                            <th>زمان تامین </th>
                            <th>توضیحات </th>
                            <th>تعداد</th>
                            <th>قیمت محصول</th>
                            {stateId == 1 && <th>وضعیت</th>}
                          </tr>
                        </thead>
                        <tbody className={!flagButton ? "" : "order_disble"}>
                          {ordeDetail.length != 0 &&
                            ordeDetail.map((item) => (
                              <>
                                <tr key={item.id}>
                                  <td>
                                    {item.cyProductImgUrl ? (
                                      <img src={item.cyProductImgUrl} alt="" />
                                    ) : (
                                      <img
                                        src="../../../../images/40166.png"
                                        alt=""
                                        style={{ width: "45px" }}
                                      />
                                    )}
                                  </td>

                                  {/* <td className="basket-table__id">
                                {item.cyOrderID}
                              </td> */}

                                  <td>{item.manufacturer}</td>

                                  <td>{item.partNumber}</td>

                                  <td className="basket-table-statustext-td">
                                    <div className="centerr">
                                      <input
                                        type="text"
                                        placeholder={item.statusText}
                                        onChange={(e) =>
                                          handleInputChange(
                                            item.id,
                                            e.target.value
                                          )
                                        } // value={statusTextOrder}
                                      />
                                      {/* <span  ref={classRefD} className="basket-table-statustext-span"  >{item.statusText}</span> */}
                                      <button
                                        className="btn btn-outline-secondary   "
                                        onClick={(e) =>
                                          changeStatusText(item.id, e)
                                        }
                                      >
                                        <i class="fa-solid fa-check fa-2xs"></i>{" "}
                                      </button>
                                    </div>
                                  </td>

                                  <td
                                    className={
                                      stateId == 1
                                        ? "basket-table-quntity"
                                        : "basket-table-quntity order_disble "
                                    }
                                  >
                                    <input
                                      type="text"
                                      name={`duration${item.id}`}
                                      {...register(`duration${item.id}`)}
                                      placeholder={item.duration}
                                    // value={item.duration}
                                    />
                                    {/* <span className="basket-table-data">روز</span> */}
                                  </td>

                                  <td className="basket-table-statustext-td">
                                    <div className="centerr">
                                      <input
                                        type="text"
                                        placeholder={item.information}
                                        onChange={(e) =>
                                          handleInputChangeB(
                                            item.id,
                                            e.target.value
                                          )
                                        } // value={statusTextOrder}
                                      />
                                      {/* <span  ref={classRefD} className="basket-table-statustext-span"  >{item.statusText}</span> */}
                                      <button
                                        className="btn btn-outline-secondary   "
                                        onClick={(e) =>
                                          changeStatusTextB(item.id, e)
                                        }
                                      >
                                        <i class="fa-solid fa-check fa-2xs"></i>{" "}
                                      </button>
                                    </div>
                                  </td>

                                  {stateId == 1 ? (
                                    <>
                                      <td className="basket-table-quntity">
                                        <input
                                          type="text"
                                          name={`quantity${item.id}`}
                                          {...register(`quantity${item.id}`, {
                                            value: `${item.quantity}`,
                                          })}
                                        />
                                        <span className="basket-table-data">
                                          عدد
                                        </span>

                                        {/* <span>{item.cyQuantity}</span> */}
                                      </td>

                                      <td
                                        style={{ textAlign: `center` }}
                                        className="basket-table-price"
                                      >
                                        <input
                                          type="text"
                                          name={`unitPrice${item.id}`}
                                          {...register(`unitPrice${item.id}`, {
                                            // value: 100,
                                            value: item.unitPrice
                                              ? `${item.unitPrice}`
                                              : 0,
                                          })}
                                        />{" "}
                                        <span className="basket-table-data">
                                          دلار
                                        </span>
                                      </td>

                                      <td className="basket-table-radio">
                                        <div className="basket-table-radio-div">
                                          {" "}
                                          <span>تایید</span>{" "}
                                          <input
                                            {...register(`status${item.id}`, {
                                              value: "1",
                                            })}
                                            type="radio"
                                            value="1"
                                          />
                                        </div>
                                        <div className="basket-table-radio-div">
                                          <span>لغو</span>{" "}
                                          <input
                                            {...register(`status${item.id}`)}
                                            type="radio"
                                            value="2"
                                          />{" "}
                                        </div>
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td
                                        style={{ textAlign: "center" }}
                                        className="basket-table-quntity"
                                      >
                                        <input
                                          disabled
                                          type="text"
                                          name={`quantity${item.id}`}
                                          {...register(`quantity${item.id}`, {
                                            value: `${item.quantity}`,
                                          })}
                                        />
                                        <span className="basket-table-data">
                                          عدد
                                        </span>

                                        {/* <span>{item.cyQuantity}</span> */}
                                      </td>

                                      <td
                                        style={{ textAlign: `center` }}
                                        className="basket-table-price"
                                      >
                                        {/* ////// for sane */}

                                        <>
                                          <input
                                            disabled
                                            type="text"
                                            name={`unitPrice${item.id}`}
                                            {...register(
                                              `unitPrice${item.id}`,
                                              {
                                                value: item.unitPrice
                                                  ? `${(
                                                    item.unitPrice / 10
                                                  ).toLocaleString()} تومان`
                                                  : 0,
                                              }
                                            )}
                                          />{" "}
                                          {/* <span className="basket-table-data">تومان</span> */}
                                        </>

                                        {item.status == 2 && (
                                          <span>لغوشده</span>
                                        )}
                                        {item.status == 1 && (
                                          <>
                                            <input
                                              disabled
                                              type="text"
                                              name={`unitPrice${item.id}`}
                                              {...register(
                                                `unitPrice${item.id}`,
                                                {
                                                  value: item.unitPrice
                                                    ? `${item.unitPrice}`
                                                    : 0,
                                                  // value: `${item.unitOfferPrice}`,
                                                }
                                              )}
                                            />{" "}
                                            <span className="basket-table-data">
                                              دلار
                                            </span>
                                            <div>{item.unitPrice}</div>
                                          </>
                                        )}
                                      </td>
                                    </>
                                  )}
                                </tr>
                              </>
                            ))}
                        </tbody>
                        <div></div>
                      </table>

                      {ordeDetail.length != 0 && stateId == 1 && (
                        <div style={{ width: "100%", textAlign: "center" }}>
                          {flagButton && (
                            <i
                              class="fa-solid fa-arrow-rotate-left fa-2xl"
                              onClick={resetBasketTable}
                              style={{
                                color: "#63E6BE",
                                marginLeft: "10px",
                                cursor: "pointer",
                              }}
                            ></i>
                          )}

                          <button
                            className="btn btn-outline-info mb-2 "
                            style={{ minWidth: "30%" }}
                            disabled
                          >
                            <h5>
                              {" "}
                              مجموع لیست سفارش :{" "}
                              {!totalPrice == 0
                                ? `${totalPrice.toLocaleString()} دلار`
                                : "..."}{" "}
                            </h5>
                          </button>

                          <button
                            style={{ fontSize: "25px" }}
                            className="btn btn-primary order-finaliz-button"
                            type="submit"
                          >
                            {!flagButton
                              ? "به روز رسانی سفارش "
                              : "تایید سفارش "}
                          </button>
                        </div>
                      )}
                      {ordeDetail.length != 0 &&
                        (stateId == 3 || stateId == 4) && (
                          <div style={{ width: "100%", textAlign: "center" }}>
                            {flagButton && (
                              <i
                                class="fa-solid fa-arrow-rotate-left fa-2xl"
                                onClick={resetBasketTable}
                                style={{
                                  color: "#63E6BE",
                                  marginLeft: "10px",
                                  cursor: "pointer",
                                }}
                              ></i>
                            )}
                            <button
                              style={{ fontSize: "25px" }}
                              className="btn btn-primary order-finaliz-button"
                              type="submit"
                            >
                              {stateId == 3
                                ? " تایید جهت پردازش"
                                : "تایید جهت تحویل "}
                            </button>
                          </div>
                        )}
                    </DataTable>
                    <h6 style={{ paddingRight: '20px', fontSize: '20px' }}>{userAddress}</h6>
                    <h6 style={{ paddingRight: '20px', fontSize: '20px' }}>شماره همراه : {postState.mobile}</h6>
                  </>
                </form>
              </div>
            </div>

            <div
              className="col-3 order-right-message-div centerc"
              ref={classRef}
            >
              <div
                className="order-right-message-refresh"
                onClick={() => {
                  show("info", "پیام ها به روز رسانی شد...");
                  notify();
                  classRef.current.classList.remove("order-message-show");
                  classRefB.current.classList.remove("pagination-ref");
                }}
              >
                <i
                  class="fa-solid fa-rotate fa-xl"
                  style={{ color: "green" }}
                ></i>
              </div>

              <div className="order-right-message-divA">
                {messageArray.length > 0 &&
                  messageArray.map((item) => (
                    <div
                      key={item.id}
                      className={
                        item.senderID === userId
                          ? "order-messeage-desc-div-sender centerr"
                          : "order-messeage-desc-div centerr"
                      }
                    >
                      <h5
                        className={
                          item.senderID === userId
                            ? "order-messeage-desc-sender"
                            : "order-messeage-desc"
                        }
                      >
                        {item.description}
                        <span className="order-messeage-desc-sendername">
                          {item.senderName}
                        </span>
                        <span className="order-messeage-desc-date">
                          {/* {DateFormat(item.sentDate)} */}
                          {/* <DateFormat dateString="2024-10-08T14:30:00Z" /> */}
                          <DateFormat dateString={`${item.sentDate}`} />
                        </span>
                        {item.fileID != null ? (
                          <button
                            className="order-downlod-button"
                            onClick={() => {
                              setGuIdB(item.fileID);
                              setVisible(false);
                              Swal.fire({
                                title: "فایل دانلود شود؟",
                                showDenyButton: true,
                                // showCancelButton: true,
                                confirmButtonText: "بله",
                                denyButtonText: `خیر`,
                              }).then((result) => {
                                /* Read more about isConfirmed, isDenied below */
                                if (result.isConfirmed) {
                                  DownloadFile(item.fileID);
                                  Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: " فابل در حال دانلود است",
                                    showConfirmButton: false,
                                    timer: 500,
                                    // color:'#208fe0'
                                  }).then((res) => setVisible(true));
                                } else if (result.isDenied) {
                                  setVisible(true);
                                }
                              });
                            }}
                          >
                            <i
                              class="fa-solid fa-file-arrow-down fa-bounce fa-2xl"
                              style={{ color: "#74C0FC" }}
                            ></i>
                          </button>
                        ) : (
                          ""
                        )}
                      </h5>

                      {item.senderID !== userId && item.status == 2 && (
                        <span>
                          <i
                            class="fa-solid fa-check-double"
                            style={{ color: "#63E6BE" }}
                          ></i>
                        </span>
                      )}
                      {item.senderID !== userId && item.status == 1 && (
                        <span>
                          <i
                            class="fa-solid fa-check"
                            style={{ color: "#63E6BE" }}
                          ></i>
                        </span>
                      )}
                    </div>
                  ))}
              </div>
              <div className="order-right-message-divB">
                <textarea
                  name=""
                  id=""
                  placeholder="پیامت را اینجا بنویس..."
                  value={textArea}
                  onChange={changeTextArea}
                ></textarea>

                <div className="order-right-message-file-div">
                  <span>
                    <UploadFileIcon />
                  </span>
                  <input
                    type="file"
                    className="order-right-message-file-input"
                    onChange={fileChange}
                  />
                  <div className="order-file-i order-hide " ref={classRefC}>
                    <i
                      class="fa-solid fa-file-circle-check fa-2xl fa-beat-fade"
                      style={{ color: "#63E6BE", marginRight: "40px" }}
                    ></i>
                  </div>
                </div>
                <div className="centerr order-sendMessage-sms-div ">
                  <button className="btn btn-info" onClick={sendHandler}>
                    ارسال
                    <SendIcon />
                  </button>

                  <input
                    className="order-sms-input"
                    type="checkbox"
                    checked={isChecked}
                    onChange={changeSMSbox}
                  // onChange={}
                  />
                  {/* <i class="fa-solid fa-comment-sms fa-lg" style= {{color:'#74C0FC'}}></i> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
      {/* <Button icon="pi pi-window-maximize" onClick={() => setVisible(true)} /> */}
      <div className="row">
        <div className="col-12">
          <ToastContainer
            position="top-right"
            autoClose={200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          // transition="Zoom"
          />

          <label className="order--state-selectlabel">دسته بندی :</label>
          <select
            className="order-state"
            onChange={(e) => {
              setPage(1);
              if (e.target.value) {
                setStateId(e.target.value);
                setOrdeDetail([]);
                setOrderID("");
              } else {
                setStateId(e.target.value);
                setStateArray([]);
                setOrdeDetail([]);
                setOrderID("");
              }
            }}
          >
            <option value="2">سفارشات آنلاین </option>
            {stateArraySelect.map((item) => (
              <>
                <option key={item.id} value={item.id}>
                  {item.state}
                </option>
              </>
            ))}
          </select>
        </div>

        {/* //////////////////section 1 */}

        <div className="col-12 order-rghit-maindiv">
          <div className="order-table">
            {statearray.length == 0 && (
              <div className="order-colsm9-div ">
                <DotLoader
                  color="#0d6efd"
                  loading
                  size={150}
                  speedMultiplier={1}
                />
              </div>
            )}

            {statearray.length !== 0 && (
              <DataTable
                className="order-table-container"
                title={"لیست سفارشات : "}
              >
                {/* <table className="table table-striped order-basket"> */}
                <table
                  className={
                    !homeContext.themContext
                      ? "table table-striped   order-basket"
                      : "table table-striped table-dark  order-basket"
                  }
                >
                  <thead>
                    <tr key="">
                      <th>ردیف</th>
                      <th>شناسه سفارش</th>
                      <th>نام مشتری </th>

                      <>
                        <th>مبلغ فاکتور</th>
                      </>

                      <th>شناسه مشتری</th>
                      <th>تاریخ ثبت سفارش </th>
                      <th>مشخصات مشتری </th>
                      <th>جزییات سفارش</th>
                      <th>تحویل شده</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statearray.itemList.map((item, index) => (
                      <>
                        <tr key={item.id}>
                          <th>{(page - 1) * pageCount + index + 1}</th>
                          <td className="order-basket__id">{item.id}</td>
                          <td className="order-basket__id">
                            {item.userName ? item.userName : item.cyUserID}
                          </td>

                          <th style={{ fontWeight: "600", fontSize: "15px" }}>
                            {(item.totalAmount / 10).toLocaleString()}تومان
                          </th>

                          <td>{item.cyUserID}</td>
                          <td>
                            {/* {DateFormat(item.orderDate)} */}
                            {/* <DateFormat dateString="2024-10-08" /> */}
                            <DateFormat dateString={`${item.orderDate}`} />
                          </td>

                          <th>
                            <button
                              className="btn btn-info"
                              onClick={() => {
                                getprofile(item.cyUserID);
                              }}
                            >
                              ☎️
                            </button>{" "}
                          </th>

                          <td className="order-button-notifi-td">
                            {item.notification && <NotificationsIcon />}

                            <button
                              className="btn btn-light"
                              onClick={() => {
                                searchOrdersAddress(item.id);
                                seeOrderDetail(item.id, item.quantity);
                                setOrderID(item.id);
                                setUserId(item.cyUserID);
                                window.scrollTo(0, 0);
                                setTotalPrice(0);
                                setVisible(true);
                                setTextArea("");
                                setResultArray([]);
                                reset(setValue(""));
                                //  console.log(messageArray)
                              }}
                            >
                              🛒
                            </button>
                          </td>

                          <td>
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                setOrderID(item.id);
                                setFlag(!flag);

                                // alertC('ddd', DeliveredOrder)
                              }}
                            >
                              🚚
                            </button>{" "}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
                <div className="order__btn__pagination">
                  {paginationArray.length > 1 && (
                    <Pagination
                      count={paginationArray.length}
                      // page={page}
                      ref={classRefB}
                      onChange={handleChange}
                      color="primary"
                      shape="rounded"
                      style={{ direction: "ltr" }}
                    //  onClick={() => ChangePage(page)}
                    />
                  )}
                </div>
              </DataTable>
            )}
          </div>
        </div>
      </div>
      <>
        <Modal show={showB} onHide={handleCloseB}>
          <Modal.Body>
            <table className="table">
              <thead>
                <tr>
                  <th>نام </th>
                  <th>نام خانوادگی </th>
                  <th>شماره همراه</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>{profile.family}</td>
                  <td>{profile.name}</td>
                  <td>{profile.mobile}</td>
                </tr>
              </tbody>
            </table>
            {/* <ul>
             {profile && <>
             <li>{profile.name}</li>
             <li>{profile.family}</li>
             <li>{profile.mobile}</li>
             <li>{profile.basketCount}</li>
             </>}
          </ul> */}
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
