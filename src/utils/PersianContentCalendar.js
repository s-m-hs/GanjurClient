import React, { useState, useEffect, useContext } from "react";
import './PersianContentCalendar.css'
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import Modal from 'react-bootstrap/Modal';
import TiptapEditor from "../components/Editor/TiptapEditor";
import { GiCheckMark } from "react-icons/gi";
import DateFormat from "./DateFormat";
import ApiPostX from '../utils/ApiServicesX/ApiPostX';
import alertA from '../utils/AlertFunc/AlertA';
import apiUrl from '../utils/ApiConfig';
import ApiGetX2 from "./ApiServicesX/ApiGetX2";
import { HomeContext } from "../context/CmsContext";
import ApiDeleteX2 from "./ApiServicesX/ApiDeleteX2";
import { Close } from "@mui/icons-material";
const PersianContentCalendar = (props) => {
    let { userId } = useContext(HomeContext)

    const [show, setShow] = useState(false);
    const [ckValue, setCkValue] = useState("");
    const [expireDate, setExpireDate] = useState(new Date());
    const [showEditMod, setShowEditMod] = useState(false)
    const [task, setTask] = useState([])
    const [isGet, setIsGet] = useState(true)
    const [noteId, setNoteId] = useState('')
    const handleClose = () => {
        setShow(false)
        setCkValue('')
        setExpireDate(new Date())
    };

    const addNote = () => {
        const dayNote = 3
        let obj = {
            id: !showEditMod ? 0 : task.id,
            createDate: "2025-09-06T08:00:47.475Z",
            completionDate: expireDate,
            title: "یادآوری ",
            description: !showEditMod ? ckValue : task.title,
            taskKind: dayNote,
            score: 1,
            taskState: 1,
            adminId: null,
            userId: userId,
            color: null,
            important: 1
        }
        if (!showEditMod) {
            ApiPostX('/api/Task/addNote', obj, function () {
                alertA("با موفقیت اضافه شد")
                setShow(false)
                setExpireDate(new Date())
            })

        } else if (showEditMod) {
            async function myAppPost() {
                const res = await fetch(`${apiUrl}/api/Task/editeTask`, {
                    method: "PUT",
                    credentials: "include",

                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(obj),
                })
                    .then((res) => {
                        // console.log(res)
                        if (res.ok) {
                            return res.json().then((result) => {
                                alertA('ویرایش با موفقیت انجام شد')
                                setTask({})
                                setShowEditMod(false)
                                setShow(false)
                                setCkValue('')
                                setExpireDate(new Date())

                            });
                        }
                    })
                    .catch((err) => console.log(err));
            }
            myAppPost();
        }

    }
    const funcA = () => {
        alertA('حذف با موفقیت انجام شد')
        setIsGet(!isGet)
    }
    const deletTask = (id) => {
        ApiDeleteX2(`/api/Task/deleteTask?taskId=${id}`, funcA)
    }

    useEffect(() => {
        const func = (result) => {
            setTask([])
            setCkValue('')
            setTask(result)
        }
        ApiGetX2(`/api/Task/getNotes?date=${expireDate.toISOString()}`, func)
    }, [expireDate, isGet])

    // state برای نگهداری مطالب هر روز
    const [contents, setContents] = useState({});
    // state برای کنترل نمایش مودال
    const [selectedDate, setSelectedDate] = useState();
    const [modalContent, setModalContent] = useState("");

    // state جدید برای نگهداری روز جاری انتخاب شده
    const [currentSelectedDate, setCurrentSelectedDate] = useState(null);
    const [currentDayContent, setCurrentDayContent] = useState("");


    // تابعی که با کلیک روی هر روز فراخوانی می‌شود
    const handleDayClick = (date) => {
        setExpireDate(date && date.toDate())
        const dateKey = date.format("YYYY-MM-DD");
        // ذخیره روز جاری انتخاب شده
        setCurrentSelectedDate(date);
    };


    // تابع سفارشی برای رندر کردن روزها با نشانگر وجود مطلب
    const mapDays = ({ date, today, currentMonth, selectedDate }) => {
        const dateKey = date.format("YYYY-MM-DD");
        const hasContent = contents[dateKey];
        const isCurrentSelected = currentSelectedDate &&
            currentSelectedDate.format("YYYY-MM-DD") === dateKey;

        let props = {};

        // رنگ سبز برای روزهایی که مطلب دارند
        if (hasContent) {
            props.style = {
                backgroundColor: "#10b981",
                borderRadius: "50%",
                color: "white",
                fontWeight: "bold"
            };
        }

        // هایلایت بنفش برای روز جاری انتخاب شده
        if (isCurrentSelected) {
            props.style = {
                backgroundColor: "#8b5cf6",
                borderRadius: "50%",
                color: "white",
                fontWeight: "bold",
                boxShadow: "0 0 0 2px #c084fc"
            };
        }

        // بررسی اینکه آیا روز جاری (today) است
        if (date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD")) {
            props.style = {
                ...props.style,
                border: hasContent || isCurrentSelected ? "2px solid #f59e0b" : "2px solid #3b82f6"
            };
        }

        return props;
    };

    // فرمت نمایش تاریخ فارسی
    const formatPersianDate = (date) => {
        if (!date) return "";
        const weekDays = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
        const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

        const year = date.year;
        const month = monthNames[date.month - 1];
        const day = date.day;
        const weekDay = weekDays[date.weekDay.index];

        return `${weekDay} ${day} ${month} ${year}`;
    };
    const getFormattedDate = () => {
        if (!expireDate) return "";

        const dateObj = {
            year: expireDate.getFullYear(),
            month: expireDate.getMonth() - 1,
            day: expireDate.getDate(),
            weekDay: {
                index: expireDate.getDay()
            }
        };

        return formatPersianDate(dateObj);
    };

    // در JSX:
    // <div>{getFormattedDate()}</div>

    return (
        <div className="persian-calendar-container" style={{ width: props.Width, direction: "rtl" }}>
            {/* <style>
                {`
          .has-content-day:hover {
            transform: scale(1.05);
            transition: transform 0.2s;
          }
        `}
            </style> */}


            {/* <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1f2937" }}>
                📅 تقویم محتوای من
            </h2> */}
            <div className="centerrc" >
                <img src="../../images/604-1-scaled-1-1024x854.jpg" alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                <div>
                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        multiple={false}
                        mapDays={mapDays}
                        // value={expireDate}
                        onChange={(date) => handleDayClick(date)}
                        style={{
                            width: "100%",
                            fontFamily: "inherit"
                        }}
                        showOtherDays={true}
                        highlightToday={true}
                    />
                </div>

            </div>


            {/* باکس نمایش مطلب روز جاری انتخاب شده */}

            <div className="current-day-content-box">
                {currentSelectedDate && <div className="content-box-header">
                    <span className="content-box-icon">📖</span>
                    <h3 className="content-box-title">
                        {formatPersianDate(currentSelectedDate)}
                    </h3>
                </div>}


                {task.length != 0 ? (
                    <>
                        <div className="content-box-text " style={{ width: props.widthContent }}>
                            {task.map((item => (
                                <>
                                    <div className="content-box-text-div">
                                        <p style={{ cursor: "pointer", marginBottom: 0 }} dangerouslySetInnerHTML={{ __html: item.description }}
                                            onClick={() => {
                                                setCkValue(item.description)
                                                setNoteId(item.id)
                                                setShow(true)

                                            }}
                                        >

                                        </p>
                                        <span>
                                            <button
                                                className="content-box-text-del-btn btn btn-danger"
                                                onClick={() => {
                                                    deletTask(item.id)
                                                }}
                                            >

                                            </button>
                                        </span>
                                    </div>

                                </>

                            )))}

                        </div>
                        <div className="content-box-actions">

                            <button
                                onClick={() => {
                                    setCkValue('')
                                    setShow(true)
                                    setSelectedDate(currentSelectedDate);
                                    setModalContent("");
                                }}
                                className="add-content-btn"
                            >
                                + افزودن مطلب جدید
                            </button>

                        </div>
                    </>
                ) : (
                    <div className="content-box-empty">
                        <span className="empty-icon">📝</span>
                        <p>هنوز مطلبی برای این روز ثبت نشده است.</p>
                        <button
                            onClick={() => {
                                setShow(true)
                                setSelectedDate(currentSelectedDate);
                                setModalContent("");
                            }}
                            className="add-content-btn"
                        >
                            + افزودن مطلب جدید
                        </button>


                    </div>
                )}

                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                    </Modal.Header>
                    <Modal.Body>                <div className='container'>

                        <div className='row'>
                            <div >
                                <TiptapEditor
                                    value={ckValue}
                                    onChange={(e) => {
                                        setCkValue(e);
                                    }}
                                />

                            </div>
                            <button
                                onClick={() => {
                                    addNote()
                                }}
                                className="add-content-btn"
                            >
                                + افزودن مطلب جدید
                            </button>

                        </div>

                    </div></Modal.Body>

                </Modal>
            </div>


            {/* مودال ثبت/مشاهده مطلب */}
            {/* {selectedDate && (
                <div className="modal-overlay-h" onClick={() => setSelectedDate(null)}>
                    <div className="modal-content-h" onClick={(e) => e.stopPropagation()}>
                        <h3 style={{ marginBottom: "10px", color: "#1f2937" }}>
                            ✏️ ثبت مطلب برای {formatPersianDate(selectedDate)}
                        </h3>
                        <textarea
                            value={modalContent}
                            onChange={(e) => setModalContent(e.target.value)}
                            placeholder="مطلب خود را برای این روز بنویسید..."
                            rows="6"
                            style={{
                                width: "100%",
                                padding: "12px",
                                fontSize: "14px",
                                fontFamily: "inherit",
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                                marginTop: "10px",
                                resize: "vertical",
                                backgroundColor: "#f9fafb"
                            }}
                        />
                        <div className="modal-buttons">
                            <button onClick={saveContentForDate} className="btn-save">
                                💾 ذخیره مطلب
                            </button>
                            <button onClick={() => setSelectedDate(null)} className="btn-cancel">
                                ❌ انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )} */}

        </div>
    );
};

export default PersianContentCalendar;