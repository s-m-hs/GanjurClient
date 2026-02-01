import apiUrl from "../ApiConfig";

const ApiPostX2 = (url, obj, func, navigation) => {
  async function myAppPost() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "POST",
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
            // console.log(result);
            if (result) {
              func(result);
            }
          });
        }
      })
      .catch((err) => navigation("/errorpage"));
  }
  myAppPost();
};
export default ApiPostX2;
