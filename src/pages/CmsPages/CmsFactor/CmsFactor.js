import React, { useContext, useEffect, useState } from 'react'
import './CmsFactor.css'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { CmsContext, FactorContext } from '../../../context/CmsContext';
import User from '../../../components/CmsComponents/User/User';
import Factor from '../../../components/CmsComponents/Factor/Factor';
import FactorB from '../../../components/CmsComponents/Factor/FactorB';
import FactorComponent from '../../../components/CmsComponents/Factor/FactorComponent';
import PishFactor from '../../../components/CmsComponents/Factor/PishFactor';


export default function CmsFactor() {
    const [xtorderId, setXtOrderId] = useState(null)
    const [xtFactorNum, setXtFactorNum] = useState(null)
    const [xtOrderDetai, setXtOrderDetai] = useState([])
    const [formRerender, setFormRerender] = useState(true)
    const [flagShowFactor, setFlagShowFactor] = useState(false)
    const [userDateil, setUserDateil] = useState([])
    const [tabId, setTabId] = useState('frosh')

    const ffc = (tabName) => {
        setTabId(tabName)
    }

    return (
        <FactorContext.Provider value={{ xtorderId, setXtOrderId, xtOrderDetai, setXtOrderDetai, flagShowFactor, setFlagShowFactor, formRerender, setFormRerender, xtFactorNum, setXtFactorNum, userDateil, setUserDateil }}>

            <div className='container CmsNUser-container'>
                <>
                    <Tabs
                        defaultActiveKey="frosh"
                        id="fill-tab-example"
                        className="mb-2"
                        // fill
                        onSelect={ffc}
                    >
                        <Tab eventKey="frosh" title=" فاکتور فروش" style={{ background: 'inherit' }} >
                            {tabId == "frosh" && <Factor sarBarg="فاکتور فروش" orderMode={1} />}
                        </Tab>


                        <Tab eventKey="kharid" title=" فاکتور خرید" style={{ background: 'inherit' }}>
                            {tabId == "kharid" && <FactorB sarBarg="فاکتورخرید" orderMode={2} />}
                        </Tab>

                        <Tab eventKey="backKharid" title=" برگشت از خرید" style={{ background: 'inherit' }}>
                            {tabId == "backKharid" && <Factor sarBarg="فاکتور برگشت  از خرید" orderMode={4} />}

                        </Tab>


                        <Tab eventKey="backFrosh" title=" برگشت از فروش" style={{ background: 'inherit' }}>
                            {tabId == "backFrosh" && <FactorB sarBarg="فاکتور برگشت از فروش" orderMode={3} />}
                        </Tab>



                        <Tab eventKey="factorEdit" title=" ویرایش فاکتور" style={{ background: 'inherit' }}>
                            {tabId == "factorEdit" && <FactorComponent />}

                        </Tab>

                        <Tab eventKey="pishFactor" title="پیش فاکتور" style={{ background: 'inherit' }}>
                            {tabId == "pishFactor" && <PishFactor sarBarg="پیش فاکتور" orderMode={5} />}

                        </Tab>

                    </Tabs>

                </>


            </div>

        </FactorContext.Provider>

    )
}
