import React, { useContext, useEffect, useRef, useState } from "react";
import "./InspectionOrders.css";
import apiUrl from "../../../utils/ApiConfig";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import DateFormat from "../../../utils/DateFormat";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChangeUplode from "../../../utils/ChangeUplode";
import DownloadFile from "../../../utils/DownloadFile";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SendIcon from "@mui/icons-material/Send";
export default function InspectionOrders() {
  const [pcbArray, setPcbArray] = useState([]);
  const [InspectionForm, setInspectionForm] = useState([]);
  const [pcbFormId, setPcbFormId] = useState("");
  const [guIdB, setGuIdB] = useState("");
  const [inspectionFile, setInspectionFile] = useState("");
  const [statusText, setStatusText] = useState("");
  const [selectStatusId, setSelectStatusId] = useState(1);
  const [productInspection, setProductInspection] = useState([]);
  const homeContext = useContext(HomeContext);
  const cmsContext = useContext(CmsContext);

  /////////////message state
  const classRef = useRef();
  const classRefC = useRef();
  const classRefG = useRef();
  const [messageArray, setMessageArray] = useState([]);
  const [flag, setFlag] = useState(false);
  const [file, setFile] = useState({});
  const [textArea, setTextArea] = useState("");
  const [userId, setUserId] = useState("");
  const [guIdC, setGuIdC] = useState("");
  const [isChecked, setIsChecked] = useState(false);

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
        });
      }
    });
  };

  const stateArraySelect = [
    { id: 1, state: "ارسال جهت استعلام گیری  " },
    { id: 2, state: "درانتظار تایید مشتری" },
    { id: 3, state: "تایید مشتری" },
    { id: 4, state: "حین فرآیند تست" },
    { id: 5, state: "تحویل داده شده" },
    { id: 6, state: "لغو شده" },
    { id: 7, state: " همه سفارشات" },
  ];

  const changHandler = (e) => {
    setStatusText(e.target.value);
    // console.log(e.target.value)
  };
  const changeSMSbox = (e) => {
    setIsChecked(e.target.checked);
  };
  /////////////////////////////////message states
  const notify = (title) => {
    toast.success(`${title}`);
    setFlag((prev) => !prev);
    setTextArea("");
    setGuIdC("");
    setFile({});
  };

  const getMessageHandler = () => {
    async function myAppGet() {
      const res = await fetch(
        `${apiUrl}/api/CyOrderMessage/GetMessagesByOrderIDAdmin?OrderID=${pcbFormId}`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            // Authorization: `Bearer ${cmsContext.token.token}`,
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

  const sendSMS = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyOrderMessage/sendSms?OrderId=${pcbFormId}`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            // Authorization: `Bearer ${cmsContext.token.token}`,
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
      orderID: pcbFormId,
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
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.status == 200) {
            if (isChecked) {
              sendSMS();
              notify("پیام با موفقیت ارسال شد...");
              getInspection();
              classRefC.current.classList.add("order-hide");
              return res.json();
            } else {
              notify("پیام با موفقیت ارسال شد...");
              getInspection();
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
  const funcA = () => classRefC.current.classList.remove("order-hide");

  useEffect(() => {
    if (file?.name) {
      ChangeUplode(file, funcA, setGuIdC);
    }
  }, [file]);

  useEffect(() => {
    if (pcbFormId) {
      getMessageHandler();
    }
  }, [pcbFormId, flag]);

  //////////////////////////////////////////////end message state

  const setstatusHandler = () => {
    let obj = {
      orderId: pcbFormId,
      statusText: statusText,
      status: Number(selectStatusId),
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/updatePcbOrderStatus`, {
        method: "PUT",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.status == 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "وضعیت جدید ثبت شد",
              showConfirmButton: false,
              timer: 1500,
            }).then((res) => getInspection());
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

  const clickPCBHandler = (items, id, textstatus, file, proItems, cyUserID) => {
    setInspectionForm(items);
    setPcbFormId(id);
    setInspectionFile(file);
    setProductInspection(proItems);
    setUserId(cyUserID);

  };

  const getInspection = () => {
    let obj = {
      pageNumber: 0,
      pageSize: 100,
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/getAllInspectionOrders`, {
        method: "POST",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          if (result) {
            setPcbArray(result.itemList);
          }
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  useEffect(() => {
    getInspection();
  }, []);

  return (
    <div className="container container">
      <div className="row row-main">
        <div className="col col-main ">
          <div className="row">
            {/* messege state */}
            <div className="col-md-4 centerc paziresh-code">
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
              />
              <div className="pcb-right-message-div" ref={classRef}>
                <div
                  className="centerr"
                  style={{
                    justifyContent: "flex-start",
                    backgroundColor: "aliceblue",
                  }}
                >
                  <div
                    className="order-right-message-closeicon"
                    onClick={() => {
                      classRef.current.classList.remove("pcb-message-show");
                      classRefG.current.classList.remove("injHidden");
                      // classRefB.current.classList.remove("pagination-ref");
                      setFile({});
                    }}
                  >
                    <i class="fa-regular fa-circle-xmark fa-xl"></i>
                  </div>
                  <div
                    className="order-right-message-refresh"
                    onClick={() => {
                      notify("پیام ها به روز رسانی شد...");
                    }}
                  >
                    <i
                      class="fa-solid fa-rotate fa-xl"
                      style={{ color: "green" }}
                    ></i>
                  </div>
                </div>
                <div className="order-right-message-divA">
                  {messageArray.length > 0 &&
                    messageArray.map((item) => (
                      <div key={item.id}
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
                <div className="order-right-message-divB">
                  <textarea
                    name=""
                    id=""
                    placeholder="پیامت را اینجا بنویس..."
                    value={textArea}
                    onChange={changeTextArea}
                  ></textarea>

                  <div className="order-right-message-file-div">
                    <span><UploadFileIcon/></span>
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

                  <div className="centerr bom-sendMessage-sms-div ">
                    <button className="btn btn-info" onClick={sendHandler}>
                      ارسال
               <SendIcon/>
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
              {/* messege state */}

              {/* <table className='table table-stripe pcb-table'> */}
              <table
                ref={classRefG}
                className={
                  !homeContext.themContext
                    ? "table table-striped   pcb-table"
                    : "table table-striped table-dark  pcb-table"
                }
              >
                <thead>
                  <tr key="">
                    <th> ردیف</th>
                    <th>نام مشتری</th>
                    <th>تاریخ سفارش</th>
                    <th> شماره ارزیابی</th>
                  </tr>
                </thead>

                <tbody>
                  <tr key=""></tr>
                </tbody>
                {pcbArray?.length != 0 &&
                  pcbArray?.map((item, index) => (
                    <>
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        {/* <td className='pcborder-table-userid-td'>{item.cyUserID}</td> */}

                        {/* <td >{DateFormat(item.orderDate) }</td> */}
                        {/* <td > <DateFormat dateString={`${item.orderDate}`} />
</td> */}
                        <td>{item.name}</td>

                        <td>
                          {" "}
                          <DateFormat dateString={`${item.orderDate}`} />
                        </td>

                        <td className="pcborder-table-id-td">
                          {item.notification && <NotificationsIcon />}

                          <button
                            key={item.id}
                            className="btn btn-outline-info m-1 button_code "
                            onClick={() => {
                              setGuIdB("");
                              setGuIdC("");
                              setFile({});
                              classRefC.current.classList.add("order-hide");
                              setInspectionFile("");
                              clickPCBHandler(
                                item.inspectionForm,
                                item.id,
                                item.statusText,
                                item.inspectionForm.file,
                                item.inspectionForm.items,
                                item.cyUserID
                                // item.pcbForm.placeAndPick,item.pcbForm.bomExcell,item.pcbForm.zipFile,
                              );
                              setTextArea("");
                              window.scrollTo(0, 0);
                            }}
                          >
                            {item.id}
                            <span className="pcborder-table-status-span ">
                              {item.statusText}
                            </span>
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
              </table>
            </div>
            <div className=" col-md-8">
              <div className="row row-pcbform">
                <button
                  className="btn btn-info m-1 button_code"
                  style={{ color: "#fff", fontSize: "25px" }}
                  disabled
                >
                  {pcbFormId}
                  {/* {pcbFormStatusText} */}
                </button>

                {/* messege state */}
                {pcbFormId && (
                  <div className="pcb-table-message-div">
                    <span
                      className="pcb-table-message-span sphere-pcb "
                      onClick={() => {
                        classRef.current.classList.add("pcb-message-show");
                        classRefG.current.classList.add("injHidden");
                        // classRefB.current.classList.add("pagination-ref");
                      }}
                    >
                      <i
                        class="fa-solid fa-message "
                        style={{ color: "#555" }}
                      ></i>
                    </span>
                  </div>
                )}

                {/* messege state */}

                <div className="col-12 centerr pcb-stats-col">
                  <div className="login-label-float">
                    <input
                      value={statusText}
                      onChange={(e) => changHandler(e)}
                      placeholder="در حال انتظار"
                    />
                    <label> ثبت وضعیت ارزیابی</label>
                  </div>
                  <label className=""> وضعیت:</label>
                  <select
                    className="pcborder-select"
                    onChange={(e) => {
                      setSelectStatusId(e.target.value);
                    }}
                  >
                    {/* <option value="">انتخاب کنید...</option> */}
                    {stateArraySelect.map((item) => (
                      <>
                        <option key={item.id} value={item.id}>
                          {item.state}
                        </option>
                      </>
                    ))}
                  </select>

                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setstatusHandler();
                    }}
                  >
                    تایید
                  </button>
                </div>
                <hr />

                <div className="col-12">
                  {productInspection?.length != 0 && (
                    <div className="productInspection-div centerr">
                      {productInspection?.map((item) => (
                        <>
                          <div key={item.id} className="col-md-4">
                            <div
                              className="login-label-float
"
                            >
                              <input disabled value={item.partNumber} />
                              <label>PartNumber </label>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div
                              className="login-label-float
"
                            >
                              <input disabled value={item.quantity} />
                              <label>Quantity </label>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <div
                              className="login-label-float
"
                            >
                              <input disabled value={item.targetDate} />
                              <label>TargetDate </label>
                            </div>
                          </div>
                        </>
                      ))}
                    </div>
                  )}
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input
                      disabled
                      value={InspectionForm.externalVisualInspection}
                    />
                    <label>externalVisualInspection </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={InspectionForm.heatedChemicalTest} />

                    <label>heatedChemicalTest </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input
                      disabled
                      value={InspectionForm.internalVisualInspection}
                    />

                    <label>internalVisualInspection</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={InspectionForm.keyFunctional} />

                    <label>keyFunctional </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={InspectionForm.baking} />

                    <label>baking </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={InspectionForm.pinCorrelationTest} />

                    <label>pinCorrelationTest</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={InspectionForm.programmingTest} />

                    <label>programmingTest</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={InspectionForm.radiography} />
                    <label>radiography </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input
                      disabled
                      value={InspectionForm.solderabilityAnalysis}
                    />
                    <label>solderabilityAnalysis </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={InspectionForm.tapeAndReel} />

                    <label>tapeAndReel </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={InspectionForm.xrfTest} />
                    <label>xrfTest </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    {inspectionFile ? (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          downloadByAlert(inspectionFile);
                        }}
                      >
                        {" "}
                        <i
                          class="fa-solid fa-file-arrow-down fa-bounce fa-xl"
                          style={{ color: "rgb(156 78 107)" }}
                        ></i>
                        inspectionFile
                      </button>
                    ) : (
                      <button className="btn btn-warning" disabled>
                        inspectionFile
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
