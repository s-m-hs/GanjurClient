import React, { useContext, useEffect, useState } from "react";
import "./IndexH.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import apiUrl from "../../utils/ApiConfig";
import { sha512 } from "js-sha512";
import ClockLoader from "react-spinners/ClockLoader";
import ModChi from "../../utils/Mods";
import mode, { modeSane } from "../../utils/ModsB";
import { CmsContext, HomeContext } from "../../context/CmsContext";
import BuildVirsion from "../../utils/BuildVirsion";

export default function IndexH() {
  const [flag, setFlag] = useState(false);
  const [flagSpinner, setFlagSpinner] = useState(false);
  let { setIsLogin, isLogin, setUserId } = useContext(HomeContext);

  const navigatt = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });
  const handleError = (errors) => {
    // console.log(errors)
    // alert(errors)
  };
  const registerOptions = {
    userName: { required: "نام کاربری نادرست است" },
    password: { required: " رمزعبور نادرست است" },
  };
  /////////////////////////////
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  /////////////////////////
  const handleRegistration = (data) => {
    if (data.password && data.userName) {
      setFlagSpinner(true);
    }

    let obj = {
      un: data.userName,
      pw: sha512(data.password),
    };
    // let obj = {
    //   un:data.userName ,
    //   pw: data.password
    // }
    async function myAppPost() {
      const res = await fetch(`${apiUrl}/api/CyLogin/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then((result) => {
              console.log(result);
              // localStorage.setItem("loginToken", JSON.stringify(result));
              localStorage.setItem("user", data.userName);
              setUserId(result.userId)
              setIsLogin(true);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "به پنل مدیریت خوش آمدید",
                showConfirmButton: false,
                timer: 1500,
              }).then((res) => {
                navigatt("/p-admin");
              });
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: " لطفا مجددا تلاش بفرمایید ",
              showConfirmButton: false,
              timer: 1500,
            }).then((rus) => {
              reset(setValue(""));
              setFlagSpinner(false);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    myAppPost();
  };
  // console.log(errors.password);
  const button1 = () => {
    setFlag(true);
  };
  useEffect(() => {
    if (isLogin) {
      navigatt("./p-admin");
    }
  }, [isLogin]);

  return (
    <div className="container home-container ">
      <div className="row">
        <div className="col-lg-4  IndexH-col4">
          {!flag && (
            <>
              <button
                className="indexh-linkbutton btn btn-warning"
                onClick={() => {
                  button1();
                }}
              >
                حسابداری کامپیوتر صانع
                <div>
                  Virsion:{BuildVirsion}{" "}
                  {mode.mode1
                    ? mode.mode1.toLocaleUpperCase()
                    : mode.mode2
                      ? mode.mode2.toLocaleUpperCase()
                      : ""}
                </div>
              </button>
              {/* <div>{BuildVirsion} {mode.mode1 ? mode.mode1 : mode.mode2 ? mode.mode2 : ''}</div> */}
            </>
          )}

          {/* <Link className='indexh-linkbutton' to='/p-admin' >  پنل مدیریت
            </Link> */}
          {flag && (
            <div className="col-4 IndexH-col4-div">
              <form
                action=""
                onSubmit={handleSubmit(handleRegistration, handleError)}
                className="IndexH-col4-form"
              >
                <div className="login-label-float">
                  <input
                    name="userName"
                    type="text"
                    placeholder=""
                    className={errors.userName ? "formerror" : ""}
                    {...register("userName", registerOptions.userName)}
                  />
                  <label> نام کاربری</label>
                  <span>{errors.userName && errors.userName.message}</span>
                </div>

                <div className="login-label-float">
                  <input
                    name="password"
                    type="password"
                    placeholder=""
                    className={errors.password ? "formerror" : ""}
                    {...register("password", registerOptions.password)}
                  />
                  <label> رمزعبور </label>
                  <span>{errors.password && errors.password.message}</span>
                </div>
                <button className="btn btn-warning  buttonss">
                  <div className="spinner-div">
                    {flagSpinner &&
                      errors.password == undefined &&
                      errors.userName == undefined ? (
                      <ClockLoader
                        className="spinner"
                        size={30}
                        color="#fff"
                        speedMultiplier={1}
                      />
                    ) : (
                      <span className="spinner-enter">ورود</span>
                    )}
                  </div>
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="col-4">
          {/* <img style={{ width: '200px', height: "200px", zIndex: 100000 }} src="rss.png" alt="" /> */}
        </div>
        <div className="col-4"></div>
      </div>
    </div>
  );
}
