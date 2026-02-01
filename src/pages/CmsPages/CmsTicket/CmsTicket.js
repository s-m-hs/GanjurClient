import React, { useContext, useEffect, useState } from 'react'
import './CmsTicket.css'
import ParameterCom from '../../../components/CmsComponents/Parameter/ParameterCom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import Email from '../../../components/CmsComponents/Email/Email';
import Ticket from '../../../components/CmsComponents/Ticket/Ticket';

export default function CmsTicket() {
  const [tabId, setTabId] = useState('')

  const cmsContext = useContext(CmsContext)


  useEffect(() => {
    cmsContext.setFlagClass(false)
    return () => cmsContext.setFlagClass(true)
  }, [])

  const ffc = (tabName) => {
    cmsContext.setFlagResetInput(true)
    setTabId(tabName)
  }
  return (
    <div className='container'>
      <>

        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className="mb-2"
          // fill
          onSelect={ffc}
        // onClick={()=>ffc(id)}
        >
          <Tab eventKey="home" title=" پیام ها" style={{ background: 'inherit' }}>
            <Ticket />

          </Tab>
          {/* 
        <Tab eventKey="longer-tab" title=" نمایش دسته بندی ها" style={{ background: 'inherit' }}>
          <CircleMenu />
        </Tab> */}

        </Tabs>

      </>


    </div>)
}
