import React, { useContext } from 'react'
import './TableMin.css'
import imgSrc from '../../../utils/ImageUser'
import imgSrcB from '../../../utils/ImageProduct'
import { HomeContext } from '../../../context/CmsContext'

export default function TableMin(props) {
  let { themContext } = useContext(HomeContext)


  return (
    <div className={!themContext ? `table  ${props.table} table-hover table-striped tablemin-div ` :
      `table  table-dark table-hover table-striped tablemin-div `
    } >

      <h4 className="boxSh TableMin-h4">{props.title}</h4>

      <thead>
        <tr key="">
          <th >{props.th1}</th>
          <th>{props.th2 && props.th2}</th>
          <th>{props.th3}</th>
        </tr>
      </thead>

      <tbody >
        {props.users.map((item) => (
          <tr key={item.id} >
            <td  > {item.cyUserID}</td>
            <td>
              {" "}
              {props.th3 !== "مبلغ" && props.th2 ? (
                <img
                  className="tablemin-div-img"
                  src={
                    props.th3 == "کاربر" && item.img
                      ? item.img
                      : props.th3 == "محصول" && item.smallImage
                        ? item.smallImage
                        : props.th3 == "کاربر"
                          ? imgSrc
                          : props.th3 == "محصول"
                            ? imgSrcB
                            : ""
                  }
                  alt=""
                />
              ) : (
                item.userName
              )}{" "}
            </td>

            <td>{props.th3 !== "مبلغ" ? item.name : (item.totalAmount / 10).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>


      {/* <table class="table" style={{ tableLayout: 'fixed', width: '600px' }}>
        <tr>
          <th style={{ width: "150px" }}>ستون ۱</th>
          <th style={{ width: "250px" }}>ستون ۲</th>
          <th style={{ width: "200px" }}>ستون ۳</th>
        </tr>
        <tr>
          <td>متن تستی کوتاه</td>
          <td>یه متن طولانی طولانی طولانی...</td>
          <td>...</td>
        </tr>
      </table> */}
    </div>
  );
}
