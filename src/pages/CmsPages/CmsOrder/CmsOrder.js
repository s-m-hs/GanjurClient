import React, { useContext, useEffect, useState } from "react";
import "./CmsOrder.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { CmsContext } from "../../../context/CmsContext";
import Order from "../../../components/CmsComponents/Order/Order";
import PCBOrder from "../../../components/CmsComponents/PCBOrder/PCBOrder";
import InspectionOrders from "../../../components/CmsComponents/InspectionOrders/InspectionOrders";
import BOM from "../../../components/CmsComponents/BOM/Bom";

export default function CmsOrder() {
  const [tabId, setTabId] = useState("");
  const cmsContext = useContext(CmsContext);

  useEffect(() => {
    cmsContext.setFlagClass(false);
    return () => cmsContext.setFlagClass(true);
  }, []);
  useEffect(() => { }, []);
  const ffc = (tabName) => {
    cmsContext.setFlagResetInput(true);
    setTabId(tabName);
  };
  return (
    <div className="container">
      <>
        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className="mb-2"
        // fill
        // onClick={()=>ffc(id)}
        >
          <Tab
            eventKey="home"
            title="سفارشات"
            style={{ background: "inherit" }}
          >
            <Order />
          </Tab>

          {/* <Tab eventKey="longer-tab-A" title="  BOM" style={{ background: 'inherit' }}>
          <BOM />
        </Tab>

        <Tab eventKey="longer-tab-B" title=" سفارشات PCB" style={{ background: 'inherit' }}>
          <PCBOrder />
        </Tab>
        
        <Tab eventKey="longer-tab-C" title=" اصالت کالا " style={{ background: 'inherit' }}>
          <InspectionOrders />
        </Tab> */}
        </Tabs>
      </>
    </div>
  );
}
