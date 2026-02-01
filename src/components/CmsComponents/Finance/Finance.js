import React, { useContext, useEffect, useState } from 'react'
import './Finance.css'
import { CmsContext, HomeContext } from '../../../context/CmsContext';
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import SearchBox from '../SearchBox/SearchBox';
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import ApiPostX from '../../../utils/ApiServicesX/ApiPostX';
import alertA from '../../../utils/AlertFunc/AlertA';
import apiUrl from '../../../utils/ApiConfig';
import DateFormat from "../../../utils/DateFormat";
import AlertError from '../../../utils/AlertFunc/AlertError';
export default function Finance() {
    let { xtSearchI, setXtSearchI,
        xtSearchJ, setXtSearchJ, setResetSearchbox } = useContext(CmsContext)

    const cmsContext = useContext(CmsContext);
    const homeContext = useContext(HomeContext);
    const [flagUpdate, setFlagUpdate] = useState(false);
    const [allAccount, setAllAccount] = useState([])
    const [value1, setValue1] = useState(0);
    const [accountADetail, setAccountADetail] = useState({})
    const [accountBDetail, setAccountBDetail] = useState({})
    const [voucherDate, setVochurDate] = useState(new Date())
    const [vouchurDetail, setVouchurDetail] = useState([])
    const [voucherId, setVoucherId] = useState('')
    const [editVoucherDetail, setEditVoucherDetail] = useState({})
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });
    const registerOptions = {
        referenceType: { required: "referenceType is required" },
        password: { required: "password is required" },
        userStatus: { required: "password is required" },
        userUserType: { required: "password is required" },
    };
    const handleError = (errors) => { };

    function handleChange(value) {
        setVochurDate(value && value.toDate());
        // console.log(value.format());   /// convert  to persian format
    }
    const resetAllSatates = () => {
        reset(setValue(''))
        setXtSearchI('')
        setXtSearchJ('')
        setResetSearchbox(true)
        setVochurDate(new Date())
        setValue1(0)
        setAccountADetail([])
        setAccountBDetail([])
        setVouchurDetail([])
    }

    const voucherTitle = [
        { id: 1, status: "تسویه نقدی", statusId: 1 },
        { id: 2, status: "کارتخوان", statusId: 2 },
        { id: 3, status: "حواله", statusId: 3 },
        { id: 4, status: "چک", statusId: 4 }
    ]
    const handleRegistration = (data) => {

        let obj = {
            voucherDate: voucherDate,
            description: data.description,
            referenceType: data.referenceType,
            items: [
                {
                    accountId: xtSearchI,
                    toAccountId: xtSearchJ,
                    debit: 0,
                    credit: value1
                },
                {
                    accountId: xtSearchJ,
                    toAccountId: xtSearchI,
                    debit: value1,
                    credit: 0
                }
            ]
        }
        console.log(obj)
        async function myApp() {
            const res = await fetch(`${apiUrl}/api/Voucher`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            }).then(res => {
                if (res.ok) return res.json().then(result => {
                    setVouchurDetail(result)

                    reset(setValue(''))
                    setVochurDate(new Date())
                    setValue1(0)
                    alertA("سند با موفقیت ثبت شد ")
                    setResetSearchbox(true)
                })
            })
        }
        myApp()
    }

    useEffect(() => {
        cmsContext.setFlagClass(false);
        homeContext.setSideMenueFlag(false)
        ApiGetX2('/api/Account', setAllAccount)
        return () => cmsContext.setFlagClass(true);
    }, []);

    useEffect(() => {
        if (xtSearchI) {

            ApiGetX2(`/api/Account/accountBalance?accountId=${xtSearchI}`, setAccountADetail)
        }
    }, [xtSearchI, vouchurDetail])
    useEffect(() => {
        if (xtSearchJ) {

            ApiGetX2(`/api/Account/accountBalance?accountId=${xtSearchJ}`, setAccountBDetail)
        }
    }, [xtSearchJ, vouchurDetail])

    useEffect(() => {
        if (xtSearchI != 0 && xtSearchJ != 0 && xtSearchI == xtSearchJ) {

            AlertError("حساب واریز کننده و دریافت کننده نباید یکسان باشد")
            setXtSearchJ("")
        }
    }, [xtSearchI, xtSearchJ])

    useEffect(() => {
        return () => {
            setResetSearchbox(true)
        }
    }, [])

    useEffect(() => {
        if (editVoucherDetail?.items?.length != 0) {
            console.log(editVoucherDetail);
            editVoucherDetail?.items?.forEach(element => {
                if (element.credit != 0) {
                    setAccountADetail([])
                    ApiGetX2(`/api/Account/accountBalance?accountId=${element?.accountId}`, setAccountADetail)
                } else if (element.debit != 0) {
                    setAccountBDetail([])
                    ApiGetX2(`/api/Account/accountBalance?accountId=${element?.accountId}`, setAccountBDetail)
                }
            });
        }

    }, [editVoucherDetail])

    
