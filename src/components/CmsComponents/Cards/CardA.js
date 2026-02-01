import React from 'react'
import './CardA.css'
import DateFormat from '../../../utils/DateFormat'
export default function CardA({ bColor, textProp, children }) {
    const hardWares = textProp.hardWare
    return (
        <div className='cardA-mainDiv centercc m-1 boxSh'  >
            {children}
            <span>{textProp.IsFactor ? "فاکتور" : "پیش فاکتور"}</span>
            <span>شماره  :{textProp.id}</span>
            <span>تاریخ  :
                <DateFormat dateString={textProp.lastModified} />
            </span>
            <span style={{ fontSize: '15px', fontWeight: '600' }}>نام مشتری :{textProp.custmerName}</span>
            <span>شماره همراه :{textProp.custmerPhone}</span>
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#bda106ff' }}>قیمت تمام شده :{textProp.salePrice}</span>
            <span style={{ fontSize: '15px', fontWeight: '600', color: '#bda106ff' }}>قیمت اعلام شده :{textProp.shopSale}</span>
            -------------------
            <span>{textProp?.hardWare[0]?.category}:{textProp?.hardWare[0]?.name}</span>
            <span>{textProp?.hardWare[1]?.category}:{textProp?.hardWare[1]?.name}</span>
            <span>{textProp?.hardWare[2]?.category}:{textProp?.hardWare[2]?.name}</span>
            <span>{textProp?.hardWare[3]?.category}:{textProp?.hardWare[3]?.name}</span>
            <span>{textProp?.hardWare[4]?.category}:{textProp?.hardWare[4]?.name}</span>
            <span>{textProp?.hardWare[5]?.category}:{textProp?.hardWare[5]?.name}</span>
            <span>{textProp?.hardWare[6]?.category}:{textProp?.hardWare[6]?.name}</span>
            <span>{textProp?.hardWare[7]?.category}:{textProp?.hardWare[7]?.name}</span>
            <span>{textProp?.hardWare[8]?.category}:{textProp?.hardWare[8]?.name}</span>
            <span>{textProp?.hardWare[9]?.category}:{textProp?.hardWare[9]?.name}</span>


        </div>
    )
}
