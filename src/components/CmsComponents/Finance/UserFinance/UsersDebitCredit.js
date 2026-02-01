import React, { useContext, useEffect, useState } from 'react'
import { CmsContext, HomeContext } from '../../../../context/CmsContext';
import BaseGrid from '../../../Grid/BaseGrid';
import ApiGetX2 from '../../../../utils/ApiServicesX/ApiGetX2';

export default function UsersDebitCredit(props) {
const [userSlist,setUserSlist]=useState([])

const CodeStart=8000

const getUserList=()=>{
    ApiGetX2(`/api/Account/getUserAccountByCode?code=${CodeStart}&isDebit=${props.state}`,setUserSlist)
}


        const [colDefs] = useState([
            { field: "userName", headerName: "طرف حساب", },
            { field: "mandeh", headerName: " مانده حساب (ریال)", cellRenderer: (params) =>Math.abs(params.value)?.toLocaleString() },
            { field: "mobile", headerName: "شماره همراه" },
            { field: "phone", headerName: "تلفن ثابت"},
            { field: "userId", headerName: "شناسه کاربر " },
       ])

       useEffect(()=>{
getUserList()
       },[])

console.log(userSlist);

  return (
   
             <div style={{ height: "1000px" }}>
               <BaseGrid rowData={userSlist} colDefs={colDefs} rtl={true} />
             </div>
  )
}
