import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import "./Product.css";
import { useForm as useFormA } from "react-hook-form";
import { useForm as useFormB } from "react-hook-form";
import { useForm as useFormC } from "react-hook-form";
import DataTable from "../DataTable/DataTable";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import Modal from "react-bootstrap/Modal";
import DotLoader from "react-spinners/DotLoader";
import apiUrl from "../../../utils/ApiConfig";
import fileUploadHandler from "../../../utils/Functions";
import Pagination from "@mui/material/Pagination";
import SearchBox from "../SearchBox/SearchBox";
import Typewriter from "typewriter-effect";
import ApiGetB from "../../../utils/ApiServices/Configs/ApiGetB";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import BaseGrid from "../../Grid/BaseGrid";
import DateFormat from "../../../utils/DateFormat";
import ApiGetX2 from "../../../utils/ApiServicesX/ApiGetX2";
import { ArrowBackSharp, ArrowCircleDown, ArrowCircleDownRounded, ArrowCircleLeftTwoTone, ArrowDropDownCircle, Refresh, RefreshOutlined, RefreshRounded, RefreshSharp } from "@mui/icons-material";
import { ArrowBendLeftDown } from "@phosphor-icons/react";

export default function Product() {
  const [categoryItem, setCategoriItem] = useState([]);
  const [categoryItemB, setCategoriItemB] = useState([]);
  const [manufactureItem, setManufactureItem] = useState([]);
  const [productArray, setProductArray] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [detailProduct, setDetailProduct] = useState([]);
  const [putId, setPutId] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [paramiterArray, setParamiterArray] = useState([]);
  const [paramiterArrayB, setParamiterArrayB] = useState([]);
  const [productById, setProductById] = useState([]);
  const navigate = useNavigate();
  const [paginationArray, setPaginationArray] = useState([]);
  const [statearray, setStateArray] = useState("");
  const [page, setPage] = React.useState(1);
  const classRefB = useRef();
  const pageCount = 10000;
  const [flagPagin, setFlagpagin] = useState(false);
  const [tableState, setTableState] = useState(false);
  const [searchState, setSearchState] = useState([]);
  const [searchObj, setSearchObj] = useState({});
  const [guId, setGuId] = useState("");
  const [cteArray, setCteArray] = useState([]);
  const [flagSearchNoImg, setFlagSearchNoImg] = useState(false);
  const [productArrayB, setProductArrayB] = useState([]);
  const [objNoImg, setObjNoImg] = useState([]);
  const [flagUpdateAnbar, setFlagUpdateAnbar] = useState(false);
  const [show, setShow] = useState(false);
  const [kartex,setKartex]=useState([])
  let {
    xtSearchB,
    xtSearchC,
    xtSearchD,
    xtSearchE,
    xtSearchF,
    xtSearchG,
    setFlagError,
    setXtSearchE,
    setXtSearchF,
    setXtSearchG,
    setResetSearchbox,
  } = useContext(CmsContext);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useFormA({
    defaultValues: {},
  });
  const {
    register: registerFormB,
    handleSubmit: handleSubmitFormB,
    setValue: setValueB,
    reset: resetB,
    formState: { errorsB },
  } = useFormB({
    defaultValues: {},
  });

  const {
    register: registerFormC,
    handleSubmit: handleSubmitFormC,
    setValue: setValueC,
    reset: resetC,
    formState: { errorsC },
  } = useFormC({
    defaultValues: {},
  });

  const handleError = (errors) => {
    // console.log(errors)
  };
  const handleErrorB = (errors) => {
    // console.log(errors)
  };

  const registerOptions = {
    name: { required: "name is required" },
    // partNo: { required: "partNo is required" },
    manufacture: { required: "manufacture is required" },
    category: { required: "category is required" },

  };
  const alertS = (position, icon, title, timer, state) =>
    Swal.fire({
      position: position,
      icon: icon,
      title: title,
      showConfirmButton: false,
      timer: timer,
      toast: state,
    });


  const colDefs = useMemo(() =>
    [
            {
        field: "proCateName",
        headerName: "دسته بندی",
        maxWidth: 200,
      }
      ,

      {
        field: "manufacName",
        headerName: "شرکت",
        maxWidth: 200,
      },
      { field: "name", headerName: "نام محصول", Width: 300 },
      { field: "supply", headerName: " موجودی",maxWidth: 150  },

      { field: "price", headerName: "قیمت (ریال)",maxWidth:250, cellRenderer: (params) => params.value?.toLocaleString() },


            {
        field: "",
        headerName: "عملیات ",
        width: 300,
        cellRenderer: (params) =>
  <>
                         <button
                              className="btn btn-primary product-morebut"
                              onClick={() => {
                                // modalDetailProduct(
                                //   params.data.id,
                                //   params.data.name,
                                //   params.data.description,
                                //   params.data.partNo,
                                //   params.data.mfrNo,
                                //   params.data.datasheetUrl,
                                //   params.data.mainImage,
                                //   params.data.smallImage,
                                //   params.data.cyManufacturerId,
                                //   params.data.cyCategoryId,
                                //   params.data.images
                                // );
                                setKartex([])
                                getProductKartex(params.data.id)
                                setLgShow(true);
                              }}
                            >
                              {params.data.id}
                            </button>
                            <button
                              className="btn btn-info product-editbut"
                              onClick={() => {
                                window.scrollTo(0, 0);
                                editHandler(
                                  params.data.id,
                                  params.data.name,
                                  params.data.description,
                                  params.data.partNo,
                                  params.data.mfrNo,
                                  params.data.datasheetUrl,
                                  params.data.mainImage,
                                  params.data.smallImage,
                                  params.data.cyManufacturerId,
                                  params.data.cyCategoryId,
                                  params.data.price,
                                  params.data.noOffPrice,
                                  params.data.images,
                                  params.data.supply,
                                  params.data.cyProductCategoryId,
                                  params.data.productCode,
                                  params.data.price2,
                                  params.data.price3,
                                  params.data.price4,
                                  params.data.shopPrice

                                );
                                //  console.log(item)
                              }}
                            >
                              ویرایش
                            </button>
                            <button
                              className="btn btn-danger product-deletbut"
                              onClick={() => deleteHandler(params.data.id)}
                            >
                              حذف
                            </button>  
  </>,
      },

    ], [productArray])

  const [colDefsB] = useState(
    [

     {field: "name", headerName: "کالا",maxWidth: 300},
     {field: "factorNumber", headerName: "ش فاکتور",maxWidth: 150},
      {field: "user",headerName: "طرف حساب",maxWidth: 300,},
      { field: "creatDate", headerName: " تاریخ فاکتور", maxWidth: 300,
        cellRenderer:(params)=>(
          <DateFormat dateString={params.data.creatDate}/>
        )
       },
      { field: "quantity", headerName: " تعداد",maxWidth: 150  },
      { field: "unitPrice", headerName: " قیمت",maxWidth: 150  },
      { field: "totalPrice", headerName: " قیمت کل",maxWidth: 150  },
    ])

  const handleChange = (event, value) => {
    if (!tableState) {
      setPage(value);
      GetProductItem(value - 1, pageCount);
    } else if (tableState) {
      // setProductNumberPagi((page-1)*100)
      setPage(value);
      let obj = {
        name: searchObj.name ? searchObj.name : null,
        productCategoryCode: searchObj.productCategoryCode
          ? searchObj.productCategoryCode
          : null,
        categoryCode: searchObj.categoryCode ? searchObj.categoryCode : null,
        manufacturerName: searchObj.manufacturerName
          ? searchObj.manufacturerName
          : null,
        pageNumber: value - 1,
        pageSize: pageCount,
      };
      setSearchItem(obj);
      // handleRegistrationB(data)
      // getSearchItem(value-1, pageCount)
    }
  };
  ////////////////////////////////
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });



  const updateQuntityExell = () => {
    setFlagUpdateAnbar(true);
    setShow(true);
    async function myApp() {
      const res = await fetch(
        `${apiUrl}/api/CyProducts/UpdateByExcel?input=${guId}`,
        {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          GetProductItem(page - 1, pageCount);
          setShow(false);
          setFlagUpdateAnbar(false);

          alertS(
            "center",
            "success",
            "تعداد محصولات به روزرسانی شد",
            1500,
            false
          );
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };

  /////////////////////////////////
  const handelUpdate = (obj) => {
    async function myAppPut() {
      const res = await fetch(`${apiUrl}/api/CyProducts/${putId}`, {
        method: "PUT",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "ویرایش با موفقیت انجام شد",
              showConfirmButton: false,
              timer: 1500,
            });
            reset(setValue(""));
            resetB(setValueB(""));
            setResetSearchbox(true);
            setFlagUpdate(false);
            // getAllProductB()
            // GetProductItem(page - 1, pageCount);
            // setProductArray([]);
            setProductById([]);
            if (flagSearchNoImg) {
              return getNOimgProduct(objNoImg);
            }
          }
        })
        .catch((err) => console.log(err));
    }
    myAppPut();
  };


  const setSearchItem = (obj) => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyProducts/SearchProducts`, {
        method: "POST",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result) {
            setSearchState(result);
          }
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };
  const getNOimgProduct = (obj) => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyProducts/productsWithNull`, {
        method: "POST",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setProductArrayB(result.itemList);
          setFlagSearchNoImg(true);
          setTableState(true);
        });
    }
    myApp();
  };
  const handleRegistrationC = (data) => {
    // console.log(data)
    let obj = {
      property: Number(data.radio),
      pageNumber: 0,
      pageSize: 100000,
    };
    setObjNoImg(obj);
    getNOimgProduct(obj);
  };

  const handleRegistrationB = (data) => {
    // console.log(data)
    setSearchState([]);
    setPage(1);
    setTableState(true);
    let obj = {
      name: data.searchName ? data.searchName.trim() : null,
      productCategoryCode: data.searchproductCategoryCode
        ? data.searchproductCategoryCode
        : null,
      categoryCode: data.searchcategoryCode ? data.searchcategoryCode : null,
      manufacturerName: data.searchmanufacturerName
        ? data.searchmanufacturerName
        : null,
      pageNumber: 0,
      pageSize: 100,
    };
    setSearchObj(obj);
    setSearchItem(obj);
    // console.log(obj)
  };
  const handleRegistration = (data) => {
    // console.log(data)
    let obj2 = paramiterArray?.map((item) => ({
      id: 0,
      name: item.names,
      value: item.values,
      cyProductId: 0,
    }));
    if (!flagUpdate) {
      let obj = {
        id: 0,
        name: data.name,
        description: data.description,
        price: Number(data.price),
        noOffPrice: Number(data.noOffPrice),
        productCode: data.productCode,
        partNo: data.partNo,
        mfrNo: data.mfrNo,
        datasheetUrl: data.datasheetUrl,
        supply: data.supply ? data.supply : 0,
        cyManufacturerId: data.manufacture,
        cyCategoryId: data.category,
        cyProductCategoryId: data.categoryB,
        spec: obj2,
      };
      async function myAppPost() {
        const res = await fetch(`${apiUrl}/api/CyProducts`, {
          method: "POST",
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "محصول با موفقیت اضافه شد",
                showConfirmButton: false,
                timer: 1500,
              });
              reset(setValue(""));
              getAllProductB()
              // GetProductItem(page - 1, pageCount);
              setResetSearchbox(true);
            }
          })
          .catch((err) => console.log(err));
      }
      if (data.manufacture && data.category && data.categoryB) {
        setFlagError(false);
        myAppPost();
      } else if (!data.manufacture || !data.category || !data.categoryB) {
        setFlagError(true);
      } 
    } else if (flagUpdate) {
      let obj3 = paramiterArrayB?.map((item) => ({
        id: item.id,
        name: item.names,
        value: item.values,
        cyProductId: putId,
      }));
      let obj2 = paramiterArray?.map((item) => ({
        id: 0,
        name: item.names,
        value: item.values,
        cyProductId: putId,
      }));
      let mergedArray = [...new Set([...obj2.flat(), ...obj3])];

      if (productById[0] !== null) {
        let mergedArray2 = [...new Set([...obj2.flat(), ...productById[0]])];
        let obj = {
          id: putId,
          name: data.update.name,
          description: data.update.description,
          price: data.update.price,
          price2: data.update.price2,
          price3: data.update.price3,
          price4: data.update.price4,
          shopPrice: Number(data.update.shopPrice),

          noOffPrice: data.update.noOffPrice,
          productCode: data.update.productCode,
          partNo: data.update.partNo,
          mfrNo: data.update.mfrNo,
          datasheetUrl: data.update.datasheetUrl,
          supply: data.update.supply ? data.update.supply : 0,
          cyManufacturerId: !xtSearchG
            ? data.update.manufacture
            : data.manufacture,
          cyCategoryId: !xtSearchE ? data.update.category : data.category,
          cyProductCategoryId: !xtSearchF
            ? data.update.categoryB
            : data.categoryB,
          spec: obj3?.length != 0 ? mergedArray : mergedArray2,
        };
        handelUpdate(obj);
      } else if (productById[0] == null) {
        // let mergedArray2 = [...new Set([...obj2.flat(), ...productById[0]])];
        let obj = {
          id: putId,
          name: data.update.name,
          description: data.update.description,
          price: Number(data.update.price),
          price2: Number(data.update.price2),
          price3: Number(data.update.price3),
          price4: Number(data.update.price4),
          shopPrice: Number(data.update.shopPrice),
          noOffPrice: data.update.noOffPrice,
          productCode: data.update.productCode,
          partNo: data.update.partNo,
          mfrNo: data.update.mfrNo,
          datasheetUrl: data.update.datasheetUrl,
          cyManufacturerId: !xtSearchG
            ? data.update.manufacture
            : data.manufacture,
          cyCategoryId: !xtSearchE ? data.update.category : data.category,
          cyProductCategoryId: !xtSearchF
            ? data.update.categoryB
            : data.categoryB,
          supply: data.update.supply ? data.update.supply : 0,
          spec: obj2,
        };

        handelUpdate(obj);
      }
    }
  };
  ////////////////////////////////

