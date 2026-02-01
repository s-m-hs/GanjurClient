import apiUrl from "./ApiConfig";
import Swal from "sweetalert2";

const DownloadFile=(gui)=>{
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: " فابل در حال دانلود است",
      showConfirmButton: false,
      timer: 500,
    }).then(res=>{
       async function myApp(){
      const res=fetch(`${apiUrl}/api/CyFiles/download/${gui}`,{
        method:'GET',
        headers: {
          // Authorization: headerAuth,
          "Content-Type": "application/json",
        },
      }).then(res=>{
        if(res.ok){
          window.location.href=res.url
   
      }
      })
    }
    myApp()
    });
  
  
  }

  export default DownloadFile