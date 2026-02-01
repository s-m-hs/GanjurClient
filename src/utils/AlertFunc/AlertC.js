import Swal from 'sweetalert2'


const alertC=(title,func)=>{
    Swal.fire({
        position: "center",
        icon: "success",
        title: title,
        showConfirmButton: false,
        timer: 1500,
    }).then(result=>{func()})}
export default alertC