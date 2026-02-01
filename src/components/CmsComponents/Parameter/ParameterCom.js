import React, { useState, useEffect, useContext } from "react";
import "./ParameterCom.css";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DataTable from "../DataTable/DataTable";
import Swal from "sweetalert2";
import DotLoader from "react-spinners/DotLoader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import {
  EditorState,
  convertToRaw,
  ContentState,
  AtomicBlockUtils,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import TextEditor from "../../Editor/TextEditor";
import Switch from "@mui/material/Switch";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX";
import ApiPutX from "../../../utils/ApiServicesX/ApiPutX";
import alertC from "../../../utils/AlertFunc/AlertC";
import ApiGetX from "../../../utils/ApiServicesX/ApiGetX";
import ApiDeleteX from "../../../utils/ApiServicesX/ApiDeleteX";
// import TextEditorDark from "../../Editor/TextEditorDark";
// import DarkEditor from "../DarkEditor/DarkEditor";
// import DarkEditor from '../DarkEditor/DarkEditor'

export default function ParameterCom() {
  const [keyArray, setKeyArray] = useState([]);
  const keyArrayBRevers = keyArray.slice().reverse();
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [putId, setPutId] = useState("");
  const navigate = useNavigate();
  const cmsContext = useContext(CmsContext);
  const [ckValue, setCkValue] = useState("");
  const [radioBox, setRadioBox] = useState("option1");
  // const headerAuth = `Bearer ${cmsContext.token.token}`;
  const [checked, setChecked] = React.useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const homeContext = useContext(HomeContext);
  const handleChange = (event) => {
    setCkValue("");
    setChecked(event.target.checked);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const registerOptions = {
    key: { required: "key is required" },
    tag: { required: "tag is required" },
    value: { required: "value is required" },
  };
  ///////////////////
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  ////////////////////////////////
  ///////////////////////////////
  const handleEditorChange = (value) => {
    setCkValue(value);
  };

  // const html = "<h4>محتوای خود را وارد کنید...</h4>";
  // const contentBlock = htmlToDraft(html);
  // const contentState = ContentState.createFromBlockArray(
  //   contentBlock.contentBlocks
  // );
  // const [editorState, setEditorState] = useState(
  //   EditorState.createWithContent(contentState)
  // );

  // const onEditorStateChange = (editorState) => {
  //   setEditorState(editorState);
  //   setCkValue(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  // };
  ///////////////////////////////
  const handleError = (errors) => {};

  /////////////////////////////////

  const funcC = () => {
    alertC("متغییر با موفقیت ویرایش شد", function funcD() {
      reset(setValue(""));
      setFlagUpdate(false);
      getKeyItem();
    });
  };

  const funcA = () => {
    alertC("متغیر با موفقیت اضافه شد", function funcB() {
      reset(setValue(""));
      setCkValue("");
      getKeyItem();
    });
    reset(setValue(""));
    setCkValue("");
    // setEditorState(EditorState.createWithContent(contentState)),
    getKeyItem();
  };
  const handleRegistration = (data) => {
    if (!flagUpdate) {
      let obj = {
        id: 0,
        key: data.key,
        tag: data.tag,
        value: ckValue,
      };
      ApiPostX("/api/CyKeyDatas", obj, funcA);
    } else if (flagUpdate) {
      let obj = {
        id: putId,
        key: data.update.key,
        tag: data.update.tag,
        value: ckValue,
      };
      ApiPutX("/api/CyKeyDatas", putId, obj, funcC);
    }
  };
  /////////////////////////////////

  const getKeyItem = () => {
    ApiGetX("/api/CyKeyDatas", setKeyArray, navigate);
  };
  //////////////////////
  const funcF = () => {
    alertC("حذف انجام شد!", function () {
      window.scrollTo(0, 0);
      getKeyItem();
      reset(setValue(""));
    });
  };
  const deleteHandler = (id) => {
    ApiDeleteX("/api/CyKeyDatas", id, funcF);
  };
  /////////////////////
  const editHandler = (...data) => {
    let html = data[3];
    let contentBlock = htmlToDraft(html);
    let contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    // setEditorState(EditorState.createWithContent(contentState));
    setPutId(data[0]);
    setFlagUpdate(true);
    setCkValue(data[3]);
    setValue("update", { key: data[1], tag: data[2] });
  };
  /////////////////
  const resetUpdatField = () => {
    const html = "<h4>محتوای خود را وارد کنید...</h4>";
    const contentBlock = htmlToDraft(html);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    setFlagUpdate(false);
    reset(setValue(""));
    setCkValue("");
    // setEditorState(EditorState.createWithContent(contentState));
  };
  //////////////////
  useEffect(() => {
    cmsContext.setFlagClass(false);
    getKeyItem();

    return () => cmsContext.setFlagClass(true);
  }, []);

  const changeSwich = (e) => {
    setCkValue(e.target.value);
  };

  useEffect(() => {
    setIsDarkMode(homeContext.themContext);
  }, [homeContext.themContext]);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-5 parametercom-col3">
            <form
              action=""
              onSubmit={handleSubmit(handleRegistration, handleError)}
            >
              <div className="login-label-float">
                <input
                  name="key"
                  type="text"
                  placeholder=""
                  className={errors.key ? "formerror" : ""}
                  {...register(
                    !flagUpdate ? "key" : "update.key",
                    registerOptions.key
                  )}
                />
                <label> کلیدواژه </label>
              </div>

              <div className="login-label-float">
                <input
                  name="tag"
                  type="text"
                  placeholder=""
                  className={errors.tag ? "formerror" : ""}
                  {...register(
                    !flagUpdate ? "tag" : "update.tag",
                    registerOptions.tag
                  )}
                />
                <label> عنوان</label>
              </div>

              <div className=" parametercom-editor-div">
                {/* <label>محتوا</label> */}
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />{" "}
                <span
                  className={
                    !checked
                      ? "parametercom-switch-span"
                      : "parametercom-switch-span-editor"
                  }
                >
                  Text Editor
                </span>
                {/* <form>
              <input type="radio" id="option1" name="group1" value="Option1" 
              onChange={(e)=>changeRadio(e)}/>
<label for="option1"> Text Editor</label>

<input type="radio" id="option2" name="group1" value="Option2"
 onChange={(e)=>changeRadio(e)}
/>
<label for="option2">Text</label>


                </form> */}
                {
                  !checked ? (
                    <div className="login-label-float parametercom-text-content">
                      <input
                        onChange={(e) => changeSwich(e)}
                        value={ckValue}
                        type="text"
                        placeholder=""
                      />
                      <label> محتوا</label>
                    </div>
                  ) : (
                    <TextEditor
                      isDark={isDarkMode}
                      value={ckValue}
                      onChange={handleEditorChange}
                      height="300px"
                    />
                  )

                  //   homeContext.themContext ? <TextEditor value={ckValue} onChange={handleEditorChange}/>
                  // :
                  // !homeContext.themContext ? <TextEditorDark value={ckValue} onChange={handleEditorChange}/>
                  //  :
                  // ''
                }
                {/* <Editor
                  toolbar={{
                    fontFamily: {
                      options: [
                        "Arial",
                        "Georgia",
                        "Impact",
                        "Tahoma",
                        "Times New Roman",
                        "Verdana",
                        "Yekan",
                      ],
                      className: undefined,
                      component: undefined,
                      dropdownClassName: undefined,
                    },
                  }}
                  editorState={editorState}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  onEditorStateChange={onEditorStateChange}

                  //   handleDroppedFiles={handleDroppedFiles}
                  //   blockRendererFn={blockRendererFn}
                /> */}
              </div>

              {flagUpdate && (
                <div className="parametercom-resticon">
                  <i
                    className="fa-solid fa-rotate-left fa-2xl"
                    style={{ color: " #74C0FC" }}
                    onClick={resetUpdatField}
                  ></i>
                </div>
              )}

              <Button
                className="parametercom-regbutton"
                type="submit"
                variant="contained"
                color="info"
                endIcon={<SendIcon />}
              >
                {!flagUpdate ? <span> افزودن </span> : <span> ویرایش </span>}
              </Button>
            </form>
          </div>

          <div className="col-12 col-sm-7 parametercom-col9">
            {keyArray.length == 0 ? (
              <div className="parametercom-colsm9-div">
                <DotLoader
                  color="#0d6efd"
                  loading
                  size={150}
                  speedMultiplier={1}
                />
              </div>
            ) : (
              <DataTable title={"لیست متغیرها :"}>
                <table
                  className={
                    !homeContext.themContext
                      ? "table table-striped  parametercom-table"
                      : "table table-striped table-dark parametercom-table"
                  }
                >
                  <thead>
                    <tr>
                      <th>شماره</th>
                      <th>کلیدواژه </th>
                      <th>عنوان </th>
                      <th>محتوا</th>
                      <th>شناسه</th>
                      <th>ویرایش/حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keyArrayBRevers.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.key}</td>
                        <td>{item.tag}</td>
                        <td
                          dangerouslySetInnerHTML={{ __html: item.value }}
                        ></td>
                        {/* <td >{item.value}</td> */}

                        <td>{item.id}</td>
                        <td>
                          <button
                            className="btn btn-info parametercom-editbut"
                            onClick={() => {
                              editHandler(
                                item.id,
                                item.key,
                                item.tag,
                                item.value
                              );
                              window.scrollTo(0, 0);
                            }}
                          >
                            ویرایش
                          </button>
                          <button
                            className="btn btn-danger parametercom-deletbut"
                            onClick={() => {
                              deleteHandler(item.id);
                            }}
                          >
                            حذف
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </DataTable>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