const getProductKartex=(id)=>{
  ApiGetX2(`/api/CyProductsB/KartexProduct?id=${id}`,setKartex)
}

  ////////////////////////////////
  const GetProductItem = (pageNumber, pageSize) => {
    setFlagpagin(true);
    let obj = {
      cat: "asdsa",
      pageNumber: pageNumber,
      pageSize: pageSize,
    };
    async function myAppGetProduct() {
      const res = await fetch(`${apiUrl}/api/CyProducts/getAllProducts`, {
        method: "POST",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result) {
            setProductArray(result.itemList);
            setStateArray(result.allCount);
            setFlagpagin(false);
          }
        })
        .catch((error) => {
          navigate("/errorpage");
        });
    }
    myAppGetProduct();
  };

  ///////////////////////////////
  const GetCategoryBItem = () => {
    ApiGetB("/api/CyProductCategory", setCategoriItemB, navigate);
  };
  const GetCategoryItem = () => {
    ApiGetB("/api/CyCategories", setCategoriItem, navigate);
  };
  //////////////////////////
  const GetmanufactureItem = () => {
    ApiGetB("/api/CyManufacturer", setManufactureItem, navigate);
  };
  /////////////////////
  const deleteHandler = (id) => {
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
          async function myAppDelet() {
            const res = await fetch(`${apiUrl}/api/CyProducts/${id}`, {
              method: "DELETE",
              credentials: "include",

              headers: {
                // Authorization: `Bearer ${cmsContext.token.token}`,
              },
            })
              .then((res) => console.log(res))
              .then((result) => {
                swalWithBootstrapButtons
                  .fire({
                    title: "حذف انجام شد!",
                    icon: "success",
                  })
                  .then((result) => {
                    getAllProductB()
                    // GetProductItem(page - 1, pageCount);
                    setFlagUpdate(false);
                    reset(setValue(""));
                    setProductById([]);
                  });
              })
              .catch((err) => console.log(err));
          }
          myAppDelet();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "حذف انجام نشد",
            icon: "error",
          });
        }
      });
    setFlagUpdate(false);
    reset(setValue(""));
  };
  //////////////////////////
  const getProductById = (id) => {
    async function myAppGet() {
      const res = await fetch(`${apiUrl}/api/CyProducts/${id}`, {
        method: "GET",
        credentials: "include",

        headers: {
          // Authorization: `Bearer ${cmsContext.token.token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          setProductById(
            Object.keys(result)
              .filter((key) => key.startsWith("spec"))
              ?.map((key) => result[key])
          );
        })
        .catch((error) => navigate("/errorpage"));
    }
    myAppGet();
  };

  /////////////////////
  const editHandler = (...data) => {
    reset(setValue(""));
    setCteArray([]);
    setProductById([]);
    getProductById(data[0]);
    setPutId(data[0]);
    setFlagUpdate(true);
    setResetSearchbox(true);
    setValue("update", {
      name: data[1],
      description: data[2],
      partNo: data[3],
      mfrNo: data[4],
      datasheetUrl: data[5],
      manufacture: data[8],
      category: data[9],
      price: data[10],
      noOffPrice: data[11],
      supply: data[13],
      categoryB: data[14],
      productCode: data[15],
      price2: data[16],
      price3: data[17],
      price4: data[18],
      shopPrice: data[19]

    });
    setCteArray((prev) => [...prev, data[9], data[14], data[8]]);
    // console.log(data[12])
  };
  /////////////////////////
  const modalDetailProduct = (...data) => {
    setDetailProduct(data);
  };
  /////////////////
  const resetUpdatFieldB = () => {
    setTableState(false);
    setPage(1);
    resetB(setValueB(""));
    setResetSearchbox(true);
    setFlagSearchNoImg(false);
  };
  const resetUpdatFieldC = () => {
    setFlagSearchNoImg(false);
    setProductArrayB([]);
    setTableState(false);
  };

  const resetUpdatField = () => {
    setFlagUpdate(false);
    reset(setValue(""));
    setProductById([]);
    setResetSearchbox(true);
  };

  const getAllProductB=()=>{
    ApiGetX2(`/api/CyProducts/allProducsB`,setProductArray)
  }


  /////////////////////////
  useEffect(() => {
    if (statearray?.length != 0 && !tableState) {
      let x = statearray;
      let countInPage = pageCount;
      let z = Math.ceil(x / countInPage);
      z
        ? setPaginationArray(Array.from({ length: z }))
        : setPaginationArray([]);
    } else if (tableState) {
      let x = searchState.allCount;
      let countInPage = pageCount;
      let z = Math.ceil(x / countInPage);
      z
        ? setPaginationArray(Array.from({ length: z }))
        : setPaginationArray([]);
    }
  }, [statearray, searchState, tableState]);
  ////////////////////////
  useEffect(() => {
    GetCategoryItem();
    GetCategoryBItem();
    GetmanufactureItem();
    getAllProductB()
    // GetProductItem(page - 1, pageCount);

  }, []);

  useEffect(() => {
    setValueB("searchcategoryCode", `${xtSearchB}`);
    setValueB("searchproductCategoryCode", `${xtSearchC}`);
    setValueB("searchmanufacturerName", `${xtSearchD}`);
    setValue("category", `${xtSearchE}`);
    setValue("categoryB", `${xtSearchF}`);
    setValue("manufacture", `${xtSearchG}`);
  }, [xtSearchB, xtSearchC, xtSearchD, xtSearchE, xtSearchF, xtSearchG]);

  useEffect(() => {
    setFlagError(false);
  }, [xtSearchE, xtSearchF, xtSearchG]);
  useEffect(() => {
    return () => {
      setResetSearchbox(true);
      setFlagError(false);
    };
  }, []);

  console.log(manufactureItem);
  return (
    <div className="container">
      {flagPagin && (
        <div className="product-loader">
          <div className="skin-colsm9-div">
            <DotLoader color="#0d6efd" loading size={150} speedMultiplier={1} />
          </div>
        </div>
      )}


      {flagUpdateAnbar && (
        <Modal show={show}>
          <div className="product-loaderB">
            <div className="skin-colsm9-div">
              <DotLoader
                color="#0d6efd"
                loading
                size={150}
                speedMultiplier={1}
              />
            </div>
          </div>
        </Modal>
      )}

      <div className="row">
        <form
          key={1}
          className="producted-form"
          onSubmit={handleSubmit(
            handleRegistration,
            handleError,
          )}
        >
          <div className="row">
            <div className="col-lg-4 producted-form-col9">
              <div className="producted-login-label-float">
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
                <label>عنوان محصول </label>
              </div>

              <div className="producted-login-label-float">
                <input
                  name="description"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "description" : "update.description",
                    registerOptions.description
                  )}
                />
                <label>توضیحات </label>
              </div>

              <div className={!flagUpdate ? "producted-login-label-float disable" : "producted-login-label-float"} >
                <input
                  name="price"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "price" : "update.price",
                  )}
                />
                <label>مشتری قیمت </label>
              </div>

              <div className={!flagUpdate ? "producted-login-label-float disable" : "producted-login-label-float"}>
                <input
                  name="price2"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "price2" : "update.price2",
                    flagUpdate ? registerOptions.price2 : ''
                  )}
                />
                <label>همکار2 قیمت </label>
              </div>

              <div className={!flagUpdate ? "producted-login-label-float disable" : "producted-login-label-float"}>
                <input
                  name="price3"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "price3" : "update.price3",
                    flagUpdate ? registerOptions.price2 : '')}
                />
                <label>همکار3 قیمت </label>
              </div>

              <div className={!flagUpdate ? "producted-login-label-float disable" : "producted-login-label-float"}>
                <input
                  name="price4"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "price4" : "update.price4",
                    flagUpdate ? registerOptions.price2 : '')}
                />
                <label>همکار4 قیمت </label>
              </div>

              <div style={{ display: 'none' }} className="producted-login-label-float">
                <input
                  name="noOffPrice"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "noOffPrice" : "update.noOffPrice",
                    flagUpdate ? registerOptions.price2 : '')}
                />
                <label>قیمت بدون تخفیف </label>
              </div>





            </div>

