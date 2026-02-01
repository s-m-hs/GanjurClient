import React, { useState, useEffect, useContext } from "react";
import "./MainMenu.css";
import { Link, useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DataTable from "../DataTable/DataTable";
import Swal from "sweetalert2";
import DotLoader from "react-spinners/DotLoader";
import { useForm } from "react-hook-form";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import apiUrl from "../../../utils/ApiConfig";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX";
import ApiPutX from "../../../utils/ApiServicesX/ApiPutX";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import alertA from "../../../utils/AlertFunc/AlertA";
import alertC from "../../../utils/AlertFunc/AlertC";
import fileUploadHandler from "../../../utils/Functions";
import ApiDeleteX from "../../../utils/ApiServicesX/ApiDeleteX";
import ApiGetX from "../../../utils/ApiServicesX/ApiGetX";

export default function MainMenu() {
  const [mMenuArray, setMMenuArray] = useState([]);
  const [flagReg, setFlagReg] = useState(false);
  const [putId, setPutId] = useState("");
  const [file, setFile] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [flagUpdate, setFlagUpdate] = useState(false);

  const navigate = useNavigate();
  const cmsContext = useContext(CmsContext);
  const homeContext = useContext(HomeContext);
  // const headerAuth = `Bearer ${cmsContext.token.token}`;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const registerOptions = {
    name: { required: "Name is required" },
    nameCode: { required: "nameCode is required" },
    imageUrl: { required: "" },
  };
  ///////////////////upload img function===>
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const fileChange2 = (e) => {
    setFile("");
    setImgUrl(e.target.value);
  };

  //////////////////////////////
  useEffect(() => {
    if (file?.name) {
      fileUploadHandler(file, setImgUrl);

      // fileUploadHandler()
    }
  }, [file]);

  /////////////////////////////////
  const funcB = () => {
    alertC("منو با موفقیت ویرایش شد", function () {
      registerGet();
      setFlagReg(false);
      reset(setValue(""));
      setImgUrl("");
      setFile("");
    });
  };
  const funcA = () => {
    alertA("منو با موفقیت اضافه شد");
    registerGet();
    setImgUrl("");
    setFile("");
    reset({ name: "", nameCode: "" });
  };
  const handleRegistration = (data) => {
    if (!flagReg) {
      let obj = {
        id: 0,
        text: data.name,
        nameCode: data.nameCode,
        imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
      };

      ApiPostX("/api/CyMenus", obj, funcA);
    } else if (flagReg) {
      let obj = {
        id: putId,
        text: data.update.editname,
        nameCode: data.update.editnameCode,
        imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
      };
      ApiPutX("/api/CyMenus", putId, obj, funcB);
    }
  };

  const resetUpdatField = () => {
    setFlagReg(false);
    setImgUrl("");
    setFile("");
    reset(setValue(""));
  };
  const handleError = (errors) => { };

  const handleShow = () => {
    setFlagReg(true);
  };
  /////////////////////////

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  ////////////////////////////
  const funcC = () => {
    setImgUrl("");
    setFile("");
    registerGet();
    setFlagReg(false);

    reset(setValue(""));
  };
  const deletHandler = (id) => {
    ApiDeleteX("/api/CyMenus", id, funcC);
  };
  ////////////////////////////button on table ==>
  const editHandler = (id, text, mcode, url) => {
    setValue("update", {
      editname: text,
      editnameCode: mcode,
      editimageUrl: url,
    });
    setPutId(id);
    handleShow();
    setImgUrl(url);
  };

  //////////////////////////
  const registerGet = () => {
    ApiGetX("/api/CyMenus", setMMenuArray, navigate);
  };
  //////////////////////
  useEffect(() => {
    registerGet();
    homeContext.setSideMenueFlag(false)
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-3 mainmenu-col3">
          <>
            <form
              action=""
              onSubmit={handleSubmit(handleRegistration, handleError)}
            >
              <div className="login-label-float">
                <input
                  name="name"
                  type="text"
                  placeholder=""
                  className={errors.name ? "b" : ""}
                  {...register(
                    !flagReg ? "name" : "update.editname",
                    registerOptions.name
                  )}
                />
                <label>عنوان منو</label>
              </div>

              <div className="login-label-float">
                <input
                  name="nameCode"
                  type="text"
                  placeholder=""
                  className={errors.nameCode ? "b" : ""}
                  {...register(
                    !flagReg ? "nameCode" : "update.editnameCode",
                    registerOptions.nameCode
                  )}
                />
                <label>کد منو</label>
              </div>

              <div className="login-label-float">
                <input type="text" onChange={fileChange2} value={imgUrl} />
                <label>تصویر </label>
                <div className="mainmenu-uploade-div">
                  <span>
                    <UploadFileIcon />
                  </span>
                  <input
                    type="file"
                    placeholder="عکس کوچک"
                    className="mainmenu-img-input"
                    onChange={fileChange}
                  />
                </div>

                <span>
                  <img
                    className="mainmenu-img-image"
                    src={!flagUpdate ? `${apiUrl}/${imgUrl}` : imgUrl}
                    alt=""
                  />{" "}
                </span>
                <img
                  className="mainmenu-img-image"
                  src={!flagUpdate ? imgUrl : `${apiUrl}/${imgUrl}`}
                  alt=""
                />
              </div>

              {flagReg && (
                <div className="mainmenu-resticon">
                  <i
                    class="fa-solid fa-rotate-left fa-2xl"
                    style={{ color: " #74C0FC" }}
                    onClick={resetUpdatField}
                  ></i>
                </div>
              )}
              <Button
                className="mainmenu-regbutton"
                type="submit"
                fullWidth
                variant="contained"
                endIcon={<SendIcon />}
              >
                {!flagReg ? <span> افزودن </span> : <span> ویرایش </span>}
              </Button>
            </form>
          </>
        </div>
        <div className="col-12 col-sm-9 mainmenu-colsm9">
          {mMenuArray.length == 0 ? (
            <div className="mainmenu-colsm9-div">
              <DotLoader
                color="#0d6efd"
                loading
                size={150}
                speedMultiplier={1}
              />
            </div>
          ) : (
            <DataTable title={"لیست منوها :"}>
              <table
                className={
                  !homeContext.themContext
                    ? "table table-striped  mainmenu-table"
                    : "table table-striped table-dark mainmenu-table"
                }
              >
                <thead>
                  <tr>
                    <th className="element-hide">شماره</th>
                    <th>نام منو </th>
                    <th>کد منو</th>
                    <th className="element-hide">شناسه </th>
                    <th>زیر منو/ویرایش/حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {mMenuArray.map((item, index) => (
                    <tr key={item.id}>
                      <td className="element-hide">{index + 1}</td>
                      <td>{item.text} </td>
                      <td>{item.nameCode}</td>
                      {/* <td>{item.imageUrl}</td> */}
                      <td className="element-hide">{item.id}</td>
                      <td>
                        <Link to={`${item.id}`}>
                          <button className="btn btn-primary mainmenu-addbut">
                            زیر منو{" "}
                          </button>
                        </Link>
                        <button
                          className="btn btn-info mainmenu-editbut"
                          onClick={() =>
                            editHandler(
                              item.id,
                              item.text,
                              item.nameCode,
                              item.imageUrl
                            )
                          }
                        >
                          ویرایش
                        </button>
                        <button
                          className="btn btn-danger mainmenu-deletbut"
                          onClick={() => deletHandler(item.id)}
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
      <></>
    </div>
  );
}
