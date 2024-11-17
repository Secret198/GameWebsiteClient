import { useNavigate, Link } from "react-router-dom"
import FeedBack from "../components/FeedBack";
import { useState } from "react";

function Login({ url }) {

    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    async function loginUser(email, password, url) {

        const credentials = { email: email, password: password }


        const response = await fetch(url + "user/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        const result = await response.json();
        if (response.status == 200) {
            localStorage.setItem("token", result.user.token)
            setSuccess(result.message)
        }
        else {
            setError(result.message)
        }


    }


    const login = async (event) => {
        event.preventDefault();
        await loginUser(event.target.email.value, event.target.password.value, url)

        if (localStorage.getItem("token")) {
            setTimeout(() => {
                navigation("/")
            }, 1000);
        }

    }

    if (error) {
        return <div>
            <FeedBack message={error} />
            <form onSubmit={login}>
                <input type="email" required id="email" />
                <input type="password" required id="password" />
                <button type="submit">Bejelentkezés</button>
            </form>
            <Link to={"../register"} >Regisztráció</Link>
        </div>
    }
    else if (success) {
        return <div>
            <FeedBack message={success} />
            <form onSubmit={login}>
                <input type="email" required id="email" />
                <input type="password" required id="password" />
                <button type="submit" disabled>Bejelentkezés</button>
            </form>
            <Link to={"../register"} >Regisztráció</Link>

        </div>
    }
    else {
        return <div>
            <form onSubmit={login}>
                <input type="email" required id="email" />
                <input type="password" required id="password" />
                <button type="submit">Bejelentkezés</button>
            </form>
            <Link to={"../register"} >Regisztráció</Link>

        </div>
    }


}

export default Login