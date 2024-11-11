import { useEffect } from "react"


function LoginFetch({ email, password, url }) {
    console.log("bitch")
    useEffect(() => {
        const fetchLogin = async () => {
            try {
                const response = await fetch(url + "user/login", {
                    "method": "POST",
                    "headers": { "Accept": "application/json" },
                    "body": JSON.stringify({ email: email, password: password })
                });
                const result = await response.json();
                console.log(result)
            }
            catch (error) {
                console.log(error); //Handle the error somehow
            }
        }

        fetchLogin();
    }, [url, email, password])
    return null
}

function Login({ url }) {

    const login = (event) => {
        event.preventDefault();
        return <LoginFetch email={event.target.email.value} password={event.target.password.value} url={url} />;
        // LoginFetch(event.target.email.value, event.target.password.value, url)
    }

    return <form onSubmit={login}>
        <input type="email" required id="email" />
        <input type="password" required id="password" />
        <button type="submit">Bejelentkezés</button>
    </form>
}

export default Login