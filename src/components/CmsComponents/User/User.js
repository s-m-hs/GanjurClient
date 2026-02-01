import React, { useState, useEffect, useContext } from "react";
import "./User.css";
import { CmsContext, HomeContext } from "../../../context/CmsContext";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import DataTable from "../DataTable/DataTable";
import Swal from "sweetalert2";
import DotLoader from "react-spinners/DotLoader";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import apiUrl from "../../../utils/ApiConfig";
import alertA from "../../../utils/AlertFunc/AlertA";
import ApiPostX from "../../../utils/ApiServicesX/ApiPostX";
import ApiPutX from "../../../utils/ApiServicesX/ApiPutX";
import ApiGetX from "../../../utils/ApiServicesX/ApiGetX";
import ApiDeleteX from "../../../utils/ApiServicesX/ApiDeleteX";
import ApiDeleteX2 from "../../../utils/ApiServicesX/ApiDeleteX2";

export default function User() {
  const [userArray, setuserArray] = useState([]);
  const [flagUpdate, setFlagUpdate] = useState(false);
  const [putId, setPutId] = useState("");
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
    defaultValues: {},
  });
  const registerOptions = {
    userName: { required: "userName is required" },
    password: { required: "password is required" },
    userStatus: { required: "password is required" },
    userUserType: { required: "password is required" },
  };
  ///////////////////


  ////////////////////////////
  const userStatus = [
    { id: 1, status: "فعال", statusId: 0 },
    { id: 2, status: "مسدود", statusId: 1 },
    { id: 3, status: "غیرفعال", statusId: 2 },
  ];
  const userUserType = [
    { id: 1, UserType: "ادمین", UserTypeId: 8 },
    { id: 2, UserType: "مدیر", UserTypeId: 1 },
    { id: 3, UserType: "کارمند", UserTypeId: 2 },
  ];
  ////////////////////////////////
  const handleError = (errors) => { };

  const funcB = () => {
    alertA("ویرایش با موفقیت انجام شد");
    reset(setValue(""));
    setFlagUpdate(false);
    getuserItem();
  };
  const funcA = () => {
    alertA("کاربر با موفقیت اضافه شد");
    reset(setValue(""));
    getuserItem();
  };
  const handleRegistration = (data) => {
    // console.log(data)
    if (!flagUpdate) {
      let obj = {
        id: 0,
        cyUsNm: data.userName,
        cyHsPs: data.password,
        status: Number(data.userStatus),
        userType: Number(data.userUserType),
      };
      ApiPostX("/api/CyUsers", obj, funcA);
    } else if (flagUpdate) {
      let obj = {
        id: putId,
        cyUsNm: data.update.userName,
        cyHsPs: data.update.password,
        status: Number(data.update.userStatus),
        userType: Number(data.update.userUserType),
      };
      ApiPutX("/api/CyUsers", putId, obj, funcB);

      // async function myAppPut() {
      //   const res = await fetch(`${apiUrl}/api/CyUsers/${putId}`, {
      //     method: 'PUT',
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(obj)
      //   }).then(res => {
      //     if (res.ok) {
      //       Swal.fire({
      //         position: "center",
      //         icon: "success",
      //         title: "ویرایش با موفقیت انجام شد",
      //         showConfirmButton: false,
      //         timer: 1500,
      //       });
      //       reset(
      //         setValue('')
      //       )
      //       setFlagUpdate(false)
      //       getuserItem()
      //     }
      //   }
      //   ).catch(err=>console.log(err))
      // }
      // myAppPut()
    }
  };
  /////////////////////////////////
  const getuserItem = () => {
    ApiGetX("/api/CyUsers/GetUserByType/2", setuserArray, navigate);
  };
  //////////////////////
  const funcC = () => {
    getuserItem();
    reset(setValue(""));
  };
  const deleteHandler = (id) => {
    ApiDeleteX2(`/api/CyUsers/deletUser?id=${id}`, funcC);
  };
  /////////////////////
  const editHandler = (...data) => {
    setPutId(data[0]);
    setFlagUpdate(true);
    setValue("update", {
      userName: data[1],
      password: data[2],
      userStatus: data[3],
      userUserType: data[4],
    });
  };
  /////////////////
  const resetUpdatField = () => {
    setFlagUpdate(false);
    reset(setValue(""));
  };
  //////////////////
  useEffect(() => {
    cmsContext.setFlagClass(false);
    homeContext.setSideMenueFlag(false)
    getuserItem();

    return () => cmsContext.setFlagClass(true);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-3 user-col3">
          <form
            action=""
            onSubmit={handleSubmit(handleRegistration, handleError)}
          >
            <div className="login-label-float">
              <input
                name="userName"
                type="text"
                placeholder=""
                className={errors.userName ? "formerror" : ""}
                {...register(
                  !flagUpdate ? "userName" : "update.userName",
                  registerOptions.userName
                )}
              />
              <label> نام کاربری</label>
            </div>
            <div className="login-label-float">
              <input
                name="password"
                type="text"
                placeholder=""
                className={errors.password ? "formerror" : ""}
                {...register(
                  !flagUpdate ? "password" : "update.password",
                  registerOptions.password
                )}
              />
              <label> رمزعبور</label>
            </div>

            <label className="user-col3-selectlabel"> وضعیت کاربر:</label>
            <select
              className={
                errors.userStatus
                  ? "user-col3-select formerror"
                  : "user-col3-select"
              }
              {...register(
                !flagUpdate ? "userStatus" : "update.userStatus",
                registerOptions.userStatus
              )}
            >
              <option value="">انتخاب کنید...</option>
              {userStatus.map((item) => (
                <option key={item.id} value={item.statusId}>
                  {" "}
                  {item.status}
                </option>
              ))}
            </select>

            <label className="user-col3-selectlabel"> نوع کاربر:</label>
            <select
              className={
                errors.userUserType
                  ? "user-col3-select formerror"
                  : "user-col3-select"
              }
              {...register(
                !flagUpdate ? "userUserType" : "update.userUserType",
                registerOptions.userUserType
              )}
            >
              <option value="">انتخاب کنید...</option>
              {userUserType.map((item) => (
                <option key={item.id} value={item.UserTypeId}>
                  {" "}
                  {item.UserType}
                </option>
              ))}
            </select>
            {flagUpdate && (
              <div className="user-resticon">
                <i
                  class="fa-solid fa-rotate-left fa-2xl"
                  style={{ color: " #74C0FC" }}
                  onClick={resetUpdatField}
                ></i>
              </div>
            )}

            <Button
              className="user-regbutton"
              type="submit"
              variant="contained"
              color="info"
              endIcon={<SendIcon />}
            >
              {!flagUpdate ? <span> افزودن </span> : <span> ویرایش </span>}
            </Button>
          </form>
        </div>

        <div className="col-12 col-lg-8 user-col9">
          {userArray.length == 0 ? (
            <div className="user-colsm9-div">
              <DotLoader
                color="#0d6efd"
                loading
                size={150}
                speedMultiplier={1}
              />
            </div>
          ) : (
            <DataTable title={"لیست مدیران :"}>
              <table
                className={
                  !homeContext.themContext
                    ? "table table-striped  user-table"
                    : "table table-striped table-dark user-table"
                }
              >
                <thead>
                  <tr>
                    <th>شماره</th>
                    <th>نام کاربری</th>
                    <th>وضعیت کاربر</th>
                    <th>نوع کاربر</th>
                    <th>شناسه</th>
                    <th>ویرایش/حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {userArray.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.cyUsNm}</td>
                      <td>
                        {userStatus.filter((filter) => {
                          return filter.statusId == item.status;
                        })[0] &&
                          userStatus.filter((filter) => {
                            return filter.statusId == item.status;
                          })[0].status}{" "}
                      </td>
                      <td>
                        {userUserType.filter((filter) => {
                          return filter.UserTypeId == item.userType;
                        })[0] &&
                          userUserType.filter((filter) => {
                            return filter.UserTypeId == item.userType;
                          })[0].UserType}{" "}
                      </td>
                      <td>{item.id}</td>
                      <td>
                        <button
                          className="btn btn-info user-editbut"
                          onClick={() =>
                            editHandler(
                              item.id,
                              item.cyUsNm,
                              item.cyHsPs,
                              item.status,
                              item.userType
                            )
                          }
                        >
                          ویرایش
                        </button>
                        <button
                          className="btn btn-danger user-deletbut"
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
  );
}
