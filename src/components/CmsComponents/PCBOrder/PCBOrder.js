import React, { useContext, useEffect, useRef, useState } from "react";
import "./PCBOrder.css";
import apiUrl from "../../../utils/ApiConfig";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import DateFormat from "../../../utils/DateFormat";
import Swal from "sweetalert2";
import { Toast } from "primereact/toast";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DownloadFile from "../../../utils/DownloadFile";
import ChangeUplode from "../../../utils/ChangeUplode";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import SendIcon from "@mui/icons-material/Send";

export default function PCBOrder() {
  const [pcbArray, setPcbArray] = useState([]);
  const [pcbForm, setPcbForm] = useState([]);
  const [pcbFormId, setPcbFormId] = useState("");
  const [pcbFormStatusText, setpcbFormStatusText] = useState([]);
  const [guIdB, setGuIdB] = useState("");
  const [placeAndPick, setPlaceAndPick] = useState("");
  const [bOMExcell, setBOMExcell] = useState("");
  const [zipfile, setZipfile] = useState("");
  const [stackedLayers, setStackedLayers] = useState("");
  const [statusText, setStatusText] = useState("");
  const [selectStatusId, setSelectStatusId] = useState(1);
  const [statusIntegger, setStatusIntegger] = useState(1);

  /////////////message state
  const classRef = useRef();
  const classRefB = useRef();
  const classRefC = useRef();
  const classRefG = useRef();
  const [messageArray, setMessageArray] = useState([]);
  const messageArrayRevers = messageArray.slice().reverse();

  const [flag, setFlag] = useState(false);
  const [file, setFile] = useState({});
  const [textArea, setTextArea] = useState("");
  const [userId, setUserId] = useState("");
  const [guIdC, setGuIdC] = useState("");

  const [isChecked, setIsChecked] = useState(false);

  ////////////////////////
  const homeContext = useContext(HomeContext);
  const cmsContext = useContext(CmsContext);
  // const headerAuth = `Bearer ${cmsContext.token.token}`;

  const stateArraySelect = [
    { id: 1, state: "ارسال جهت استعلام گیری  " },
    { id: 2, state: "درانتظار تایید مشتری" },
    { id: 3, state: "تایید مشتری" },
    { id: 4, state: "در حال تامین" },
    { id: 9, state: "در حال ارسال" },
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
  const notify = () => {
    setFlag((prev) => !prev);
    setTextArea("");
    setGuIdC("");
    setFile({});
    classRefC.current.classList.add("order-hide");
  };

  const toastB = useRef(null);

  const show = (stat, title) => {
    toastB.current.show({ severity: stat, summary: stat, detail: title });
  };

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
              show("info", " پیام با موفقیت ارسال شد");
              notify();
              getPCB();

              return res.json();
            } else {
              show("info", " پیام با موفقیت ارسال شد");
              notify();
              getPCB();

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
            }).then((res) => getPCB());
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

  const clickPCBHandler = (
    items,
    id,
    plcePi,
    bomExl,
    zipF,
    textstatus,
    cyUserID,
    stackedLayers
  ) => {
    // console.log(items)
    setPcbForm(items);
    setPcbFormId(id);
    setpcbFormStatusText(textstatus);
    setPlaceAndPick(plcePi);
    setBOMExcell(bomExl);
    setZipfile(zipF);
    setUserId(cyUserID);
    setStackedLayers(stackedLayers);
  };

  const getPCB = () => {
    let obj = {
      cat: "string",
      pageNumber: 0,
      pageSize: 100,
    };
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyOrders/getAllPcbForms`, {
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
    getPCB();
  }, []);

  return (
    <div className="container container">
      <div className="card flex justify-content-center">
        <Toast ref={toastB} />
      </div>
      <div className="row row-main">
        <div className="col col-main ">
          <div className="row">
            {/* messege state */}
            <div className="col-md-4 centerc paziresh-code">
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
                      classRefG.current.classList.remove("pcbHidden");

                      // classRefB.current.classList.remove("pagination-ref");
                      setFile({});
                    }}
                  >
                    <i class="fa-regular fa-circle-xmark fa-xl"></i>
                  </div>
                  <div
                    className="order-right-message-refresh"
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
                    <th>ردیف</th>
                    {/* <th>شناسه مشتری</th> */}
                    <th>نام مشتری</th>
                    <th>تاریخ سفارش</th>
                    <th> شماره PCB</th>
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
                              setPlaceAndPick("");
                              setBOMExcell("");
                              setZipfile("");
                              clickPCBHandler(
                                item.pcbForm,
                                item.id,
                                item.pcbForm.placeAndPick,
                                item.pcbForm.bomExcell,
                                item.pcbForm.zipFile,
                                item.statusText,
                                item.cyUserID,
                                item.pcbForm.stackedLayers
                              );
                              setTextArea("");
                              window.scrollTo(0, 0);
                              classRefC.current.classList.add("order-hide");
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
                        classRefG.current.classList.add("pcbHidden");
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
                    <label> ثبت وضعیت PCB</label>
                  </div>
                  <label className=""> وضعیت:</label>
                  <select
                    className="pcborder-select"
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

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.ipCstandardIPC_A_600} />
                    <label>ipCstandardIPC_A_600 </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.pcBquantity} />
                    <label>PCB_Quantity</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.pcBmaterial} />
                    <label>PCB_Material</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.partNumber} />
                    <label>PartNumber </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.boardThickness} />
                    <label>BoardThickness</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.layers} />
                    <label>Number Of Layers</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.cuThicknessTop} />
                    <label>CUThicknessTop </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.cuThicknessBottom} />
                    <label>CUThicknessBottom </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.cuThicknessPlanes} />
                    <label>CUThicknessPlanes </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.cuThicknessLayers} />
                    <label>CUThicknessLayers </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.cuttingLayer} />
                    <label>CuttingLayer</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.surfaceFinish} />
                    <label>SurfaceFinish </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.solderMask} />
                    <label>SolderMask </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.solderMaskColor} />
                    <label>SolderMaskColor </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.solderMaskLayer} />
                    <label>SolderMaskLayer </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.solderMaskThickness} />
                    <label>SolderMaskThickness </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.silkScreenLayer} />
                    <label>SilkScreenLayer </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.viaFilling} />
                    <label>ViaFilling </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.ipC_A_610_G} />
                    <label>IpC_A_610_G </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.soliderPaste} />
                    <label>SoliderPaste </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div
                    className="login-label-float
"
                  >
                    <input disabled value={pcbForm.mechanizedَََAssembly} />
                    <label>MchanizedَََAssembly </label>
                  </div>
                </div>

                <div className="col-md-3">
                  <div
                    className="login-label-float
"
                  >
                    {placeAndPick ? (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          downloadByAlert(placeAndPick);

                          //       // setGuIdB(placeAndPick)
                          //       Swal.fire({
                          //         title: "فایل دانلود شود؟",
                          //         showDenyButton: true,
                          //         // showCancelButton: true,
                          //         confirmButtonText: "بله",
                          //         denyButtonText: `خیر`
                          //       }).then((result) => {
                          //         /* Read more about isConfirmed, isDenied below */
                          //         if (result.isConfirmed) {
                          //           downloadFile(placeAndPick)
                          //  Swal.fire({
                          //         position: "center",
                          //         icon: "success",
                          //         title: " فابل در حال دانلود است",
                          //         showConfirmButton: false,
                          //         timer: 500,
                          //         // color:'#208fe0'
                          //       })        }
                          //         // else if (result.isDenied) {
                          //         //   Swal.fire("Changes are not saved", "", "info");
                          //         // }
                          //       });
                        }}
                      >
                        {" "}
                        <i
                          class="fa-solid fa-file-arrow-down fa-bounce fa-xl"
                          style={{ color: "rgb(156 78 107)" }}
                        ></i>
                        PlaceAndPick
                      </button>
                    ) : (
                      <button className="btn btn-warning" disabled>
                        PlaceAndPick
                      </button>
                    )}
                  </div>
                </div>

                <div className="col-md-3">
                  <div
                    className="login-label-float
"
                  >
                    {bOMExcell ? (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          downloadByAlert(bOMExcell);
                        }}
                      >
                        {" "}
                        <i
                          class="fa-solid fa-file-arrow-down fa-bounce fa-xl"
                          style={{ color: "rgb(156 78 107)" }}
                        ></i>
                        BOM-Excell
                      </button>
                    ) : (
                      <button className="btn btn-warning" disabled>
                        BOM-Excell{" "}
                      </button>
                    )}
                  </div>
                </div>

                <div className="col-md-3">
                  <div
                    className="login-label-float
"
                  >
                    {zipfile ? (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          // setGuIdB(placeAndPick)
                          downloadByAlert(zipfile);
                        }}
                      >
                        {" "}
                        <i
                          class="fa-solid fa-file-arrow-down fa-bounce fa-xl"
                          style={{ color: "rgb(156 78 107)" }}
                        ></i>
                        ZipFile
                      </button>
                    ) : (
                      <button className="btn btn-warning" disabled>
                        ZipFile{" "}
                      </button>
                    )}
                  </div>
                </div>

                <div className="col-md-3">
                  <div
                    className="login-label-float
"
                  >
                    {stackedLayers ? (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          // setGuIdB(placeAndPick)
                          downloadByAlert(stackedLayers);
                        }}
                      >
                        {" "}
                        <i
                          class="fa-solid fa-file-arrow-down fa-bounce fa-xl"
                          style={{ color: "rgb(156 78 107)" }}
                        ></i>
                        stackedLayers
                      </button>
                    ) : (
                      <button className="btn btn-warning" disabled>
                        stackedLayers{" "}
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
