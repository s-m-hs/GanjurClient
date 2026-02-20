import React, { useContext, useEffect, useState } from 'react'
import  "./ActionFainanc.css"
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { CmsContext, HomeContext } from '../../../../context/CmsContext';
import ApiGetX2 from '../../../../utils/ApiServicesX/ApiGetX2';
export default function ActionFainanc() {
    const cmsContext = useContext(CmsContext);
    const homeContext = useContext(HomeContext);
    const [value4, setValue4] = useState();
    const [value5, setValue5] = useState();
    const [SoodResult, setSoodResult] = useState([])

    function handleChange(value) {
        setValue4(value && value.toDate());
        // console.log(value.format());   /// convert  to persian format
    }
    function handleChangeB(value) {
        setValue5(value && value.toDate());
    }


    const getSood = () => {
        setSoodResult([])
        // console.log(value4);
        // console.log(value5);
        ApiGetX2(`/api/Voucher/financial-performance?from=${value4?.toISOString()}&to=${value5?.toISOString()}`, setSoodResult)
    }
    console.log(SoodResult);

    useEffect(() => {
        cmsContext.setFlagClass(false);
        homeContext.setSideMenueFlag(false)
        return () => cmsContext.setFlagClass(true);
    }, [])
    return (
        <div className='container'>

            <div className='row'>
                <div className='col-12 centerrc'>

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

            <div className='row'>

                <div className='col-4'></div>

                <div className='col-4'></div>

                <div className='col-4 boxSh centercc'>
                    <h2>سود</h2>
                    <button className='btn btn-primary m-3'
                        onClick={() => getSood()}
                    >نمایش </button>
                    <table class="table table-bordered actionfain-table-sood ">

                        <tbody>
                            <tr>
                                <th scope="row">فروش ناخالص(فروش کالا)</th>
                                <td>{SoodResult?.darAmad?.toLocaleString()}</td>

                            </tr>
                            {/* <tr>
                                <th scope="row">فروش خالص (کل درآمدها)</th>
                                <td>{SoodResult?.netSales?.toLocaleString()}</td>

                            </tr> */}
                            <tr>
                                <th scope="row">بهای تمام شده  </th>
                                <td >{SoodResult?.bahayKala?.toLocaleString()}</td>

                            </tr>

                            <tr>
                                <th scope="row"> سایرهزینه ها</th>
                                <td >{SoodResult?.otherExpenses?.toLocaleString()}</td>

                            </tr>

                            <tr>
                                <th scope="row">سود خالص</th>
                                <td >{SoodResult?.netProfit?.toLocaleString()}</td>

                            </tr>
                        </tbody>
                    </table>

                </div>

            </div>

        </div>
    )
}
