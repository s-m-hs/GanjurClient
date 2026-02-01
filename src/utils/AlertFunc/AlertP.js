import Swal from "sweetalert2";
 const alertP=(title1,icon1,title2,title3,title4,icon2,func)=>Swal.fire({
    title: title1,
    // text: "You won't be able to revert this!",
    icon: icon1,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: title2,
    cancelButtonText:title3
  }).then((result) => {
    if (result.isConfirmed) {
        func()
    }
  });


  export default alertP