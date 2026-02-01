import React, { useState, useEffect, useContext } from "react";
import "./Skin.css";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DataTable from "../DataTable/DataTable";
import Swal from "sweetalert2";
import DotLoader from "react-spinners/DotLoader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../../utils/ApiConfig";
import ApiPost from "../../../utils/ApiServices/Configs/ApiPost";
import ApiPut from "../../../utils/ApiServices/Configs/ApiPut";
import ApiGet from "../../../utils/ApiServices/Configs/ApiGet";
import ApiDelete from "../../../utils/ApiServices/Configs/ApiDelete";

export default function Skin() {
  const [keyArray, setKeyArray] = useState([]);
  const keyArrayReverse = keyArray.slice().reverse();
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [putId, setPutId] = useState("");
  const navigate = useNavigate();
  const cmsContext = useContext(CmsContext);
  const homeContext = useContext(HomeContext);

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
    text: { required: "text is required" },
    code: { required: "code is required" },
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
  const handleError = (errors) => {};
  ////////////////////////////
  const alertS = (title, setF1) =>
    Swal.fire({
      position: "center",
      icon: "success",
      title: title,
      showConfirmButton: false,
      timer: 1500,
    }).then((res) => {
      reset(setValue(""));
      getKeyItem();
      setF1();
    });
  const alertB = (callBack) => {
    swalWithBootstrapButtons
      .fire({
        title: "حذف انجام شد!",
        icon: "success",
      })
      .then((result) => {
        window.scrollTo(0, 0);
        callBack();
      });
  };
  /////////////////////////////
  const handleRegistration = (data) => {
    if (!flagUpdate) {
      let obj = {
        id: 0,
        text: data.text,
        code: data.code,
      };

      ApiPost("/api/CySkins", obj, alertS("قالب با موفقیت اضافه شد"));
    } else if (flagUpdate) {
      let obj = {
        id: putId,
        text: data.update.text,
        code: data.update.code,
      };
      ApiPut(
        "/api/CySkins",
        putId,
        obj,
        alertS("قالب با موفقیت ویرایش شد", setFlagUpdate(false))
      );
    }
  };
  /////////////////////////////////
  const getKeyItem = () => {
    ApiGet("/api/CySkins", setKeyArray, navigate);
  };
  //////////////////////
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
          ApiDelete("/api/CySkins", id, alertB(getKeyItem));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "حذف انجام نشد",
            icon: "error",
          });
        }
      });
    reset(setValue(""));
  };
  /////////////////////
  const editHandler = (...data) => {
    setPutId(data[0]);
    setFlagUpdate(true);
    setValue("update", { text: data[1], code: data[2] });
  };
  /////////////////
  const resetUpdatField = () => {
    setFlagUpdate(false);
    reset(setValue(""));
  };
  //////////////////
  useEffect(() => {
    cmsContext.setFlagClass(false);
    getKeyItem();

    return () => cmsContext.setFlagClass(true);
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-sm-3 skin-col3">
            <form
              action=""
              onSubmit={handleSubmit(handleRegistration, handleError)}
            >
              <div className="login-label-float">
                <input
                  name="text"
                  type="text"
                  placeholder=""
                  className={errors.text ? "formerror" : ""}
                  {...register(
                    !flagUpdate ? "text" : "update.text",
                    registerOptions.text
                  )}
                />
                <label> عنوان </label>
              </div>

              <div className="login-label-float">
                <input
                  name="code"
                  type="text"
                  placeholder=""
                  className={errors.code ? "formerror" : ""}
                  {...register(
                    !flagUpdate ? "code" : "update.code",
                    registerOptions.code
                  )}
                />
                <label> کد</label>
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
                className="skin-regbutton"
                type="submit"
                variant="contained"
                color="info"
                endIcon={<SendIcon />}
              >
                {!flagUpdate ? <span> افزودن </span> : <span> ویرایش </span>}
              </Button>
            </form>
          </div>

          <div className="col-12 col-sm-9 skin-col9">
            {keyArray == null ? (
              <div className="skin-colsm9-div">
                <DotLoader
                  color="#0d6efd"
                  loading
                  size={150}
                  speedMultiplier={1}
                />
              </div>
            ) : (
              <DataTable title={"لیست قالب ها :"}>
                <table
                  className={
                    !homeContext.themContext
                      ? "table table-striped  skin-table"
                      : "table table-striped table-dark skin-table"
                  }
                >
                  <thead>
                    <tr>
                      <th>شماره</th>
                      <th>عنوان </th>
                      <th> کد</th>
                      <th>شناسه</th>
                      <th>ویرایش/حذف</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keyArrayReverse.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td>{item.text}</td>
                        <td>{item.code}</td>
                        <td>{item.id}</td>
                        <td>
                          <button
                            className="btn btn-info skin-editbut"
                            onClick={() => {
                              editHandler(item.id, item.text, item.code);
                              window.scrollTo(0, 0);
                            }}
                          >
                            ویرایش
                          </button>
                          <button
                            className="btn btn-danger skin-deletbut"
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
