import React, { useContext, useEffect } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import Repairs from '../../../components/CmsComponents/Repairs/Repairs';


export default function CmsRepairs() {
  const cmsContext = useContext(CmsContext)

  useEffect(() => {
    cmsContext.setFlagClass(false)
    return () => cmsContext.setFlagClass(true)
  }, [])

  return (
    <div className='container'>
      <>

        <Tabs
          defaultActiveKey="home"
          id="fill-tab-example"
          className="mb-2"
        // fill
        // onSelect={ffc}
        // onClick={()=>ffc(id)}
        >
          <Tab eventKey="home" title=" تعمیرات" style={{ background: 'inherit' }}>

            <Repairs />
          </Tab>
          {/* 
        <Tab eventKey="longer-tab" title=" نمایش دسته بندی ها" style={{ background: 'inherit' }}>
          <CircleMenu />
        </Tab> */}

        </Tabs>

      </>


    </div>)
}
