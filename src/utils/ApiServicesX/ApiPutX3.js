import apiUrl from "../ApiConfig";

const ApiPutX3 = (url, id, func) => {
  async function myAppPost() {
    const res = await fetch(`${apiUrl}${url}${id}`, {
      method: "PUT",
      credentials: "include",

      headers: {
        // Authorization: headerAuth,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        // console.log(res)
        if (res.ok) {
          func();
        }
      })
      .catch((err) => console.log(err));
  }
  myAppPost();
};
export default ApiPutX3;
