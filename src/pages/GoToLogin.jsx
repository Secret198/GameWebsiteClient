import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


export default function GoToLogin() {
    const [goToLogin, setGoToLogin] = useState(false)
    const navigation = useNavigate()

    useEffect(() => {
        if (goToLogin) {
            navigation("/login")
        }
    }, [goToLogin])

    return <div>
        <h1>You are not logged in </h1>
        <button onClick={() => { setGoToLogin(true) }}>Go to login</button>
    </div>
}