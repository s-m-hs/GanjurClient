import Swal from 'sweetalert2'


const alertB=(icon,title,boolian,timer,iconColor)=>{
    Swal.fire({
        position: "center",
        icon: icon,
        title: title,
        showConfirmButton: boolian,
        timer: timer,
        iconColor:iconColor
    })}
export default alertB