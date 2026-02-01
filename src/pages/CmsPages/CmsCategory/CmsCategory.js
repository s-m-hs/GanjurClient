import React, { useContext, useEffect, useState } from 'react'
import './CmsCategory.css'
import Category from '../../../components/CmsComponents/Category/Category';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext, HomeContext } from '../../../context/CmsContext';
import { MainMenuContext } from '../../../context/CmsMaimMenuContext';

export default function CmsMenu() {
  const [flagResetInput, setFlagResetInput] = useState(false)
  const [tabId, setTabId] = useState('')

  const cmsContext = useContext(CmsContext)
  const homeContext = useContext(HomeContext)


  useEffect(() => {
    cmsContext.setFlagClass(false)
    homeContext.setSideMenueFlag(false)
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

              <Category />
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
