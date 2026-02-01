import React, { useContext, useEffect, useState } from "react";
import "./CounterTile.css";
import CounterSpan from "../../CounterSpan";
import ApiGetX2 from "../../../../utils/ApiServicesX/ApiGetX2";
import { CmsContext } from "../../../../context/CmsContext";

export default function CounterTile() {
  const cmsContext = useContext(CmsContext);
  // const headerAuth = `Bearer ${cmsContext.token.token}`;

  const [getNumber, setGetNumber] = useState([]);
  const tileArray = Array.from({ length: 7 });

  useEffect(() => {
    ApiGetX2("/api/CyLogin/Numerator", setGetNumber);
  }, []);

  return (
    <>
      <div className=" centerr boxSh box-main-div ">
        {getNumber.length == 0 ? (
          <>
            <div class=" box2 centerc">
              <p>مدیران</p>
              {/* <CounterSpan count={35} />   */}
            </div>

            <div class=" box3 centerc">
              <p>مشتریان</p>

              {/* <CounterSpan count={1500} /> */}
            </div>

            <div class=" box4 centerc">
              <p>محصولات</p>

              {/* <CounterSpan count={4500} /> */}
            </div>

            <div class=" box5 centerc">
              <p>مطالب</p>

              {/* <CounterSpan count={350} /> */}
            </div>

            <div class=" box6 centerc">
              <p>تیکتها</p>

              {/* <CounterSpan count={1400} /> */}
            </div>

            <div class=" box7 centerc">
              <p>سفارشات</p>

              {/* <CounterSpan count={3500} /> */}
            </div>

            <div class=" box8 centerc">
              <p> مرسولی</p>

              {/* <CounterSpan count={1500} /> */}
            </div>

            <div class=" box9 centerc">
              <p>خدمات</p>

              {/* <CounterSpan count={1800} /> */}
            </div>
          </>
        ) : (
          getNumber.map((item, index) => (
            <div class={`box${2 + index} centerc`}>
              <p>{item.name}</p>
              <span>{item.numProperty} </span>
              {/* <CounterSpan count={item.numProperty} /> */}
            </div>
          ))
        )}
      </div>
    </>
  );
}
