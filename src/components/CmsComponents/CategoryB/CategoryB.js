import React, { useState, useEffect, useContext, useRef } from "react";
import "./CategoryB.css";
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
import ApiPost from "../../../utils/ApiServices/Configs/ApiPost";
import ApiGet from "../../../utils/ApiServices/Configs/ApiGet";
import ApiPut from "../../../utils/ApiServices/Configs/ApiPut";
import ApiDelete from "../../../utils/ApiServices/Configs/ApiDelete";
import Pagination from "@mui/material/Pagination";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { C } from "@table-library/react-table-library/Cell-a4350b14";

export default function CategoryB() {
  const [flag, setFlag] = useState(false);
  const [flagReg, setFlagReg] = useState(false);
  const [itemArrayB, setItemArrayB] = useState([]);
  const [allCount, setAllCount] = useState([]);
  // const itemArrayBRevers = itemArrayB.slice().reverse()
  const [rootIdA, setRootIdA] = useState(null);
  const [rootTitle, setRootTitle] = useState(null);
  const [idParam, setIdParam] = useState(null);
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
  const [paginationArray, setPaginationArray] = useState([]);
  const [page, setPage] = React.useState(1);
  const classRefB = useRef();
  const pageCount = 100;
  const productNumberPagi = (page - 1) * 100;
  const [flagPage, setFlagPage] = useState(false);
  const [searchType, setSearchType] = useState("");
  const [searchBoxArr, setSearchBoxArr] = useState([]);
  const [flagSearch, setFlagSearch] = useState(false);
  const [flaggg, setFlaggg] = useState(false);
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
    defaultValues: {},
  });

  const handleChange = (event, value) => {
    setPage(value);
    GetCategoryItem(value - 1, pageCount);
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

  /////////////////////////////////
  const handleError = (errors) => {};

  const registerOptions = {
    ItemCategoryTitle: { required: "Name is required" },
    itemOrderValue: { required: "nameCode is required" },
    productCount: { required: "productCount is required" },
    itemImageUrl: { required: "" },
    itemCode: { required: "itemCode is required" },
  };
  ///////////////////////////////
  const alertS = (title) =>
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      reset(setValue(""));
      GetCategoryItem(page - 1, pageCount);
      setImgUrl("");
      setFile("");
      setFlagSearch(false);
      setSearchType("");
    });
  const alertB = () => {
    swalWithBootstrapButtons
      .fire({
        title: "حذف انجام شد!",
        icon: "success",
      })
      .then((result) => {
        GetCategoryItem(page - 1, pageCount);
        setImgUrl("");
        setFile("");
        window.scrollTo(0, 0);
        setFlagSearch(false);
        setSearchType("");
      });
  };
  /////////////////////////////////
  const handleRegistration = (data) => {
    // console.log(data)
    if (!flagReg) {
      const registerHandler = (e) => {
        // e.preventDefault()
        let obj = {
          id: 0,
          code: data.itemCode,
          name: data.ItemCategoryTitle,
          orderValue: data.itemOrderValue ? data.itemOrderValue : 1,
          imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
          productCount: data.productCount ? data.productCount : 1,
          rootId: rootIdA,
          description: data.description,
          url: data.url,
        };
        ApiPost(
          "/api/CyProductCategory/postNewProductCategory",
          obj,
          alertS("دسته بندی با موفقیت اضافه شد")
        );
      };
      registerHandler();
    } else if (flagReg) {
      const editHandlerA = (id) => {
        let obj = {
          id: putId,
          code: data.update.edititemCode,
          name: data.update.editname,
          orderValue: data.update.editorderValue,
          imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
          productCount: data.update.editproductCount,
          rootId: rootIdA,
          description: data.update.description,
          url: data.update.url,
        };
        console.log(obj);
        ApiPut(
          "/api/CyProductCategory/updateProdCat",
          putId,
          obj,
          alertS("ویرایش با موفقیت انجام شد", handleClose())
        );
      };
      editHandlerA();
    }
  };

  const searchChange = (e) => {
    setSearchType(e.target.value);
  };
  const searchBox = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyProductCategory/searchProductCategory/${searchType}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            // Authorization: `Bearer ${cmsContext.token.token}`,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          // console.log(res)
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          if (result) {
            setFlagSearch(true);
            setSearchBoxArr(result);
          } else {
            setFlagSearch(false);
          }
          // console.log(result)
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  const resetUpdatField = () => {
    setFlagReg(false);
    setImgUrl("");
    setFile("");
    reset(setValue(""));
  };
  const ghg = (id, title) => {
    if (id != null) {
      setItemArrayB(
        itemArrayB.filter((item) => {
          return item.rootId === id;
        })
      );
    }

    setFlagSearch(false);
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
    setFlaggg((prev) => !prev);
    // setItemArrayB(itemArrayB.filter((item) => {
    //   return (
    //     item.rootId === id
    //   );
    // }))
  };

  useEffect(() => {
    let obj = {
      pageNumber: 0,
      pageSize: 1000000,
    };
    async function myAppGetProduct() {
      const res = await fetch(
        `${apiUrl}/api/CyProductCategory/getPagedProductCategories`,
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
          if (result) {
            if (rootIdA != null) {
              setItemArrayB(
                result.itemList.filter((item) => {
                  return item.rootId === idParam;
                })
              );
              setAllCount(result.allCount);
            }

            //  setProductArray(result. itemList)
            //     setStateArray(result.allCount)
            //     setFlagpagin(false)
          }
        })
        .catch((error) => {
          // console.log(error)
          navigate("/errorpage");
        });
    }
    myAppGetProduct();
  }, [flaggg]);
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
        `${apiUrl}/api/CyProductCategory/GetItemWChildAndRoot`,
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
          ApiDelete(
            "/api/CyProductCategory/deleteProductCategory",
            id,
            alertB()
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "حذف انجام نشد",
            icon: "error",
          });
        }
      })
      .then((res) => GetCategoryItem(page - 1, pageCount));
    setFlagReg(false);
    reset(setValue(""));
  };
  ////////////////////////
  const editHandler = (
    id,
    code,
    text,
    orderValue,
    imageUrl,
    productCount,
    rotId,
    descr,
    url
  ) => {
    setValue("update", {
      editname: text,
      editorderValue: orderValue,
      editproductCount: productCount,
      edititemCode: code,
      description: descr,
      url: url,
    });
    setPutId(id);
    handleShow();
    setImgUrl(imageUrl);
    setRootIdA(rotId);
  };

  //////////////////////////
  const GetCategoryItem = (pageNumber, pageSize) => {
    // setFlagpagin(true)
    let obj = {
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    async function myAppGetProduct() {
      const res = await fetch(
        `${apiUrl}/api/CyProductCategory/getPagedProductCategories`,
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
          if (result) {
            console.log(result);
            setItemArrayB(result.itemList);
            setAllCount(result.allCount);

            //  setProductArray(result. itemList)
            //     setStateArray(result.allCount)
            //     setFlagpagin(false)
          }
        })
        .catch((error) => {
          // console.log(error)
          navigate("/errorpage");
        });
    }
    myAppGetProduct();
  };
  const registerGetItem = () => {
    ApiGet("/api/CyProductCategory", setItemArrayB, navigate);
  };

  /////////////////////////////
  useEffect(() => {
    searchBox();
    // console.log(searchBoxArr)
  }, [searchType]);

  useEffect(() => {
    if (itemArrayB.length != 0) {
      let x = allCount;
      let countInPage = pageCount;
      let z = Math.ceil(x / countInPage);
      z
        ? setPaginationArray(Array.from({ length: z }))
        : setPaginationArray([]);
    }
  }, [itemArrayB]);

  useEffect(() => {
    // GetCategoryItem(page-1,pageCount)
    // registerGetItem();
    getItemChildren();
  }, [flag, idParam, rootIdA]);

  useEffect(() => {
    if (rootIdA == null) {
      GetCategoryItem(page - 1, pageCount);
    }
  }, [page, rootIdA]);

  return (
    <>
      <div className="container">
        <div className="row row-cols-4 category-select-row">
          <Button
            className="categor-select-row-link"
            variant="outlined"
            onClick={() => {
              setFlagx(false);

              ghg(null);
              setFlagPage(false);
            }}
            style={{ margin: "8px" }}
          >
            دسته بندی اصلی
          </Button>

          {rootIdA && flagx && (
            <Button
              className="categor-select-row-but"
              variant="outlined"
              onClick={() => {
                ghg2(itemChildArray.item.rootId);
                setFlagPage(false);
              }}
              style={{ margin: "8px" }}
            >
              {/* {rootTitle}{" "} */}
              {itemChildArray.item.name}
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
                  <input
                    name="url"
                    type="text"
                    placeholder=""
                    className={errors.productCount ? "formerror" : ""}
                    {...register(
                      !flagReg ? "url" : "update.url"
                      // registerOptions.productCount
                    )}
                  />
                  <label>URL</label>
                </div>

                <div>
                  <textarea
                    className="categoryB-textArea"
                    name="description"
                    type="text"
                    placeholder=""
                    // className={errors.description ? "formerror" : ""}
                    {...register(
                      !flagReg ? "description" : "update.description"
                      // registerOptions.productCount
                    )}
                  />
                  <label className="categoryB-textArea-lable">توضیحات</label>
                </div>

                <div className="login-label-float">
                  <input type="text" onChange={fileChange2} value={imgUrl} />
                  <label>تصویر </label>
                  <div className="categoryB-uploade-div">
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
            {itemArrayB.length == 0 && (
              <div className="category-col-sm-9-div">
                <DotLoader
                  color="#0d6efd"
                  loading
                  size={150}
                  speedMultiplier={1}
                />
              </div>
            )}

            {paginationArray.length > 1 &&
              !flagPage &&
              !flagSearch &&
              rootIdA == null && (
                <div className="pagination-div">
                  <Pagination
                    count={paginationArray.length}
                    page={page}
                    ref={classRefB}
                    onChange={handleChange}
                    color="primary"
                    shape="rounded"
                    style={{ direction: "ltr" }}
                  />
                </div>
              )}

            {itemArrayB.length !== 0 && (
              <>
                {!rootIdA && (
                  <div className="categoryB-search-div">
                    <input
                      value={searchType}
                      onChange={searchChange}
                      className=" categoryB-search"
                      placeholder="جستجو"
                      name="search"
                      type="text"
                    />
                    <i
                      class="fa-brands fa-searchengin fa-fade fa-2xl"
                      style={{ color: " #74C0FC" }}
                    ></i>
                  </div>
                )}

                <DataTable
                  title={
                    flagx
                      ? `دسته بندی :  :${itemChildArray.item.name}`
                      : `دسته بندی تخصصی:`
                  }
                >
                  <table
                    className={
                      !homeContext.themContext
                        ? "table table-striped  category-table"
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
                      {itemArrayB &&
                        !flagSearch &&
                        itemArrayB.map((item, index) => (
                          <tr key={item.id}>
                            <td>{productNumberPagi + (index + 1)}</td>
                            <td> {item.name}</td>
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
                                  ghg(item.id, item.name);
                                  setFlagPage(true);
                                }}
                              >
                                زیرگروه{" "}
                              </button>
                              <button
                                className="btn btn-info category-editbut"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  // console.log(item)
                                  editHandler(
                                    item.id,
                                    item.code,
                                    item.name,
                                    item.orderValue,
                                    item.imageUrl,
                                    item.productCount,
                                    item.rootId,
                                    item.description,
                                    item.url
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

                      {searchBoxArr &&
                        flagSearch &&
                        searchBoxArr.map((item, index) => (
                          <tr key={item.id}>
                            <td>{productNumberPagi + (index + 1)}</td>
                            <td> {item.name}</td>
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
                                  console.log(item);
                                  window.scrollTo(0, 0);
                                  ghg(item.id, item.text);
                                  setFlagPage(true);
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
                                    item.name,
                                    item.orderValue,
                                    item.imageUrl,
                                    item.productCount,
                                    item.rootId,
                                    item.description,
                                    item.url
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
              </>
            )}
            {paginationArray.length > 1 &&
              !flagPage &&
              !flagSearch &&
              rootIdA == null && (
                <div className="pagination-div">
                  <Pagination
                    count={paginationArray.length}
                    page={page}
                    ref={classRefB}
                    onChange={handleChange}
                    color="primary"
                    shape="rounded"
                    style={{ direction: "ltr" }}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </>
  );
}
