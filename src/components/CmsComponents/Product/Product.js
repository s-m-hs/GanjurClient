import React, { useContext, useEffect, useState, useRef } from "react";
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

export default function Product() {
  const [categoryItem, setCategoriItem] = useState([]);
  const [categoryItemB, setCategoriItemB] = useState([]);
  const [manufactureItem, setManufactureItem] = useState([]);
  const [productArray, setProductArray] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [detailProduct, setDetailProduct] = useState([]);
  const [putId, setPutId] = useState("");
  const [lgShow, setLgShow] = useState(false);
  const [file, setFile] = useState({});
  const [imgUrl, setImgUrl] = useState("");
  const [file2, setFile2] = useState({});
  const [imgUrl2, setImgUrl2] = useState("");
  const [file3, setFile3] = useState({});
  const [file4, setFile4] = useState({});
  const [imgUrl3, setImgUrl3] = useState("");
  const [imgArray, setImageArray] = useState([]);
  const [paramiterArray, setParamiterArray] = useState([]);
  const [paramiterArrayB, setParamiterArrayB] = useState([]);
  const [productById, setProductById] = useState([]);
  const navigate = useNavigate();
  const cmsContext = useContext(CmsContext);
  const productRevers = productArray?.slice().reverse();
  const [arrayValue, setArrayValue] = useState([]);
  const [removeArray, setRemoveArray] = useState([]);
  const [paginationArray, setPaginationArray] = useState([]);
  const [statearray, setStateArray] = useState("");
  const [page, setPage] = React.useState(1);
  const classRefB = useRef();
  const pageCount = 100;
  const productNumberPagi = (page - 1) * 100;
  const [flagPagin, setFlagpagin] = useState(false);
  const [tableState, setTableState] = useState(false);
  const [searchState, setSearchState] = useState([]);
  const [searchObj, setSearchObj] = useState({});
  const [guId, setGuId] = useState("");
  const [cteArray, setCteArray] = useState([]);
  // const authHeader = cmsContext.token.token;
  const [flagSearchNoImg, setFlagSearchNoImg] = useState(false);
  const [productArrayB, setProductArrayB] = useState([]);
  const [objNoImg, setObjNoImg] = useState([]);
  const homeContext = useContext(HomeContext);
  const [flagUpdateAnbar, setFlagUpdateAnbar] = useState(false);
  const styleRef = useRef();
  const [show, setShow] = useState(false);

  const styleRefB = useRef()
  // const styleRefC=useRef()
  // const styleRefD=useRef()
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
    search: { required: "category is required" },
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
  const fileChange5 = (e) => {
    setFile3(e.target.files[0]);
  };
  const fileChange6 = (e) => {
    setFile3("");
    setImgUrl3(e.target.value);
  };
  ///exell uploud
  const fileChange7 = (e) => {
    setFile4(e.target.files[0]);
  };
  const changeUplode = () => {
    // event.preventDefault()
    let formData = new FormData();
    formData.append("File", file4);
    formData.append("Name", "");
    formData.append("Description", "");
    formData.append("IsPrivate", true);
    // console.log(formData.get('File'));
    async function myAppPostFile() {
      const res = await fetch(`${apiUrl}/api/CyFiles/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then((res) => {
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          // console.log(result);
          if (result) {
            setGuId(result.id);
          }
        });
    }
    myAppPostFile();
  };

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
          console.log(res);
          if (res.status == 200) {
            return res.json();
          }
        })
        .then((result) => {
          setFile4({});
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

  //
  //////////////////////////////
  ///import  fileUploadHandler from out component
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
  useEffect(() => {
    if (file3?.name) {
      fileUploadHandler(file3, setImgUrl3);
    }
  }, [file3]);
  useEffect(() => {
    if (file4) {
      changeUplode();
    }
  }, [file4]);
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
          // console.log(res)
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
            GetProductItem(page - 1, pageCount);
            setProductArray([]);
            setImgUrl("");
            setFile("");
            setFile2("");
            setImgUrl2("");
            setImageArray([]);
            setProductById([]);
            setParamiterArray([]);
            setArrayValue([]);
            // setTableState(false);
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
    let obj2 = paramiterArray.map((item) => ({
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
        mainImage: file2.name ? `${apiUrl}/${imgUrl2}` : imgUrl2,
        smallImage: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
        images: imgArray.join("*,*"),
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
                title: "محصول با موفقیت اضافه شد",
                showConfirmButton: false,
                timer: 1500,
              });
              reset(setValue(""));
              GetProductItem(page - 1, pageCount);
              setImgUrl("");
              setFile("");
              setFile2("");
              setImgUrl2("");
              setImageArray([]);
              setParamiterArray([]);
              setArrayValue([]);
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
      } else if (!data.category) {
        // styleRefB.current.classList.add('formerroryy')
      } else if (!data.manufacture) {
        // styleRefC.current.classList.add('formerroryy')
      } else if (!data.categoryB) {
        // styleRefD.current.classList.add('formerroryy')
      }
    } else if (flagUpdate) {
      let obj3 = paramiterArrayB.map((item) => ({
        id: item.id,
        name: item.names,
        value: item.values,
        cyProductId: putId,
      }));
      let obj2 = paramiterArray.map((item) => ({
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
          noOffPrice: data.update.noOffPrice,
          productCode: data.update.productCode,
          partNo: data.update.partNo,
          mfrNo: data.update.mfrNo,
          datasheetUrl: data.update.datasheetUrl,
          supply: data.update.supply ? data.update.supply : 0,
          mainImage: file2.name ? `${apiUrl}/${imgUrl2}` : imgUrl2,
          smallImage: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
          images: imgArray.join("*,*"),
          cyManufacturerId: !xtSearchG
            ? data.update.manufacture
            : data.manufacture,
          cyCategoryId: !xtSearchE ? data.update.category : data.category,
          cyProductCategoryId: !xtSearchF
            ? data.update.categoryB
            : data.categoryB,
          spec: obj3.length != 0 ? mergedArray : mergedArray2,
        };
        handelUpdate(obj);
      } else if (productById[0] == null) {
        // let mergedArray2 = [...new Set([...obj2.flat(), ...productById[0]])];

        let obj = {
          id: putId,
          name: data.update.name,
          description: data.update.description,
          price: data.update.price,
          noOffPrice: data.update.noOffPrice,
          productCode: data.update.productCode,
          partNo: data.update.partNo,
          mfrNo: data.update.mfrNo,
          datasheetUrl: data.update.datasheetUrl,
          mainImage: file2.name ? `${apiUrl}/${imgUrl2}` : imgUrl2,
          smallImage: file.name ? `${apiUrl}/${imgUrl}` : imgUrl,
          images: imgArray.join("*,*"),
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
                    // GetProductItem()
                    GetProductItem(page - 1, pageCount);
                    setFlagUpdate(false);
                    reset(setValue(""));
                    setImgUrl("");
                    setFile("");
                    setFile2("");
                    setImgUrl2("");
                    setImageArray([]);
                    setParamiterArray([]);
                    setArrayValue([]);
                    setImageArray([]);
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
    setImgUrl("");
    setFile("");
    setFile2("");
    setImgUrl2("");
    setImageArray([]);
    setParamiterArray([]);
    setArrayValue([]);
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
              .map((key) => result[key])
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
    setParamiterArray([]);
    setParamiterArrayB([]);
    setProductById([]);
    setArrayValue([]);
    getProductById(data[0]);
    setPutId(data[0]);
    setFlagUpdate(true);
    setImgUrl(data[7]);
    setImgUrl2(data[6]);
    setFile("");
    setFile2("");
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
    });
    setCteArray((prev) => [...prev, data[9], data[14], data[8]]);
    setImageArray(data[12].split("*,*"));
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
    setFile("");
    setFile2("");
    setImgUrl("");
    setImgUrl2("");
    setImageArray([]);
    setImageArray([]);
    setParamiterArray([]);
    setArrayValue([]);
    setResetSearchbox(true);
  };
  ///////////////////////
  const addImageArray = (e) => {
    e.preventDefault();
    if (!file3 && imgUrl3) {
      setImageArray((prev) => [...prev, imgUrl3]);
    } else if (file3) {
      setImageArray((prev) => [...prev, `${apiUrl}/${imgUrl3}`]);
    }
    setFile3("");
    setImgUrl3("");
  };
  const dellIcon = (e) => {
    setImageArray(imgArray.filter((item) => item !== e.target.src));
  };
  //////////////////////
  const addArrayValue = (e) => {
    e.preventDefault();
    if (!flagUpdate) {
      setArrayValue((prev) => [...prev, prev + 1]);
    } else if (flagUpdate) {
      setArrayValue((prev) => [...prev, prev + 1]);
    }
  };
  const changParameter = (data) => {
    setParamiterArray(
      Object.keys(data)
        .filter((key) => key.startsWith("proParamiter"))
        .map((key) => data[key])
    );
  };

  const removeProKey = (e, id) => {
    e.preventDefault();
    setRemoveArray((prev) => [...prev, id]);
    let x = productById[0].findIndex((item) => item.id == id);
    let y = productById[0].splice(x, 1);
    if (paramiterArrayB.length != 0) {
      paramiterArrayB.splice(x, 1);
    }
  };
  const changParameterB = (data, id) => {
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        let numericPart = key.match(/\d+/)[0]; // Extract numeric part from the key
        data[key].id = parseInt(numericPart, 10); // Add it as the id property
        setParamiterArrayB(Object.values(data));
      }
    }
  };

  ////////////////////////
  useEffect(() => {
    if (imgUrl3) {
      styleRef.current.classList.remove("producted-disabled");
    } else {
      styleRef.current.classList.add("producted-disabled");
    }
  }, [imgUrl3]);
  /////////////////////////
  useEffect(() => {
    if (statearray.length != 0 && !tableState) {
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
    GetProductItem(page - 1, pageCount);
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

  return (
    <div className="container">
      {flagPagin && (
        <div className="product-loader">
          <div className="skin-colsm9-div">
            <DotLoader color="#0d6efd" loading size={150} speedMultiplier={1} />
          </div>
        </div>
      )}
      {/* <Modal show={show} >
       <div className='product-loaderB'>
      <div className='skin-colsm9-div' >
                <DotLoader
                  color="#0d6efd"
                  loading
                  size={150}
                  speedMultiplier={1}
                /></div>
      </div>
        </Modal> */}

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
            addArrayValue
          )}
        >
          <div className="row">
            <div className="col-lg-5 producted-form-col9">
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

              <div className="producted-login-label-float">
                <input
                  name="partNo"
                  type="text"
                  placeholder=""
                  className={errors.partNo ? "formerror" : ""}
                  {...register(
                    !flagUpdate ? "partNo" : "update.partNo",
                    registerOptions.partNo
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
                    registerOptions.productCode
                  )}
                />
                <label>کد محصول </label>
              </div>

              <div className="producted-login-label-float">
                <input type="text" onChange={fileChange4} value={imgUrl2} />
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
                      src={!flagUpdate ? `${apiUrl}/${imgUrl2}` : imgUrl2}
                      alt=""
                    />{" "}
                  </span>
                  <img
                    className="producted-img-image"
                    src={!flagUpdate ? imgUrl2 : `${apiUrl}/${imgUrl2}`}
                    alt=""
                  />
                </div>
              </div>
              <div className="producted-login-label-float">
                <input type="text" onChange={fileChange2} value={imgUrl} />
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
                      src={!flagUpdate ? `${apiUrl}/${imgUrl}` : imgUrl}
                      alt=""
                    />{" "}
                  </span>
                  <img
                    className="producted-img-image"
                    src={!flagUpdate ? imgUrl : `${apiUrl}/${imgUrl}`}
                    alt=""
                  />
                </div>
              </div>

              <div className="producted-login-label-float">
                <input
                  name="mfrNo"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "mfrNo" : "update.mfrNo",
                    registerOptions.mfrNo
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
                    registerOptions.datasheetUrl
                  )}
                />
                <label>دیتاشیت </label>
              </div>

              <div className="producted-login-label-float">
                <input
                  name="price"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "price" : "update.price",
                    registerOptions.price
                  )}
                />
                <label> قیمت </label>
              </div>
              <div className="producted-login-label-float">
                <input
                  name="noOffPrice"
                  type="text"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "noOffPrice" : "update.noOffPrice",
                    registerOptions.noOffPrice
                  )}
                />
                <label>قیمت بدون تخفیف </label>
              </div>

              <div className="producted-login-label-float">
                <input
                  name="supply"
                  type="number"
                  placeholder=""
                  {...register(
                    !flagUpdate ? "supply" : "update.supply",
                    registerOptions.supply
                  )}
                />
                <label> موجودی </label>
              </div>
            </div>

            <div className="col-lg-5 producted-col3 ">
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

                <div className="producted-keyvalue-div">
                  <button
                    className="btn btn-info producted-keyvalue-button"
                    onClick={(e) => {
                      addArrayValue(e);
                    }}
                  >
                    <i class="fa-solid fa-plus" style={{ color: "white" }}></i>
                  </button>

                  <div className="producted-login-label-float producted-keyvalue-main">
                    {!flagUpdate &&
                      arrayValue.map((item, index) => (
                        <div
                          className="producted-login-label-float producted-keyvalue"
                          key={index}
                        >
                          <input
                            type="text"
                            {...register(`proParamiter${index}.names`)}
                            onChange={() => {
                              const values = getValues();
                              changParameter(values);
                            }}
                          />
                          <input
                            type="text"
                            onChange={() => {
                              const values = getValues();
                              changParameter(values);
                            }}
                            {...register(`proParamiter${index}.values`)}
                          />
                        </div>
                      ))}
                    {flagUpdate &&
                      arrayValue.map((item, index) => (
                        <div
                          className="producted-login-label-float producted-keyvalue"
                          key={index}
                        >
                          <input
                            type="text"
                            {...register(`proParamiter${index}.names`)}
                            onChange={() => {
                              const values = getValues();
                              changParameter(values);
                            }}
                          />
                          <input
                            type="text"
                            {...register(`proParamiter${index}.values`)}
                            onChange={() => {
                              const values = getValues();
                              changParameter(values);
                            }}
                          />
                        </div>
                      ))}
                    {productById[0] &&
                      productById[0].map((item, index) => (
                        <div className="producted-login-label-float producted-keyvalue">
                          <input
                            type="text"
                            {...register(`root.proParam${item.id}.names`, {
                              value: item.name,
                            })}
                            onChange={() => {
                              const values = getValues("root");
                              changParameterB(values, item.id);
                            }}
                          />
                          <input
                            type="text"
                            {...register(`root.proParam${item.id}.values`, {
                              value: item.value,
                            })}
                            onChange={() => {
                              const values = getValues("root");
                              changParameterB(values, item.id);
                            }}
                          />
                          <button onClick={(e) => removeProKey(e, item.id)}>
                            <i
                              class="fa-regular fa-trash-can"
                              style={{ color: " red" }}
                            ></i>
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
                {flagUpdate && (
                  <div className="skin-resticon">
                    <i
                      class="fa-solid fa-rotate-left fa-2xl"
                      style={{ color: " #74C0FC" }}
                      onClick={resetUpdatField}
                    ></i>
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

            <div className="col-lg-2 producted-col2">
              <div className="producted-newimg-main-div">
                <div className="producted-newimg-div">
                  {imgArray.length != 0 &&
                    imgArray.map((item) => (
                      <>
                        <div className="producted-newimg-imgarray-div">
                          {item && (
                            <img
                              className="producted-newimg-arrayimg"
                              src={item}
                              alt=""
                              onClick={dellIcon}
                            />
                          )}
                          {/* <i class="fa-solid fa-close"style={{color:'red'}}  ></i> */}
                        </div>
                      </>
                    ))}
                </div>
                <button
                  className="btn btn-primary producted-newimg-button producted-disabled"
                  ref={styleRef}
                  onClick={addImageArray}
                >
                  {" "}
                  تایید
                </button>
              </div>
              <div className="producted-login-label-float producted-input-custum">
                <input type="text" onChange={fileChange6} value={imgUrl3} />
                <label>عکس محصول </label>
                <input
                  type="file"
                  placeholder="عکس اصلی"
                  className="producted-img-input"
                  onChange={fileChange5}
                />

                <span>
                  <img
                    className="producted-img-image"
                    src={!flagUpdate ? `${apiUrl}/${imgUrl3}` : imgUrl3}
                    alt=""
                  />{" "}
                </span>
                <img
                  className="producted-img-image"
                  src={!flagUpdate ? imgUrl3 : `${apiUrl}/${imgUrl3}`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </form>

        <div className="row mt-5">
          <div className="col product-col-table">
            <>
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
                    array={categoryItem}
                    placeholder={"دسته بندی عمومی..."}
                    id="categoryCode"
                    classs={tableState ? "productdisable" : ""}
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
              </div>

              <div className="product-countUpdate-div">
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

              <div className="product-searchnoimage-div">
                <form
                  className="product-searchnoimage-div-form"
                  onSubmit={handleSubmitFormC(handleRegistrationC)}
                >
                  <button className="btn btn-light" disabled>
                    محصولات تازه اضافه شده
                  </button>

                  <div>
                    <span>بدون تصویر</span>{" "}
                    <input
                      {...registerFormC("radio")}
                      type="radio"
                      value="2"
                      checked
                    />
                  </div>

                  <div>
                    <span>بدون دسته بندی</span>{" "}
                    <input
                      disabled
                      {...registerFormC("radio")}
                      type="radio"
                      value="B"
                    />
                  </div>

                  <div>
                    <span>بدون شرکت سازنده</span>{" "}
                    <input
                      disabled
                      {...registerFormC("radio")}
                      type="radio"
                      value="C"
                    />
                  </div>

                  <div>
                    <i
                      class="fa-solid fa-rotate-left fa-2xl"
                      style={{ color: " #74C0FC", cursor: "pointer" }}
                      onClick={resetUpdatFieldC}
                    ></i>
                    <button
                      className="btn btn-outline-info"
                      style={{ height: "50px", margin: "5px" }}
                      type="submit"
                    >
                      بگرد
                    </button>
                  </div>
                </form>
              </div>

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
              <DataTable title="لیست محصولات :">
                <table
                  className={
                    !homeContext.themContext
                      ? "table table-striped   product-table"
                      : "table table-striped table-dark  product-table"
                  }
                >
                  <thead>
                    <tr>
                      <th>شماره</th>

                      {/* <th> تصویر </th> */}

                      <th>نام محصول  </th>
                      <th> موجودی</th>
                      <th> قیمت (ریال)</th>
                      <th>شرکت سازنده </th>
                      <th>دسته بندی عمومی </th>
                      <th>دسته بندی تخصصی </th>
                      <th> شناسه</th>

                      <th>جزییات بیشتر/ویرایش/حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!tableState &&
                      productArray?.length != 0 &&
                      !flagSearchNoImg
                      ? productArray.map((item, index) => (
                        <tr key={item.id}>
                          <td>{productNumberPagi + (index + 1)}</td>
                          {/* <td>
                            {item.smallImage ? (
                              <img
                                className="product-img"
                                src={item.smallImage}
                                alt=""
                              />
                            ) : (
                              <img
                                src="../../../../images/40166.png"
                                alt=""
                                style={{ width: "45px" }}
                              />
                            )}
                          </td> */}
                          <td>{item.name}</td>
                          <td>{item.supply}</td>
                          <td>{item.noOffPrice?.toLocaleString()}</td>

                          <td>
                            {manufactureItem.filter((itemF) => {
                              return itemF.id == item.cyManufacturerId;
                            })[0] &&
                              manufactureItem.filter((itemF) => {
                                return itemF.id == item.cyManufacturerId;
                              })[0].name}
                          </td>

                          <td>
                            {categoryItem.filter((itemF) => {
                              return itemF.id == item.cyCategoryId;
                            })[0] &&
                              categoryItem.filter((itemF) => {
                                return itemF.id == item.cyCategoryId;
                              })[0].text}
                          </td>

                          <td>
                            {categoryItemB.filter((itemF) => {
                              return itemF.id == item.cyProductCategoryId;
                            }).length != 0 &&
                              categoryItemB.filter((itemF) => {
                                return itemF.id == item.cyProductCategoryId;
                              })[0].name}
                          </td>

                          <td>{item.id}</td>
                          <td>
                            <button
                              className="btn btn-primary product-morebut"
                              onClick={() => {
                                modalDetailProduct(
                                  item.id,
                                  item.name,
                                  item.description,
                                  item.partNo,
                                  item.mfrNo,
                                  item.datasheetUrl,
                                  item.mainImage,
                                  item.smallImage,
                                  item.cyManufacturerId,
                                  item.cyCategoryId,
                                  item.images
                                );
                                setLgShow(true);
                              }}
                            >
                              ...
                            </button>
                            <button
                              className="btn btn-info product-editbut"
                              onClick={() => {
                                window.scrollTo(0, 0);
                                editHandler(
                                  item.id,
                                  item.name,
                                  item.description,
                                  item.partNo,
                                  item.mfrNo,
                                  item.datasheetUrl,
                                  item.mainImage,
                                  item.smallImage,
                                  item.cyManufacturerId,
                                  item.cyCategoryId,
                                  item.price,
                                  item.noOffPrice,
                                  item.images,
                                  item.supply,
                                  item.cyProductCategoryId,
                                  item.productCode
                                );
                                //  console.log(item)
                              }}
                            >
                              ویرایش
                            </button>
                            <button
                              className="btn btn-danger product-deletbut"
                              onClick={() => deleteHandler(item.id)}
                            >
                              حذف
                            </button>
                          </td>
                        </tr>
                      ))
                      : tableState &&
                        searchState.itemList?.length != 0 &&
                        !flagSearchNoImg
                        ? searchState.itemList?.map((item, index) => (
                          // {  ../../../../images/No_Image_Available.jpg}
                          <tr key={item.id} id={`@j${item.id}`} >
                            <td>{productNumberPagi + (index + 1)}ddd</td>
                            {/* <td>
                              {item.smallImage ? (
                                <img
                                  className="product-img"
                                  src={item.smallImage}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src="../../../../images/40166.png"
                                  alt=""
                                  style={{ width: "45px" }}
                                />
                              )}
                            </td> */}
                            <td >{item.name}</td>
                            <td>{item.supply}</td>
                            <td>{item.noOffPrice?.toLocaleString()}</td>

                            <td>
                              {manufactureItem.filter((itemF) => {
                                return itemF.id == item.cyManufacturerId;
                              })[0] &&
                                manufactureItem.filter((itemF) => {
                                  return itemF.id == item.cyManufacturerId;
                                })[0].name}
                            </td>

                            <td>
                              {categoryItem.filter((itemF) => {
                                return itemF.id == item.cyCategoryId;
                              })[0] &&
                                categoryItem.filter((itemF) => {
                                  return itemF.id == item.cyCategoryId;
                                })[0].text}
                            </td>

                            <td>
                              {categoryItemB.filter((itemF) => {
                                return itemF.id == item.cyProductCategoryId;
                              }).length != 0 &&
                                categoryItemB.filter((itemF) => {
                                  return itemF.id == item.cyProductCategoryId;
                                })[0].name}
                            </td>

                            <td>{item.id}</td>
                            <td>
                              <button
                                className="btn btn-primary product-morebut"
                                onClick={() => {
                                  modalDetailProduct(
                                    item.id,
                                    item.name,
                                    item.description,
                                    item.partNo,
                                    item.mfrNo,
                                    item.datasheetUrl,
                                    item.mainImage,
                                    item.smallImage,
                                    item.cyManufacturerId,
                                    item.cyCategoryId,
                                    item.images
                                  );
                                  setLgShow(true);
                                }}
                              >
                                ...
                              </button>
                              <button
                                className="btn btn-info product-editbut"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  const row = document?.getElementById(`@j${item.id}`);
                                  if (row) {
                                    console.log("رکورد کلیک شده:", row.id);
                                    row.classList.add('disable')
                                  }
                                  editHandler(
                                    item.id,
                                    item.name,
                                    item.description,
                                    item.partNo,
                                    item.mfrNo,
                                    item.datasheetUrl,
                                    item.mainImage,
                                    item.smallImage,
                                    item.cyManufacturerId,
                                    item.cyCategoryId,
                                    item.price,
                                    item.noOffPrice,
                                    item.images,
                                    item.supply,
                                    item.cyProductCategoryId,
                                    item.productCode
                                  );
                                  //  console.log(item)
                                }}
                              >
                                ویرایش
                              </button>
                              <button
                                className="btn btn-danger product-deletbut"
                                onClick={() => deleteHandler(item.id)}
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))
                        : flagSearchNoImg &&
                        productArrayB?.length != 0 &&
                        productArrayB?.map((item, index) => (
                          <tr key={item.id}>
                            <td>{productNumberPagi + (index + 1)}</td>
                            {/* <td>
                              {item.smallImage ? (
                                <img
                                  className="product-img"
                                  src={item.smallImage}
                                  alt=""
                                />
                              ) : (
                                <img
                                  src="../../../../images/40166.png"
                                  alt=""
                                  style={{ width: "45px" }}
                                />
                              )}
                            </td> */}
                            <td>{item.name}</td>
                            <td>{item.supply}</td>
                            <td>{item.noOffPrice?.toLocaleString()}</td>

                            <td>
                              {manufactureItem.filter((itemF) => {
                                return itemF.id == item.cyManufacturerId;
                              })[0] &&
                                manufactureItem.filter((itemF) => {
                                  return itemF.id == item.cyManufacturerId;
                                })[0].name}
                            </td>

                            <td>
                              {categoryItem.filter((itemF) => {
                                return itemF.id == item.cyCategoryId;
                              })[0] &&
                                categoryItem.filter((itemF) => {
                                  return itemF.id == item.cyCategoryId;
                                })[0].text}
                            </td>

                            <td>
                              {categoryItemB.filter((itemF) => {
                                return itemF.id == item.cyProductCategoryId;
                              }).length != 0 &&
                                categoryItemB.filter((itemF) => {
                                  return itemF.id == item.cyProductCategoryId;
                                })[0].name}
                            </td>

                            <td>{item.id}</td>
                            <td>
                              <button
                                className="btn btn-primary product-morebut"
                                onClick={() => {
                                  modalDetailProduct(
                                    item.id,
                                    item.name,
                                    item.description,
                                    item.partNo,
                                    item.mfrNo,
                                    item.datasheetUrl,
                                    item.mainImage,
                                    item.smallImage,
                                    item.cyManufacturerId,
                                    item.cyCategoryId,
                                    item.images
                                  );
                                  setLgShow(true);
                                }}
                              >
                                ...
                              </button>
                              <button
                                className="btn btn-info product-editbut"
                                onClick={() => {
                                  window.scrollTo(0, 0);
                                  editHandler(
                                    item.id,
                                    item.name,
                                    item.description,
                                    item.partNo,
                                    item.mfrNo,
                                    item.datasheetUrl,
                                    item.mainImage,
                                    item.smallImage,
                                    item.cyManufacturerId,
                                    item.cyCategoryId,
                                    item.price,
                                    item.noOffPrice,
                                    item.images,
                                    item.supply,
                                    item.cyProductCategoryId,
                                    item.productCode
                                  );
                                  //  console.log(item)
                                }}
                              >
                                ویرایش
                              </button>
                              <button
                                className="btn btn-danger product-deletbut"
                                onClick={() => deleteHandler(item.id)}
                              >
                                حذف
                              </button>
                            </td>
                          </tr>
                        ))}
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
              </DataTable>
              {/* <button onClick={()=>{GetProductItem()}} > asdas</button> */}
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
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="product-detailmodal-div">
              <div className="product-detailmodal-divimg">
                <div className="product-dateailmodal-bigdiv">
                  <span className="product-detailmodal-imgbig-span">
                    عکس بزرگ
                  </span>
                  <img
                    src={detailProduct[6]}
                    alt="bigImage"
                    className="product-detailmodal-imgbig"
                  />
                </div>

                <div className="product-dateailmodal-smalldiv">
                  <img
                    src={detailProduct[7]}
                    alt="smallImage"
                    className="product-detailmodal-imgsmall"
                  />
                  <span className="product-detailmodal-imgsmall-span">
                    عکس کوچک
                  </span>
                </div>

                <div className="product-dateailmodal-imagesarray">
                  {detailProduct[10] &&
                    detailProduct[10]
                      .split("*,*")
                      .map((item) => <img src={item} alt="" />)}
                </div>
              </div>
              <span className="product-detailmodal-div-span ">
                عنوان:{detailProduct[1]}
              </span>
              <span className="product-detailmodal-div-span ">
                توضیحات:{detailProduct[2]}
              </span>
              <span className="product-detailmodal-div-span ">
                نام محصول :{detailProduct[3]}
              </span>
              <span className="product-detailmodal-div-span ">
                شماره سازنده:{detailProduct[4]}
              </span>
            </div>
          </Modal.Body>
        </Modal>
      </>
    </div>
  );
}
