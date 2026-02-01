import React, { useContext, useEffect, useState } from 'react'
import './CmsCategoryB.css'
import Category from '../../../components/CmsComponents/Category/Category';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import { MainMenuContext } from '../../../context/CmsMaimMenuContext';
import CategoryB from '../../../components/CmsComponents/CategoryB/CategoryB';

export default function CmsCategoryB() {
  const [flagResetInput, setFlagResetInput] = useState(false)
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
    <MainMenuContext.Provider value={{
      flagResetInput, setFlagResetInput,
      tabId, setTabId
    }}>
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
            <Tab eventKey="home" title="دسته بندی " style={{ background: 'inherit' }}>

              <CategoryB />
            </Tab>
            {/* 
            <Tab eventKey="longer-tab" title=" نمایش دسته بندی ها" style={{ background: 'inherit' }}>
              <CircleMenu />
            </Tab> */}

          </Tabs>

        </>


      </div>
    </MainMenuContext.Provider>




  )
}
