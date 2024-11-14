import { useState } from "react";

function useToken() {
    const getToken = () => {
        const tokenText = localStorage.getItem("token")
        const tokenJSON = JSON.stringify(tokenText)
        return tokenJSON?.token
    }

    const [token, setToken] = useState(getToken())

    const saveToken = tokenJSON => {
        const tokenText = JSON.stringify(tokenJSON)
        localStorage.setItem("token", tokenText)
        setToken(tokenText)
    }

    return {
        setToken: saveToken,
        token
    }
}

export default useToken