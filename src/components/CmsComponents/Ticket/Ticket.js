import React, { useContext, useEffect, useRef, useState } from "react";
import "./Ticket.css";
import apiUrl from "../../../utils/ApiConfig";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import DateFormat from "../../../utils/DateFormat";
import Swal from "sweetalert2";
import { Toast } from "primereact/toast";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Ticket() {
  const [allTickets, setAllTickets] = useState([]);
  const [stateId, setStateID] = useState(1);
  const [ticketId, setTicketId] = useState("");
  const [getChats, setGetChats] = useState([]);
  const [userId, setUserId] = useState("");
  const [textArea, setTextArea] = useState("");
  const [guIdC, setGuIdC] = useState("");
  const [file, setFile] = useState({});
  const [flag, setFlag] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  let { setFlagMessageNotification } = useContext(HomeContext);
  const homeContext = useContext(HomeContext);

  console.log(guIdC);
  // console.log(allTickets)

  const classRefD = useRef();
  /////////////////
  const notify = () => {
    setFlag((prev) => !prev);
    setTextArea("");
    setGuIdC("");
    setFile("");
    classRefD.current.classList.add("ticket-hide");
    if (stateId == 1) {
      setGetChats([]);
      setTicketId("");
      setLgShow(false);
      setFlagMessageNotification((prev) => !prev);
    }
  };
  const notifyB = () => {
    setFlag((prev) => !prev);
    setTextArea("");
    setGetChats([]);
    setTicketId("");
  };

  const toastB = useRef(null);
  const show = (stat, title) => {
    toastB.current.show({ severity: stat, summary: stat, detail: title });
  };
  ////////////////////
  // console.log(userId)
  const cmsContext = useContext(CmsContext);

  const stateArraySelect = [
    { id: 1, state: "درانتظار پاسخ" },
    { id: 2, state: " پاسخ داده شده" },
    { id: 3, state: "بسته شده" },
  ];
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const changeTextArea = (e) => {
    setTextArea(e.target.value);
  };
  const downloadFileB = (gui) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: " فابل در حال دانلود است",
      showConfirmButton: false,
      timer: 500,
      // color:'#208fe0'
    }).then((res) => {
      async function myApp() {
        const res = fetch(`${apiUrl}/api/CyFiles/download/${gui}`, {
          method: "GET",
          credentials: "include",

          headers: {
            // Authorization: headerAuth,
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (res.status == 200) {
            window.location.href = res.url;
            //  alert(`${res.url}`)
            //  navigate(`${res.url}`)
            //  redirect(`${res.url}`)
          }
        });
      }
      myApp();
    });
  };
  const changeUplode = () => {
    // event.preventDefault()
    let formData = new FormData();
    formData.append("File", file);
    formData.append("Name", "");
    formData.append("Description", "");
    formData.append("IsPrivate", true);
    // console.log(formData.get('File'));
    async function myAppPostFile() {
      const res = await fetch(`${apiUrl}/api/CyFiles/upload`, {
        method: "POST",
        // headers: {
        //   // Authorization: `Bearer ${cmsContext.token.token}`,
        //   // 'accept': '*/*',
        //   // 'Content-Type': 'multipart/form-data',
        //   // // "Content-Type": "application/json",

        // },
        body: formData,
      })
        .then((res) => {
          if (res.status == 200) {
            classRefD.current.classList.remove("ticket-hide");
            // classRefC.current.classList.add('order-show')
            return res.json();
          }
        })
        .then((result) => {
          // console.log(result);
          if (result) {
            setGuIdC(result.id);
            classRefD.current.classList.remove("ticket-hide");
            // classRefC.current.classList.add('order-show')
          }
        })
        .catch((err) => console.log(err));
    }
    myAppPostFile();
  };

  const sendTicket = () => {
    let obj = {
      // id: 0,
      // senderID: 0,
      ///senderName: "string",
      ticketID: ticketId,
      description: textArea ? textArea : guIdC ? "ارسال فایل" : "",
      status: 1,
      // sentDate: "2024-11-05T08:26:17.313Z",
      // seenDate: "2024-11-05T08:26:17.313Z",
      fileID: guIdC ? guIdC : null,
    };
    console.log(obj, cmsContext.token.token, apiUrl);
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyTicket/postOnTicketAdmin`, {
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
            show("info", " پیام با موفقیت ارسال شد");
            notify();
            classRefD.current.classList.add("ticket-hide");
            return res.json();
          }
        })
        .then((result) => {
          setFile({});
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  const getThicketById = () => {
    setGetChats([]);
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyTicket/getMessagesForTickets?TicketID=${ticketId}`,
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
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          // console.log(result)
          setGetChats(result);
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  const getAllTicket = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyTicket/getAllTickets?status=${stateId}`,
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
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          // console.log(result)
          setAllTickets(result);
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  const closeChat = () => {
    Swal.fire({
      title: " آیا از بستن تیکت اطمینان دارید؟",
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: "بله",
      denyButtonText: `خیر`,
    }).then((result) => {
      if (result.isConfirmed) {
        async function myApp() {
          const res = await fetch(
            `${apiUrl}/api/CyTicket/closeTicket?ticketId=${ticketId}`,
            {
              method: "PUT",
              credentials: "include",

              headers: {
                // Authorization: `Bearer ${cmsContext.token.token}`,
                "Content-Type": "application/json",
              },
            }
          )
            .then((res) => {
              // show("info"," پیام با موفقیت بسته شد...");
              notifyB();
            })
            .catch((err) => console.log(err));
        }
        myApp();
        //     Swal.fire({
        //   position: "center",
        //   icon: "success",
        //   title: " فابل در حال دانلود است",
        //   showConfirmButton: false,
        //   timer: 500,
        // })
      }
    });
  };

  useEffect(() => {
    if (file) {
      changeUplode();
    }
  }, [file]);

  useEffect(() => {
    getAllTicket();
  }, [stateId, flag]);

  useEffect(() => {
    getThicketById();
  }, [ticketId, flag]);

  // console.log(stateId)
  return (
    <div className="container">
      <div className="card flex justify-content-center">
        <Toast ref={toastB} />
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10 centerc ticket-rightside-div">
          {/* <label className="order--state-selectlabel">دسته بندی :</label> */}
          <div className="centerr ticket-state-div">
            <select
              className="ticket-state"
              onChange={(e) => {
                setGetChats([]);
                setStateID(e.target.value);
                setTextArea("");
                setGuIdC("");
                setFile({});
                setTicketId("");
              }}
            >
              {/* <option value="">انتخاب کنید...</option> */}
              {stateArraySelect.map((item) => (
                <>
                  <option key={item.id} value={item.id}>
                    {" "}
                    {item.state}
                  </option>
                </>
              ))}
            </select>

            <div
              className={
                stateId == 1
                  ? "ticket-state-circle-div ticket_select-green"
                  : stateId == 2
                  ? " ticket-state-circle-div ticket_select-blue"
                  : stateId == 3
                  ? " ticket-state-circle-div ticket_select-red"
                  : ""
              }
            ></div>
          </div>

          {allTickets?.length != 0 && (
            <>
              <div
                className={
                  !homeContext.themContext
                    ? "table table-striped  ticket-table-div"
                    : "table table-striped table-dark ticket-table-div"
                }
              >
                <thead>
                  <tr key="">
                    <th>شماره تیکت</th>
                    <th>عنوان تیکت </th>
                    <th>تاریخ ایجاد</th>
                    <th>تاریخ بستن </th>
                    <th>وضعیت تیکت </th>
                  </tr>
                </thead>

                <tbody>
                  {allTickets?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>
                        {" "}
                        <DateFormat dateString={`${item.openedAt}`} />
                      </td>
                      <td>
                        {" "}
                        <DateFormat dateString={`${item?.closedAt}`} />
                      </td>
                      <td>
                        <button
                          className={
                            stateId == 1
                              ? "btn btn-info"
                              : stateId == 2
                              ? " btn btn-warning"
                              : stateId == 3
                              ? " btn btn-danger"
                              : ""
                          }
                          onClick={() => {
                            setTicketId(item.id);
                            setUserId(item.userId);
                            setTextArea("");
                            setGuIdC("");
                            setFile({});
                            setLgShow(true);
                          }}
                        >
                          {
                            stateArraySelect.filter((filter) => {
                              return filter.id == item.status;
                            })[0].state
                          }
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </>
          )}
        </div>
        <div className="col-1"></div>
      </div>
      <>
        {/* <Button onClick={() => setLgShow(true)}>Large modal</Button> */}

        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header
            closeButton
            className="ticket-modal-content-header"
          ></Modal.Header>
          <Modal.Body className="ticket-modal-content-body">
            <div className="Ticket-div boxSh centerc paziresh-code">
              {stateId != 3 && (
                <div className="ticket-right-message-divB">
                  <textarea
                    name=""
                    id=""
                    placeholder="پیامت را اینجا بنویس..."
                    value={textArea}
                    onChange={changeTextArea}
                  ></textarea>
                  <div className="ticket-right-message-file-div">
                    <input
                      type="file"
                      className="ticket-right-message-file-input"
                      onChange={fileChange}
                    />
                    <div className="order-file-i ticket-hide " ref={classRefD}>
                      <i
                        class="fa-solid fa-file-circle-check fa-2xl fa-beat-fade"
                        style={{ color: "#63E6BE", marginRight: "40px" }}
                      ></i>
                    </div>
                  </div>

                  <button
                    className={
                      textArea || guIdC
                        ? "btn btn-info"
                        : "btn btn-info ticket-disable"
                    }
                    onClick={sendTicket}
                  >
                    ارسال پیام
                  </button>
                </div>
              )}
              <hr />

              <div className="ticket-numberticket-div centerr">
                {stateId != 3 && (
                  <div
                    className="ticket-right-message-refresh"
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
                )}

                <span className="ticket-id-span">شماره تیکت : {ticketId}</span>
                {stateId != 3 && ticketId && (
                  <button
                    className="btn btn-danger ticket-closemessage-button"
                    onClick={() => {
                      closeChat();
                    }}
                  >
                    {" "}
                    بستن تیکت{" "}
                  </button>
                )}
              </div>
              <div className="centerc ticket-chat-div">
                {getChats?.length != 0 &&
                  getChats?.map((item) => (
                    <div
                      key={item.id}
                      className={
                        item.senderID === userId
                          ? "ticket-messeage-desc-div-sender centerr"
                          : "ticket-messeage-desc-div centerr"
                      }
                    >
                      <h5
                        className={
                          item.senderID === userId
                            ? "ticket-messeage-desc-sender"
                            : "ticket-messeage-desc"
                        }
                      >
                        {item.description}
                        <span className="ticket-messeage-desc-sendername">
                          {item.senderName}
                        </span>
                        <span className="ticket-messeage-desc-date">
                          {/* {DateFormat(item.sentDate)} */}
                          {/* <DateFormat dateString="2024-10-08T14:30:00Z" /> */}
                          <DateFormat dateString={`${item.sentDate}`} />
                        </span>
                        {item.fileID != null ? (
                          <button
                            className="ticket-downlod-button"
                            onClick={() => {
                              setGuIdC(item.fileID);

                              Swal.fire({
                                title: "فایل دانلود شود؟",
                                showDenyButton: true,
                                // showCancelButton: true,
                                confirmButtonText: "بله",
                                denyButtonText: `خیر`,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  downloadFileB(item.fileID);
                                  Swal.fire({
                                    position: "center",
                                    icon: "success",
                                    title: " فابل در حال دانلود است",
                                    showConfirmButton: false,
                                    timer: 500,
                                    // color:'#208fe0'
                                  });
                                }
                              });
                              // downloadFileB(item.fileID)
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
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
