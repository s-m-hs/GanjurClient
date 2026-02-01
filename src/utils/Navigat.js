import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


let Naviget=()=>{
    const navigatt = useNavigate()

        Swal.fire({
                    position: "center",
                    icon: "info",
                    title: "لطفا با حساب کاربری معتبر وارد شوید...",
                    showConfirmButton: false,
                    timer: 2000,
                  }).then(res=>{
                    navigatt('/')
                  }) 
}
export default Naviget