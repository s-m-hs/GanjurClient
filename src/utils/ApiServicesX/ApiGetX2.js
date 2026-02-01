import apiUrl from "../ApiConfig";

const ApiGetX2 = (url, func) => {
  async function myAppGet() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "GET",
      credentials: "include",

      headers: {
        "Content-Type": "application/json",
        // Authorization: headerAuth,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            func(result)
          }
          );
        }
      })
      .catch((error) => console.log(error));
  }
  myAppGet();
};

export default ApiGetX2;
