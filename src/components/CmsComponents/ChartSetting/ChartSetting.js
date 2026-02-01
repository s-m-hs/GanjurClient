import React, { useContext, useEffect, useState } from 'react'
import './ChartSetting.css'
import DataTable from '../DataTable/DataTable'
import { HomeContext } from '../../../context/CmsContext';
import { useSlate } from 'slate-react';
import ApiGetX2 from '../../../utils/ApiServicesX/ApiGetX2';
import apiUrlB from '../../../utils/ApiConfigB';
import DotLoader from "react-spinners/DotLoader";
import Edite from './Edite';


export default function ChartSeting() {
    const homeContext = useContext(HomeContext);

    const [thavabet, setThavabet] = useState([])
    const [whichId, setWhichId] = useState('')
    const [stattt, setttt] = useState('')

    // const sortList = thavabet?.sort((a, b) => {
    //     return (b.important === true) - (a.important === true)
    // })
    const getThavabet = () => {
        async function myAppGet() {
            const res = await fetch(`${apiUrlB}/api/FixedStars/admin`, {
                method: "GET",
                credentials: "include",

                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    // console.log(res)
                    if (res.ok) {
                        return res.json().then((result) => setThavabet(result));
                    }
                })
                .catch((error) => console.log(error));
        }
        myAppGet();
    }

    useEffect(() => {
        if (!whichId) {
            setThavabet([])
            getThavabet()
        }

    }, [whichId])


    console.log(thavabet)
    return (
        <DataTable title={"لیست ثوابت :"}>
            <table className={!homeContext.themContext ? "table table-striped table-hover  user-table " : "table table-striped table-hover table-dark user-table"}>
                <thead>
                    <tr key="">

                        <th>نام</th>
                        <th>صورت فلکی(EN)</th>
                        <th>صورت فلکی(FA)</th>
                        <th>نام های عربی</th>
                        <th>نام های دیگر</th>
                        <th>طبیعت ثابته</th>
                        <th>طبیعت ثابته 2</th>
                        <th>سعد و نحس</th>
                        <th>موقعیت در صورت فلکی</th>
                        <th>ویرایش</th>
                    </tr>


                </thead>



                <tbody  >
                    {thavabet.length == 0 ?

                        <div className='chartsetting-colsm9-div ' >
                            <DotLoader
                                color="#0d6efd"
                                loading
                                size={150}
                                speedMultiplier={1}
                            />
                        </div> : thavabet?.sort((a, b) => {
                            return (b.important === true) - (a.important === true)
                        }).map((item => (
                            <tr key={item.id} className={item.important ? "table-warning" : "table-info"}>

                                <td>{item.name}</td>


                                <td>{item.constellation
                                }</td>
                                <td>{item.farsiConstellation}</td>

                                <td>
                                    {item.arabicNames}</td>

                                <td>{item.otherNames}
                                </td>
                                <td>{item.nature}
                                </td>
                                <td>{item.nature2}
                                </td>
                                <td>{item.saad_Nahs}
                                </td>
                                <td>{item.placeInConstellation}</td>
                                <td
                                    onClick={() => {
                                        setWhichId(item.id)


                                    }}>
                                    <Edite detail={item} id={item.id} whId={whichId} setWhichId={setWhichId} />
                                </td>
                            </tr>
                        )))}

                </tbody>



            </table>
        </DataTable>
    )
}
