import React, { useContext, useEffect, useState } from 'react'
import './CmsNUser.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import User from '../../../components/CmsComponents/User/User';


export default function CmsNUser() {

  const [flagResetInput, setFlagResetInput] = useState(false)
  const [tabId, setTabId] = useState('')
  const [flagUpdate, setFlagUpdate] = useState(false)
  const [UpdatId, setUpdatId] = useState('')
  const cmsContext = useContext(CmsContext)
  return (
    <div className='container CmsNUser-container'>
      <>
        <Tabs
          defaultActiveKey="newuser"
          id="fill-tab-example"
          className="mb-2"
        // fill
        // onSelect={ffc}
        // onClick={()=>ffc(id)}
        >
          <Tab eventKey="newuser" title=" مدیر جدید" style={{ background: 'inherit' }}>
            <User />
          </Tab>

          {/* <Tab eventKey="newSubject" title=" مطلب جدید " style={{ background: 'inherit' }}>
        </Tab> */}

        </Tabs>

      </>


    </div>
  )
}
