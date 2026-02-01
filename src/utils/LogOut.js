import apiUrl from "./ApiConfig"

const LogOut = (funcA, funcB) => {
    async function myApp() {
        const res = await fetch(`${apiUrl}/api/CyLogin/logoutAdmin`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res)
            if (res.ok) {
                return res.json().then((result) => {
                    funcA(false)
                    funcB("/")

                })
            }

        }

        ).catch(err => console.log(err))
    }
    myApp()
}


export default LogOut