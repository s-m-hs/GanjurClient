import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import Repairs from '../../../components/CmsComponents/Repairs/Repairs';
import RepairsList from '../../../components/CmsComponents/Repairs/RepairsList';


export default function CmsRepairs() {
  const cmsContext = useContext(CmsContext)
    const [tabId, setTabId] = useState('addServic')
    const ffc = (tabName) => {
        setTabId(tabName)
    }
  useEffect(() => {
    cmsContext.setFlagClass(false)
    return () => cmsContext.setFlagClass(true)
  }, [])

  return (
    <div className='container'>
      <>

        <Tabs
          defaultActiveKey="addServic"
          id="fill-tab-example"
          className="mb-2"
        // fill
        onSelect={ffc}
        // onClick={()=>ffc(id)}
        >
          <Tab eventKey="addServic" title=" ثبت رسید" style={{ background: 'inherit' }}>
{tabId=='addServic' && <Repairs /> }
            
          </Tab>
          
        <Tab eventKey="serviceList" title="رسیدها" style={{ background: 'inherit' }}>
          {tabId=='serviceList' && <RepairsList />}

          
        </Tab>

        </Tabs>

      </>


    </div>)
}
