import apiUrl from "../ApiConfig";
import Swal from "sweetalert2";

const ApiPostX0 = (url, obj, func) => {
  async function myAppPost() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "POST",
      credentials: "include",

      headers: {
        // Authorization: headerAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json().then((result) => {
            func(result);
          });
        } else {
          return res.json().then((result) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: result.msg,
              showConfirmButton: false,
              timer: 1500,
            });
          });
        }
      })
      .catch((err) => console.log(err));
  }
  myAppPost();
};
export default ApiPostX0;
