import React from 'react'
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
export default function FromToDate(props) {

    function handleChange(value) {
        props.setFrom(value && value.toDate());
        // console.log(value.format());   /// convert  to persian format
    }
    function handleChangeB(value) {
        props.setTo(value && value.toDate());
    }




    return (
        <div className="centerr m-3 ">

            <div className="m-3"
                style={{ direction: "rtl" }}
            >
                <span className="newsubject-form-col3-span">از:</span>
                <DatePicker
                    className="custom-input"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    value={props.from}
                    onChange={handleChange}
                    animations={[
                        opacity(),
                        transition({ from: 35, duration: 800 }),
                    ]}
                    render={<InputIcon />}
                />
            </div>


            <div className="m-3"
                style={{ direction: "rtl" }}
            >
                <span className="newsubject-form-col3-span"> تا:</span>
                <DatePicker
                    className="custom-input"
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                    value={props.to}
                    onChange={handleChangeB}
                    animations={[
                        opacity(),
                        transition({ from: 35, duration: 800 }),
                    ]}
                    render={<InputIcon />}
                />
            </div>

            <button className='btn btn-primary'
                onClick={() => {
                    if (props.from < props.to) {
                        props.action()
                    }
                }}
            >تایید</button>


        </div>
    )
}
