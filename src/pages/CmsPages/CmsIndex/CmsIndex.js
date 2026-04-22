import React, { useContext, useEffect, useState } from "react";
import "./CmsIndex.css";
import CmsHeader from "../../../components/CmsComponents/CmsHeader/CmsHeader";
import CmsSidebar from "../../../components/CmsComponents/CmsSidebar/CmsSidebar";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ScrollTo from "../../../utils/ScrollTo/ScrollTo";
import BuildVirsion from "../../../utils/BuildVirsion";
import CounterTile from "../../../components/CmsComponents/HomeComponents/Countertile/CounterTile";
import CircleChart from "../../../components/CmsComponents/HomeComponents/CircleChart/CircleChart";
import OrderTable from "../../../components/CmsComponents/HomeComponents/OrderTable/OrderTable";
import VerticalChart from "../../../components/CmsComponents/HomeComponents/VerticalChart/VerticalChart";
import mode from "../../../utils/ModsB";
import DateShow from "../../../utils/DateShow";
import DateShow2 from "../../../utils/DateShow2";
import Swal from "sweetalert2";
import Navigat from "../../../utils/Navigat";
import Task from "../../../components/CmsComponents/Task/Task";
import ApiGetX2 from "../../../utils/ApiServicesX/ApiGetX2";
import { Modal } from 'react-bootstrap';
import BaseGrid from "../../../components/Grid/BaseGrid";
import FromToDate from "../../../utils/FromToDate";
import PersianContentCalendar from "../../../utils/PersianContentCalendar";

