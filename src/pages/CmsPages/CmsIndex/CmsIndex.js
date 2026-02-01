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

  const navigatt = useNavigate();
  let { isLogin, sideMenueFlag, setSideMenueFlag } = useContext(HomeContext);
  useEffect(() => {
    // setToken(JSON.parse(localStorage.getItem("loginToken")));
    setUser(localStorage.getItem("user"));

  }, []);
  // useEffect(()=>{
  //   return()=>setToken('')
  // })

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
              <div className="col col-11 col-md-11 mt-5 pt-2">
                <div className={flagClass ? "cmsindex-maincontainer-div" : "cmsindex-maincontainer-div-hidden"}>
                  <div className="container">

                    <div className="row">
                      <div className="col-12">

                        <div className="centerr cmsIndex-Date-Div ">
                          <DateShow2 />
                          <CounterTile />
                        </div>
                      </div>
                    </div>

                    <div className="row  mt-1">

                      <div className="col-lg-5 cmsindex-countertile boxSh">
                        <Task />
                      </div>

                      <div className="col-lg-7 cmsindex-countertile boxSh">
                        <OrderTable />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6">
                        <CircleChart />

                      </div>

                      <div className="col-lg-6">

                        <VerticalChart />
                      </div>
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
