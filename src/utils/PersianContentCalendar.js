import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import { utils } from 'react-modern-calendar-datepicker';
const PersianContentCalendar = () => {
    // state برای نگهداری مطالب هر روز
    const [contents, setContents] = useState({});

    // state برای کنترل نمایش مودال
    const [selectedDate, setSelectedDate] = useState();
    const [modalContent, setModalContent] = useState("");

    // state جدید برای نگهداری روز جاری انتخاب شده
    const [currentSelectedDate, setCurrentSelectedDate] = useState(null);
    const [currentDayContent, setCurrentDayContent] = useState("");
    // بارگذاری اطلاعات ذخیره شده از localStorage هنگام لود اولیه
    useEffect(() => {
        const savedContents = localStorage.getItem("dailyContents");
        if (savedContents) {
            setContents(JSON.parse(savedContents));
        }

    }, []);

    // ذخیره اطلاعات در localStorage هر بار که contents تغییر کند
    useEffect(() => {
        localStorage.setItem("dailyContents", JSON.stringify(contents));
    }, [contents]);

    // تابعی که با کلیک روی هر روز فراخوانی می‌شود
    const handleDayClick = (date) => {
        const dateKey = date.format("YYYY-MM-DD");
        // ذخیره روز جاری انتخاب شده
        setCurrentSelectedDate(date);

        // نمایش مطلب ذخیره شده برای این روز (اگر وجود داشته باشد)
        const existingContent = contents[dateKey] || "";
        setCurrentDayContent(existingContent);

        // باز کردن مودال برای ویرایش یا ثبت مطلب جدید
        // setSelectedDate(date);
        setModalContent(existingContent);
    };

    // ذخیره مطلب برای روز انتخاب‌شده
    const saveContentForDate = () => {
        if (selectedDate) {
            const dateKey = selectedDate.format("YYYY-MM-DD");
            setContents(prev => ({
                ...prev,
                [dateKey]: modalContent
            }));

            // اگر روز ذخیره شده همان روز جاری انتخاب شده باشد، محتوای باکس را هم به‌روز کن
            if (currentSelectedDate && currentSelectedDate.format("YYYY-MM-DD") === dateKey) {
                setCurrentDayContent(modalContent);
            }

            // بستن مودال
            setSelectedDate(null);
            setModalContent("");
        }
    };

    // حذف مطلب برای روز جاری
    const deleteCurrentContent = () => {
        if (currentSelectedDate) {
            const dateKey = currentSelectedDate.format("YYYY-MM-DD");
            const newContents = { ...contents };
            delete newContents[dateKey];
            setContents(newContents);
            setCurrentDayContent("");
        }
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


    return (
        <div className="persian-calendar-container" style={{ direction: "rtl" }}>
            <style>
                {`
          .has-content-day:hover {
            transform: scale(1.05);
            transition: transform 0.2s;
          }
        `}
            </style>

            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#1f2937" }}>
                📅 تقویم محتوای من
            </h2>

            <DatePicker
                calendar={persian}
                locale={persian_fa}
                calendarPosition="bottom-right"
                multiple={false}
                mapDays={mapDays}
                onChange={(date) => handleDayClick(date)}
                style={{
                    width: "100%",
                    fontFamily: "inherit"
                }}
                showOtherDays={true}
                highlightToday={true}
            />

            {/* باکس نمایش مطلب روز جاری انتخاب شده */}
            {currentSelectedDate && (
                <div className="current-day-content-box">
                    <div className="content-box-header">
                        <span className="content-box-icon">📖</span>
                        <h3 className="content-box-title">
                            مطلب ثبت شده برای {formatPersianDate(currentSelectedDate)}
                        </h3>
                    </div>

                    {currentDayContent ? (
                        <>
                            <div className="content-box-text">
                                {currentDayContent}
                            </div>
                            <div className="content-box-actions">
                                <button
                                    onClick={() => {
                                        setSelectedDate(currentSelectedDate);
                                        setModalContent(currentDayContent);
                                    }}
                                    className="action-btn edit-btn"
                                >
                                    ✏️ ویرایش مطلب
                                </button>
                                <button
                                    onClick={deleteCurrentContent}
                                    className="action-btn delete-btn"
                                >
                                    🗑️ حذف مطلب
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="content-box-empty">
                            <span className="empty-icon">📝</span>
                            <p>هنوز مطلبی برای این روز ثبت نشده است.</p>
                            <button
                                onClick={() => {
                                    setSelectedDate(currentSelectedDate);
                                    setModalContent("");
                                }}
                                className="add-content-btn"
                            >
                                + افزودن مطلب جدید
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* مودال ثبت/مشاهده مطلب */}
            {selectedDate && (
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
            )}

            {/* استایل‌های کامل */}
            <style>{`
        .persian-calendar-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          border-radius: 24px;
          box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1);
        }
        
        .current-day-content-box {
          margin-top: 24px;
          border-radius: 16px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border: 1px solid #e2e8f0;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .content-box-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .content-box-icon {
          font-size: 24px;
        }
        
        .content-box-title {
          margin: 0;
          color: white;
          font-size: 16px;
          font-weight: 500;
        }
        
        .content-box-text {
          padding: 20px;
          background: white;
          color: #374151;
          line-height: 1.8;
          font-size: 15px;
          border-bottom: 1px solid #e5e7eb;
          white-space: pre-wrap;
          word-wrap: break-word;
          min-height: 100px;
        }
        
        .content-box-empty {
          padding: 30px 20px;
          text-align: center;
          color: #6b7280;
        }
        
        .empty-icon {
          font-size: 48px;
          display: block;
          margin-bottom: 12px;
        }
        
        .content-box-empty p {
          margin-bottom: 16px;
          font-size: 14px;
        }
        
        .add-content-btn {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .add-content-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        .content-box-actions {
          padding: 15px 20px;
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          background: #f8fafc;
        }
        
        .action-btn {
          padding: 8px 16px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .edit-btn {
          background-color: #3b82f6;
          color: white;
        }
        
        .edit-btn:hover {
          background-color: #2563eb;
          transform: translateY(-1px);
        }
        
        .delete-btn {
          background-color: #ef4444;
          color: white;
        }
        
        .delete-btn:hover {
          background-color: #dc2626;
          transform: translateY(-1px);
        }
        
        .modal-overlay-h {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }
        
        .modal-content-h {
          background: white;
          padding: 24px;
          border-radius: 20px;
          width: 90%;
          max-width: 500px;
          direction: rtl;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        }
        
        .modal-buttons {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 24px;
        }
        
        .btn-save, .btn-cancel {
          padding: 10px 24px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .btn-save {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }
        
        .btn-save:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        .btn-cancel {
          background-color: #f3f4f6;
          color: #374151;
        }
        
        .btn-cancel:hover {
          background-color: #e5e7eb;
        }
        
        .rmdp-container {
          width: 100%;
        }
        
        .rmdp-calendar {
          width: 100%;
          box-shadow: none !important;
          border-radius: 16px;
        }
        
        .rmdp-day:not(.rmdp-disabled):hover {
          transform: scale(1.05);
        }
        
        .rmdp-day.rmdp-selected span:not(.highlight) {
          background-color: #8b5cf6 !important;
          box-shadow: 0 0 0 2px #c084fc;
        }
      `}</style>
        </div>
    );
};

export default PersianContentCalendar;