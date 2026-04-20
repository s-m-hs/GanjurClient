import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';
import { Add } from '@mui/icons-material';
import alertA from '../../../utils/AlertFunc/AlertA';
import { Percent } from '@phosphor-icons/react';

export default function ChangePrice() {
    const [allManufacture, setAllManufacture] = useState([])
    const [allProCategory, setAllProCategory] = useState([])
    const [state, setState] = useState(true)
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });
    const registerOptions = {
        manufacture: { required: "manufacture is required" },
        proCategory: { required: "proCategory is required" },
        percent: { required: "percent is required" },
    };

    const func = () => {
        alertA("قیمت های جدید اعمال شد")
    }
    const handleRegistration = (data) => {
        var url = state == true ? `/api/CyProductsB/changePriceUp?manufacture=${data.manufacture}&proCategory=${data.proCategory}&percent=${data.percent}` :
            `/api/CyProductsB/changePriceDown?manufacture=${data.manufacture}&proCategory=${data.proCategory}&percent=${data.percent}`
        ApiGetX2(url, func)
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

                    <div className='centerrc'>

                        <button type='button' className={state == true ? 'btn btn-success btn-lg m-1' : 'btn btn-warning btn-lg m-1'}
                            onClick={() => setState(!state)}
                        > {state == true ? "افزایش قیمت" : "کاهش قیمت"}</button>

                    </div>

                    <form
                        action=""
                        onSubmit={handleSubmit(handleRegistration)}

                    >

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
                            <option value="">انتخاب کنید...</option>
                            {allManufacture.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {" "}
                                    {item.name}
                                </option>
                            ))}
                        </select>


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

        </div>
    )
}
