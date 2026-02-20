import React, { useState, useEffect } from "react";
import "./App.css";
import routes from "./routes";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { HomeContext } from "./context/CmsContext";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import apiUrl from "./utils/ApiConfig";
import Swal from "sweetalert2";
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';

export default function App() {
  // const version = process.env.REACT_APP_VERSION;
  // const commit = process.env.REACT_APP_COMMIT;
  // const date = process.env.REACT_APP_BUILD_DATE;
  // console.log(version, commit, date)
  const [sideMenueFlag, setSideMenueFlag] = useState(false);
  const [messageNotification, setMessageNotification] = useState([]);
  const [flagMessageNotification, setFlagMessageNotification] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState([])

  const [themContext, setThemContext] = useState(false);

  let router = useRoutes(routes);
  const navigatt = useNavigate();
  const location = useLocation();

  const navigatToOut = () => {
    if (location.pathname.includes("p-admin")) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: "لطفا با حساب کاربری معتبر وارد شوید...",
        showConfirmButton: false,
        timer: 2000,
      }).then((res) => {
        navigatt("/");
        setIsLogin(false);
      });
    } else {
      setIsLogin(false);
    }
  };

  const refreshToken = () => {
    async function myApp() {
      const res = await fetch(`${apiUrl}/api/CyLogin/refreshToken`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json().then(result => {
              setIsLogin(true);
              setUserId(result.userId)
            })

          } else {
            navigatToOut();
          }
        })
        .catch((err) => console.log(err));
    }
    myApp();
  };
  const intervalId = () => {
    setInterval(() => {
      refreshToken();
    }, 600000);  ///1000 ===>1ثانیه
  };

  useEffect(() => {
    setIsLogin(true);

    // refreshToken();
    // intervalId();
    // clearInterval(intervalId);
  }, []);
  return (
    <>
      <HomeContext.Provider
        value={{
          isLogin,
          setIsLogin,
          themContext,
          setThemContext,
          messageNotification,
          setMessageNotification,
          flagMessageNotification,
          setFlagMessageNotification,
          sideMenueFlag,
          setSideMenueFlag, ///<<< to control sidemenue on mobileSize
          userId, setUserId
        }}
      >
        <div className="App">


          <span style={{ position: 'fixed', zIndex: '10000', bottom: '15px', opacity: '0.2' }}>v:{process.env.REACT_APP_VERSION} - {process.env.REACT_APP_BUILD_DATE} - {process.env.REACT_APP_COMMIT}</span>

          {router}</div>
      </HomeContext.Provider>
    </>
  );
}
