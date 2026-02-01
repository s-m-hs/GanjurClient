import React, { useContext, useEffect, useState } from 'react'
import './CmsProduct.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import Product from '../../../components/CmsComponents/Product/Product';

export default function CmsProduct() {
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
          <Tab eventKey="home" title="محصولات" style={{ background: 'inherit' }}>

            <Product />
          </Tab>
          {/* 
        <Tab eventKey="longer-tab" title=" نمایش دسته بندی ها" style={{ background: 'inherit' }}>
          <CircleMenu />
        </Tab> */}

        </Tabs>

      </>


    </div>)
}
