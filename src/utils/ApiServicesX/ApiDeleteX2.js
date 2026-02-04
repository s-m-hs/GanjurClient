import apiUrl from "../ApiConfig";
import Swal from "sweetalert2";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});
const ApiDeleteX2 = (url, func) => {
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
        async function myAppDelete() {
          const res = await fetch(`${apiUrl}${url}`, {
            method: "DELETE",
            credentials: "include",

            headers: {
              // Authorization: headerAuth,
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              console.log(res);
              if(res.ok){
     func()
            }
            })
   
            .catch((err) => console.log(err));
        }
        myAppDelete();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "حذف انجام نشد",
          icon: "error",
        });
      }
    });
};
export default ApiDeleteX2;
