import React, { useContext, useEffect } from 'react'
import './CmsSidebar.css'
import CmsSidebarContent from './CmsSidebarContent';
import { CmsContext, HomeContext } from '../../../context/CmsContext';


export default function CmsSidebar() {
    let { sideMenueFlag } = useContext(HomeContext)


    return (
        <div className='cmssidebar-container'>
            {!sideMenueFlag && <div className="cmssidebar-maindiv">
                <CmsSidebarContent />
            </div>}


            {/* /////// to control sidemenue on mobileSize */}
            {sideMenueFlag && <div className='sidemenue'>
                <div className="cmssidebar-maindivb">
                    <CmsSidebarContent />
                </div>
            </div>}


        </div>
    )
}
