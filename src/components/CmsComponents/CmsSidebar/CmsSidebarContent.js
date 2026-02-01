import React, { useContext, useEffect, useState } from "react";
import "./CmsSidebar.css";
import { NavLink, Link } from "react-router-dom";
import BuildVirsion from "../../../utils/BuildVirsion";
import mode from "../../../utils/ModsB";
import { HomeContext } from "../../../context/CmsContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
export default function CmsSidebarContent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const homeContext = useContext(HomeContext);

  // console.log(mode.mode2)

  return (
    <>
      <h6 className="cmssidebar-h6">Dashboard</h6>
      <Link className="cmssidebar-div " to={"/p-admin"}
        onClick={() => homeContext.setSideMenueFlag(false)}
      >
        <i
          class="fa-sharp fa-solid fa-house fa-lg"
          style={{ marginLeft: "5px" }}
        ></i>
        <span>خانه</span>
      </Link>

      <hr />
      <h6 className="cmssidebar-h6">Quick menu</h6>

      <NavLink className="cmssidebar-div" to={"users"}>
        <i class="fa-solid fa-users fa-lg" style={{ marginLeft: "5px" }}></i>
        <span> مدیران</span>
      </NavLink>

      <NavLink className="cmssidebar-div" to={"customer"}>
        <i class="fa-solid fa-user-pen fa-lg" style={{ marginLeft: "5px" }}></i>
        <span> کاربران</span>
      </NavLink>

      <NavLink className="cmssidebar-div" to={"Factor"}>
        <i class="fa-solid fa-percent fa-lg" style={{ marginLeft: "5px" }}></i>
        <span> فاکتور  </span>
      </NavLink>



      <NavLink className="cmssidebar-div" to={"finance"}>
        <i class="fa-solid fa-percent fa-lg" style={{ marginLeft: "5px" }}></i>
        <span> امورمالی  </span>
      </NavLink>

      <NavLink className="cmssidebar-div" to={"accounts"}>
        <i class="fa-solid fa-percent fa-lg" style={{ marginLeft: "5px" }}></i>
        <span> اسناد حسابداری  </span>
      </NavLink>

      {/* 
      <NavLink className="cmssidebar-div" to={"coupon"}>
        <i class="fa-solid fa-percent fa-lg" style={{ marginLeft: "5px" }}></i>
        <span> کد تخفیف </span>
      </NavLink> */}

      {/* <NavLink className="cmssidebar-div" to={"menu"}>
        <i
          class="fa-solid fa-calendar-minus fa-lg  "
          style={{ marginLeft: "5px" }}
        ></i>
        <span>منو </span>
      </NavLink> */}
      <NavLink className="cmssidebar-div" to={"category"}>
        <i
          class="fa-solid fa-layer-group fa-lg"
          style={{ marginLeft: "5px" }}
        ></i>
        <span>دسته بندی عمومی </span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"categoryspecialty"}>
        <i
          class="fa-solid fa-layer-group fa-lg"
          style={{ marginLeft: "5px" }}
        ></i>
        <span>دسته بندی تخصصی </span>
      </NavLink>

      {/* <NavLink className="cmssidebar-div" to={"CmsSubject"}>
        <i
          class="fa-solid fa-file-lines fa-lg"
          style={{ marginLeft: "5px" }}
        ></i>
        <span>مطالب </span>{" "}
      </NavLink> */}

      {/* <NavLink className="cmssidebar-div" to={"parameter"}>
        <i class="fa-solid fa-key fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>متغیرها </span>{" "}
      </NavLink> */}
      {/* 
      <NavLink className="cmssidebar-div" to={"skin"}>
        <i class="fa-solid fa-palette fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>قالب ها </span>{" "}
      </NavLink> */}

      <NavLink className="cmssidebar-div" to={"manufacturer"}>
        <i
          class="fa-solid fa-compass-drafting fa-lg"
          style={{ marginLeft: "5px" }}
        ></i>
        <span>شرکت سازنده</span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"product"}>
        <i class="fa-solid fa-store fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>محصولات</span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"allProductInfo"}>
        <i class="fa-solid fa-store fa-lg" style={{ marginLeft: "5px" }}></i>
        <span> همه محصولات</span>{" "}
      </NavLink>

      {/* <NavLink className="cmssidebar-div" to={"order"}>
        <i class="fa-solid fa-store fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>سفارشات </span>{" "}
      </NavLink> */}

      <NavLink className="cmssidebar-div" to={"warranty"}>
        <i class="fa-solid fa-store fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>گارانتی </span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"repairs"}>
        <i class="fa-solid fa-store fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>تعمیرات </span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"assemblypc"}>
        <i class="fa-solid fa-store fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>محاسبه گر سیستم </span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"testpage"}>
        <i class="fa-solid fa-store fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>TEST-PAGE </span>{" "}
      </NavLink>

      <hr />
      <h6 className="cmssidebar-h6">Notifications</h6>

      <NavLink className="cmssidebar-div" to={"useremail"}>
        <i class="fa-solid fa-envelope fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>ایمیل </span>{" "}
      </NavLink>

      {/* <div className='cmssidebar-div'> <i class="fa-solid fa-seedling fa-lg" style={{marginLeft:'5px'}}></i><span>بازخورد</span> </div> */}
      <NavLink className="cmssidebar-div " to={"tickets"}>
        <i class="fa-solid fa-message fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>پیام ها</span>
        <div className="cmssidebar-div cmssidebarrr">
          {homeContext.messageNotification?.length > 0 && (
            <>
              <NotificationsIcon />
              <span className="cmssidebar-span">
                {homeContext.messageNotification?.length}
              </span>
            </>
          )}
        </div>
      </NavLink>

      {/* <div className='cmssidebar-div'><i class="fa-solid fa-message fa-lg" style={{marginLeft:'5px'}}></i><span>پیام ها</span>  </div> */}
      <hr />
      <h6 className="cmssidebar-h6">Staff</h6>
      <div className="cmssidebar-div">
        <i class="fa-solid fa-gear fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>تنظیمات</span>{" "}
      </div>
      <div className="cmssidebar-div">
        {" "}
        <i class="fa-solid fa-toolbox fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>خدمات</span>{" "}
      </div>
      <div className="cmssidebar-div">
        <i
          class="fa-solid fa-circle-info fa-lg"
          style={{ marginLeft: "5px" }}
        ></i>
        <span>درباره </span>{" "}
      </div>
      <NavLink className="cmssidebar-div" to={"/"}>
        <i
          class="fa-solid fa-right-from-bracket fa-lg"
          style={{ marginLeft: "5px" }}
        ></i>{" "}
        <span>خروج </span>{" "}
      </NavLink>
      <hr />
      {/* Time Display at the bottom */}
      {/* <div className="time-display" style={{ textAlign: 'center', marginTop: '20px', fontWeight: 'bold' }}>
        {currentTime.toLocaleTimeString()}
      </div> */}

      <div
        className="date-display"
        style={{ textAlign: "center", fontWeight: "bold", fontSize: "15px" }}
      >
        {currentDate.toLocaleDateString("fa-IR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      <div
        className="unique-code"
        style={{
          textAlign: "center",
          marginTop: "10px",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        V.{BuildVirsion}
      </div>
    </>
  );
}
