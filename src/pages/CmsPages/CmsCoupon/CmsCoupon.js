import React, { useContext, useEffect, useState } from "react";
import "./CmsCoupon.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { CmsContext } from "../../../context/CmsContext";
import Coupon from "../../../components/CmsComponents/Coupon/Coupon";

export default function CmsCoupon() {
  const [flagResetInput, setFlagResetInput] = useState(false);
  const [tabId, setTabId] = useState("");
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [UpdatId, setUpdatId] = useState("");
  const cmsContext = useContext(CmsContext);
  return (
    <div className="container coupon-container ">
      <>
        <Tabs
          defaultActiveKey="newcustomer"
          id="fill-tab-example"
          className="mb-2"
        // fill
        // onSelect={ffc}
        // onClick={()=>ffc(id)}
        >
          <Tab
            eventKey="newcustomer"
            title=" کد تخفیف جدید"
            style={{ background: "inherit" }}
          >
            <Coupon />
          </Tab>

          {/* <Tab eventKey="newSubject" title=" مطلب جدید " style={{ background: 'inherit' }}>
        </Tab> */}
        </Tabs>
      </>
    </div>
  );
}
