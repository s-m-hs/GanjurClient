import React, { useState, useEffect, useContext } from "react";
import "./Category.css";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DataTable from "../DataTable/DataTable";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { useForm } from "react-hook-form";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import apiUrl from "../../../utils/ApiConfig";
import fileUploadHandler from "../../../utils/Functions";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX";
import alertC from "../../../utils/AlertFunc/AlertC";
import ApiPutX from "../../../utils/ApiServicesX/ApiPutX";
import ApiDeleteX from "../../../utils/ApiServicesX/ApiDeleteX";
import ApiGetX from "../../../utils/ApiServicesX/ApiGetX";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function ItemMenuB() {
  const [flag, setFlag] = useState(false);
  const [flagReg, setFlagReg] = useState(false);
  const [itemArrayB, setItemArrayB] = useState([]);
  const itemArrayBRevers = itemArrayB.slice().reverse();
  const [rootIdA, setRootIdA] = useState(null);
  const [rootTitle, setRootTitle] = useState(null);
  const [idParam, setIdParam] = useState("");
  const [itemChildArray, setItemChildArray] = useState({});
  const [flagx, setFlagx] = useState(false);
  const [putId, setPutId] = useState("");
  const [file, setFile] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [flagUpdate, setFlagUpdate] = useState(false);
  const param = useParams();
  const cmsContext = useContext(CmsContext);
  const navigate = useNavigate();
  // const headerAuth = `Bearer ${cmsContext.token.token}`;
  const homeContext = useContext(HomeContext);
  const [flagImageIn, setFlagImageIn] = useState(false);

  ////////////////////////////
  const handleClose = () => {
    setFlagReg(false);
    reset(setValue(""));
  };
  const handleShow = () => {
    setFlagReg(true);
  };
  /////////////////////////

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
    }
  }, [file]);

  /////////////////////////////////
  const handleError = (errors) => {};

  const registerOptions = {
    ItemCategoryTitle: { required: "Name is required" },
    itemOrderValue: { required: "nameCode is required" },
    productCount: { required: "productCount is required" },
    itemImageUrl: { required: "" },
    itemCode: { required: "itemCode is required" },
  };

  /////////////////////////////////
  const funcB = () => {
    alertC("ویرایش با موفقیت انجام شد", function () {
      reset(setValue(""));
      registerGetItem();
      setImgUrl("");
      setFile("");
      handleClose();
    });
  };

  const funcA = () => {
    alertC("دسته بندی با موفقیت اضافه شد", function () {
      reset(setValue(""));
      registerGetItem();
      setImgUrl("");
      setFile("");
    });
  };

  const handleRegistration = (data) => {
    if (!flagReg) {
      let obj = {
        id: 0,
        code: data.itemCode,
        text: data.ItemCategoryTitle,
        orderValue: data.itemOrderValue ? data.itemOrderValue : 1,
        imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
        productCount: data.productCount ? data.productCount : 1,
        rootId: rootIdA,
      };
      ApiPostX("/api/CyCategories", obj, funcA);
    } else if (flagReg) {
      let obj = {
        id: putId,
        code: data.update.edititemCode,
        text: data.update.editname,
        orderValue: data.update.editorderValue,
        imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
        productCount: data.update.editproductCount,
        rootId: rootIdA,
      };
      ApiPutX("/api/CyCategories", putId, obj, funcB);
    }
  };
  const resetUpdatField = () => {
    setFlagReg(false);
    setImgUrl("");
    setFile("");
    reset(setValue(""));
  };
  const ghg = (id, title) => {
    setIdParam(id);
    setRootIdA(id);
    setRootTitle(title);
    setFlag((prev) => !prev);
    setFlagReg(false);
    reset(setValue(""));
  };
  const ghg2 = (id) => {
    if (itemChildArray.item.rootId == null) {
      setFlagx(false);
    }
    setIdParam(id);
    setRootIdA(id);
    setFlag((prev) => !prev);
    setFlagReg(false);
    reset(setValue(""));
  };

  /////////////////////////  api Method===>
  const getItemChildren = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: idParam,
      str: "string",
    };
    async function myAppGetIChild() {
      const res = await fetch(
        `${apiUrl}/api/CyCategories/GetItemWChildAndRoot`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result.item) {
            setItemChildArray(result);
            return setFlagx(true);
          }
        })
        .catch((error) => navigate("/errorpage"));
    }
    myAppGetIChild();
  };
  ///////////////////////////
  const funcC = () => {
    alertC("حذف انجام شد!", function () {
      registerGetItem();
      setImgUrl("");
      setFile("");
      window.scrollTo(0, 0);
      setFlagReg(false);
      reset(setValue(""));
    });
  };

  const deletHandler = (id) => {
    ApiDeleteX("/api/CyCategories", id, funcC);
  };
  ////////////////////////
  const editHandler = (id, code, text, orderValue, imageUrl, productCount) => {
    setValue("update", {
      editname: text,
      editorderValue: orderValue,
      editproductCount: productCount,
      edititemCode: code,
    });
    setPutId(id);
    handleShow();
    setImgUrl(imageUrl);
  };

  //////////////////////////
  const registerGetItem = () => {
    ApiGetX("/api/CyCategories", setItemArrayB, navigate);
  };

  /////////////////////////////
  useEffect(() => {
    registerGetItem();
    getItemChildren();
  }, [flag, idParam, rootIdA]);

  return (
    <>
      <div className="container">
        <div className="row row-cols-4 category-select-row">
          <Button
            className="categor-select-row-link"
            variant="outlined"
            onClick={() => ghg(null)}
            style={{ margin: "8px" }}
          >
            دسته بندی اصلی
          </Button>
          {rootIdA && flagx && (
            <Button
              className="categor-select-row-but"
              variant="outlined"
              onClick={() => ghg2(itemChildArray.item.rootId)}
              style={{ margin: "8px" }}
            >
              {rootTitle}{" "}
            </Button>
          )}
        </div>
        <div className="row mt-3">
          <div className="col-12 col-sm-3 category-col3">
            <>
              <form
                action=""
                onSubmit={handleSubmit(handleRegistration, handleError)}
              >
                <div className="login-label-float">
                  <input
                    name="ItemCategoryTitle"
                    type="text"
                    placeholder=""
                    className={errors.ItemCategoryTitle ? "formerror" : ""}
                    {...register(
                      !flagReg ? "ItemCategoryTitle" : "update.editname",
                      registerOptions.ItemCategoryTitle
                    )}
                  />
                  <label> عنوان دسته بندی</label>
                </div>

                <div className="login-label-float">
                  <input
                    name="itemCode"
                    type="text"
                    placeholder=""
                    className={errors.itemCode ? "formerror" : ""}
                    {...register(
                      !flagReg ? "itemCode" : "update.edititemCode",
                      registerOptions.itemCode
                    )}
                  />
                  <label>کد</label>
                </div>

                <div className="login-label-float">
                  <input
                    name="itemOrderValue"
                    type="text"
                    placeholder=""
                    className={errors.itemOrderValue ? "formerror" : ""}
                    {...register(
                      !flagReg ? "itemOrderValue" : "update.editorderValue"
                      // registerOptions.itemOrderValue
                    )}
                  />
                  <label>اولویت نمایش</label>
                </div>

                <div className="login-label-float">
                  <input
                    name="productCount"
                    type="text"
                    placeholder=""
                    className={errors.productCount ? "formerror" : ""}
                    {...register(
                      !flagReg ? "productCount" : "update.editproductCount"
                      // registerOptions.productCount
                    )}
                  />
                  <label>تعدادنمایش</label>
                </div>

                <div className="login-label-float">
                  <input type="text" onChange={fileChange2} value={imgUrl} />
                  <label>تصویر </label>
                  <div className="category-uploade-div">
                    <span>
                      <UploadFileIcon />
                    </span>

                    <input
                      type="file"
                      placeholder="عکس کوچک"
                      className="category-img-input"
                      onChange={fileChange}
                    />
                  </div>

                  <span>
                    <img
                      className="category-img-image"
                      src={!flagUpdate ? `${apiUrl}/${imgUrl}` : imgUrl}
                      alt=""
                    />{" "}
                  </span>
                  <img
                    className="category-img-image"
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

          <div className="col-12 col-sm-9  category-col-sm-9">
            {itemArrayB.length == 0 ? (
              <div className="category-col-sm-9-div">
                <DotLoader
                  color="#0d6efd"
                  loading
                  size={150}
                  speedMultiplier={1}
                />
              </div>
            ) : (
              <DataTable
                title={
                  flagx
                    ? `دسته بندی :  :${itemChildArray.item.text}`
                    : `دسته بندی عمومی:`
                }
              >
                <table
                  className={
                    !homeContext.themContext
                      ? "table table-striped category-table"
                      : "table table-striped table-dark category-table"
                  }
                >
                  <thead>
                    <tr>
                      <th>شماره</th>
                      <th>نام دسته بندی </th>
                      <th>کد</th>
                      <th>اولویت</th>
                      <th>تعدادنمایش </th>
                      <th>زیرگروه</th>
                      <th>شناسه</th>
                      <th> تصویر</th>
                      <th> زیرگروه/ویرایش/حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemArrayBRevers &&
                      itemArrayBRevers
                        .filter((item) => {
                          return (
                            item.rootId == rootIdA && item.cyMenuId == param.id
                          );
                        })
                        .map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td> {item.text}</td>
                            <td>{item.code}</td>
                            <td>{item.orderValue}</td>
                            <td>{item.productCount}</td>
                            <td>{item.rootId}</td>
                            <td>{item.id}</td>
                            <td>
                              {item.imageUrl ? (
                                <img src={item.imageUrl} alt="img" />
                              ) : (
                                <img
                                  src="../../../../images/40166.png"
                                  alt=""
                                  style={{ width: "45px" }}
                                />
                              )}
                            </td>
                            <td>
                              <button
                                className="btn btn-primary category-editbut"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  ghg(item.id, item.text);
                                }}
                              >
                                زیرگروه{" "}
                              </button>
                              <button
                                className="btn btn-info category-editbut"
                                onClick={() => {
                                  window.scrollTo(0, 0);

                                  editHandler(
                                    item.id,
                                    item.code,
                                    item.text,
                                    item.orderValue,
                                    item.imageUrl,
                                    item.productCount
                                  );
                                }}
                              >
                                ویرایش
                              </button>
                              <button
                                className="btn btn-danger category-deletbut"
                                onClick={() => {
                                  deletHandler(item.id);
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
