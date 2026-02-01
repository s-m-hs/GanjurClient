import React, { useEffect, useState, useContext, useRef } from "react";
import "./ShowSubjects.css";
import DataTable from "../DataTable/DataTable";
import DotLoader from "react-spinners/DotLoader";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";
import { useForm as useFormA } from "react-hook-form";
import { useForm as useFormB } from "react-hook-form";
// import { useForm } from 'react-hook-form'
import SendIcon from "@mui/icons-material/Send";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import transition from "react-element-popper/animations/transition";
import opacity from "react-element-popper/animations/opacity";
import InputIcon from "react-multi-date-picker/components/input_icon";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../../utils/ApiConfig";
import Pagination from "@mui/material/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Typewriter from "typewriter-effect";
import TextEditor from "../../Editor/TextEditor";
import { Dropdown } from "primereact/dropdown";
import fileUploadHandler from "../../../utils/Functions";
import ApiGetX from "../../../utils/ApiServicesX/ApiGetX";
import ApiPutX from "../../../utils/ApiServicesX/ApiPutX";
import ApiDeleteX from "../../../utils/ApiServicesX/ApiDeleteX";
import alertA from "../../../utils/AlertFunc/AlertA";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import RichTextEditor from "../../IsolaEditor/RichTextEditor";
import ParagraphsRenderer from "../../IsolaEditor/ParagraphsRenderer";
import TiptapEditor from "../../Editor/TiptapEditor";

