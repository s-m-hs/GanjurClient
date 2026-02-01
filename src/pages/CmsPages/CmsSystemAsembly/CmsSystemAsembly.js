import React, { useContext, useEffect, useRef, useState } from "react";
import "./CmsSystemAsembly.css";
import { useForm } from "react-hook-form";
import ExellToArray from "./ExellToArray.js";
import { CmsContext, CmsSistemAssembly } from "../../../context/CmsContext.js";
import SearchBox from "../../../components/CmsComponents/SearchBox/SearchBox.js";
import SearchBoxB from "./SearchBoxB.js";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import ExcelProcessor from "./ExcelProcessor.js";
import ExcelProcessorB from "./ExcelProcessorB.js";
import apiUrl from "../../../utils/ApiConfig.js";
import ExcelMerger from "./ExcelMerger.js";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX.js";
import alertA from "../../../utils/AlertFunc/AlertA.js";
import ApiGetX from "../../../utils/ApiServicesX/ApiGetX.js";
import ApiGetX2 from "../../../utils/ApiServicesX/ApiGetX2.js";
import CardA from "../../../components/CmsComponents/Cards/CardA.js";
import { IoIosClose } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { FaLockOpen } from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";



import ApiDeleteX2 from "../../../utils/ApiServicesX/ApiDeleteX2.js";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import ApiPutX3 from "../../../utils/ApiServicesX/ApiPutX3.js";
export default function CmsSystemAsembly() {
  const cmsContext = useContext(CmsContext);

  const [dataProp, setDataProp] = useState([]);
  const [prices, setPrices] = useState([]);
  const [flagA, setFlagA] = useState(false);
  const [flagB, setFlagB] = useState(false);
  const [flagC, setFlagC] = useState(false);
  const [resetSearchbox, setResetSearchbox] = useState(false);
  const [textArea, setTextArea] = useState("توضیحات :");
  const [priceArray, setPriceArray] = useState([]);
  const [factorDate, setFactorDate] = useState(new Date())
  const [allfactors, setAllFactoprs] = useState([])
  const [factorA, setFactorA] = useState([])
  const [flagFactorA, setFlagFactorA] = useState(false)
  const [flagFactorB, setFlagFactorB] = useState(false)
  const [flagFactorC, setFlagFactorC] = useState(false)
  const [factorId, setFactorId] = useState('')
  const [result, setResult] = useState([]);
  const handleRemoveFields = () => {
    const newArray = factorA?.hardWare?.map(({ id, totalPrice, ...rest }) => rest);
    setHardWareData(newArray);
    console.log(newArray)
    console.log(hardWareData)
  };
  // 💰 مجموع کل فاکتور
  const [totalPrice, setTotalPrice] = useState(0);

  const formRef = useRef(null);

  const handleCapture = async () => {
    const element = formRef.current;

    // 1️⃣ تبدیل مقادیر input و textarea به span قبل از گرفتن عکس
    const inputs = element.querySelectorAll("input, textarea, select");
    const overlaySpans = [];
    const hiddenInputs = [];

    inputs.forEach((input) => {
      const rect = input.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(input);

      const clone = document.createElement("span");
      clone.textContent = input.value;
      clone.style.position = "absolute";
      clone.style.left = `${input.offsetLeft}px`;
      clone.style.top = `${input.offsetTop}px`;
      clone.style.width = `${input.offsetWidth}px`;
      clone.style.height = `${input.offsetHeight}px`;
      clone.style.lineHeight = computedStyle.lineHeight;
      clone.style.fontSize = computedStyle.fontSize;
      clone.style.fontFamily = computedStyle.fontFamily;
      clone.style.padding = computedStyle.padding;
      clone.style.textAlign = computedStyle.textAlign;
      clone.style.whiteSpace = "pre-wrap";
      clone.style.color = computedStyle.color;
      clone.style.background = "transparent";
      clone.style.border = "none";
      clone.style.pointerEvents = "none";

      input.parentNode.style.position = "relative";
      input.parentNode.appendChild(clone);
      overlaySpans.push(clone);

      // ورودی اصلی رو شفاف کن تا دیده نشه
      hiddenInputs.push({ el: input, oldOpacity: input.style.opacity });
      input.style.opacity = "0";
    });

    // 2️⃣ گرفتن عکس
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#fff",
    });

    // 3️⃣ پاک کردن span‌های موقت و بازگرداندن inputها
    overlaySpans.forEach((span) => span.remove());
    hiddenInputs.forEach((item) => {
      item.el.style.opacity = item.oldOpacity || "1";
    });

    // 4️⃣ ساخت تصویر برای دانلود
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "factor-image.png";
    link.click();
  };

  ///////////////////////
  const handlePrint = useReactToPrint({
    contentRef: formRef,
    documentTitle: "Factor",
  });
  ////////////////////
  function handleChangeDate(value) {
    setFactorDate(value && value.toDate());
    // console.log(value.format());   /// convert  to persian format
  }

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "توضیحات :",
    },
  });
  const HardWareName = [
    { id: 1, name: "MAIN" },
    { id: 2, name: "CPU" },
    { id: 3, name: "RAM" },
    { id: 4, name: "GRAFIC" },
    { id: 5, name: "SSD" },
    { id: 6, name: "HDD" },
    { id: 7, name: "POWER" },
    { id: 8, name: "CASE" },
    { id: 9, name: "COOLING" },
    { id: 10, name: "MONITOR" },
    { id: 11, name: "KEY & MOUSE" },
    { id: 12, name: "DVD_R" },
    { id: 13, name: "OTHER" },
  ];
  const [hardWareData, setHardWareData] = useState(
    HardWareName.map(item => ({
      category: item.name,
      name: '',
      price: 0,
      quntity: 1,
      sysPCId: 0,
    }))
  );


  const getPriceArray = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyKeyDatas/9`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log(res);
        return res.json().then((result) => {
          setPriceArray(JSON.parse(result.tag));
        });
      });
    }
    myApp();
  };
  useEffect(() => {
    getPriceArray();
  }, []);

  const changeTerxArea = (e) => {
    setTextArea(e.target.value);
  };
  useEffect(() => {
    cmsContext.setFlagClass(false);
    return () => cmsContext.setFlagClass(true);
  }, []);


  const resetAll = () => {
    setPrices(HardWareName.map(() => 0));
    setPrices([]); // صفر کردن تمام مقادیر قیمت‌ها
  };


  const total = prices.reduce((acc, curr) => acc + curr, 0); // مجموع کل
  const handleQuantityChange = (index, value) => {
    setHardWareData((prev) => {
      const updated = [...prev];
      updated[index].quntity = Number(value) || 0;
      return updated;
    });
  };

  const handleHardwareChange = (index, data) => {
    setHardWareData(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        name: data.name,
        price: data.price
      };
      return updated;
    });
  };
  const resetFactor = () => {
    reset(setValue(''))
    setResetSearchbox(!resetSearchbox);
    setPrices(HardWareName.map(() => 0));
    setPrices([]); // صفر کردن تمام مقادیر قیمت‌ها
    setFlagFactorA(false)
    setFlagFactorB(false)
    setFlagFactorC(false)
    setFactorA([])
    setTotalPrice('')
    setHardWareData(HardWareName.map(item => ({
      category: item.name,
      name: '',
      price: 0,
      quntity: 1,
      sysPCId: 0,
    })
    ))
  }
  // 🧮 محاسبه مجموع کل (price * quantity)
  useEffect(() => {
    let total
    if (flagFactorA) {
      total = factorA?.hardWare
        ?.reduce(
          (sum, item) => sum + item.price * item.quntity,
          0
        );
      setHardWareData(factorA?.hardWare)
      setTotalPrice(total);

    } else {

      total = hardWareData?.reduce(
        (sum, item) => sum + item.price * item.quntity,
        0
      );
      setTotalPrice(total);

    }
  }, [hardWareData, factorA]);


  const handleFactor = (data) => {
    const obj = {
      id: ((!flagFactorA && factorA.length == 0) || flagFactorC) ? 0 : factorId,
      lastModified: factorDate,
      hardWare: hardWareData, // مستقیم از state
      description: data.description,
      custmerName: data.custmerName,
      custmerPhone: data.custmerPhone,
      isFactor: flagA,
      shopSale: data.totalPrice ? data.totalPrice : totalPrice
    };
    console.log(obj)

    if ((!flagFactorA && factorA.length == 0) || flagFactorC) {

      ApiPostX(`/api/SysPc`, obj, function () {
        getAllFactors()
        resetFactor()
        alertA('فاکتور با موفقیت ثبت شد')
      })
    } else if (flagFactorB) {
      async function myApp() {
        const res = await fetch(`${apiUrl}/api/SysPc/editFactor`, {
          method: 'PUT',
          body: JSON.stringify(obj),
          headers: {
            "Content-Type": "application/json",
          },
        }).then(res => {
          if (res.ok) {
            getAllFactors()
            resetFactor()
            alertA('فاکتور با موفقیت ثبت شد')
          }
        }
        )
      }
      myApp()
    }
  };

  const getAllFactors = () => {
    ApiGetX2(`/api/SysPc/getFactor`, setAllFactoprs)
  }
  const getFactorA = (id) => {
    setFactorA([])
    ApiGetX2(`/api/SysPc/getFactor?id=${id}`, setFactorA)
    setFlagFactorA(true)
    setFlagFactorB(false)
    setFlagFactorC(true)
  }

  const deletFactor = (id) => {
    ApiDeleteX2(`/api/SysPc/delFactor?id=${id}`, getAllFactors)
  }

  const editFactor = (id) => {
    setFlagFactorA(false)
  }
  useEffect(() => {
    ApiGetX2(`/api/SysPc/getFactor`, setAllFactoprs)
  }, [])
  return (
    <CmsSistemAssembly.Provider value={{ dataProp, setDataProp, resetSearchbox }}>
      <div className="container ">
        <div className="row boxSh CmsSystemAsembly-row">



          {(flagFactorA || flagFactorB || flagFactorC) &&
            <span className="mt-2" style={{ cursor: 'pointer' }} onClick={() => {
              setFlagFactorA(false)
              handleRemoveFields()
            }}>{(flagFactorA) ? <FaLock /> :
              // (!flagFactorA || flagFactorC) ? <FaLock /> :
              <FaLockOpen />}   </span>
          }


          <form className="col-6 text-center CmsSystemAsembly-list"

            onSubmit={handleSubmit(handleFactor)}
          >
            <div className="CmsSystemAsembly-list-div" ref={formRef}>
              <div className="centerr CmsSystemAsembly-header-div"

              >
                <img src="../../../images/photo_2023-12-28_17-13-57.jpg" alt="" />

                {!flagA ? <h3>پیش فاکتور</h3> : <h3>فاکتور فروش</h3>}

                <DatePicker
                  className="custom-input"
                  calendar={persian}
                  locale={persian_fa}
                  calendarPosition="bottom-right"
                  value={factorDate}
                  onChange={handleChangeDate}
                  animations={[opacity(), transition({ from: 35, duration: 800 })]}
                  render={<InputIcon />}

                />
              </div>
              <div className="CmsSystemAsembly-user">
                <label htmlFor="">نام مشتری:</label>
                <input
                  type="text"
                  name="custmerName"
                  {...register('custmerName')}

                />

              </div>

              <div className="CmsSystemAsembly-user">

                <label htmlFor="">شماره همراه :</label>
                <input
                  type="text"
                  name="custmerPhone"
                  {...register('custmerPhone')}

                />
              </div>

              <div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>قطعه</th>
                      <th>مشخصات</th>
                      <th>تعداد</th>
                    </tr>
                  </thead>
                  <tbody>
                    {HardWareName.map((item, index) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td className={!flagB ? "" : "systemAs-searchtd"}>
                          <SearchBoxB
                            array={!flagFactorA ? priceArray : factorA.hardWare}
                            flagFactorA={flagFactorA}
                            placeholder="..."
                            id="manufacturerNameForAdd"
                            onDataChange={(data) => handleHardwareChange(index, data)}
                            hardWareName={factorA?.hardWare?.filter(filter => (
                              filter.category == item.name
                            ))[0]?.name}
                            hardWarePrice={factorA?.hardWare?.filter(filter => (
                              filter.category == item.name
                            ))[0]?.price}

                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            placeholder="1"
                            min="1"
                            // value={flagFactorA ?
                            //   factorA?.hardWare?.filter(filter => (
                            //     filter.category == item.name
                            //   ))[0].quntity
                            //   : 0}
                            onChange={(e) => handleQuantityChange(index, e.target.value)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3">
                <div className="systemAs-detail-div">

                </div>

                <div className="systemAs-bottom-maindiv">
                  <div className=" systemAs-total-but">
                    <h6>مجموع کل :</h6>

                    <input
                      name="totalPrice"
                      type="text"
                      placeholder={`${totalPrice?.toLocaleString()}  تومان`}
                      {...register('totalPrice')}
                    />

                  </div>

                </div>

                <div className="systemAs-detail-div">
                  <textarea
                    type="text"
                    name="description"
                    className="systemAs-detail-input"
                    {...register('description')}

                  />
                </div>

                <div className="systemAs-bottom-detail-div">
                  <ul>
                    {!flagC ? (
                      <>
                        <li>به قیمتهای مندرج در فاکتور 1.5 تا 2 درصد افزوده میشود.</li>
                        <li>هزینه اسمبل قطعات سیستم بین 300 تا 500 هزار تومان میباشد.</li>
                      </>
                    ) : null}

                    <li>کلیه اقلام مندرج در فاکتور به صورت صحیح و سالم و با شمارش دقیق تحویل خریدار گردید و تا تسویه کامل نزد خریدار امانت میباشد.</li>

                    {flagA ? <li>قیمتهای مندرج در فاکتور فقط در همان تاریخ معتبر است.</li> : null}
                  </ul>
                  <span>آدرس:قم ،ابتدای 55 متری عماریاسر ،سرای چهارسو،پلاک 34و35،کامپیوترصانع**********شماره تلفن:37835456/7-37839322</span>
                  <div className="centerr">
                    <span>امضای خریدار</span>
                    <span>امضای فروشنده</span>
                  </div>
                </div>


              </div>
            </div>


            <button className={flagFactorA ? "btn btn-success m-1 disable" : "btn btn-success m-1"} type="submit">ثبت</button>
            {/* 🖨 دکمه پرینت */}
            <button className="btn btn-primary m-1 "
              type="button"
              onClick={handlePrint}>
              چاپ / خروجی PDF
            </button>

            <button
              type="button"
              className="btn btn-info m-1 "
              onClick={handleCapture}>چاپ / خروجی عکس</button>

            <button
              type="button"
              className={flagFactorB ? "btn btn-danger" : "btn btn-secondary "}
              style={{ cursor: 'pointer' }} onClick={() => {
                setFlagFactorA(false)
                setFlagFactorB(true)
                setFlagFactorC(false)

              }}>ویرایش</button>
          </form>



          <div className="col-6 cmsAssembly-factorsDiv centerrc mt-3" >
            {allfactors.length != 0 && allfactors.map(item => (
              <CardA bColor={item.id}

                textProp={item}
              >
                <p style={{ position: 'absolute', fontSize: '15px', top: 0, left: 0, cursor: 'pointer', color: 'red' }}
                  onClick={() => deletFactor(item.id)}
                ><IoIosClose /></p>

                {/* <p style={{ position: 'absolute', top: 0, left: '20px', cursor: 'pointer', color: 'white' }}
                  onClick={() => editFactor(item.id)}
                ><FaPlus /></p> */}

                <p style={{ position: 'absolute', fontSize: '15px', top: 0, left: '15px', cursor: 'pointer', color: '#1fff85' }}
                  onClick={() => {
                    setFactorId(item.id)
                    getFactorA(item.id)
                  }}
                ><MdKeyboardDoubleArrowRight /></p>
              </CardA>
            ))}

          </div>



        </div>

        <div className="mb-5 mt-1">

          <button
            type="button"
            class="btn btn-danger"
            onClick={() => {
              resetFactor()


              // console.log(resetSearchbox);
            }}
          >ریست</button>
          <button type="button" class="btn btn-info" onClick={() => setFlagC(!flagC)}>همکار</button>

          <button type="button" class="btn btn-warning" onClick={() => setFlagA(!flagA)}>فاکتور/پیش فاکتور</button>

          <button type="button" class="btn btn-dark" onClick={() => setFlagB(!flagB)}>بدون قیمت</button>
        </div>

        <div className="row m-1">
          <div className="centerr systemAs-button-panel">
            <span
              style={{
                backgroundColor: "green",
                width: "50px",
                borderRadius: "15px",
              }}
              disabled
            >
              <ExellToArray />
            </span>
          </div>
        </div>

        <div className="row boxSh">
          <div className="col-12">
            <ExcelProcessor />
            <hr />
          </div>

          <div className="col-12">
            <ExcelProcessorB />
          </div>
          <hr />

          <div className="col-12">
            <ExcelMerger />
          </div>
        </div>
      </div>
    </CmsSistemAssembly.Provider >
  );
}
