

function Login({ url }) {

    const navigation = useNavigate()


    async function loginUser(email, password, url) {

        const credentials = { email: email, password: password }

        try {
            const response = await fetch(url + "user/login", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(credentials)
            });
            const result = await response.json();
            localStorage.setItem("token", result.user.token)
            return result.user.token
        } catch (error) {
            console.error(error) //Handle error
        }
    }


    const login = (event) => {
        event.preventDefault();
        const newToken = loginUser(event.target.email.value, event.target.password.value, url)
        if (newToken) {
            navigation("/")
        }
    }

    return <form onSubmit={login}>
        <input type="email" required id="email" />
        <input type="password" required id="password" />
        <button type="submit">Bejelentkezés</button>
    </form>
}

export default Login