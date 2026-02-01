

import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import './Factor.css';
import { CmsContext, FactorContext, HomeContext } from '../../../context/CmsContext';
import Modal from "react-bootstrap/Modal";
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';
import { useForm } from "react-hook-form";
import apiUrl from '../../../utils/ApiConfig';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { useReactToPrint } from "react-to-print";
import alertC from '../../../utils/AlertFunc/AlertC';
import { Audio, Blocks, DNA } from 'react-loader-spinner'
import SearchBox from '../SearchBox/SearchBox';
import { FaRegCheckSquare } from "react-icons/fa";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { InputNumber } from 'primereact/inputnumber';
import { FloatLabel } from 'primereact/floatlabel';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import ModalFullB from '../../../utils/ModalFullB';
import AllFactors from './AllFactor';
import DateFormat from '../../../utils/DateFormat';
import AlertError from '../../../utils/AlertFunc/AlertError';
import scrollToElementAndCenter from '../../../utils/ScrollToElement';

const FactorComponent = (props) => {
    const cmsContext = useContext(CmsContext);
    const homeContext = useContext(HomeContext);
    let { xtSearchH, setXtSearchH, xtSearchk, setXtSearchk } = useContext(CmsContext)
    let { userDateil, setUserDateil, setXtOrderId, setXtOrderDetai, xtOrderDetai, flagShowFactor, setFlagShowFactor, formRerender, setFormRerender, xtFactorNum, setXtFactorNum } = useContext(FactorContext)
    const printRef = useRef();
    const overlayRefs = useRef({});
    const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [hardWareCat, sethardWareCat] = useState([])
    const [accesoryCat, setaccesoryCat] = useState([])
    const [root2, setRoot2] = useState([])
    const [parentCat, setParentCat] = useState([])
    const [rootCatState, setRootProCatSate] = useState(0)
    const [rootName, setRootName] = useState("")
    const [rootName2, setRootName2] = useState("")
    const [productsByCat, setProductsByCat] = useState([])
    const [flagUpdate, setFlagUpdate] = useState(false);
    const [customerArray, setcustomerArray] = useState([]);
    const [userCodeA, setUserCodeA] = useState('')
    const [proCatId, setProCatId] = useState(0)
    const [factoNumber, setFactoNumber] = useState("")
    const [dnaflag, setDnaflag] = useState(false)
    const [flagA, setFlagA] = useState(true)
    const [flagB, setFlagB] = useState(true)
    const [value4, setValue4] = useState(null);
    const [FactorNum, setFactorNum] = useState('')
    const [orderMode, setOrderMode] = useState(0)

    const handleFactorNum = (e) => {
        setFactorNum(e.target.value)
    }

    //   const handlePrint = useReactToPrint({
    //     content: () => componentRef.current,
    //     documentTitle: "factor",
    //   });

    const Prices = [
        { type: 'نقدی', value: 120000 },
        { type: 'چکی', value: 135000 },
        { type: 'همکار', value: 110000 }
    ];

    const buildProductPrices = (product) => {
        return [
            { key: 'Price', label: 'قیمت اصلی', value: product.Price },
            { key: 'ShopPrice', label: 'قیمت فروشگاه', value: product.ShopPrice },
            { key: 'Price2', label: 'قیمت چکی', value: product.Price2 },
            { key: 'Price3', label: 'قیمت همکار', value: product.Price3 },
            { key: 'Price4', label: 'قیمت ویژه', value: product.Price4 },
            { key: 'Price5', label: 'قیمت پروژه‌ای', value: product.Price5 }
        ].filter(p => p.value && p.value > 0);
    };
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: "factor",
    });

    function handleChange(value) {
        setValue4(value && value.toDate());
        // console.log(value.format());   /// convert  to persian format
    }
    const resetAllSatates = () => {
        reset(setValue(''))
        setXtFactorNum(null)
        setFactoNumber('')
        setXtOrderId(null)
        setXtSearchH(null)
        setFlagShowFactor(false)
        setXtOrderDetai([])
        setOrderItems([])
        setFormRerender(false)
        setUserDateil([])
        setValue4(new Date())
        setTimeout(() => {
            setFormRerender(true)
        }, 100);
    }
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: {},
    });
    const registerOptions = {
        userName: { required: "userName is required" },
        password: { required: "password is required" },
        userStatus: { required: "password is required" },
        userUserType: { required: "password is required" },
    };
    let userCodWatch = watch(("userID"))

    useEffect(() => {
        setUserCodeA(getValues("userID"))

    }, [userCodWatch])

    const [FactorData, setFactorData] = useState({
        FactorCode: '',
        customerName: '',
        customerCode: '',
        FactorDate: new Date().toLocaleDateString('fa-IR')
    });
    const [getEditFactor, setgetEditFactor] = useState({})

    const [orderItems, setOrderItems] = useState([]);
    const [totals, setTotals] = useState({ discount: xtOrderDetai?.discount, tax: xtOrderDetai?.taxes, cost: xtOrderDetai?.cost, subtotal: 0, grandTotal: xtOrderDetai?.fanalTotalAmount });
    const [notes, setNotes] = useState('');
    const [error, setError] = useState('');



    // ✅ اصلاح شده - کار می‌کند!
    const addItem = useCallback((product) => {
        console.log(orderItems);
        console.log(product);
        // const newId = Math.max(...orderItems.map(item => item.ID || 0), 0) + 1;
        const newItem = {
            id: product.id,
            partNumber: product.name,
            productID: product.id,
            cyOrderID: null,
            quantity: product.supply,
            unitPrice: product.price,
            UnitPriceString: product.price,
            totalPrice: product.supply * product.price,
            manufacturer: product.manufacturer,
            productCategory: product.productCategory,
            information: '',
            price: product.price,
            price2: product.price2,
            price3: product.price3,
            price4: product.price4,
            price5: product.price5,
            shopPrice: product.shopPrice
            // Prices: buildProductPrices(product)
        };

        // فقط محصولات با PartNumber پر شده را چک کن
        const filledItems = orderItems.filter(item => item.partNumber && item.partNumber.trim());
        const isDuplicate = filledItems.some(item =>
            item.partNumber.trim() === newItem.partNumber.trim() && newItem.partNumber.trim()
        );

        if (isDuplicate) {
            AlertError('این محصول قبلاً در فاکتور اضافه شده است!');
            setTimeout(() => setError(''), 3000);
            return;
        }

        setOrderItems(prev => [...prev, newItem]);
        setError('');
    }, [orderItems]);

    const removeItem = useCallback((id) => {
        setOrderItems(prev => prev.filter(item => item.id !== id));
    }, []);

    const updateItemField = useCallback((id, field, value) => {
        setOrderItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    }, []);

    const updateRowTotal = useCallback((id) => {
        setOrderItems(prev =>
            prev.map(item => {
                if (item.id === id) {
                    const total = (item.quantity || 0) * (item.unitPrice || 0);
                    return { ...item, totalPrice: total };
                }
                return item;
            })
        );
    }, []);

    const calculateTotals = useCallback(() => {
        const subtotal = orderItems?.reduce((sum, item) => sum + (item.totalPrice || 0), 0);
        const discountAmount = totals.discount || 0;
        const costAmount = totals.cost || 0;
        const taxAmount = (subtotal - discountAmount) * ((totals.tax || 0) / 100);
        const grandTotal = subtotal - discountAmount + taxAmount + costAmount;

        setTotals({
            subtotal,
            discount: totals.discount || 0,
            cost: totals.cost || 0,
            tax: totals.tax || 0,
            discountAmount,
            taxAmount,
            grandTotal
        });
    }, [orderItems, totals.discount, totals.cost, totals.tax]);

    const getcustomerItem = () => {
        async function myAppGetcustomer() {
            const res = await fetch(`${apiUrl}/api/CyUsers/GetUserByType/1`, {
                method: "GET",
                credentials: "include",
            })
                .then((res) => res.json())
                .then((result) => {
                    setcustomerArray(result);
                });
        }
        myAppGetcustomer();
    };
    //////////////////////


    const getProductByCat = (id) => {
        ApiGetX2(`/api/CyProductsB/getProductByProCategory?proCatId=${id}&isSupply=false`, setProductsByCat)
    }

    const getProCateegory = (id, func) => {
        setProCatId(id)
        ApiGetX2(`/api/CyProductsB/getProductCategory?catRoot=${id}`, func)
    }

    const getUserDetail = (userId) => {
        ApiGetX2(`/api/Account/accountBalanceByUserId?userId=${userId}`, setUserDateil)
    }
    useEffect(() => {
        if (xtSearchH) {
            getUserDetail(xtSearchH)
        } else if (xtOrderDetai.length != 0) {
            getUserDetail(xtOrderDetai.cyUserID)
        }

    }, [xtSearchH, xtOrderDetai])

    const handleResetClick = () => {
        ///reset style of reset field
        // Find all elements within a specific container if possible,
        // otherwise, search the whole document (less efficient/safe)
        // Assuming your Customer component has a main container div with an ID like 'customer-container'
        const container = document.getElementById("customer-container"); // Replace with your actual container ID or ref

        const elementsToReset = container
            ? container.querySelectorAll("*") // Search within the container
            : document.querySelectorAll("*"); // Search the whole document (use with caution)

        elementsToReset.forEach((element) => {
            // Check if the element has an ID and if it starts with "@@"
            if (element.id && element.id.startsWith("@@")) {
                // Apply the desired styles
                element.style.border = "inherit";
                element.style.backgroundColor = "none";
                // You might also want to remove inline styles if they were set previously
                // element.style.removeProperty('border');
                // element.style.removeProperty('background-color');
            }
        });
    };
    useEffect(() => {
        getcustomerItem();
        getProCateegory(0, setParentCat)
        getProCateegory(2, sethardWareCat)
        getProCateegory(3, setaccesoryCat)
    }, [])
    useEffect(() => {
        if (root2.length == 0) {
            getProductByCat(proCatId)
        }
    }, [root2])

    useEffect(() => {
        calculateTotals();
    }, [orderItems, calculateTotals]);



    const handleRegistration = (data) => {
        if (orderItems.length === 0) {
            AlertError('حداقل یک محصول اضافه کنید');
            return;
        }
        setDnaflag(true)
        let obj = {
            id: xtOrderDetai.id,
            factorNumber: Number(FactorNum),
            creatDate: value4 ? value4 : xtOrderDetai?.creatDate,
            cyUserID: xtSearchH ? xtSearchH : xtOrderDetai?.cyUserID,
            orderMode: xtOrderDetai.orderMode, ///SaleToCustomer = 1,
            status: 2,///Finalized = 2,
            statusText: data.statusText,
            totalAmount: totals.subtotal,
            fanalTotalAmount: totals.grandTotal,
            taxes: totals.tax, ///مالیات
            discount: totals.discount, ///تخفیف 
            cost: totals.cost, ///هزینه
            orderItems: orderItems
        }
        // console.log(obj);
        // console.log(xtOrderDetai.orderMode);
        async function myApp() {

            const url = xtOrderDetai.orderMode == 1 ? 'api/CyOrders/editOrder' :
                xtOrderDetai.orderMode == 2 ? 'api/CyOrders/editOrderB' : ''

            const res = await fetch(`${apiUrl}/${url}`, {
                method: "PUT",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(obj),
            }).then(res => {
                if (res.ok) {
                    return res.json().then(result => {
                        setFactoNumber(result.factoNumber)
                        alertC("فاکتور با موفقیت ثبت شد", function () {
                            // setDnaflag(true)
                            setTimeout(() => {
                                handlePrint()
                                resetAllSatates()

                                setDnaflag(false)


                            }, 1000);
                        })

                    })
                } else {
                    setDnaflag(false)
                 res.json().then(result => {   AlertError(result.msg)}
            )}
            })
        }
        myApp()

        setError('');

    };

    /////////////////
    const getFactor = () => {
        ApiGetX2(`/api/CyOrders/getOrderDetail?factorNum=${FactorNum}`, setXtOrderDetai)
        setFlagShowFactor(true)
    }

    useEffect(() => {
        if (xtOrderDetai?.orderItems?.length != 0) {
            setTotals({ discount: xtOrderDetai?.discount, tax: xtOrderDetai?.taxes, cost: xtOrderDetai?.cost, subtotal: 0, grandTotal: xtOrderDetai?.fanalTotalAmount })
            setOrderItems(xtOrderDetai?.orderItems)
            setOrderMode(xtOrderDetai.orderMode)
        }
        setFormRerender(false)
        setTimeout(() => {
            setFormRerender(true)

            setDnaflag(false)
        }, 500);

    }, [xtOrderDetai])

    console.log(value4);
    console.log(xtOrderDetai);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Select the active item
            e.preventDefault();
            setProCatId('')
            setRootName('')
            setRootName2('')
            setRoot2([])
            setProductsByCat([])
            setShow(true)
        }
    };
    useEffect(() => {
        if (!show) {

            document.addEventListener('keydown', handleKeyDown);
        } else if (show) {
            document.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [show]);



    useEffect(() => {
        cmsContext.setFlagClass(false);
        homeContext.setSideMenueFlag(false)

        return () => {
            cmsContext.setFlagClass(true);
            resetAllSatates()
        }
    }, []);

    return (


        <section>
            <div className='container'>

                <div className='row'>
                    <div className='col-4 centerrc'>
                        <div className="login-label-float">
                            <input
                                value={FactorNum}
                                onChange={(e) => handleFactorNum(e)}
                                type="text"
                                placeholder=""
                            // className={errors.ItemCategoryTitle ? "formerror" : ""}
                            />
                            <label>شماره فاکتور وارد کنید </label>
                        </div>

                        <button className='btn btn-warning' onClick={() => {
                            getFactor()
                        }}>
                            ✔
                        </button>

                    </div>

                </div>

                <div className='row'>
                    <div className='col-lg-10'>
                        {dnaflag &&
                            <div className='dnaa-div'>
                                <span className='dnaaa'>
                                    <Blocks
                                        height="300"
                                        width="300"
                                        color="#4fa94d"
                                        ariaLabel="blocks-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="blocks-wrapper"
                                        visible={true}
                                    />
                                </span>
                            </div>
                        }




                        {formRerender &&
                            <div ref={printRef} style={{ padding: "5px" }}>
                                <form

                                    onSubmit={handleSubmit(handleRegistration)}
                                    className="Factor-container" dir="rtl"
                                    style={{ backgroundColor: xtOrderDetai.orderMode == 2 ? 'antiquewhite' : '#fff' }}
                                >
                                    {error && <div className="error-message">{error}</div>}

                                    {/* سربرگ */}
                                    <div className="Factor-header">
                                        <div className="header-row">

                                            <span>فروشگاه صانع
                                                <img class="factor-img-logo" src="/images/photo_torob.png" alt=""></img>
                                            </span>

                                            <span className='header-row-title'> {
                                                xtOrderDetai?.orderMode == 1 ? "فاکتورفروش" :
                                                    xtOrderDetai?.orderMode == 2 ? "فاکتورخرید" :
                                                        xtOrderDetai?.orderMode == 3 ? "فاکتور برگشت از فروش" :
                                                            xtOrderDetai?.orderMode == 4 ? "فاکتور برگشت از خرید" : ''
                                            }</span>

                                            <span className='header-row-minInput'>

                                                {!value4 && <DateFormat dateString={xtOrderDetai?.creatDate} />}
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


                                            </span>


                                        </div>

                                        <div className="header-row centerrc">
                                            <div style={{ width: "500px" }} className=' Factor-userName centerrc'>
                                                <label>نام مشتری :آقای /خانم  </label>
                                                {flagShowFactor &&
                                                    <>
                                                        {!xtSearchH && <span>{xtOrderDetai?.userName}</span>}
                                                        <SearchBox
                                                            array={customerArray}
                                                            placeholder={"نام مشتری"}
                                                            id="UserArray"
                                                        // classs={"categoryCodeForAdd"}
                                                        />
                                                    </>


                                                }

                                            </div>


                                            <label
                                                className='header-row-minInput'
                                                placeholder=" " disabled

                                            >شماره فاکتور : {FactorNum}</label>


                                            <input className='no-print header-row-minInput' placeholder=" کد مشتری" disabled value={userDateil?.currentUser?.partnerStatus} />

                                        </div>
                                    </div>

                                    {/* جدول */}
                                    <div className="items-table">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>ردیف</th>
                                                    <th className='no-print'>شرکت  </th>
                                                    <th className='no-print'>گروه</th>
                                                    <th>نام کالا</th>
                                                    <th className='factor-q-th'>تعداد</th>
                                                    <th> واحد(ریال)</th>
                                                    <th>مجموع(ریال)</th>
                                                    <th>شرح</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderItems?.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>

                                                        <td className='no-print'>{item.manufacturer}</td>

                                                        <td className='no-print'>{item.productCategory}</td>

                                                        <td style={{ width: "250px" }}>
                                                            <input value={item.partNumber || ''} onChange={e => updateItemField(item.ID, 'partNumber', e.target.value)} />
                                                        </td>


                                                        <td  >
                                                            <input min={0}
                                                                className='factor-quntity'
                                                                type="number" value={item.quantity || 0}
                                                                onChange={e => {
                                                                    const value = parseInt(e.target.value) || 0;
                                                                    updateItemField(item.id, 'quantity', value);
                                                                    updateRowTotal(item.id);
                                                                }}
                                                            />

                                                        </td>


                                                        <td>

                                                            <div className="mt-2 mb-2">
                                                                <OverlayPanel ref={(el) => overlayRefs.current[item.id] = el}>
                                                                    <div className="flex flex-column gap-2">
                                                                        <Button
                                                                            label={item.price && `1: ${item.price?.toLocaleString()} `}
                                                                            text='dsf'
                                                                            onClick={() => {
                                                                                updateItemField(item.id, 'unitPrice', item.price);
                                                                                updateRowTotal(item.id);
                                                                                overlayRefs.current[item.id]?.hide();
                                                                            }}
                                                                        />/
                                                                        <Button
                                                                            label={item.price2 && `2 : ${item.price2?.toLocaleString()} `}
                                                                            text
                                                                            onClick={() => {
                                                                                updateItemField(item.id, 'unitPrice', item.price2);
                                                                                updateRowTotal(item.id);
                                                                                overlayRefs.current[item.id]?.hide();
                                                                            }}
                                                                        />/
                                                                        <Button
                                                                            label={item.price3 && `3 : ${item.price3?.toLocaleString()} `}
                                                                            text
                                                                            onClick={() => {
                                                                                updateItemField(item.id, 'unitPrice', item.price3);
                                                                                updateRowTotal(item.id);
                                                                                overlayRefs.current[item.id]?.hide();
                                                                            }}
                                                                        />/
                                                                        <Button
                                                                            label={item.price4 && `4 : ${item.price4?.toLocaleString()} `}
                                                                            text
                                                                            onClick={() => {
                                                                                updateItemField(item.id, 'unitPrice', item.price4);
                                                                                updateRowTotal(item.id);
                                                                                overlayRefs.current[item.id]?.hide();
                                                                            }}
                                                                        />/
                                                                        <Button
                                                                            style={{ color: "red", cursor: 'default' }}
                                                                            label={item.shopPrice && `0 : ${item.shopPrice?.toLocaleString()} `}
                                                                            text

                                                                        />
                                                                    </div>
                                                                </OverlayPanel>

                                                                <FloatLabel>
                                                                    <InputNumber
                                                                        className='factor-InputNumber'
                                                                        value={item.unitPrice || 0}
                                                                        onFocus={(e) => overlayRefs.current[item.id]?.toggle(e)}
                                                                        onValueChange={(e) => {
                                                                            const value = e.value || 0;
                                                                            updateItemField(item.id, 'unitPrice', value);
                                                                            updateRowTotal(item.id);
                                                                        }}
                                                                    />
                                                                </FloatLabel>
                                                            </div>
                                                            {/* :
                                                                <span>{item?.unitPrice?.toLocaleString()}</span>
                                                            } */}
                                                            {/* <div className='mt-2 mb-2 hhhhh' >
                                                <FloatLabel>
                                                    <InputNumber id="number-input"
                                                        value={(item.UnitPrice) || 0}
                                                        onValueChange={(e) => {
                                                                   const value = parseInt(e.target.value) || 0;
                                                    updateItemField(item.ID, 'UnitPrice', value);
                                                    updateRowTotal(item.ID);
                                                            // setValue1(e.value)
                                                        }
                                                        }
                                                    />
                                                </FloatLabel>
                                            </div> */}


                                                        </td>

                                                        <td>{(item.totalPrice || 0).toLocaleString('fa-IR')}</td>



                                                        <td>
                                                            {<input value={item.information || ''} onChange={e => updateItemField(item.id, 'information', e.target.value)} />
                                                            }
                                                        </td>

                                                        <td className='no-print'><button type='button' className="remove-btn" onClick={() => removeItem(item.id)}>حذف</button></td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {<button className="add-btn" type='button' onClick={() => {
                                            setProCatId('')
                                            setRootName('')
                                            setRootName2('')
                                            setRoot2([])
                                            setProductsByCat([])
                                            setShow(true)
                                        }}>➕ اضافه کردن کالا</button>}

                                        {orderItems?.length === 0 && <p style={{ color: '#666', fontSize: '14px' }}>هیچ محصولی اضافه نشده</p>}
                                    </div>


                                    {/* باکس محاسبات */}

                                    <div className='factor-footerBox'>

                                        <div className='centerc'>
                                            <span onClick={() => setFlagA(!flagA)} className={flagA ? "" : 'no-print'}>

                                                <span className='no-print'>
                                                    {flagA ? <FaRegCheckSquare /> : <MdCheckBoxOutlineBlank />
                                                    }
                                                </span>

                                                <label>حساب از قبل :{Math.abs(userDateil?.result?.balance)?.toLocaleString()} ریال {userDateil?.result?.balanceStatus} </label>
                                            </span>


                                            <span onClick={() => setFlagB(!flagB)} className={flagB ? "" : 'no-print'}>

                                                <span className='no-print'>
                                                    {flagB ? <FaRegCheckSquare /> : <MdCheckBoxOutlineBlank />
                                                    }
                                                </span>

                                                <label>مبلغ به این حساب واریز گردد  :به نام  سید مسعود سیدی </label>
                                                <ul className='factor-checkbox-ul centercc'>
                                                    <li style={{ direction: 'ltr' }} >   6063 7312 4509 0262  <label>:شماره کارت </label></li>
                                                    <li style={{ direction: 'ltr' }}> IR08 0600 5206 7001 9960 8200 01 <label>: شماره شبا</label></li>
                                                </ul>
                                            </span>

                                        </div>

                                        <div className="totals-box centerc">
                                            <div className="total-row"><strong>مجموع فاکتور:</strong> {totals.subtotal?.toLocaleString('fa-IR')} ریال</div>

                                            <div className="total-row"> تخفیف : {<input type="number" value={totals.discount} onChange={e => setTotals({ ...totals, discount: parseFloat(e.target.value) || 0 })} style={{ width: '80px' }} />}

                                            </div>

                                            <div className="total-row">
                                                مالیات (%):
                                                {<input type="number" value={totals.tax} onChange={e => setTotals({ ...totals, tax: parseFloat(e.target.value) || 0 })} style={{ width: '80px' }} />}


                                            </div>

                                            <div className="total-row">
                                                حمل و نقل: {<input type="number" value={totals.cost} onChange={e => setTotals({ ...totals, cost: parseFloat(e.target.value) || 0 })} style={{ width: '80px' }} />}
                                            </div>

                                            <div className="total-row final-row" style={{ fontWeight: '700' }}>
                                                <span >مجموع نهایی: </span>
                                                {totals?.grandTotal?.toLocaleString('fa-IR')
                                                    //  : xtOrderDetai.fanalTotalAmount
                                                } ریال
                                            </div>
                                        </div>

                                    </div>


                                    <div className='factor-footerBox'>

                                        <div className='factor-footerBox-divRight'>

                                            <div className="notes-section">
                                                <label>توضیحات:</label>
                                                <textarea {...register("statusText")} />
                                            </div>


                                            <div className='factor-footerBox-divRight-span'>
                                                <span>مهر و امضای خریدار</span>
                                                <span>مهر وامضای فروشنده </span>
                                            </div>



                                            <div className='factor-footerBox-divRight-div-ul'>
                                                <ul>
                                                    <li>اقلام مندرج در فاکتور تا تسویه نهایی به عنوان امانت و عندالمطالبه خواهد بود .</li>

                                                    <li>کالای فوق سالم تحویل اینجانب گردید.</li>
                                                    <li>گارانتی محصولات به عهده شرکت گارانتی کننده میباشد و این مجموعه هیچ مسولیتی در قبال آن ندارد.</li>
                                                    <li className='factor-adress'>آدرس : قم - بلوار سمیه -نبش کوچه 5 ---شماره تماس :37835456-37835457-37839322</li>

                                                </ul>
                                            </div>


                                        </div>



                                    </div>

                                    {
                                        <div className="footer-section centercc">

                                            <button className="submit-btn" type='submit'>💾 ثبت فاکتور</button>

                                        </div>}



                                    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
                                        <Modal.Header closeButton></Modal.Header>
                                        <Modal.Body >
                                            <>
                                                <div className='container'>

                                                    <div className='row'>

                                                        <div className='col-12'>
                                                            <SearchBox
                                                                array={productsByCat}
                                                                placeholder={"جستجوی نام کالا"}
                                                                id="factorProducts"
                                                            // classs={"categoryCodeForAdd"}
                                                            />
                                                            <button
                                                                disabled
                                                                onClick={
                                                                    scrollToElementAndCenter(
                                                                        `@@${xtSearchk}`,
                                                                    )
                                                                }>بگرد</button>
                                                        </div>
                                                    </div>

                                                    <div className='row'>


                                                        <div className='col-2 boxSh factor-modal-categiry-div'>
                                                            <div>
                                                                {parentCat.length != 0 && parentCat.map(item => (
                                                                    <button type='button' className='btn btn-info m-1' onClick={() => setRootProCatSate(item.id)}>{item.name}</button>
                                                                ))}
                                                            </div>

                                                            {
                                                                rootCatState == 2 ?
                                                                    hardWareCat.map(item => (
                                                                        <span className={rootName == item.id ? "Factor-spanCate Factor-Active" : "Factor-spanCate"} onClick={() => {
                                                                            setRootName('')
                                                                            setProductsByCat([])
                                                                            setRootName(item.id)
                                                                            getProCateegory(item.id, setRoot2)

                                                                        }}>{item.name}</span>
                                                                    ))
                                                                    :
                                                                    accesoryCat.map(item => (
                                                                        <span className={rootName == item.id ? "Factor-spanCate Factor-Active" : "Factor-spanCate"} onClick={() => {
                                                                            setRootName('')
                                                                            setProductsByCat([])
                                                                            setRootName(item.id)
                                                                            getProCateegory(item.id, setRoot2)
                                                                        }}>{item.name}</span>
                                                                    ))
                                                            }


                                                            <span></span>
                                                        </div>
                                                        <div className='col-10 boxSh'>

                                                            <div className='row '>
                                                                <div className='col-12 centerr'>
                                                                    {root2.length != 0 && root2.map(item => (
                                                                        <span style={{ width: '20%' }}
                                                                            onClick={() => {
                                                                                setRootName2(item.id)
                                                                                getProductByCat(item.id)
                                                                            }}
                                                                            className={rootName2 == item.id ? "Factor-spanCate Factor-Active" : "Factor-spanCate"}>{item.name}</span>
                                                                    ))}
                                                                </div>

                                                            </div>
                                                            <div className='row '>

                                                                <table className='col-12 table table-striped table-hover factor-modal-table'>
                                                                    <tr >

                                                                        <th >شناسه</th>
                                                                        <th>نام کالا</th>
                                                                        <th>شرکت</th>
                                                                        <th>موجودی</th>
                                                                        <th>همکار</th>
                                                                        <th>قیمت 1</th>
                                                                        <th>قیمت 2</th>
                                                                        <th>قیمت 3</th>
                                                                        <th>قیمت 4</th>
                                                                        <th>قیمت 5</th>
                                                                        <th>قیمت خرید</th>
                                                                    </tr>                                        <thead>

                                                                    </thead>



                                                                    <tbody>
                                                                        {productsByCat.length != 0 && productsByCat.map(item => (
                                                                            <tr
                                                                                id={`@@${item.id}`}
                                                                                style={{ padding: "1px", cursor: "pointer" }}
                                                                                onClick={() => {
                                                                                    addItem({
                                                                                        id: item.id,
                                                                                        name: item.name,
                                                                                        manufacturer: item.manufacturer,
                                                                                        productCategory: item.productCategory,
                                                                                        supply: item.supply,
                                                                                        price: item.price,
                                                                                        price2: item.price2,
                                                                                        price3: item.price3,
                                                                                        price4: item.price4,
                                                                                        price5: item.price5,
                                                                                        shopPrice: item.shopPrice
                                                                                    })
                                                                                    setShow(false)
                                                                                    handleResetClick()
                                                                                    setXtSearchk('')

                                                                                }}
                                                                            >
                                                                                <td>{item.id}</td>
                                                                                <td>{item.name}</td>
                                                                                <td>{item.manufacturer
                                                                                }</td>
                                                                                <td>{item.supply}</td>
                                                                                <td>{item.partnerPrice?.toLocaleString()}</td>
                                                                                <td>{item.price?.toLocaleString()}</td>
                                                                                <td>{item.price2?.toLocaleString()}</td>
                                                                                <td>{item.price3?.toLocaleString()}</td>
                                                                                <td>{item.price4?.toLocaleString()}</td>
                                                                                <td>{item.price5?.toLocaleString()}</td>
                                                                                <td>{item.shopPrice?.toLocaleString()}</td>

                                                                            </tr>

                                                                        ))}
                                                                    </tbody>
                                                                </table>



                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </>

                                        </Modal.Body>
                                    </Modal>

                                </form>

                            </div>
                        }
                        {/* دکمه */}


                        <AllFactors show={showModalB} setShowModalB={setShowModalB} setOrderItems={setOrderItems} setDnaflag={setDnaflag} ordermode={1}
                            onHide={() => setShowModalB(false)} />

                    </div>



                    <div className='col-lg-2 boxSh  centercc foctor-btn-section'>


                        <button className='btn btn-secondary'
                            onClick={() => {
                                setUserDateil([])
                                setXtFactorNum(null)
                                setOrderItems([])
                                setXtOrderDetai([])
                                setFlagShowFactor(false)
                                setShowModalB(true)
                            }}
                        >
                            همه فاکتورها
                        </button>

                        <button className='btn btn-secondary'>
                            مشاهده فاکتور
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                handlePrint()

                            }}
                            className="btn btn-warning no-print "
                        >
                            خروجی PDF
                        </button>


                        <button className="btn btn-danger"
                            onClick={() => resetAllSatates()
                            }>
                            RESET

                        </button>

                    </div>

                </div>

            </div>

        </section >





    );
};

export default FactorComponent;
