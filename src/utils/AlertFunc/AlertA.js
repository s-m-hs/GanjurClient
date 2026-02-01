import Swal from 'sweetalert2'


const alertA=(title)=>{
    Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
    })}
export default alertA