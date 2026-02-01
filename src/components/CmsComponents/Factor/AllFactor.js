import { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import ApiGetX2 from "../../../utils/ApiServicesX/ApiGetX2";
import BaseGrid from "../../Grid/BaseGrid";
import DateFormat from "../../../utils/DateFormat";
import { FactorContext } from "../../../context/CmsContext";

function AllFactors(props) {
    let { setXtOrderId, setXtOrderDetai, xtOrderDetai, flagShowFactor, setFlagShowFactor, setFormRerender, setXtFactorNum } = useContext(FactorContext)
    const [value4, setValue4] = useState();
    const [value5, setValue5] = useState();
    const [allOrders, setAllOrders] = useState([])

    function handleChange(value) {
        setValue4(value && value.toDate());
        // console.log(value.format());   /// convert  to persian format
    }
    function handleChangeB(value) {
        setValue5(value && value.toDate());
    }
    const func = (factNum) => {
        ApiGetX2(`/api/CyOrders/getOrderDetail?factorNum=${factNum}`, setXtOrderDetai)
        setFlagShowFactor(true)

    }

    useEffect(() => {
        if (xtOrderDetai.length != 0) {
            props.setDnaflag(true)
            props.setOrderItems(xtOrderDetai.orderItems)
            setFormRerender(false)
            setTimeout(() => {
                setFormRerender(true)
                props.setShowModalB(false)
                props.setDnaflag(false)
            }, 500);

        } else {
            props.setDnaflag(false)
        }
    }, [xtOrderDetai])

    const [colDefs] = useState([
        { field: "user", headerName: "نام مشتری", Width: 200 },
        { field: "factorNumber", headerName: "شماره فاکتور", Width: 100 },
        { field: "fanalTotalAmount", headerName: "مبلغ نهایی(ریال)", cellRenderer: (params) => params.value?.toLocaleString() },
        {
            field: "date",
            headerName: "تاریخ فاکتور",
            width: 200,
            cellRenderer: (params) => <DateFormat dateString={params.value} />,
        },
        {
            headerName: 'عملیات', width: 200,
            cellRenderer: (params) => (
                <>
                    <button className='btn btn-info' style={{ width: "30px", height: "15px", margin: "1px", fontSize: "8px", padding: "1px" }} onClick={() => {
                        setXtOrderId(params.data.id)
                        setXtFactorNum(params.data.factorNumber)
                        func(params.data.factorNumber)


                    }
                    }>...</button>

                </>
            )
        }
    ])


    useEffect(() => {
        if (value4 && value5 && value4 <= value5) {
            ApiGetX2(`/api/CyOrders/getOrders?fromDate=${value4?.toISOString()}&toDate=${value5?.toISOString()}&ordermode=${props.ordermode}`, setAllOrders)

        } else if (value4 >= value5) {
            setAllOrders([])
        }
    }, [value4, value5])
    return (
        <>
            <Modal show={props.show} fullscreen onHide={props.onHide}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>

                    <div className="container">

                        <div className="row">

                            <div className="col-6 centerr allFactor-date ">

                                <div className="m-3"
                                    style={{ direction: "rtl" }}
                                >
                                    <span className="newsubject-form-col3-span">از:</span>
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
                                        value={value5}
                                        onChange={handleChangeB}
                                        animations={[
                                            opacity(),
                                            transition({ from: 35, duration: 800 }),
                                        ]}
                                        render={<InputIcon />}
                                    />
                                </div>


                            </div>
                            <hr />
                        </div>

                        <div className="row">

                            <div className="col-12 centercc">

                                <div style={{ height: "800px", }}>
                                    <BaseGrid rowData={allOrders} colDefs={colDefs} rtl={true} tableWidth="1200px" fontSize='15px' />
                                </div>



                            </div>

                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    );
}

export default AllFactors;