export default function ShowSubjects({ showw }) {
  let {
    xtSearchA,
    xtSearchB,
    xtSearchC,
    xtSearchD,
    setResetSearchbox,
    isolaEdiImg,
    setIsolaSave,
    isolaLocal,
  } = useContext(CmsContext);

  const navigate = useNavigate();
  const homeContext = useContext(HomeContext);
  const cmsContext = useContext(CmsContext);
  // const headerAuth = `Bearer ${cmsContext.token.token}`;

  const [subjectItem, setSubjectItem] = useState([]);
  const [subjectItemitemList, setSubjectItemitemList] = useState([]);
  const subjectItemRevers = subjectItemitemList?.slice().reverse();
  // const subjectReverse = subjectItem.slice().reverse()
  const [show, setShow] = useState(false);
  const [showB, setShowB] = useState(false);
  const [ckValue, setCkValue] = useState("");
  const [categoryItem, setCategoriItem] = useState([]);
  const [value4, setValue4] = useState();
  const [value5, setValue5] = useState();
  const [fullscreen, setFullscreen] = useState(true);
  const [fullscreenB, setFullscreenB] = useState(true);
  const [putId, setPutId] = useState("");
  const [flagDate1, setFlagDate1] = useState(false);
  const [flagDate2, setFlagDate2] = useState(false);
  const [flagEditor, setFlagEditor] = useState(false);
  const [file, setFile] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [file2, setFile2] = useState({});
  const [imgUrl2, setImgUrl2] = useState("");
  const [paginationArray, setPaginationArray] = useState([]);
  const [page, setPage] = React.useState(1);
  const classRefB = useRef();
  const pageCount = 100;
  const productNumberPagi = (page - 1) * 10;
  const [tableState, setTableState] = useState(false);
  const [searchState, setSearchState] = useState([]);
  const [searchObj, setSearchObj] = useState({});
  const [flagSeveralCategory, setFlagSeveralCategory] = useState(false);
  const [idMagazin, setIdMagazin] = useState([]);

  ///isola state===>
  const [editorState, setEditorState] = useState("");
  const [bodyString, setBodyString] = useState("");
  const contentRef = useRef(null);
  const [paragraphs, setParagraphs] = useState("");
  // const [isolaLocal, setIsplaLocal] = useState("");

  const [flaggg, setFlaggg] = useState(false);
  /////////////////
  const [selectedOrder, setSelectedOrder] = useState({
    name: "جدید ترین",
    code: "NY",
  });
  const [subjectOrder, setSubjectOrder] = useState([]);

  const Order = [
    { name: "جدید ترین", code: "NY" },
    { name: "قدیمی ترین", code: "RM" },
  ];
  const severaCateArray = [
    { id: 693, text: "تجارت بین الملل	" },
    { id: 692, text: "ارزیابی اصالت کالا" },
    { id: 691, text: "عمومی" },
    { id: 690, text: "PCB" },
    { id: 685, text: "مقالات" },
  ];
  const {
    register: registerFormB,
    handleSubmit: handleSubmitFormB,
    setValue: setValueB,
    reset: resetB,
    formState: { errorsB },
  } = useFormB({
    defaultValues: {},
  });

  let dateModife = new Date();
  const { register, handleSubmit, setValue, reset } = useFormA({
    defaultValues: {},
  });
  ////////////////////////////////
  const handleChangePage = (event, value) => {
    if (!tableState) {
      setPage(value);
      GetSubjectItems(value - 1, pageCount);
    } else if (tableState) {
      setPage(value);
      let obj = {
        title: searchObj.name ? searchObj.name.trim() : null,
        categoryCode: searchObj.categoryCode ? searchObj.categoryCode : null,
        pageNumber: value - 1,
        pageSize: pageCount,
      };
      getSubjectSearch(obj);
    }
  };
  const handleEditorChange = (value) => {
    setCkValue(value);
  };

  ///////////////////upload img function===>
  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const fileChange2 = (e) => {
    setFile("");
    setImgUrl(e.target.value);
  };
  const fileChange3 = (e) => {
    setFile2(e.target.files[0]);
  };
  const fileChange4 = (e) => {
    setFile2("");
    setImgUrl2(e.target.value);
  };

  // //////////////////////////////
  useEffect(() => {
    if (file?.name) {
      fileUploadHandler(file, setImgUrl);
    }
  }, [file]);
  useEffect(() => {
    if (file2?.name) {
      fileUploadHandler(file2, setImgUrl2);
    }
  }, [, file2]);

  ////////////////////////////////about setdate ===>
  function handleChange(value) {
    setValue4(value && value.toDate());
    // console.log(value.format());   /// convert  to persian format
  }
  function handleChangeB(value) {
    setValue5(value && value.toDate());
  }
  ////////////////////////////////
  const categoryIdChild = () => {
    // console.log('first')
  };
  //////////////////////
  const GetCategoryItem = () => {
    ApiGetX("/api/CyCategories", setCategoriItem, navigate);
  };
  ////////////////////////////
  const showModalHandler = (...data) => {
    // getIdForMagazine(data[0],)
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CySubjects/getCategoryIdsForSubject?subjectId=${data[0]}`,
        {
          method: "GET",
          credentials: "include",

          headers: {
            // Authorization: `Bearer ${cmsContext.token.token}`,
            "Content-Type": "application/json",
          },
        }
      ).then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            // setValue("updat", {
            //   category2:result})
            setIdMagazin(result);
            setValue("updat", {
              url: data[12],
              title: data[1],
              subTitle: data[9],
              description: data[5],
              tag: data[11],
              extra: data[6],
              bigImg: data[2],
              smImg: data[10],
              orderValue: data[8],
              radio: data[7],
              category: data[4],
              category2: result,
            });
          });
        }
      });
    }
    myApp();

    setShow(true);
    setPutId(data[0]);
    setValue4(data[14]);
    setValue5(data[13]);
    setImgUrl(data[10]);
    setImgUrl2(data[2]);
    setCkValue(data[3]);
    setEditorState(data[15]);
    setBodyString(data[16]);
  };

  const resetUpdatFieldB = () => {
    setTableState(false);
    setPage(1);
    resetB(setValueB(""));
    setResetSearchbox(true);
  };
  const getSubjectSearch = (obj) => {
    async function myAppPost() {
      const res = await fetch(
        `${apiUrl}/api/CySubjects/SearchSubjectForAdmin`,
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
          // console.log(res)
          return res.json();
        })
        .then((result) => {
          // console.log(result)
          if (result) {
            // console.log(result)
            setSearchState(result);
          }
        })
        .catch((err) => console.log(err));
    }
    myAppPost();
  };
  const handleRegistrationB = (data) => {
    // console.log(data)
    setSearchState([]);

    setPage(1);
    setTableState(true);
    let obj = {
      title: data.searchName ? data.searchName.trim() : "",
      categoryCode: data.searchcategoryCode ? data.searchcategoryCode : null,
      pageNumber: 0,
      pageSize: 10,
    };
    //  console.log(obj)
    setSearchObj(obj);
    getSubjectSearch(obj);
  };

  ///////////////////////////
  const funcA = () => {
    alertA("ویرایش با موفقیت انجام شد");
    reset(setValue(""));
    setValue4("");
    setValue5("");
    setImgUrl("");
    setFile("");
    setFile2("");
    setImgUrl2("");
    setFlagDate1(false);
    setFlagDate2(false);
    setShow(false);
    setCkValue("");
    setSearchState([]);
    setTableState(false);
    resetB(setValueB(""));
    setResetSearchbox(true);
    localStorage.removeItem("paragraphs");
    isolaEdiImg("");
  };

  const handleSubmitEdit = (data) => {
    let obj = {
      id: putId,
      preTitle: data.updat.subTitle,
      title: data.updat.title,
      urL_Title: data.updat.url,
      describtion: data.updat.description,
      ///state of isola editor
      editorState: editorState,
      bodyString: bodyString ? localStorage.getItem("paragraphs") : "",
      /////////////////
      body: bodyString && isolaLocal ? isolaLocal.outerHTML : ckValue,
      tag: data.updat.tag,
      extra: data.updat.extra,
      dateShow: value4,
      dateExp: value5,
      isAuthenticate: true,
      bigImg: file2.name ? `${apiUrl}/${imgUrl2}` : imgUrl2,
      smallImg: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
      orderValue: data.updat.orderValue,
      cyCategoryId: Number(data.updat.category),
      categoryIds: data.updat.category2 ? data.updat.category2 : null,
    };
    console.log(obj);
    ApiPutX("/api/CySubjects", putId, obj, funcA);
  };
  ////////////////////////////
  const funcB = () => {
    setSearchState([]);
    setTableState(false);
    resetB(setValueB(""));
    setResetSearchbox(true);
    GetSubjectItems(page - 1, pageCount);
  };
  const deletHandler = (id) => {
    ApiDeleteX("/api/CySubjects", id, funcB);
  };
  ///////////////////////////////////
  const GetSubjectItems = (pageNumber, pageSize) => {
    // setFlagpagin(true)
    let obj = {
      title: "",
      categoryCode: null,
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    async function myAppGetProduct() {
      const res = await fetch(
        `${apiUrl}/api/CySubjects/SearchSubjectForAdmin`,
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
            setSubjectItem(result);
            setSubjectItemitemList(result.itemList);
          }
        })
        .catch((error) => {
          // console.log(error)
          navigate("/errorpage");
        });
    }
    myAppGetProduct();
  };

  //////////////////
  const resetUpdatField = () => {
    setFlagDate1(true);
  };
  const resetUpdatField2 = () => {
    setFlagDate2(true);
  };

  ///////////////////
  useEffect(() => {
    if (selectedOrder.code === "RM") {
      setSubjectOrder(subjectItemitemList);
    } else if (selectedOrder.code === "NY") {
      setSubjectOrder(subjectItemRevers);
    }
  }, [selectedOrder, subjectItemitemList]);

  useEffect(() => {
    setValueB("searchcategoryCode", `${xtSearchB}`);
  }, [xtSearchB]);

  useEffect(() => {
    if (subjectItem.allCount?.length != 0) {
      let x = subjectItem.allCount;
      let countInPage = pageCount;
      let z = Math.ceil(x / countInPage);
      z
        ? setPaginationArray(Array.from({ length: z }))
        : setPaginationArray([]);
    }
  }, [subjectItem]);

  useEffect(() => {
    GetSubjectItems(page - 1, pageCount);
    GetCategoryItem();
  }, [cmsContext.flagPublic, show]);

  useEffect(() => {
    if (!show) {
      setFlagSeveralCategory(false);
    }
  }, [show]);

  /////isola useeffect
  // useEffect(() => {
  //   setParagraphs(JSON.parse(localStorage.getItem("paragraphs")));
  //   setIsplaLocal(contentRef.current);

  // }, [flaggg]);
  console.log(ckValue);
  //////////////////////////////

  useEffect(() => {
    return () => setResetSearchbox(true);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {subjectItem.length == 0 && (
            <div className="showsubject-col-sm-9-div">
              <DotLoader
                color="#0d6efd"
                loading
                size={150}
                speedMultiplier={1}
              />
            </div>
          )}

          <div className="subject-search-div">
            <form
              key={2}
              onSubmit={handleSubmitFormB(handleRegistrationB)}
              className="subject-search-form"
            >
              <input
                className={
                  !tableState
                    ? " subject-search"
                    : "subject-search subjectdisable"
                }
                placeholder="عنوان"
                name="search"
                type="text"
                {...registerFormB("searchName")}
              />

              <SearchBox
                array={categoryItem}
                placeholder={"دسته بندی عمومی..."}
                id="categoryCodeId"
                classs={tableState ? "subjectdisable" : ""}
              />

              <i
                class="fa-solid fa-rotate-left fa-2xl"
                style={{ color: " #74C0FC", cursor: "pointer" }}
                onClick={resetUpdatFieldB}
              ></i>
              <button
                className="btn btn-outline-info"
                style={{ height: "50px", margin: "5px" }}
                type="submit"
              >
                بگرد
              </button>
            </form>
          </div>

          {paginationArray.length > 1 && !tableState && (
            <div className="pagination-div">
              <Pagination
                count={paginationArray.length}
                page={page}
                ref={classRefB}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
                style={{ direction: "ltr" }}
              />
            </div>
          )}
          {
            <>
              <DataTable title="لیست مطالب :">
                {!tableState && (
                  <div
                    className="card flex justify-content-center"
                    style={{
                      width: "20%",
                      direction: "rtl",
                      marginBottom: "10px",
                    }}
                  >
                    <Dropdown
                      value={selectedOrder}
                      onChange={(e) => setSelectedOrder(e.value)}
                      options={Order}
                      optionLabel="name"
                      placeholder="Select a City"
                      className="w-full md:w-14rem"
                    />
                  </div>
                )}
                {/* <table className='table  table-striped  showsubject-table'>   */}
                <table
                  className={
                    !homeContext.themContext
                      ? "table table-striped   showsubject-table"
                      : "table table-striped table-dark  showsubject-table"
                  }
                >
                  <thead>
                    <tr>
                      <th>شماره</th>

                      <th> تصویر </th>
                      <th>عنوان</th>
                      <th>چکیده مطلب</th>
                      <th> شناسه</th>
                      <th> دسته بندی</th>
                      <th>تاریخ نشر</th>
                      <th>ویرایش/حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!tableState && subjectItemitemList?.length !== 0
                      ? subjectOrder?.map((item, index) => (
                        <tr key={item.id}>
                          <td>{productNumberPagi + (index + 1)}</td>
                          <td>
                            <img
                              className="showsubject-img"
                              src={item.smallImg}
                              alt="img"
                            />
                          </td>
                          <td>{item.title}</td>
                          <td className="showsubject-desc">
                            {item.describtion}
                          </td>
                          <td>{item.id}</td>
                          <td>
                            {categoryItem.filter((itemF) => {
                              return itemF.id == item.cyCategoryId;
                            })[0] &&
                              categoryItem.filter((itemF) => {
                                return itemF.id == item.cyCategoryId;
                              })[0].text}
                          </td>
                          <td>{item.dateShow}</td>
                          <td>
                            <button
                              className="btn btn-info showsubject-editbut"
                              onClick={() => {
                                console.log(item);
                                showModalHandler(
                                  item.id,
                                  item.title,
                                  item.bigImg,
                                  item.body,
                                  item.cyCategoryId,
                                  item.describtion,
                                  item.extra,
                                  item.isAuthenticate,
                                  item.orderValue,
                                  item.preTitle,
                                  item.smallImg,
                                  item.tag,
                                  item.urL_Title,
                                  item.dateExp,
                                  item.dateShow,
                                  item.editorState,
                                  item.bodyString
                                  // console.log(item)
                                );
                                // console.log(putId)
                                // getIdForMagazine(item.id);
                              }}
                            >
                              ویرایش
                            </button>
                            <button
                              className="btn btn-danger showsubject-deletbut"
                              onClick={() => deletHandler(item.id)}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))
                      : tableState && searchState.itemList?.length != 0
                        ? searchState.itemList?.map((item, index) => (
                          <tr key={item.id}>
                            <td>{productNumberPagi + (index + 1)}</td>
                            <td>
                              <img
                                className="showsubject-img"
                                src={item.smallImg}
                                alt="img"
                              />{" "}
                            </td>
                            <td>{item.title}</td>
                            <td className="showsubject-desc">
                              {item.describtion}
                            </td>
                            <td>{item.id}</td>
                            <td>
                              {categoryItem.filter((itemF) => {
                                return itemF.id == item.cyCategoryId;
                              })[0] &&
                                categoryItem.filter((itemF) => {
                                  return itemF.id == item.cyCategoryId;
                                })[0].text}
                            </td>
                            <td>{item.dateShow}</td>
                            <td>
                              <button
                                className="btn btn-info showsubject-editbut"
                                onClick={() => {
                                  showModalHandler(
                                    item.id,
                                    item.title,
                                    item.bigImg,
                                    item.body,
                                    item.cyCategoryId,
                                    item.describtion,
                                    item.extra,
                                    item.isAuthenticate,
                                    item.orderValue,
                                    item.preTitle,
                                    item.smallImg,
                                    item.tag,
                                    item.urL_Title,
                                    item.dateExp,
                                    item.dateShow,
                                    item.editorState,
                                    item.bodyString
                                  );
                                  // getIdForMagazine(item.id);
                                }}
                              >
                                ویرایش
                              </button>
                              <button
                                className="btn btn-danger showsubject-deletbut"
                                onClick={() => deletHandler(item.id)}
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))
                        : ""}
                  </tbody>
                </table>

                {tableState && searchState.itemList?.length == 0 ? (
                  <div
                    className="div-nopc"
                    style={{
                      margin: "30px",
                      width: "100%",
                      textAlign: "center",
                    }}
                  >
                    <h1>
                      <Typewriter
                        options={{
                          strings: ["مطلبی با این مشخصات یافت نشد..."],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </h1>
                  </div>
                ) : (
                  ""
                )}
              </DataTable>
            </>
          }
          {paginationArray.length > 1 && !tableState && (
            <div className="pagination-div">
              <Pagination
                count={paginationArray.length}
                page={page}
                ref={classRefB}
                onChange={handleChangePage}
                color="primary"
                shape="rounded"
                style={{ direction: "ltr" }}
              />
            </div>
          )}
        </div>
      </div>
      <Modal
        fullscreen={fullscreen}
        show={show}
        onHide={() => {
          setFlagDate1(false);
          setFlagDate2(false);
          {
            flagDate1 && setValue4("");
          }
          {
            flagDate2 && setValue5("");
          }
          setShow(false);

          //to empty state to remove from local
          setBodyString("");
          localStorage.removeItem("paragraphs");
          //
        }}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title"></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <form
                className={
                  !flagEditor ? "newsubject-form " : "newsubject-form-hidden"
                }
                onSubmit={handleSubmit(handleSubmitEdit)}
              >
                <div className="row">
                  <div className="col-lg-9 newsubject-form-col9">
                    <div className="newsubject-login-label-float">
                      <input
                        name="url"
                        type="text"
                        placeholder=""
                        {...register("updat.url")}
                      />
                      <label>URL </label>
                    </div>

                    <div className="newsubject-login-label-float">
                      <input
                        name="title"
                        type="text"
                        placeholder=""
                        {...register("updat.title")}
                      />
                      <label>عنوان </label>
                    </div>

                    <div className="newsubject-login-label-float">
                      <input
                        name="subTitle"
                        type="text"
                        placeholder=""
                        {...register("updat.subTitle")}
                      />
                      <label>پیش عنوان </label>
                    </div>

                    <div className="newsubject-login-label-float">
                      <input
                        name="description"
                        type="text"
                        placeholder=""
                        {...register("updat.description")}
                      />
                      <label>خلاصه مطلب </label>
                    </div>

                    <div className="newsubject-login-label-float">
                      <input
                        name="tag"
                        type="text"
                        placeholder=""
                        {...register("updat.tag")}
                      />
                      <label>تگ </label>
                    </div>

                    <div className="newsubject-login-label-float">
                      <input
                        name="extra"
                        type="text"
                        placeholder=""
                        {...register("updat.extra")}
                      />
                      <label>اکسترا </label>
                    </div>

                    <div className="newsubject-login-label-float">
                      <input
                        type="text"
                        onChange={fileChange4}
                        value={imgUrl2}
                      />
                      <label>عکس اصلی </label>
                      <div className="product-uploade-maindiv centerr">
                        <div className="product-uploade-div">
                          <span>
                            <UploadFileIcon />
                          </span>
                          <input
                            type="file"
                            placeholder="عکس اصلی"
                            className="producted-img-input"
                            onChange={fileChange3}
                          />
                        </div>
                        <span>
                          <img
                            className="producted-img-image"
                            src={`${apiUrl}/${imgUrl2}`}
                            alt=""
                          />{" "}
                        </span>
                        <img
                          className="producted-img-image"
                          src={imgUrl2}
                          alt=""
                        />
                      </div>
                    </div>

                    <div className="newsubject-login-label-float">
                      <input
                        type="text"
                        onChange={fileChange2}
                        value={imgUrl}
                      />
                      <label>عکس کوچک </label>
                      <div className="product-uploade-maindiv centerr">
                        <div className="product-uploade-div">
                          <span>
                            <UploadFileIcon />
                          </span>

                          <input
                            type="file"
                            placeholder="عکس کوچک"
                            className="producted-img-input"
                            onChange={fileChange}
                          />
                        </div>
                        <span>
                          <img
                            className="producted-img-image"
                            src={`${apiUrl}/${imgUrl}`}
                            alt=""
                          />{" "}
                        </span>
                        <img
                          className="producted-img-image"
                          src={imgUrl}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 newsubject-col3 ">
                    <Button
                      className="newsubject-regbutton"
                      type="submit"
                      variant="contained"
                      color="info"
                      endIcon={<SendIcon />}
                    >
                      <span>ویرایش</span>
                    </Button>
                    <div className="newsubject-form-col3">
                      <div
                        className="newsubject-form-col3-date-div"
                        style={{ direction: "rtl" }}
                      >
                        <span className="newsubject-form-col3-span">
                          تاریخ نشر:
                        </span>
                        {!flagDate1 ? (
                          <>
                            <span className="newsubject-form-col3-span2">
                              {value4}
                              <i
                                className="fa-solid fa-rotate-left  newsubject-form-col3-icon1"
                                onClick={resetUpdatField}
                              ></i>
                            </span>
                          </>
                        ) : (
                          <DatePicker
                            className="custom-input"
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            value={value4}
                            onChange={handleChange}
                            animations={[
                              opacity(),
                              transition({ from: 35, duration: 800 }),
                            ]}
                            render={<InputIcon />}
                          />
                        )}
                      </div>
                      <div
                        className="newsubject-form-col3-date-div"
                        style={{ direction: "rtl" }}
                      >
                        <span className="newsubject-form-col3-span">
                          تاریخ انقضا:
                        </span>
                        {!flagDate2 ? (
                          <>
                            <span className="newsubject-form-col3-span2">
                              {value5}
                              <i
                                className="fa-solid fa-rotate-left  newsubject-form-col3-icon1"
                                onClick={resetUpdatField2}
                              ></i>
                            </span>
                          </>
                        ) : (
                          <DatePicker
                            className="custom-input"
                            calendar={persian}
                            locale={persian_fa}
                            calendarPosition="bottom-right"
                            value={value5}
                            onChange={handleChangeB}
                            animations={[
                              opacity(),
                              transition({ from: 35, duration: 800 }),
                            ]}
                            render={<InputIcon />}
                          />
                        )}
                      </div>
                      <div className="newsubject-login-label-float">
                        <input
                          name="orderValue"
                          type="text"
                          placeholder=""
                          {...register("updat.orderValue")}
                        />
                        <label>اولویت نمایش </label>
                      </div>
                      <br />
                      <br />
                      <div className="newsubject-radio">
                        <label className="newsubject-category-selectlabel">
                          {" "}
                          تاییدشده :{" "}
                        </label>
                        <br />
                        <input
                          {...register("updat.radio")}
                          type="radio"
                          value={true}
                        />
                        <label> تایید </label>
                        <input
                          {...register("updat.radio")}
                          type="radio"
                          value={false}
                        />
                        <label> عدم تایید </label>
                      </div>
                      <br />
                      <br />
                      <label className="newsubject-category-selectlabel">
                        دسته بندی :
                      </label>
                      <select
                        className="newsubject-category"
                        {...register("updat.category")}
                      >
                        <option value="">انتخاب کنید...</option>
                        {categoryItem &&
                          categoryItem.map((item) => (
                            <>
                              <option
                                key={item.id}
                                value={item.id}
                                onClick={categoryIdChild}
                              >
                                {" "}
                                {item.text}
                              </option>
                            </>
                          ))}
                      </select>

                      <div className="newsubject-several-Category">
                        <button
                          className="btn btn-info mt-5"
                          onClick={(e) => {
                            e.preventDefault();
                            setFlagSeveralCategory(!flagSeveralCategory);
                          }}
                        >
                          دسته بندی مجله
                        </button>
                        {flagSeveralCategory &&
                          severaCateArray.map((item) => (
                            <>
                              <div key={item.id}>
                                <span>
                                  <span>{item.text}</span>
                                  <input
                                    type="checkbox"
                                    value={item.id}
                                    {...register("updat.category2")}
                                  />
                                </span>
                              </div>
                            </>
                          ))}
                        <ul className="showSubject-magazine-ul">
                          {severaCateArray
                            .filter((item) => idMagazin.includes(item.id))
                            .map((ite) => (
                              <li>{ite.text}</li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col">
                  <div className="newsubject-editor">
                    <span
                      className="newsubject-editor-span"
                      onClick={() => setFlagEditor((prev) => !prev)}
                    >
                      {flagEditor ? (
                        <i class="fa-solid fa-angles-down"></i>
                      ) : (
                        <i class="fa-solid fa-angles-up"></i>
                      )}
                    </span>

                    {/* editor html===> */}

                    {!editorState && showw == "showSub" && (
                      <TextEditor
                        height={!flagEditor ? "400px" : "100vh"}
                        image={true}
                        value={ckValue}
                        onChange={handleEditorChange}
                      />
                    )}

                    {editorState == 2 && (
                      <>
                        <TiptapEditor
                          value={ckValue}
                          onChange={(e) => {
                            setCkValue(e);
                          }}
                        />

                        {/* <RichTextEditor bodyString={bodyString} /> */}
                      </>
                    )}
                    {/*  */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* <div className="content-wrapper" ref={contentRef}>
              <ParagraphsRenderer
                paragraphs={paragraphs}
                activeParagraph={null}
                activeRow={null}
                activeElement={null}
                setActiveParagraph={() => {}}
                setActiveRow={() => {}}
                setActiveElement={() => {}}
                setIsImageSelected={() => {}}
                setActivePopup={() => {}}
                handleTextResize={() => {}}
                setImageSettings={() => {}}
                setParagraphs={() => {}}
                isViewMode={true}
              />
            </div> */}
      <>
        {/* editor html modal===> */}

        {/* {<Modal
          fullscreen={fullscreenB}
          show={showB}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
          onHide={() => setShowB(false)}
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>

            <div className="content-wrapper" ref={contentRef}>
              <ParagraphsRenderer
                paragraphs={paragraphs}
                activeParagraph={null}
                activeRow={null}
                activeElement={null}
                setActiveParagraph={() => {}}
                setActiveRow={() => {}}
                setActiveElement={() => {}}
                setIsImageSelected={() => {}}
                setActivePopup={() => {}}
                handleTextResize={() => {}}
                setImageSettings={() => {}}
                setParagraphs={() => {}}
                isViewMode={true}
              />
            </div>
          </Modal.Body>
        </Modal> } */}
      </>
      {/*  */}
    </div>
  );
}
