import { useNavigate, Link } from "react-router-dom"
import FeedBack from "../components/FeedBack";
import LoginBox from "../components/LoginBox";
import { useState } from "react";
import SetLocalSorage from "../components/localStorageHandle";
import otherRequest from "../components/otherRequest";

function Login({ url, headers, setLoggedIn }) {

    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    async function loginUser(email, password) {

        const credentials = { email: email, password: password }

        const responseData = await otherRequest(url, headers, "user/login", credentials, "POST")
        if (responseData.response.status == 200) {
            SetLocalSorage(responseData.result.user.token, responseData.result.user.id, responseData.result.user.privilege)
            //This thing
            setLoggedIn(true)

            setSuccess(responseData.result.message)

            setTimeout(() => {
                navigation("/")
            }, 1000);
        }
        else {
            setError(responseData.result.message)
        }

    }


    const login = async (event) => {
        event.preventDefault();
        await loginUser(event.target.email.value, event.target.password.value)

    }

    if (error) {
        return <div>
            <FeedBack message={error} status={"failure"} />
            <LoginBox login={login} />

        </div>
    }
    else if (success) {
        return <div>
            <FeedBack message={success} status={"success"} />
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