import { useEffect, useState } from "react"
import getRequest from "../components/getRequest"
import UserDataShow from "../components/UserDataShow"
import { Link, useParams } from "react-router-dom"


export default function GetUserData({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const id = useParams().id
    const [error, setError] = useState("")
    const [user, setUser] = useState({})
    const [achievements, setAchievements] = useState([])
    const privilege = localStorage.getItem("privilege")

    const adminNum = localStorage.getItem("privilege")
    let admin = false
    switch (adminNum) {
        case 10:
            admin = true
            break;
        case 1:
            admin = false;
            break;
    }

    useEffect(() => {
        const getUserData = async () => {
            const responseData = await getRequest(url, headers, "user/" + id)

            if (responseData.response.status == 200) {
                setUser(responseData.result.user)
                setAchievements(responseData.result.achievements)
            }
        }

        getUserData()
    }, [])

    return (
        <>
            <UserDataShow user={user} achievements={achievements} admin={admin} />
            {(id === localStorage.getItem("userId") || privilege == 10) && <Link to={"/user/update/" + id}>Szerkesztés</Link>}
        </>

    )

}