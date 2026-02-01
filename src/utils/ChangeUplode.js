import apiUrl from "./ApiConfig";


const ChangeUplode = (file,func1,func2) => {
    // event.preventDefault()
    let formData = new FormData();
    formData.append("File", file);
    formData.append("Name", "");
    formData.append("Description", "");
    formData.append("IsPrivate", true);
    async function myAppPostFile() {
      const res = await fetch(`${apiUrl}/api/CyFiles/upload`, {
        method: "POST",
 
        body: formData,
      })
        .then((res) => {
          if (res.ok) {
            func1()
            return res.json().then((result) => {
          if (result) {
            func2(result.id)
          }
        })
          }
        }).catch(err=>console.log(err))
    } 
    myAppPostFile();
  };

  export default ChangeUplode