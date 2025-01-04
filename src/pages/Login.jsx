import { useNavigate, Link } from "react-router-dom"
import FeedBack from "../components/FeedBack";
import LoginBox from "../components/LoginBox";
import { useState } from "react";
import SetLocalSorage from "../components/localStorageHandle";
import otherRequest from "../components/otherRequest";
import Load from "../components/Load";

function Login({ url, headers, setLoggedIn }) {

    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    async function loginUser(email, password) {
        setLoading(true)
        const credentials = { email: email, password: password }

        const responseData = await otherRequest(url, headers, "user/login", credentials, "POST")
        if (responseData.response.status == 200) {
            SetLocalSorage(responseData.result.user.token, responseData.result.user.id, responseData.result.user.privilege)
            //This thing
            setLoggedIn(true)

            setError("")
            setSuccess(responseData.result.message)

            setTimeout(() => {
                navigation("/")
            }, 1000);
        }
        else {
            setError(responseData.result.message)
        }
        setLoading(false)
    }


    const login = async (event) => {
        event.preventDefault();
        await loginUser(event.target.email.value, event.target.password.value)

    }

    return (
        <div>
            {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
            <LoginBox login={login} />
            {loading && <Load />}
        </div>
    )


}

export default Login