import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersDebitCredit from './UsersDebitCredit';
import { CmsContext, HomeContext } from '../../../../context/CmsContext';
export default function UsersFinanceTabs() {
    const cmsContext = useContext(CmsContext)

    const homeContext = useContext(HomeContext);

            const [tabId, setTabId] = useState('')
    
            const ffc = (tabName) => {
        setTabId(tabName)
    }

        useEffect(() => {
        cmsContext.setFlagClass(false);
        homeContext.setSideMenueFlag(false)
        
            return () => {
                return () => cmsContext.setFlagClass(true);
            }
        }, []);
    return (
        <div className='container'>
            <>
                <Tabs
                    defaultActiveKey=""
                    id="fill-tab-example"
                    className="mb-2"
                // fill
                onSelect={ffc}
                // onClick={()=>ffc(id)}
                >
                    <Tab eventKey="debit" title="بدهکاران" style={{ background: 'inherit' }}>
                        <UsersDebitCredit state={true} />
                    </Tab>

                    <Tab eventKey="credit" title="بستانکاران" style={{ background: 'inherit' }}>
                        <UsersDebitCredit state={false} />
                    </Tab>

      
                </Tabs>

            </>


        </div>
    )
}
