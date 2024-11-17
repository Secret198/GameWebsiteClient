import { useState } from "react"
import FeedBack from "../components/FeedBack"
import { useNavigate } from "react-router-dom"


export default function Register({ url }) {

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
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(userData)
        });
        const result = await response.json()

        if (response.status == 200) {
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
        return <>
            <FeedBack message={error} />
            <form onSubmit={register}>
                <input type="email" placeholder="Email" id="email" required />
                <input type="text" placeholder="Username" id="name" required />
                <input type="password" placeholder="Password" id="password" required />
                <input type="password" placeholder="Password again" id="password2" required />
                <button type="submit">Regisztráció</button>
            </form>
        </>
    }
    else if (success) {
        return <>
            <FeedBack message={success} />

            <form onSubmit={register}>
                <input type="email" placeholder="Email" id="email" required />
                <input type="text" placeholder="Username" id="name" required />
                <input type="password" placeholder="Password" id="password" required />
                <input type="password" placeholder="Password again" id="password2" required />
                <button type="submit" disabled>Regisztráció</button>
            </form>
        </>
    }
    else {
        return <form onSubmit={register}>
            <input type="email" placeholder="Email" id="email" required />
            <input type="text" placeholder="Username" id="name" required />
            <input type="password" placeholder="Password" id="password" required />
            <input type="password" placeholder="Password again" id="password2" required />
            <button type="submit">Regisztráció</button>
        </form>
    }

}