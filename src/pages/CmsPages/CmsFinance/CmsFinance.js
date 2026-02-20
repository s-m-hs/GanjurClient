
import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import Customer from '../../../components/CmsComponents/Customer/Customer';
import Finance from '../../../components/CmsComponents/Finance/Finance';
import BankAccount from '../../../components/CmsComponents/Accounts/BankAccount';
import UsersFinanceTabs from '../../../components/CmsComponents/Finance/UserFinance/UsersFinanceTabs';
import AllFinance from '../../../components/CmsComponents/Finance/AllFinance';
import ActionFainanc from '../../../components/CmsComponents/Finance/ActionFinancs/ActionFainanc';


export default function CmsFinance() {

    const cmsContext = useContext(CmsContext)
        const [tabId, setTabId] = useState('finance')
    
        const ffc = (tabName) => {
        setTabId(tabName)
    }
    return (
        <div className='container'>
            <>
                <Tabs
                    defaultActiveKey="finance"
                    id="fill-tab-example"
                    className="mb-2"
                                            onSelect={ffc}
                >
                    <Tab eventKey="finance" title="دریافت/پرداخت" style={{ background: 'inherit' }}>
                        {tabId == "finance" && <Finance />}
                    </Tab>
                 <Tab eventKey="allfinance" title="اسناد" style={{ background: 'inherit' }}>
                        {tabId == "allfinance" && <AllFinance />}
                    </Tab>
                    <Tab eventKey="BankAccounts" title="بانک ها" style={{ background: 'inherit' }}>
                       {tabId == "BankAccounts" &&  <BankAccount />}
                    </Tab>

                                <Tab eventKey="users" title="اشخاص" style={{ background: 'inherit' }}>
                      {tabId == "users" &&   <UsersFinanceTabs />}
                    </Tab>

                              <Tab eventKey="Action" title="عملکرد مالی" style={{ background: 'inherit' }}>
                      {tabId == "Action" &&   <ActionFainanc />}
                    </Tab>

                </Tabs>

            </>


        </div>
    )
}
