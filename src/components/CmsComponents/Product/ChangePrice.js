import React, { useEffect, useState } from 'react'
import { useForm as useFormA } from "react-hook-form";
import { useForm as useFormB } from "react-hook-form"; import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';
import { Add, CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import alertA from '../../../utils/AlertFunc/AlertA';
import { Check, Percent } from '@phosphor-icons/react';

export default function ChangePrice() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useFormA({
        defaultValues: {},
    });
    const {
        register: registerB,
        handleSubmit: handleSubmitB,
        watch
    } = useFormB({
        defaultValues: {},
    });
    const registerOptions = {
        // manufacture: { required: "manufacture is required" },
        proCategory: { required: "proCategory is required" },
        percent: { required: "percent is required" },
        proCategoryB: { required: "proCategory is required" },
    };

    const [allManufacture, setAllManufacture] = useState([])
    const [allProCategory, setAllProCategory] = useState([])
    const [state, setState] = useState(true)
    const [isFormA, setIsFormA] = useState(true)

    const proCateBWatch = watch("proCategoryB")
    const func = (result) => {
        alertA(result.msg)
    }
    const handleRegistration = (data) => {
        var url = (state == true && data.manufacture != 0) ?
            `/api/CyProductsB/changePriceUp?manufacture=${data.manufacture}&proCategory=${data.proCategory}&percent=${data.percent}` :
            (state == true && data.manufacture == 0) ?
                `/api/CyProductsB/changePriceUp?proCategory=${data.proCategory}&percent=${data.percent}` :
                (state == false && data.manufacture != null) ?
                    `/api/CyProductsB/changePriceDown?manufacture=${data.manufacture}&proCategory=${data.proCategory}&percent=${data.percent}` :
                    (state == true && data.manufacture == null) ? `/api/CyProductsB/changePriceDown?proCategory=${data.proCategory}&percent=${data.percent}` : ''
        ApiGetX2(url, func)
    }
    const handleRegistrationB = (data) => {
        if (proCateBWatch != 0) {
            console.log(data)
            var url = (data.manufactureB != 0) ?
                `/api/CyProductsB/changePriceUpByPrice2?manufacture=${data.manufactureB}&proCategory=${data.proCategoryB}` :
                `/api/CyProductsB/changePriceUpByPrice2?proCategory=${data.proCategoryB}`
            ApiGetX2(url, func)
        }

    }


    const getAllManufacture = () => {
        ApiGetX2(`/api/CyManufacturer/getAllManufcture`, setAllManufacture)
    }
    const getAllProCategory = () => {
        ApiGetX2(`/api/CyProductCategory/getAllProductCate`, setAllProCategory)
    }

    useEffect(() => {
        getAllManufacture()
        getAllProCategory()
    }, [])
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 boxSh p-5'>
                    <span onClick={() => setIsFormA(true)}>{isFormA ? <CheckBox /> : <CheckBoxOutlineBlank />} </span>
                    <div className={!isFormA && 'disable'} >
                        <div className='centerrc'>

                            <button type='button' className={state == true ? 'btn btn-success btn-lg m-1' : 'btn btn-warning btn-lg m-1'}
                                onClick={() => {
                                    setState(!state)

                                }}
                            > {state == true ? "افزایش قیمت طبق درصد ورودی" : "کاهش قیمت طبق درصد ورودی"}</button>

                        </div>

                        <form
                            action=""
                            onSubmit={handleSubmit(handleRegistration)}

                        >




                            <label className="user-col3-selectlabel">دسته بندی  </label>
                            <select
                                style={{ fontSize: "20px" }}
                                className={
                                    errors.proCategory
                                        ? "user-col3-select formerror"
                                        : "user-col3-select"
                                }
                                {...register(
                                    "proCategory",
                                    registerOptions.proCategory
                                )}
                            >
                                <option value="">انتخاب کنید...</option>
                                {allProCategory.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {" "}
                                        {item.name}
                                    </option>
                                ))}
                            </select>


                            <label className="user-col3-selectlabel"> شرکت سازنده</label>
                            <select
                                style={{ fontSize: "20px" }}
                                className={
                                    errors.manufacture
                                        ? "user-col3-select formerror"
                                        : "user-col3-select"
                                }
                                {...register(
                                    "manufacture",
                                    registerOptions.manufacture
                                )}
                            >
                                <option value={0}>انتخاب کنید...</option>
                                {allManufacture.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {" "}
                                        {item.name}
                                    </option>
                                ))}
                            </select>


                            <div className="login-label-float">
                                <input
                                    style={{ width: "200px" }}
                                    name="percent"
                                    type="number"
                                    placeholder=""

                                    className={errors.percent ? "formerror" : ""}
                                    {...register(
                                        "percent",
                                        registerOptions.percent
                                    )}
                                />
                                <label> درصد تغییر</label>
                                <span><Percent size={25} /></span>


                            </div>


                            <button className='btn btn-primary p-3 m-3 btn-lg' style={{ width: "80%" }}>تایید</button>

                        </form>
                    </div>


                </div>


                <div className='col-6 boxSh p-5 '>
                    <span onClick={() => setIsFormA(false)}>{isFormA ? <CheckBoxOutlineBlank /> : <CheckBox />} </span>
                    <div className={isFormA && "disable"} >
                        <div className='centerrc'>

                            <button type='button' className='btn btn-success btn-lg m-1'

                            > افزایش قیمت طبق قیمت همکار</button>

                        </div>

                        <form
                            action=""
                            onSubmit={handleSubmitB(handleRegistrationB)}
                        >

                            <label className="user-col3-selectlabel">دسته بندی  </label>
                            <select
                                style={{ fontSize: "20px" }}
                                className={
                                    proCateBWatch == 0
                                        ? "user-col3-select formerror"
                                        : "user-col3-select"
                                }
                                {...registerB(
                                    "proCategoryB"
                                )}
                            >
                                <option value={0}>انتخاب کنید...</option>S
                                {allProCategory.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {" "}
                                        {item.name}
                                    </option>
                                ))}
                            </select>


                            <label className="user-col3-selectlabel"> شرکت سازنده</label>
                            <select
                                style={{ fontSize: "20px" }}
                                className={
                                    errors.manufactureB
                                        ? "user-col3-select formerror"
                                        : "user-col3-select"
                                }
                                {...registerB(
                                    "manufactureB"
                                )}
                            >
                                <option value={0}>انتخاب کنید...</option>
                                {allManufacture.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {" "}
                                        {item.name}
                                    </option>
                                ))}
                            </select>


                            <div className="login-label-float ">
                                <input
                                    disabled
                                    style={{ width: "200px" }}
                                    name="percent"
                                    type="number"
                                    placeholder=""

                                />
                                <label> درصد تغییر</label>
                                <span><Percent size={25} /></span>


                            </div>


                            <button className='btn btn-primary p-3 m-3 btn-lg' style={{ width: "80%" }}

                            >تایید</button>

                        </form>
                    </div>


                </div>

            </div>

        </div>
    )
}
