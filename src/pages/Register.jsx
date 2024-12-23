import { useState } from "react"
import FeedBack from "../components/FeedBack"
import { useNavigate } from "react-router-dom"
import RegisterBox from "../components/RegisterBox"
import SetLocalSorage from "../components/localStorageHandle"
import otherRequest from "../components/otherRequest"


export default function Register({ url, headers, setLoggedIn }) {

    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    async function addUser(url, name, email, password) {
        const userData = {
            name: name,
            email: email,
            password: password
        }

        const responseData = await otherRequest(url, headers, "user/register", userData, "POST")

        if (responseData.response.status == 200) {
            SetLocalSorage(responseData.result.user.token, responseData.result.user.id, responseData.result.user.privilege)
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

    const register = async (event) => {
        event.preventDefault();

        await addUser(url, event.target.name.value, event.target.email.value, event.target.password.value)

    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    if (error) {
        return (
            <div>
                <FeedBack message={error} status={"failure"} />
                <RegisterBox register={register} password={values.password} onChange={onChange} />
            </div>
        )
    }
    else if (success) {
        return (
            <div>
                <FeedBack message={success} status={"success"} />
                <RegisterBox register={register} password={values.password} onChange={onChange} />
            </div>
        )
    }
    else {
        return (
            <div>
                <RegisterBox register={register} password={values.password} onChange={onChange} />
            </div>
        )

    }

}