import apiUrl from "../ApiConfig";

const ApiPostX4 = (url, obj, func1, func2) => {
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
              func1(result);
              func2(result.allCount);
            }
          });
        }
      })
      .catch((err) => console.log(err));
  }
  myAppPost();
};
export default ApiPostX4;
