import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UsersDebitCredit from './UsersDebitCredit';
import { CmsContext, HomeContext } from '../../../../context/CmsContext';
import { Blocks } from 'react-loader-spinner';
import ListProB from './ListProB';
export default function UsersFinanceTabs() {
    const cmsContext = useContext(CmsContext)

    const homeContext = useContext(HomeContext);

    const [dnaflag, setDnaflag] = useState(false)

    const [tabId, setTabId] = useState('')

    const ffc = (tabName) => {
        setTabId(tabName)
    }

    useEffect(() => {
        cmsContext.setFlagClass(false);
        homeContext.setSideMenueFlag(false)
        setDnaflag(true)
        return () => {
            return () => cmsContext.setFlagClass(true);
        }
    }, []);
    return (
        <div className='container'>
            {dnaflag &&
                <div className='dnaa-div'>
                    <span className='dnaaa'>
                        <Blocks
                            height="300"
                            width="300"
                            color="#4fa94d"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            visible={true}
                        />
                    </span>
                </div>
            }

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
                        <UsersDebitCredit state={true} setloading={setDnaflag} />
                    </Tab>

                    <Tab eventKey="credit" title="بستانکاران" style={{ background: 'inherit' }}>
                        <UsersDebitCredit state={false} setloading={setDnaflag} />
                    </Tab>
                    <Tab eventKey="exell" title="گزارش اکسل" style={{ background: 'inherit' }}>
                        <ListProB state={false} setloading={setDnaflag} />
                    </Tab>


                </Tabs>

            </>


        </div>
    )
}
