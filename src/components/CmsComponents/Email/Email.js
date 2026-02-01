import React, { useContext, useState } from "react";
import apiUrl from "../../../utils/ApiConfig";
import { CmsContext } from "../../../context/CmsContext";
import Typewriter from "typewriter-effect";

export default function Email() {
  const [flag, setFlag] = useState(false);
  const cmsContext = useContext(CmsContext);

  const getEmail = () => {
    async function myAppGet() {
      const res = await fetch(`${apiUrl}/api/CyListMail`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: headerAuth,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            setFlag(true);
            return res.blob();
          }
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "filename.ext"; // Set the desired file name
          document.body.appendChild(a);
          a.click();
          a.remove();
          window.URL.revokeObjectURL(url);
        });
    }
    myAppGet();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col text-center mt-5">
          {" "}
          <button
            className="btn btn-outline-info"
            style={{ width: "20%" }}
            onClick={() => {
              setFlag(false);
              getEmail();
            }}
          >
            دریافت ایمیل ها
          </button>
          <hr />
          {flag && (
            <h1>
              <Typewriter
                options={{
                  strings: ["فایل با موفقیت دانلود شد..."],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