<div className="col-lg-4 producted-form-col9">

              <div className="producted-login-label-float">
                <input
                  disabled
                  name="supply"
                  type="number"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "supply" : "update.supply",
                  )}
                />
                <label> موجودی </label>
              </div>


              <div className="producted-login-label-float">
                <input
                  disabled
                  name="shopPrice"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "shopPrice" : "update.shopPrice",
                  )}
                />
                <label>قیمت  خرید </label>
              </div>

              <div className="producted-login-label-float">
                <input
                  name="partNo"
                  type="text"
                  placeholder=""
                  className={errors.partNo ? "formerror" : ""}
                  {...register(
                    !flagUpdate ? "partNo" : "update.partNo",
                  )}
                />
                <label>پارت نامبر</label>
              </div>

              <div className="producted-login-label-float">
                <input
                  name="productCode"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "productCode" : "update.productCode",
                  )}
                />
                <label>کد محصول </label>
              </div>

              <div className="producted-login-label-float">
                <input
                  name="mfrNo"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "mfrNo" : "update.mfrNo",
                  )}
                />
                <label>شماره سازنده </label>
              </div>
              <div className="producted-login-label-float">
                <input
                  name="datasheetUrl"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "datasheetUrl" : "update.datasheetUrl",
                  )}
                />
                <label>دیتاشیت </label>
              </div>

