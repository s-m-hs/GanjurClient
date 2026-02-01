import apiUrl from "../../ApiConfig";

const ApiGetB = (url, setFun, navig) => {
  async function myAppGet() {
    const res = await fetch(`${apiUrl}${url}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${authHeader}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setFun(result))
      .catch((error) => navig("/errorpage"));
  }
  myAppGet();
};
export default ApiGetB;
