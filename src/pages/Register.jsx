import { useState } from "react"
import FeedBack from "../components/FeedBack"
import { useNavigate } from "react-router-dom"
import RegisterBox from "../components/RegisterBox"
import SetLocalSorage from "../components/localStorageHandle"


export default function Register({ url, headers }) {

    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function addUser(url, name, email, password) {
        const userData = {
            name: name,
            email: email,
            password: password
        }


        const response = await fetch(url + "user/register", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(userData)
        });
        const result = await response.json()

        if (response.status == 200) {
            SetLocalSorage(result.user.token, result.user.id, result.user.privilege)
            setSuccess(result.message)
            setTimeout(() => {
                navigation("/")
            }, 1000);
        }
        else {
            setError(result.message)
        }

    }

    const register = async (event) => {
        event.preventDefault();
        if (event.target.password.value !== event.target.password2.value) {
            setError("A két jelszó nem egyezik meg")
        }
        else {
            await addUser(url, event.target.name.value, event.target.email.value, event.target.password.value)
        }
    }


    if (error) {
        return (
            <div>
                <FeedBack message={error} />
                <RegisterBox register={register} />
            </div>
        )
    }
    else if (success) {
        return (
            <div>
                <FeedBack message={success} />
                <RegisterBox register={register} />
            </div>
        )
    }
    else {
        return (
            <div>
                <RegisterBox register={register} />
            </div>
        )

    }

}