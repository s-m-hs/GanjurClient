import apiUrl from "../ApiConfig";

const ApiPuX2 = (url, obj, func) => {
  async function myAppPost() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "PUT",
      credentials: "include",

      headers: {
        // Authorization: headerAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        // console.log(res)
        if (res.ok) {
          return res.json().then((result) => {
            func();
          });
        }
      })
      .catch((err) => console.log(err));
  }
  myAppPost();
};
export default ApiPuX2;
