import React, { useContext, useEffect, useRef, useState } from "react";
import "./Bom.css";
import apiUrl from "../../../utils/ApiConfig";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import DateFormat from "../../../utils/DateFormat";
import Swal from "sweetalert2";
import { Toast } from "primereact/toast";
import Modal from "react-bootstrap/Modal";
import DotLoader from "react-spinners/DotLoader";
import { Sidebar } from "primereact/sidebar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChangeUplode from "../../../utils/ChangeUplode";
import DownloadFile from "../../../utils/DownloadFile";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX";
import ApiPostX3 from "../../../utils/ApiServicesX/ApiPostX3";
import ApiGetX from "../../../utils/ApiServicesX/ApiGetX";
import ApiPostX2 from "../../../utils/ApiServicesX/ApiPostX2";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";
export default function BOM() {
  const [BomArray, setBomArray] = useState([]);
  const [guId, setGuId] = useState("");
  const [bomId, setBOMId] = useState("");
  const [statusText, setStatusText] = useState("");
  const [guIdC, setGuIdC] = useState("");
  const [file4, setFile4] = useState({});
  const [flagUpdateAnbar, setFlagUpdateAnbar] = useState(false);
  const [showB, setShowB] = useState(false);
  const [guIdD, setGuIdD] = useState("");
  const [guIdB, setGuIdB] = useState("");
  const [selectStatusId, setSelectStatusId] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [orderDetail, setOrderDetail] = useState([]);
  const [visible, setVisible] = useState(false);
  const [statusIntegger, setStatusIntegger] = useState(1);
  const homeContext = useContext(HomeContext);
  const cmsContext = useContext(CmsContext);
  // const headerAuth = `Bearer ${cmsContext.token.token}`;
  const [flag, setFlag] = useState(false);
  const [file, setFile] = useState({});
  const [textArea, setTextArea] = useState("");
  const [userId, setUserId] = useState("");

  /////////////message state
  const classRefC = useRef();
  const [messageArray, setMessageArray] = useState([]);

  ////////////////////////
  const downloadByAlert = (guidFile) => {
    Swal.fire({
      title: "فایل دانلود شود؟",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "بله",
      denyButtonText: `خیر`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        DownloadFile(guidFile);
        Swal.fire({
          position: "center",
          icon: "success",
          title: " فابل در حال دانلود است",
          showConfirmButton: false,
          timer: 500,
        }).then((res) => setVisible(true));
      } else {
        setVisible(true);
      }
    });
  };

  const stateArraySelect = [
    { id: 1, state: "ارسال جهت استعلام گیری  " },
    { id: 2, state: "درانتظار تایید مشتری" },
    { id: 3, state: "تایید مشتری" },
    { id: 4, state: "در حال تامین" },
    { id: 9, state: "در حال ارسال" },
    { id: 5, state: "تحویل داده شده" },
    { id: 6, state: "لغو شده" },
    // { id: 7, state: " همه سفارشات" },
  ];
  const fileChange7 = (e) => {
    setFile4(e.target.files[0]);
  };

  const funcA = () => {
    console.log("");
  };
  useEffect(() => {
    if (file4?.name) {
      // changeUplodeB()
      ChangeUplode(file4, funcA, setGuIdD);
    }
  }, [file4]);

  const funcC = () => {
    setFile4({});
    setGuIdD("");
    setShowB(false);
    setFlagUpdateAnbar(false);
    getOrderdetail(bomId);
    setVisible(true);
  };
  const updateQuntityExell = () => {
    setVisible(false);
    setFlagUpdateAnbar(true);
    setShowB(true);
    let obj = {
      fileId: guIdD,
      orderId: bomId,
    };
    ApiPostX("/api/CyOrders/uploadFinalExcelV2", obj, funcC);
  };

  const changHandler = (e) => {
    setStatusText(e.target.value);
  };
  const changeSMSbox = (e) => {
    setIsChecked(e.target.checked);
  };
  /////////////////////////////////message states
  const notify = () => {
    setFlag((prev) => !prev);
    setTextArea("");
    setGuIdC("");
    setFile({});
    classRefC.current.classList.add("bom-hide");
  };

  const toastB = useRef(null);

  const show = (stat, title) => {
    toastB.current.show({ severity: stat, summary: stat, detail: title });
  };

  const getMessageHandler = () => {
    async function myAppGet() {
      const res = await fetch(
        `${apiUrl}/api/CyOrderMessage/GetMessagesByOrderIDAdmin?OrderID=${bomId}`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result) {
            setMessageArray(result);
            if (result.senderID !== userId) {
              setGuIdB(result.fileID);
            }
          }
        })
        .catch((err) => console.log(err));
    }
    myAppGet();
  };

  const changeTextArea = (e) => {
    setTextArea(e.target.value);
  };
  ///////////////////////////
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const funcD = () => {
    console.log("");
  };
  const sendSMS = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyOrderMessage/sendSms?OrderId=${bomId}`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  const sendHandler = () => {
    let obj = {
      id: 0,
      senderID: 0,
      orderID: bomId,
      description: textArea ? textArea : guIdC ? "ارسال فایل" : "",
      status: 1,
      sentDate: "2024-07-17T19:41:14.487Z",
      seenDate: "2024-07-17T19:41:14.487Z",
      fileID: guIdC ? guIdC : null,
    };
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
              getBom();

              return res.json();
            } else {
              show("info", " پیام با موفقیت ارسال شد");
              notify();
              getBom();

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
  const funcB = () => {
    classRefC.current.classList.remove("bom-hide");
  };

  useEffect(() => {
    if (file?.name) {
      ChangeUplode(file, funcB, setGuIdC);

      // changeUplode();
    }
  }, [file]);

  useEffect(() => {
    if (bomId) {
      getMessageHandler();
    }
  }, [bomId, flag]);

  //////////////////////////////////////////////end message state

  const setstatusHandler = () => {
    let obj = {
      orderId: bomId,
      statusText: statusText,
      status: Number(selectStatusId),
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/updatePcbOrderStatus`, {
        method: "PUT",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.status == 200) {
            setStatusText("");
            Swal.fire({
              position: "center",
              icon: "success",
              title: "وضعیت جدید ثبت شد",
              showConfirmButton: false,
              timer: 1500,
            }).then((res) => getBom());
            return res.json();
          }
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };
  const clickBOMHandler = (
    bomFileID,
    cyAddressID,
    cyOrderItems,
    cyUserID,
    id,
    orderDate,
    statusInt,
    statusTexttt
  ) => {
    setGuId(bomFileID);
    setBOMId(id);
    setUserId(cyUserID);
    setStatusText(statusTexttt);
    setStatusIntegger(statusInt);
  };

  const getBom = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/GetAllBomOrdersV2`, {
        method: "GET",
        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          if (result) {
            setBomArray(result);
          }
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  const getOrderdetail = (id) => {
    ApiPostX3(
      "/api/CyOrders/GetOrderDetailsAdmin?OrderId=",
      id,
      setOrderDetail
    );
  };

  useEffect(() => {
    getBom();
  }, []);

  return (
    <div className="container container">
      <div className="card flex justify-content-center">
        <Toast ref={toastB} />
      </div>
      {flagUpdateAnbar && (
        <Modal show={showB}>
          <div className="product-loaderB">
            <div className="skin-colsm9-div">
              <DotLoader
                color="#0d6efd"
                loading
                size={150}
                speedMultiplier={1}
              />
            </div>
          </div>
        </Modal>
      )}

      <div className="row row-main">
        <div className="col col-main ">
          <div className="row">
            {/* messege state */}
            <div className="col-12 centerc paziresh-code">
              {/* messege state */}

              {/* <table className='table table-stripe pcb-table'> */}
              <table
                //  ref={classRefG}
                className={
                  !homeContext.themContext
                    ? "table table-striped   pcb-table "
                    : "table table-striped table-dark  pcb-table"
                }
              >
                <thead>
                  <tr key="">
                    <th>ردیف</th>
                    <th>نام مشتری</th>
                    <th>تاریخ سفارش</th>
                    <th>تاریخ ارایه استعلام</th>
                    <th>تاریخ آغاز سفارش</th>
                    <th> شماره BOM</th>
                  </tr>
                </thead>

                <tbody>
                  {BomArray?.length != 0 &&
                    BomArray?.map((item, index) => (
                      <tr key={item.id}>
                        {/* <td >{item.orderDate }</td> */}
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                          {" "}
                          <DateFormat dateString={`${item.orderDate}`} />
                        </td>
                        <td>
                          {" "}
                          <DateFormat dateString={`${item.finalizedDate}`} />
                        </td>
                        <td>
                          {" "}
                          <DateFormat dateString={`${item.inProccessDate}`} />
                        </td>

                        <td className="bom-table-id-td">
                          {item.notification && <NotificationsIcon />}

                          <button
                            key={item.id}
                            className="btn btn-outline-info m-1 button_code "
                            onClick={() => {
                              // console.log(item)
                              setOrderDetail([]);
                              setBOMId("");
                              setStatusText("");
                              setGuId("");
                              setGuIdD("");
                              setGuIdC("");
                              setFile4({});
                              clickBOMHandler(
                                item.bomFileID,
                                item.cyAddressID,
                                item.cyOrderItems,
                                item.cyUserID,
                                item.id,
                                item.orderDate,
                                item.status,
                                item.statusText
                              );
                              setTextArea("");
                              getOrderdetail(item.id);
                              setVisible(true);

                              // setBomFlag(!flag)
                            }}
                          >
                            {item.id}
                            {/* <span className='pcborder-table-status-span ' >{item.statusText}</span> */}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
        <div className="container Modal-container">
          <div className="row Modal-container-row">
            <div className=" col-md-8">
              {bomId && (
                <div className="row row-pcbform">
                  <button
                    className="btn btn-info m-1 button_code"
                    style={{ color: "#fff", fontSize: "25px" }}
                    disabled
                  >
                    {bomId}
                    {/* ( {orderStatusText}) */}
                  </button>

                  {/* messege state */}
                  {/* {

{/* messege state */}

                  <div className="col-12 centerr pcb-stats-col">
                    <div className="login-label-float">
                      <input
                        value={statusText}
                        onChange={(e) => changHandler(e)}
                        placeholder="در حال انتظار"
                      />
                      <label> ثبت وضعیت BOM</label>
                    </div>
                    <label className=""> وضعیت:</label>
                    <select
                      className="bom-select"
                      onChange={(e) => {
                        setSelectStatusId(e.target.value);
                        setStatusIntegger(e.target.value);
                      }}
                    >
                      <option
                        className="bom-select-option"
                        value={statusIntegger}
                      >
                        {stateArraySelect.filter(
                          (filter) => filter.id == statusIntegger
                        )[0]
                          ? stateArraySelect.filter(
                              (filter) => filter.id == statusIntegger
                            )[0].state
                          : "وضعیت را انتخاب کنید..."}
                      </option>

                      {stateArraySelect
                        .filter((filter) => filter.id != statusIntegger)
                        .map((item) => (
                          <>
                            <option
                              key={item.id}
                              value={item.id}
                              // value={statusIntegger}
                            >
                              {item.state}
                            </option>
                          </>
                        ))}
                    </select>

                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setstatusHandler();
                        setVisible(false);
                      }}
                    >
                      تایید
                    </button>
                  </div>
                  <hr />

                  <div className="col-md-4">
                    <div
                      className="login-label-float
"
                    >
                      {guId ? (
                        <button
                          className="btn btn-warning"
                          onClick={() => {
                            setVisible(false);
                            downloadByAlert(guId);
                          }}
                        >
                          {" "}
                          <i
                            class="fa-solid fa-file-arrow-down fa-bounce fa-xl"
                            style={{ color: "rgb(156 78 107)" }}
                          ></i>
                          File
                        </button>
                      ) : (
                        <button className="btn btn-warning" disabled>
                          File
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="product-countUpdate-div boxSh mt-5">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        setVisible(false);
                        downloadByAlert("fde7b822-5c7e-42af-9032-42eb83bda344");
                      }}
                    >
                      نمونه فایل جهت بارگزاری
                    </button>
                    <div className="product-countUpdate-div_div">
                      <input
                        className=" Product-search"
                        placeholder="عنوان"
                        name="search"
                        type="file"
                        onChange={(e) => {
                          fileChange7(e);
                        }}
                      />

                      <button
                        className={
                          guIdD
                            ? "btn btn-outline-info"
                            : "btn btn-outline-info bomDisable"
                        }
                        style={{
                          height: "50px",
                          margin: "5px",
                          width: "200px",
                        }}
                        type="submit"
                        onClick={() => {
                          updateQuntityExell();
                        }}
                      >
                        {" "}
                        بارگزاری فایل{" "}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <hr />
              {orderDetail?.length != 0 && (
                <div className="row">
                  <div className="col">
                    <div className="table table-striped bom-table">
                      <thead>
                        <tr key="">
                          <th>پارت نامبر</th>
                          <th>شرکت سازنده</th>
                          <th>تعداد</th>
                          <th>قیمت واحد</th>
                          <th>قیمت کل</th>
                          <th>دوره تامین</th>
                          <th>توضیحات</th>
                        </tr>
                      </thead>

                      <tbody>
                        {orderDetail?.map((item) => (
                          <tr key={item.id}>
                            <td>{item.partNumber}</td>
                            <td>{item.manufacturer}</td>
                            <td>{item.quantity}</td>
                            <td>{item.unitPrice}</td>
                            <td>{item.totalPrice}</td>
                            <td>{item.duration}</td>
                            <td>{item.information}</td>
                          </tr>
                        ))}
                      </tbody>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-4">
              <div
                className="bom-right-message-div"
                //  ref={classRef}
              >
                <div
                  className="centerr"
                  style={{
                    justifyContent: "flex-start",
                    backgroundColor: "aliceblue",
                  }}
                >
                  <div
                    className="bom-order-right-message-refresh"
                    onClick={() => {
                      show("info", "پیام ها به روز رسانی شد...");
                      notify();
                    }}
                  >
                    <i
                      class="fa-solid fa-rotate fa-xl"
                      style={{ color: "green" }}
                    ></i>
                  </div>
                </div>

                <div className="bom-order-right-message-divA">
                  {messageArray.length > 0 &&
                    messageArray.map((item) => (
                      <div
                        key={item.id}
                        className={
                          item.senderID === userId
                            ? "bom-order-messeage-desc-div-sender centerr"
                            : "bom-order-messeage-desc-div centerr"
                        }
                      >
                        <h5
                          className={
                            item.senderID === userId
                              ? "bom-order-messeage-desc-sender"
                              : "bom-order-messeage-desc"
                          }
                        >
                          {item.description}
                          <span className="bom-order-messeage-desc-sendername">
                            {item.senderName}
                          </span>
                          <span className="bom-order-messeage-desc-date">
                            {/* {DateFormat(item.sentDate)} */}
                            {/* <DateFormat dateString="2024-10-08T14:30:00Z" /> */}
                            <DateFormat dateString={`${item.sentDate}`} />
                          </span>
                          {item.fileID != null ? (
                            <button
                              className="bom-order-downlod-button"
                              onClick={() => {
                                setVisible(false);
                                setGuIdC(item.fileID);
                                downloadByAlert(item.fileID);
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

                <div className="bom-order-right-message-divB">
                  <textarea
                    name=""
                    id=""
                    placeholder="پیامت را اینجا بنویس..."
                    value={textArea}
                    onChange={changeTextArea}
                  ></textarea>

                  <div className="bom-order-right-message-file-div">
                    <span>
                      <UploadFileIcon />
                    </span>
                    <input
                      type="file"
                      className="bom-order-right-message-file-input"
                      onChange={fileChange}
                    />
                    <div className="bom-order-file-i bom-hide " ref={classRefC}>
                      <i
                        class="fa-solid fa-file-circle-check fa-2xl fa-beat-fade"
                        style={{ color: "#63E6BE", marginRight: "40px" }}
                      ></i>
                    </div>
                  </div>

                  <div className="centerr bom-sendMessage-sms-div ">
                    <button className="btn btn-info" onClick={sendHandler}>
                      ارسال
                      <SendIcon />
                    </button>

                    <input
                      className="bom-sms-input"
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
        </div>
      </Sidebar>
    </div>
  );
}
