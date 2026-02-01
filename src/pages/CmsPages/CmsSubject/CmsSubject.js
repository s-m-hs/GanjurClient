import React, { useContext, useEffect, useState } from 'react'
import './CmsSubject.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import { CmsSubContext } from '../../../context/CmsContext';
import NewSubject from '../../../components/CmsComponents/NewSubject/NewSubject';
import ShowSubjects from '../../../components/CmsComponents/ShowSubjects/ShowSubjects';


export default function CmsSubject() {
  const [flagReset, setFlagReset] = useState(true)
  const [tabId, setTabId] = useState('')
  const [flagUpdate, setFlagUpdate] = useState(false)
  const [UpdatId, setUpdatId] = useState('')
  const cmsContext = useContext(CmsContext)

  const flagHandler = () => {
    setFlagUpdate(true)
  }
  //////////////////////////
  useEffect(() => {
    cmsContext.setFlagClass(false)
    cmsContext.setFlagPublic(prev => !prev)
    return () => cmsContext.setFlagClass(true)
  }, [tabId])

  const ffc = (tabName) => {
    cmsContext.setFlagResetInput(true)
    setTabId(tabName)
    if (tabName === "subject") {
      setFlagReset(true)
    } else if (tabName === "newSubject") {
      setFlagReset(false)
    }

  }
  return (
    <CmsSubContext.Provider value={{
      UpdatId, setUpdatId,
      flagUpdate, setFlagUpdate
    }}>
      <div className='container'>
        <>



          <Tabs
            defaultActiveKey="subject"
            id="fill-tab-example"
            className="mb-2"
            // fill
            onSelect={ffc}

          >
            <Tab
              eventKey="subject" title=" مطالب" style={{ background: 'inherit' }}>
              {flagReset && <ShowSubjects showw='showSub' />
              }
            </Tab>

            <Tab
              eventKey="newSubject" title=" مطلب جدید " style={{ background: 'inherit' }}>
              {!flagReset && <NewSubject showw='newSub' />
              }
            </Tab>

          </Tabs>

        </>

      </div>
    </CmsSubContext.Provider>




  )
}