console.log(editVoucherDetail,vouchurDetail);
    useEffect(() => {
        if (editVoucherDetail?.items?.length != 0) {
            editVoucherDetail?.items?.forEach(element => {
                if (element.credit != 0) {
                    setXtSearchI(element.accountId)
                } else if (element.debit != 0) {
                    setXtSearchJ(element.accountId)
                }
            });
        }
    }, [accountADetail, accountBDetail])


    return (
        <div className="container">
            <div className="row">

                <div className="col-12 col-lg-3 user-col3">

                    <form
                        action=""
                        onSubmit={handleSubmit(handleRegistration)}
                    >
                        <span className="newsubject-form-col3-span">تاریخ سند:</span>
                        <DatePicker
                            className="custom-input"
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            value={voucherDate}
                            onChange={handleChange}
                            animations={[
                                opacity(),
                                transition({ from: 35, duration: 800 }),
                            ]}
                            render={<InputIcon />}
                        />

                        <label className="user-col3-selectlabel"> حساب پرداخت کننده : </label>
                        <div className='mb-2'>
                            <SearchBox
                                array={allAccount}

                                id="accountArrayA"
                                classs={"accountArrayA"}
                            />
                        </div>

                        <hr />

                        <div className='mt-2 mb-2 hhhhh'>
                            <FloatLabel>
                                <InputNumber id="number-input"
                                    value={value1} onValueChange={(e) => setValue1(e.value)} />
                                <label htmlFor="number-input">ریال</label>
                            </FloatLabel>
                        </div>


                        <hr />


                        {/* <div className="login-label-float">
                            <input
                                name="userName"
                                type="text"
                                placeholder=""
                                maxLength={15}

                                className={errors.referenceType ? "formerror" : ""}
                                {...register(
                                    !flagUpdate ? "referenceType" : "update.referenceType",
                                    registerOptions.referenceType
                                )}
                            />
                            <label>عنوان سند </label>


                        </div> */}


                        <label className="user-col3-selectlabel"> عنوان سند </label>
                        <select
                            className={errors.referenceType ? "formerror" :
                                "user-col3-select"
                            }
                            {...register(
                                !flagUpdate ? "referenceType" : "update.referenceType",
                                registerOptions.referenceType
                            )}
                        >
                            <option value="">انتخاب کنید...</option>
                            {voucherTitle.map((item) => (
                                <option key={item.id} value={item.status}>
                                    {" "}
                                    {item.status}
                                </option>
                            ))}
                        </select>

                        <div className="login-label-float">
                            <input
                                name="description"
                                type="text"
                                placeholder=""
                                {...register(
                                    !flagUpdate ? "description" : "update.description"

                                )}
                            />
                            <label> شرح سند</label>
                        </div>


                        <hr />

                        <label className="user-col3-selectlabel mt-2"> حساب دریافت کننده :</label>
                        <div className=''>
                            <SearchBox
                                array={allAccount}
                                id="accountArrayB"
                            // classs={"categoryCodeForAdd"}
                            />
                        </div>

                        <div className='centerrc'>
                            <button className="btn btn-danger "
                                onClick={() => resetAllSatates()
                                }>
                                RESET

                            </button>
                        </div>


                        <Button

                            className={(typeof xtSearchI === "number" && typeof xtSearchJ === "number" && value1) ? "user-regbutton " : "user-regbutton disable"}
                            type="submit"
                            variant="contained"
                            color="info"
                            endIcon={<SendIcon />}
                        >
                            {!flagUpdate ? <span> افزودن </span> : <span> ویرایش </span>}
                        </Button>
                    </form>
                </div>

                <div className="col-12 col-lg-2 finance-accountA-div boxSh">
                    <h2 className='mb-5 mt-3' >پرداخت کننده:</h2>

                    <ul>
                        <li>شناسه : <span>{accountADetail.account?.id}</span></li>
                        <li>کد :<span>{accountADetail.account?.code}</span> </li>
                        <li>عنوان : <span>{accountADetail.account?.title}</span></li>
                        <li>والد : <span>{accountADetail.account?.parentId}</span></li>
                        <li>نوع حساب : <span>{accountADetail.account?.accountType}</span></li>
                        <li>مانده حساب : <span>{Math.abs(accountADetail.result?.balance ?? 0)?.toLocaleString()}ریال</span></li>
                        <li><span>{accountADetail.result?.balanceStatus}</span></li>
                    </ul>
                </div>


                <div className="col-12 col-lg-2 finance-accountA-div boxSh">
                    <h2 className='mb-5 mt-3' >دریافت کننده:</h2>

                    <ul>
                        <li>شناسه : <span>{accountBDetail.account?.id}</span></li>
                        <li>کد :<span>{accountBDetail.account?.code}</span> </li>
                        <li>عنوان : <span>{accountBDetail.account?.title}</span></li>
                        <li>والد : <span>{accountBDetail.account?.parentId}</span></li>
                        <li>نوع حساب : <span>{accountBDetail.account?.accountType}</span></li>
                        <li>مانده حساب : <span>{Math.abs(accountBDetail.result?.balance ?? 0)?.toLocaleString()}ریال</span></li>
                        <li><span>{accountBDetail.result?.balanceStatus}</span></li>
                    </ul>
                </div>



                <div className="col-12 col-lg-3 finance-accountA-div boxSh">
                    <h2 className='mb-5 mt-3' > جزییات سند :</h2>

                    <ul>
                        <li>تاریخ : <span><DateFormat dateString={editVoucherDetail?.items?.length == 0 ? `${vouchurDetail.voucherDate}` : `${editVoucherDetail.voucherDate}`} /> </span></li>
                        <li>شناسه :<span>{editVoucherDetail?.items?.length == 0 ? vouchurDetail.id : editVoucherDetail.id}</span> </li>

                        <li>عنوان : <span>{editVoucherDetail?.items?.length == 0 ? vouchurDetail.referenceType : editVoucherDetail.referenceType}</span></li>

                        <li>شرح : <span>{editVoucherDetail?.items?.length == 0 ? vouchurDetail.description : editVoucherDetail.description}</span></li>

                        <li>مبلغ انتقالی :<span>
                            {(vouchurDetail?.length != 0 && editVoucherDetail?.items?.length == 0) ? vouchurDetail?.items?.[0]?.credit?.toLocaleString() :
                            editVoucherDetail?.items?.length != 0 ?
                                editVoucherDetail?.items?.[0]?.credit?.toLocaleString()
                                : 0} ریال</span> </li>

                    </ul>
                </div>

                <div className="col-12 col-lg-2 finance-accountA-div boxSh">
                    <div className="login-label-float">
                        <input
                            value={voucherId}
                            onChange={(e) => setVoucherId(e.target.value)}
                            type="number"
                            placeholder=""
                        />
                        <label>شماره سند</label>
                    </div>


                    <div className='centerrc'>
                        <button className="btn btn-success mt-3 "
                            onClick={() => {
                                setEditVoucherDetail([])
                                ApiGetX2(`/api/Voucher/${voucherId}`, setEditVoucherDetail)
                            }
                            }>
                            نمایش سند

                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
