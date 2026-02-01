import apiUrl from "../ApiConfig";

const ApiGetX = (url, func, navigation) => {
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
          return res.json().then((result) => func(result));
        }
      })
      .catch((error) => navigation("/errorpage"));
  }
  myAppGet();
};

export default ApiGetX;
