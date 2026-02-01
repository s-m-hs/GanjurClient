import React, { useState, useEffect, useContext, useRef } from "react";
import "./Manufacturer.css";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DataTable from "../DataTable/DataTable";
import DotLoader from "react-spinners/DotLoader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../../utils/ApiConfig";
import Pagination from "@mui/material/Pagination";
import fileUploadHandler from "../../../utils/Functions";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX";
import ApiPutX from "../../../utils/ApiServicesX/ApiPutX";
import ApiPostX2 from "../../../utils/ApiServicesX/ApiPostX2";
import ApiDeleteX from "../../../utils/ApiServicesX/ApiDeleteX";
import alertA from "../../../utils/AlertFunc/AlertA";
import UploadFileIcon from "@mui/icons-material/UploadFile";

export default function Manufacturer() {
  const [manufacturArray, setManufacturArray] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [putId, setPutId] = useState("");
  const [file, setFile] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [flagUpdate2, setFlagUpdate2] = useState(false);
  const navigate = useNavigate();
  const cmsContext = useContext(CmsContext);
  const [paginationArray, setPaginationArray] = useState([]);
  const [page, setPage] = React.useState(1);
  const classRefB = useRef();
  const pageCount = 100;
  const productNumberPagi = (page - 1) * 100;
  const [searchType, setSearchType] = useState("");
  const [searchBoxArr, setSearchBoxArr] = useState([]);
  const [flagSearch, setFlagSearch] = useState(false);
  const homeContext = useContext(HomeContext);
  // const headerAuth = cmsContext.token.token;
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
    name: { required: "name is required" },
    description: { required: "description is required" },
  };
  ///////////////////

  ////////////////////////////////
  const handleError = (errors) => {};

  ////////////////////////////////
  const handleChange = (event, value) => {
    setPage(value);
    GetManufactureItem(value - 1, pageCount);
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
    if (file?.name) fileUploadHandler(file, setImgUrl);
  }, [file]);

  /////////////////////////////////
  const funcA = () => {
    alertA("متغیر با موفقیت اضافه شد");
    reset(setValue(""));
    setImgUrl("");
    setFile("");
    GetManufactureItem(page - 1, pageCount);
    setFlagSearch(false);
    setSearchType("");
  };

  const funcB = () => {
    alertA("ویرایش با موفقیت انجام شد");
    reset(setValue(""));
    setImgUrl("");
    setFile("");
    setFlagUpdate(false);
    GetManufactureItem(page - 1, pageCount);
    setFlagSearch(false);
    setSearchType("");
  };
  const handleRegistration = (data) => {
    if (!flagUpdate) {
      let obj = {
        id: 0,
        name: data.name,
        description: data.description,
        websiteUrl: data.websiteUrl,
        imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
      };

      ApiPostX("/api/CyManufacturer", obj, funcA);
    } else if (flagUpdate) {
      let obj = {
        id: putId,
        name: data.update.name,
        description: data.update.description,
        websiteUrl: data.update.websiteUrl,
        imageUrl: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
      };

      ApiPutX("/api/CyManufacturer", putId, obj, funcB);
    }
  };
  /////////////////////////////////
  const searchChange = (e) => {
    setSearchType(e.target.value);
  };
  const searchBox = () => {
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyManufacturer/SearchManufacturer/${searchType}`,
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
          //   console.log(res)
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
          //   console.log(result)
        });
    }
    myApp();
  };

  ///////////////////////////////
  const GetManufactureItem = (pageNumber, pageSize) => {
    let obj = {
      cat: "string",
      pageNumber: pageNumber,
      pageSize: pageSize,
    };

    ApiPostX2(
      "/api/CyManufacturer/getManufacturersPaged",
      obj,
      setManufacturArray,
      navigate
    );
  };

  //////////////////////
  const funcC = () => {
    GetManufactureItem(page - 1, pageCount);
    setImgUrl("");
    setFile("");
    setFlagSearch(false);
    setSearchType("");
    reset(setValue(""));
  };

  const deleteHandler = (id) => {
    ApiDeleteX("/api/CyManufacturer", id, funcC);
  };
  /////////////////////
  const editHandler = (...data) => {
    setPutId(data[0]);
    setImgUrl(data[4]);
    setFlagUpdate(true);
    setValue("update", {
      name: data[1],
      description: data[2],
      websiteUrl: data[3],
    });
  };
  /////////////////
  const resetUpdatField = () => {
    setFlagUpdate(false);
    setImgUrl("");
    setFile("");
    reset(setValue(""));
  };
  //////////////////
  useEffect(() => {
    searchBox();
  }, [searchType]);

  useEffect(() => {
    if (manufacturArray.allCount?.length != 0) {
      let x = manufacturArray.allCount;
      let countInPage = pageCount;
      let z = Math.ceil(x / countInPage);
      z
        ? setPaginationArray(Array.from({ length: z }))
        : setPaginationArray([]);
    }
  }, [manufacturArray]);

  useEffect(() => {
    cmsContext.setFlagClass(false);
    GetManufactureItem(page - 1, pageCount);

    // getManufactureItem()

    return () => cmsContext.setFlagClass(true);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-3 manufactur-col3">
            <form
              action=""
              onSubmit={handleSubmit(handleRegistration, handleError)}
            >
              <div className="login-label-float">
                <input
                  name="name"
                  type="text"
                  placeholder=""
                  className={errors.name ? "formerror" : ""}
                  {...register(
                    !flagUpdate ? "name" : "update.name",
                    registerOptions.name
                  )}
                />
                <label> عنوان </label>
              </div>

              <div className="login-label-float">
                <input
                  name="description"
                  type="text"
                  placeholder=""
                  className={errors.description ? "formerror" : ""}
                  {...register(
                    !flagUpdate ? "description" : "update.description",
                    registerOptions.description
                  )}
                />
                <label> توضیحات</label>
              </div>

              <div className="login-label-float">
                <input
                  name="websiteUrl"
                  type="text"
                  placeholder=""
                  className={errors.websiteUrl ? "formerror" : ""}
                  {...register(
                    !flagUpdate ? "websiteUrl" : "update.websiteUrl",
                    registerOptions.websiteUrl
                  )}
                />
                <label> آدرس سایت</label>
              </div>

              <div className="login-label-float">
                <input type="text" onChange={fileChange2} value={imgUrl} />
                <label>تصویر </label>
                <div className="manufacture-uploade-div">
                  <span>
                    <UploadFileIcon />
                  </span>
                  <input
                    type="file"
                    placeholder="عکس کوچک"
                    className="manufactur-img-input"
                    onChange={fileChange}
                  />
                </div>

                <span>
                  <img
                    className="manufactur-img-image"
                    src={!flagUpdate2 ? `${apiUrl}/${imgUrl}` : imgUrl}
                    alt=""
                  />{" "}
                </span>
                <img
                  className="manufactur-img-image"
                  src={!flagUpdate2 ? imgUrl : `${apiUrl}/${imgUrl}`}
                  alt=""
                />
              </div>

              {flagUpdate && (
                <div className="manufactur-resticon">
                  <i
                    class="fa-solid fa-rotate-left fa-2xl"
                    style={{ color: " #74C0FC" }}
                    onClick={resetUpdatField}
                  ></i>
                </div>
              )}

              <Button
                className="manufactur-regbutton"
                type="submit"
                variant="contained"
                color="info"
                endIcon={<SendIcon />}
              >
                {!flagUpdate ? <span> افزودن </span> : <span> ویرایش </span>}
              </Button>
            </form>
          </div>

          <div className="col-12 col-sm-9 manufactur-col9">
            {manufacturArray.length == 0 && (
              <div className="manufactur-colsm9-div">
                <DotLoader
                  color="#0d6efd"
                  loading
                  size={150}
                  speedMultiplier={1}
                />
              </div>
            )}

            {paginationArray.length > 1 && !flagSearch && (
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
            {manufacturArray?.itemList?.length !== 0 && (
              <>
                <div className="manufacture-search-div">
                  <input
                    className=" manufacture-search"
                    placeholder="جستجو"
                    name="search"
                    type="text"
                    value={searchType}
                    onChange={searchChange}
                  />
                  <i
                    class="fa-brands fa-searchengin fa-fade fa-2xl"
                    style={{ color: " #74C0FC" }}
                  ></i>
                </div>
                <DataTable title={"لیست شرکت های سازنده  :"}>
                  <table
                    className={
                      !homeContext.themContext
                        ? "table table-striped  manufactur-table"
                        : "table table-striped table-dark manufactur-table"
                    }
                  >
                    <thead>
                      <tr>
                        <th>شماره</th>
                        <th>عنوان </th>
                        <th> توضیحات</th>
                        <th>شناسه</th>
                        <th>تصویر</th>
                        <th>ویرایش/حذف</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!flagSearch &&
                        manufacturArray.itemList?.map((item, index) => (
                          <tr key={item.id}>
                            <td>{productNumberPagi + (index + 1)}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.id}</td>
                            <td>{<img src={item.imageUrl} alt="alt" />}</td>
                            <td>
                              <button
                                className="btn btn-info manufactur-editbut"
                                onClick={() => {
                                  editHandler(
                                    item.id,
                                    item.name,
                                    item.description,
                                    item.websiteUrl,
                                    item.imageUrl
                                  );
                                  window.scrollTo(0, 0);
                                }}
                              >
                                ویرایش
                              </button>
                              <button
                                className="btn btn-danger manufactur-deletbut"
                                onClick={() => deleteHandler(item.id)}
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}

                      {flagSearch &&
                        searchBoxArr?.map((item, index) => (
                          <tr key={item.id}>
                            <td>{productNumberPagi + (index + 1)}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.id}</td>
                            <td>{<img src={item.imageUrl} alt="alt" />}</td>
                            <td>
                              <button
                                className="btn btn-info manufactur-editbut"
                                onClick={() => {
                                  editHandler(
                                    item.id,
                                    item.name,
                                    item.description,
                                    item.websiteUrl,
                                    item.imageUrl
                                  );
                                  window.scrollTo(0, 0);
                                }}
                              >
                                ویرایش
                              </button>
                              <button
                                className="btn btn-danger manufactur-deletbut"
                                onClick={() => deleteHandler(item.id)}
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
            {paginationArray.length > 1 && !flagSearch && (
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
