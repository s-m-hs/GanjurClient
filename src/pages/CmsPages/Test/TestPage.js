import React, { useContext, useEffect, useState } from "react";
import TextEditor from "../../../EditorExamole";
import apiUrl from "../../../utils/ApiConfig";
import { CmsContext } from "../../../context/CmsContext";
import "./test.css";
import ImageResizer from "../../../utils/ImageResizer";

export default function TestPage() {
  const cmscontext = useContext(CmsContext);

  const [editorId, setEditorId] = useState("");
  const [ckValue, setCkValue] = useState("");
  const [subject, setSubject] = useState("");

  const handleEditorChange = (value) => {
    setCkValue(value);
  };

  const changeInput = (e) => {
    setEditorId(e.target.value);
  };
  const get = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CySubjects/${editorId}`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmscontext.token.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((result) => {
          console.log(result);
          setSubject(result);
        });
    }
    myApp();
  };

  useEffect(() => {
    cmscontext.setFlagClass(false);
    return () => cmscontext.setFlagClass(true);
  }, []);

  return (
    <div>
      <div className="centerr">
        <input
          style={{ outline: "none" }}
          type="text"
          placeholder="شماره مطلب"
          value={editorId}
          onChange={(e) => changeInput(e)}
        />

        <button
          className="btn btn-info"
          onClick={() => {
            if (editorId) {
              get();
            }
          }}
        >
          برو به مطلب
        </button>
      </div>
      <div
        // className="blog-content table_no "
        dangerouslySetInnerHTML={{ __html: subject.body }}
      ></div>
      {/* <TextEditor height={!flagEditor ? '400px' :  '100vh'  } image={true} value={ckValue} onChange={handleEditorChange} /> */}
    </div>
  );
}