export default function CmsIndex() {
  const [isValid, setIsValid] = useState(false);
  const [flagResetInput, setFlagResetInput] = useState(false);
  const [flagClass, setFlagClass] = useState(true);
  const [flagPublic, setFlagPublic] = useState(false);
  const [arrayIdParam, setArrayIdParam] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [resetSearchbox, setResetSearchbox] = useState(false);
  const [xtSearchA, setXtSearchA] = useState("");
  const [xtSearchB, setXtSearchB] = useState("");
  const [xtSearchC, setXtSearchC] = useState("");
  const [xtSearchD, setXtSearchD] = useState("");
  const [xtSearchE, setXtSearchE] = useState("");
  const [xtSearchF, setXtSearchF] = useState("");
  const [xtSearchG, setXtSearchG] = useState("");
  const [xtSearchH, setXtSearchH] = useState("");
  const [xtSearchI, setXtSearchI] = useState("");
  const [xtSearchJ, setXtSearchJ] = useState("");
  const [xtSearchk, setXtSearchk] = useState("");
  const [flagError, setFlagError] = useState(false);
  const [isolaEdiImg, setIsolaEdiImg] = useState("");
  const [isolaSave, setIsolaSave] = useState(false);
  const [isolaLocal, setIsplaLocal] = useState("");
  const [proCategoryList, setProCategoryList] = useState([])
  const [listDetail, setListDetail] = useState([])
  const [show, setShow] = useState(false);
  const [from, setFrom] = useState()
  const [to, setTo] = useState()
  const navigatt = useNavigate();
  let { isLogin, sideMenueFlag, setSideMenueFlag } = useContext(HomeContext);

  const [colDefs] = useState([

    { field: "partNumber", headerName: "عنوان", maxWidth: 400 },
    { field: "manufacturer", headerName: "شرکت سازنده", maxWidth: 150 },
    { field: "quantity", headerName: "تعداد فروخته شده", maxWidth: 100 },
    {
      field: "unitPrice", headerName: "قیمت ریال", maxWidth: 150, cellRenderer: (params) => params.value?.toLocaleString()
    },
    {
      field: "totalPrice", headerName: "مبلغ کل فروخته شده ریال", maxWidth: 200, cellRenderer: (params) => params.value?.toLocaleString()
    },
    { field: "orderCount", headerName: "تعداد فاکتور", maxWidth: 150 },

  ])


  useEffect(() => {
    // setToken(JSON.parse(localStorage.getItem("loginToken")));
    setUser(localStorage.getItem("user"));

  }, []);
  // useEffect(()=>{
  //   return()=>setToken('')
  // })

  const getProductReport = () => {
    var url = (from == null && to == null) ? `/api/CyReporter/proCategoryReport2` : `/api/CyReporter/proCategoryReport2?fromDate=${from?.toISOString()}&toDate=${to?.toISOString()}`
    ApiGetX2(url
      , setProCategoryList)
  }

  useEffect(() => {
    getProductReport()
  }, [])

  const location = useLocation();


  return (
    <>
      <CmsContext.Provider
        value={{
          arrayIdParam,
          setArrayIdParam,
          isValid,
          setIsValid,
          flagResetInput,
          setFlagResetInput,
          flagClass,
          setFlagClass,
          flagPublic,
          setFlagPublic,
          token,
          setToken,
          user,
          setUser,
          xtSearchA,
          setXtSearchA,
          xtSearchB,
          setXtSearchB,
          xtSearchC,
          setXtSearchC,
          xtSearchD,
          setXtSearchD,
          xtSearchE,
          setXtSearchE,
          xtSearchF,
          setXtSearchF,
          xtSearchG,
          setXtSearchG,
          xtSearchH, setXtSearchH,

          resetSearchbox,
          setResetSearchbox,
          flagError,
          setFlagError,
          isolaEdiImg,
          setIsolaEdiImg,
          isolaSave,
          setIsolaSave,
          isolaLocal,
          setIsplaLocal,
          xtSearchI, setXtSearchI,
          xtSearchJ, setXtSearchJ,
          xtSearchk, setXtSearchk,

        }}
      >
        <div className="cms-container">
          <CmsHeader />

          <div className="container  app-container">
            <div className="row">
              <div className="col col-1 col-md-1 mt-5 pt-2">
                <CmsSidebar />
              </div>
              <div className="col col-11 col-md-11  pt-2" style={{ marginTop: '48px' }}>
                <div className={flagClass ? "cmsindex-maincontainer-div" : "cmsindex-maincontainer-div-hidden"}>
                  <div className="container">

                    {/* <div className="row">
                      <div className="col-12">

                        <div className="centerr cmsIndex-Date-Div ">
                          <DateShow2 />
                          <PersianContentCalendar />
                          <CounterTile />
                        </div>
                      </div>
                    </div> */}

                    <div className="row  mt-1" style={{ height: "600px" }}>

                      <div className="col-lg-5 cmsindex-countertile boxSh">
                        <Task />
                      </div>

                      <div className="col-lg-7 cmsindex-countertile boxSh centerr">
                        <DateShow2 />
                        <PersianContentCalendar />
                        {/* <OrderTable /> */}
                      </div>
                    </div>

                    <div className="row boxSh">
                      <div className="col-lg-12">
                        <FromToDate from={from} to={to} setFrom={setFrom} setTo={setTo} action={getProductReport} />
                      </div>
                      <div className="col-lg-5">
                        <CircleChart list={proCategoryList} />

                      </div>
                      <div className="col-lg-7">
                        <div className="container">
                          <div className="row ">
                            {proCategoryList?.groupedResult?.length != 0 && proCategoryList?.groupedResult?.map(item => (
                              <span className="col-3 cmsindex-card-span  centercc"
                                onClick={() => {
                                  setListDetail(item)
                                  setShow(true)
                                }}
                              >{item.category}</span>
                            ))}



                            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                              <Modal.Header closeButton>
                              </Modal.Header>
                              <Modal.Body>

                                {listDetail?.length != 0 && <div className="customerDetail-modal" style={{ height: "1000px" }}>
                                  <BaseGrid rowData={listDetail.items} colDefs={colDefs} rtl={true} />



                                </div>}



                              </Modal.Body>
                            </Modal>

                          </div>

                        </div>


                      </div>

                    </div>
                  </div>
                  <div className="row">

                    <div className="col-lg-6">

                      <VerticalChart />
                    </div>
                  </div>

                </div>
                <ScrollTo />
                <div className={!sideMenueFlag ? '' : "Outlet-div"}  >

                  <Outlet />
                </div>

              </div>
            </div>
          </div>
        </div>
      </CmsContext.Provider >
    </>
  );
}