</div>


            <div className="col-lg-4 producted-col3 ">
              <div className="producted-form-col3">
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <SearchBox
                    array={categoryItem}
                    placeholder={"دسته بندی عمومی..."}
                    id="categoryCodeForAdd"
                    classs={"categoryCodeForAdd"}
                  />

                  {flagUpdate ? (
                    <span
                      style={{
                        position: "absolute",
                        left: "50px",
                        top: "50%",
                        fontWeight: "bold",
                      }}
                    >
                      {categoryItem.filter((itemF) => {
                        return itemF.id == cteArray[0];
                      })[0] &&
                        categoryItem.filter((itemF) => {
                          return itemF.id == cteArray[0];
                        })[0].text}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <SearchBox
                    array={categoryItemB}
                    placeholder={"دسته بندی تخصصی..."}
                    id="productCategoryCodeForAdd"
                    classs={"productCategoryCodeForAdd"}
                  />
                  {flagUpdate ? (
                    <span
                      style={{
                        position: "absolute",
                        left: "50px",
                        top: "50%",
                        fontWeight: "bold",
                      }}
                    >
                      {categoryItemB.filter((itemF) => {
                        return itemF.id == cteArray[1];
                      })[0] &&
                        categoryItemB.filter((itemF) => {
                          return itemF.id == cteArray[1];
                        })[0].name}
                    </span>
                  ) : (
                    ""
                  )}
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    position: "relative",
                  }}
                >
                  <SearchBox
                    array={manufactureItem}
                    placeholder={"شرکت سازنده..."}
                    id="manufacturerNameForAdd"
                    classs={"manufacturerNameForAdd"}
                  />
                  {flagUpdate ? (
                    <span
                      style={{
                        position: "absolute",
                        left: "50px",
                        top: "50%",
                        fontWeight: "bold",
                      }}
                    >
                      {manufactureItem.filter((itemF) => {
                        return itemF.id == cteArray[2];
                      })[0] &&
                        manufactureItem.filter((itemF) => {
                          return itemF.id == cteArray[2];
                        })[0].name}
                    </span>
                  ) : (
                    ""
                  )}
                </div>


                {flagUpdate && (
                  <div className="skin-resticon">
<span className="boxSh" onClick={resetUpdatField}>
  <Refresh style={{fontSize:'35px' ,color:"#2050ec",cursor:"pointer"}}/>
</span>


                    {/* <i
                      class="fa-solid fa-rotate-left fa-2xl"
                      style={{ color: " #74C0FC" }}
                      onClick={resetUpdatField}
                    ></i> */}
                  </div>
                )}
                <Button
                  className="producted-regbutton"
                  type="submit"
                  variant="contained"
                  color="info"
                  endIcon={<SendIcon />}
                >
                  {!flagUpdate ? <span> افزودن </span> : <span> ویرایش </span>}
                </Button>
              </div>
            </div>

          </div>
        </form>




        <div className="row mt-5">
          <div className="col product-col-table">
            <>
         {/* <div className="product-countUpdate-div">
                <div className="product-countUpdate-div_div">
                  <input
                    className=" Product-search"
                    placeholder="عنوان"
                    name="search"
                    type="file"
                    onChange={fileChange7}
                  />

                  <button
                    className="btn btn-outline-info"
                    style={{ height: "50px", margin: "5px", width: "200px" }}
                    type="submit"
                    onClick={() => {
                      updateQuntityExell();
                    }}
                  >
                    به روز رسانی موجودی{" "}
                  </button>
                </div>
              </div>



              <div className="product-search-div">
                <form
                  key={2}
                  onSubmit={handleSubmitFormB(handleRegistrationB)}
                  className="product-search-form"
                >
                  <input
                    className={
                      !tableState
                        ? " Product-search"
                        : "Product-search productdisable"
                    }
                    placeholder="عنوان"
                    name="search"
                    type="text"
                    {...registerFormB("searchName")}
                  />

                  <SearchBox
                    array={categoryItemB}
                    placeholder={"دسته بندی تخصصی..."}
                    id="productCategoryCode"
                    classs={tableState ? "productdisable" : ""}
                  />

                  <SearchBox
                    array={manufactureItem}
                    placeholder={"شرکت سازنده..."}
                    id="manufacturerName"
                    classs={tableState ? "productdisable" : ""}
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
              </div> */}


