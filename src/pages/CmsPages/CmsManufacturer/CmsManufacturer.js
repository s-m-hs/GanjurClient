import React, { useContext, useEffect, useState } from 'react'
import './CmsManufacturer.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import Manufacturer from '../../../components/CmsComponents/Manufacturer/Manufacturer';


export default function CmsManufacturer() {
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
          <Tab eventKey="home" title="شرکت سازنده " style={{ background: 'inherit' }}>

            <Manufacturer />
          </Tab>
          {/* 
        <Tab eventKey="longer-tab" title=" نمایش دسته بندی ها" style={{ background: 'inherit' }}>
          <CircleMenu />
        </Tab> */}

        </Tabs>

      </>


    </div>)
}
