import Swal from "sweetalert2"

const AlertError=(title)=>{
    Swal.fire({
        position: "center",
        icon: "error",
        title: title,
        showConfirmButton: false,
        timer: 1500,
    })}
export default AlertError