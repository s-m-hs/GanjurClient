import React, { useState, useEffect, useContext } from "react";
import "./ItemMenuB.css";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DataTable from "../DataTable/DataTable";
import Swal from "sweetalert2";
import { useParams, Link, useNavigate } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader";
import { useForm } from "react-hook-form";
import apiUrl from "../../../utils/ApiConfig";
import fileUploadHandler from "../../../utils/Functions";
import ApiPost from "../../../utils/ApiServices/Configs/ApiPost";
import ApiGet from "../../../utils/ApiServices/Configs/ApiGet";
import ApiPut from "../../../utils/ApiServices/Configs/ApiPut";
import ApiDelete from "../../../utils/ApiServices/Configs/ApiDelete";

export default function ItemMenuB() {
  const [flag, setFlag] = useState(false);
  const [flagReg, setFlagReg] = useState(false);
  const [mMenuArrayB, setMMenuArrayB] = useState([]);
  const [itemArrayB, setItemArrayB] = useState([]);
  const itemArrayBReverse = itemArrayB.slice().reverse();
  const [idSelect, setIdSelect] = useState("");
  const [titleSelectMenuB, setTitleSelectMenuB] = useState("");
  const [rootIdA, setRootIdA] = useState(null);
  const [idParam, setIdParam] = useState("");
  const [itemChildArray, setItemChildArray] = useState({});
  const [flagx, setFlagx] = useState(false);
  const [putId, setPutId] = useState("");
  const [categoryItem, setCategoryItem] = useState([]);
  const [skinItem, setSkinItem] = useState([]);
  const [file, setFile] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [flagUpdate, setFlagUpdate] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const cmsContext = useContext(CmsContext);
  // const headerAuth = `Bearer ${cmsContext.token.token}`;
  const homeContext = useContext(HomeContext);

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
      category: null,
      skin: null,
    },
  });
  const handleError = (errors) => { };

  const registerOptions = {
    ItemMenuTitle: { required: "Name is required" },
    itemOrderValue: { required: "nameCode is required" },
    meta: { required: "" },
    itemImageUrl: { required: "" },
    itemPageUrl: { required: "" },
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
    }
  }, [file]);

  ///////////////////////////////
  const alertS = (title, setF1) =>
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      reset(setValue(""));
      registerGetItem();
      setImgUrl("");
      setFile("");
      setF1();
    });
  const alertB = (callBack) => {
    swalWithBootstrapButtons
      .fire({
        title: "حذف انجام شد!",
        icon: "success",
      })
      .then((result) => {
        setImgUrl("");
        setFile("");
        registerGetItem();
        window.scrollTo(0, 0);
        callBack();
      });
  };
  /////////////////////////////////
  const handleRegistration = (data) => {
    if (!flagReg) {
      let obj = {
        id: 0,
        text: data.ItemMenuTitle,
        orderValue: data.itemOrderValue,
        pageUrl: data.itemPageUrl,
        rootId: rootIdA,
        cyMenuId: idSelect,
        meta: data.meta,
        imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
        cyCategoryId: data.category ? data.category : null,
        cySkinId: data.skin ? data.skin : null,
      };
      ApiPost("/api/CyMenuItems", obj, alertS("آیتم با موفقیت اضافه شد"));
    } else if (flagReg) {
      const editHandlerA = (id) => {
        let obj = {
          id: putId,
          text: data.update.editname,
          orderValue: data.update.editorderValue,
          pageUrl: data.update.editpageUrl,
          rootId: rootIdA,
          cyMenuId: idSelect,
          meta: data.update.editmeta,
          imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
          cyCategoryId: data.update.category ? data.update.category : null,
          cySkinId: data.update.skin ? data.update.skin : null,
        };
        ApiPut(
          "/api/CyMenuItems",
          putId,
          obj,
          alertS("آیتم با موفقیت ویرایش شد", handleClose())
        );
      };
      editHandlerA();
    }
  };
  const resetUpdatField = () => {
    setFlagReg(false);
    setImgUrl("");
    setFile("");
    reset(setValue(""));
  };
  const ghg = (id) => {
    setIdParam(id);
    setRootIdA(id);
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
  };
  /////////////////////////////
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });
  /////////////////////////  api Method===>
  const getItemChildren = () => {
    let obj = {
      gid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      id: idParam,
      str: "string",
    };
    async function myAppGetIChild() {
      const res = await fetch(
        `${apiUrl}/api/CyMenuItems/GetItemWChildAndRoot`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            // Authorization: `Bearer ${cmsContext.token.token}`,
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
  async function myAppGetCategoryItem() {
    ApiGet("/api/CyCategories", setCategoryItem, navigate);
  }
  //////////////////////////
  async function myAppGetSkinItem() {
    ApiGet("/api/CySkins", setSkinItem, navigate);
  }
  //////////////////////////
  const deletHandler = (id) => {
    swalWithBootstrapButtons
      .fire({
        title: "آیا از حذف اطمینان دارید؟",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "بله",
        cancelButtonText: "خیر ",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          ApiDelete("/api/CyMenuItems", id, alertB());
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "حذف انجام نشد",
            icon: "error",
          });
        }
      });
    setFlagReg(false);
    reset(setValue(""));
  };
  ////////////////////////
  const editHandler = (
    id,
    text,
    orderValue,
    imageUrl,
    pageUrl,
    rootId,
    cyMenuId,
    meta,
    cyCategoryId,
    cySkinId
  ) => {
    setValue("update", {
      editname: text,
      editorderValue: orderValue,
      editpageUrl: pageUrl,
      editrootId: rootId,
      editcyMenuId: cyMenuId,
      editmeta: meta,
      category: cyCategoryId,
      skin: cySkinId,
    });
    setImgUrl(imageUrl);
    setPutId(id);
    handleShow();
  };

  //////////////////////
  const registerGetMenu = () => {
    ApiGet("/api/CyMenus", setMMenuArrayB, navigate);
  };
  //////////////////////////
  const registerGetItem = () => {
    ApiGet("/api/CyMenuItems", setItemArrayB, navigate);
  };
  /////////////////////////////
  useEffect(() => {
    registerGetMenu();
    registerGetItem();
    getItemChildren();
    myAppGetCategoryItem();
    myAppGetSkinItem();
  }, [flag, idParam, rootIdA]);

  useEffect(() => {
    setTitleSelectMenuB(param.id);
    setIdSelect(param.id);
  });

  useEffect(() => {
    cmsContext.setFlagClass(false);
    return () => cmsContext.setFlagClass(true);
  }, []);
  /////////////////////////////
  return (
    <>
      <div className="container container-menu">
        <div className="row row-cols-4 itemmenu-select-row">
          {titleSelectMenuB && (
            <Link
              className="itemmenu-select-row-link"
              variant="outlined"
              to="/p-admin/menu"
              style={{ margin: "8px" }}
            >
              منوی اصلی
            </Link>
          )}
          {flagx && (
            <Button
              className="itemmenu-select-row-button"
              variant="outlined"
              onClick={() => ghg2(itemChildArray.item.rootId)}
              style={{ margin: "8px" }}
            >
              {itemChildArray.item.text}{" "}
            </Button>
          )}
        </div>
        <div className="row mt-3">
          <div className="col-12 col-sm-3 itemmenu-col3">
            <>
              <form
                action=""
                onSubmit={handleSubmit(handleRegistration, handleError)}
              >
                <div className="login-label-float">
                  <input
                    name="ItemMenuTitle"
                    type="text"
                    placeholder=""
                    className={errors.ItemMenuTitle ? "formerror" : ""}
                    {...register(
                      !flagReg ? "ItemMenuTitle" : "update.editname",
                      registerOptions.ItemMenuTitle
                    )}
                  />
                  <label>عنوان منو</label>
                </div>

                <div className="login-label-float">
                  <input
                    name="itemOrderValue"
                    type="text"
                    placeholder=""
                    className={errors.itemOrderValue ? "formerror" : ""}
                    {...register(
                      !flagReg ? "itemOrderValue" : "update.editorderValue",
                      registerOptions.itemOrderValue
                    )}
                  />
                  <label>اولویت نمایش</label>
                </div>

                <div className="login-label-float">
                  <input
                    name="meta"
                    type="text"
                    placeholder=""
                    className={errors.meta ? "b" : ""}
                    {...register(
                      !flagReg ? "meta" : "update.editmeta",
                      registerOptions.meta
                    )}
                  />
                  <label>متا </label>
                </div>

                <div className="login-label-float">
                  <input
                    name="itemPageUrl"
                    type="text"
                    placeholder=""
                    className={errors.itemPageUrl ? "formerror" : ""}
                    {...register(
                      !flagReg ? "itemPageUrl" : "update.editpageUrl",
                      registerOptions.itemPageUrl
                    )}
                  />
                  <label>آدرس صفحه</label>
                </div>

                <div className="login-label-float">
                  <input type="text" onChange={fileChange2} value={imgUrl} />
                  <label>تصویر </label>

                  <input
                    type="file"
                    placeholder="عکس کوچک"
                    className="itemmenu-img-input"
                    onChange={fileChange}
                  />

                  <span>
                    <img
                      className="itemmenu-img-image"
                      src={!flagUpdate ? `${apiUrl}/${imgUrl}` : imgUrl}
                      alt=""
                    />{" "}
                  </span>
                  <img
                    className="itemmenu-img-image"
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
                  className="itemmenu-regbutton"
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
          <div className="col-12 col-sm-9 itemmenu-col-sm-9">
            {itemArrayB.length == 0 ? (
              <div className="itemmenu-col-sm-9-div">
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
                    ? `لیست منوی :${itemChildArray.item.text}`
                    : `لیست منوهای اصلی:`
                }
              >
                <div className="itemmenu-table-divv">
                  <table
                    className={
                      !homeContext.themContext
                        ? "table table-striped  itemmenu-table"
                        : "table table-striped table-dark itemmenu-table"
                    }
                  >
                    <thead>
                      <tr>
                        <th className="element-hide">شماره</th>
                        <th>نام منوی </th>
                        <th className="element-hide">اولویت</th>
                        <th>منوی اصلی</th>
                        <th>زیرگروه</th>
                        <th className="element-hide">متا</th>
                        <th className="element-hide">شناسه</th>
                        {/* <th> دسته بندی</th>
                                            <th>قالب </th> */}
                        <th> تصویر</th>
                        <th>زیرمنو/ویرایش/حذف</th>
                      </tr>
                    </thead>

                    <tbody>
                      {itemArrayBReverse &&
                        itemArrayBReverse
                          .filter((item) => {
                            return (
                              item.rootId == rootIdA && item.cyMenuId == param.id
                            );
                          })
                          .map((item, index) => (
                            <tr key={item.id}>
                              <td className="element-hide">{index + 1}</td>
                              <td> {item.text}</td>
                              <td className="element-hide">{item.orderValue}</td>
                              <td>{item.cyMenuId}</td>
                              <td>{item.rootId}</td>
                              <td className="element-hide">{item.meta}</td>
                              <td className="element-hide">{item.id}</td>
                              {/* <td>{(categoryItem.filter(itemF => { return itemF.id == item.cyCategoryId })[0]) &&
                                                    categoryItem.filter(itemF => { return itemF.id == item.cyCategoryId })[0].text}</td>
                                                <td>{(skinItem.filter(itemF => { return itemF.id == item.cySkinId })[0]) &&
                                                    skinItem.filter(itemF => { return itemF.id == item.cySkinId })[0].text
                                                }</td> */}
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
                                  className="btn btn-primary itemmenu-editbut"
                                  onClick={() => ghg(item.id)}
                                >
                                  زیرمنو{" "}
                                </button>
                                <button
                                  className="btn btn-info itemmenu-editbut"
                                  onClick={() => {
                                    window.scrollTo(0, 0);
                                    editHandler(
                                      item.id,
                                      item.text,
                                      item.orderValue,
                                      item.imageUrl,
                                      item.pageUrl,
                                      item.rootId,
                                      item.cyMenuId,
                                      item.meta,
                                      item.cyCategoryId,
                                      item.cySkinId
                                    );
                                  }}
                                >
                                  ویرایش
                                </button>
                                <button
                                  className="btn btn-danger itemmenu-deletbut"
                                  onClick={() => deletHandler(item.id)}
                                >
                                  حذف
                                </button>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>

              </DataTable>
            )}
          </div>
        </div>
      </div>

      <></>
    </>
  );
}
