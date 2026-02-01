

import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext } from '../../../context/CmsContext';
import Customer from '../../../components/CmsComponents/Customer/Customer';
import Finance from '../../../components/CmsComponents/Finance/Finance';
import Accounts from '../../../components/CmsComponents/Accounts/Accounts';
import BankAccount from '../../../components/CmsComponents/Accounts/BankAccount';


export default function CmsVoucher() {

    const cmsContext = useContext(CmsContext)
    return (
        <div className='container'>
            <>
                <Tabs
                    defaultActiveKey="allAccounts"
                    id="fill-tab-example"
                    className="mb-2"
                // fill
                // onSelect={ffc}
                // onClick={()=>ffc(id)}
                >
                    <Tab eventKey="allAccounts" title="  همه حساب ها " style={{ background: 'inherit' }}>
                        <Accounts />
                    </Tab>



                    {/* <Tab eventKey="newSubject" title=" مطلب جدید " style={{ background: 'inherit' }}>
        </Tab> */}

                </Tabs>

            </>


        </div>
    )
}
