import React, { useContext, useEffect, useState } from "react";
import "./CmsSidebar.css";
import { NavLink, Link } from "react-router-dom";
import BuildVirsion from "../../../utils/BuildVirsion";
import mode from "../../../utils/ModsB";
import { HomeContext } from "../../../context/CmsContext";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { File, Headphones, Mouse, Percent, SealPercent, User, Users } from "@phosphor-icons/react";
import { CategoryOutlined, CategoryRounded, HeadphonesSharp, PercentOutlined, PercentSharp, RoomServiceTwoTone } from "@mui/icons-material";
import { RiCalculatorFill, RiCustomerService2Fill, RiMenu5Line, RiMenuUnfold4Fill, RiServiceFill } from "react-icons/ri";
import { MdHomeRepairService, MdMenu, MdOutlineRoomService, MdOutlineSupervisorAccount, MdShoppingBasket, MdShopTwo } from "react-icons/md";
import { GiAutoRepair, GiBrandyBottle, GiExitDoor } from "react-icons/gi";
import { IoLogoCss3, IoLogoWindows, IoLogoXbox, IoMdCalculator } from "react-icons/io";
import { Keyboard } from "@phosphor-icons/react/dist/ssr";
import { FaCalculator, FaServicestack } from "react-icons/fa6";
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
        <Users size={18} />
        <span> مدیران</span>
      </NavLink>

      <NavLink className="cmssidebar-div" to={"customer"}>
        <User size={18} />
        <span> کاربران</span>
      </NavLink>

      <NavLink className="cmssidebar-div" to={"Factor"}>
        <Percent size={18} />
        <span> فاکتور  </span>
      </NavLink>



      <NavLink className="cmssidebar-div" to={"finance"}>
        < FaCalculator size={18} />
        <span> امورمالی  </span>
      </NavLink>

      <NavLink className="cmssidebar-div" to={"accounts"}>
        <File size={18} />
        <span>حساب کاربری </span>
      </NavLink>
      <NavLink className="cmssidebar-div" to={"category"}>
        <MdMenu size={18} />
        <span>دسته عمومی </span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"categoryspecialty"}>
        <RiMenu5Line size={18} />
        <span>دسته تخصصی </span>
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
        <IoLogoXbox size={18} />
        <span>شرکت سازنده</span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div " to={"product"}>
        <Headphones size={18} />
        <span>محصولات</span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"allProductInfo"}>
        <Keyboard size={18} />
        <span> همه محصولات</span>{" "}
      </NavLink>

      {/* <NavLink className="cmssidebar-div" to={"order"}>
        <i class="fa-solid fa-store fa-lg" style={{ marginLeft: "5px" }}></i>
        <span>سفارشات </span>{" "}
      </NavLink> */}



      <NavLink className="cmssidebar-div" to={"repairs"}>
        <MdHomeRepairService size={18} />
        <span>خدمات </span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"assemblypc"}>
        <IoMdCalculator size={18} />
        <span>محاسبه گر  </span>{" "}
      </NavLink>

      <NavLink className="cmssidebar-div" to={"testpage"}>
        <i class="fa-solid fa-store fa-lg" ></i>
        <span>TEST-PAGE </span>{" "}
      </NavLink>

      <hr />
      {/* 
      <NavLink className="cmssidebar-div " to={"tickets"}>
        <i class="fa-solid fa-message fa-lg"></i>
        <span>پیام ها</span>

      </NavLink> */}

      <NavLink className="cmssidebar-div" to={"/"}>
        <GiExitDoor size={18} />
        <span>خروج </span>{" "}
      </NavLink>
      <hr />

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
