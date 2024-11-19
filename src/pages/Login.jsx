import { useNavigate, Link } from "react-router-dom"
import FeedBack from "../components/FeedBack";
import LoginBox from "../components/LoginBox";
import { useState } from "react";

function Login({ url, headers }) {

    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    async function loginUser(email, password) {

        const credentials = { email: email, password: password }

        const response = await fetch(url + "user/login", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(credentials)
        });
        const result = await response.json();
        if (response.status == 200) {
            localStorage.setItem("token", result.user.token)
            localStorage.setItem("userId", result.user.id)
            setSuccess(result.message)


            setTimeout(() => {
                navigation("/")
            }, 1000);

        }
        else {
            setError(result.message)
        }


    }


    const login = async (event) => {
        event.preventDefault();
        await loginUser(event.target.email.value, event.target.password.value)

    }

    if (error) {
        return <div>
            <FeedBack message={error} />
            <LoginBox login={login} />

        </div>
    }
    else if (success) {
        return <div>
            <FeedBack message={success} />
            <LoginBox login={login} />


        </div>
    }
    else {
        return <div>
            <LoginBox login={login} />
        </div>
    }


}

export default Login