{/* 

             {paginationArray.length > 1 && !flagSearchNoImg && (
                <>
                  <div className="pagination-div">
                    <Pagination
                      count={paginationArray.length}
                      page={page}
                      ref={classRefB}
                      onChange={handleChange}
                      color="primary"
                      shape="rounded"
                      style={{ direction: "ltr" }}
                    //  onClick={() => ChangePage(page)}
                    />
                  </div>
                </>
              )} */}


<button className="btn btn-light boxSh" onClick={()=>{
  setProductArray([])
  getAllProductB()
}}>
  <ArrowDropDownCircle style={{fontSize:'35px' ,color:"#2050ec",cursor:"pointer"}}/>تازه سازی لیست محصولات
</button>

                    {!tableState &&
                      productArray?.length != 0 &&
                      !flagSearchNoImg
                      ? 
                      <div className='col' style={{ height: "1000px", }}>
                <BaseGrid rowData={productArray} colDefs={colDefs} rtl={true} fontSize='18px' />
              </div>
                      : tableState &&
                        searchState.itemList?.length != 0 &&
                        !flagSearchNoImg
                        ? 
                            <div className='col' style={{ height: "1000px", }}>
                <BaseGrid rowData={searchState.itemList} colDefs={colDefs} rtl={true} fontSize='18px' />
              </div>

                        : flagSearchNoImg &&
                        productArrayB?.length != 0 &&
                                                 <div className='col' style={{ height: "1000px", }}>
                <BaseGrid rowData={productArrayB} colDefs={colDefs} rtl={true} fontSize='18px' />
              </div>
                        }

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
                          strings: ["محصولی با این مشخصات یافت نشد..."],
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </h1>
                  </div>
                ) : (
                  ""
                )}
              {paginationArray.length > 1 && !flagSearchNoImg && (
                <>
                  <div className="pagination-div">
                    <Pagination
                      count={paginationArray.length}
                      page={page}
                      ref={classRefB}
                      onChange={handleChange}
                      color="primary"
                      shape="rounded"
                      style={{ direction: "ltr" }}
                    //  onClick={() => ChangePage(page)}
                    />
                  </div>
                </>
              )}
            </>
            {/* } */}
          </div>
        </div>
      </div>

      <>
        <Modal
          show={lgShow}
          fullscreen={true}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
                             <div  style={{ height: "1000px", }}>
                <BaseGrid rowData={kartex} colDefs={colDefsB} rtl={true} fontSize='18px' />
              </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
