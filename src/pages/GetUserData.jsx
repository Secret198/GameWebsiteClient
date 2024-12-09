import { useEffect, useState } from "react"
import getRequest from "../components/getRequest"
import UserDataShow from "../components/UserDataShow"
import { Link, useParams, useNavigate } from "react-router-dom"
import deleteRequest from "../components/deleteRequest"
import otherRequest from "../components/otherRequest"


export default function GetUserData({ url, headers, setLoggedIn }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const id = useParams().id
    const [error, setError] = useState("")
    const [user, setUser] = useState({})
    const [achievements, setAchievements] = useState([])
    const privilege = localStorage.getItem("privilege")
    const navigation = useNavigate()

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

    const deleteUser = async (userId) => {
        const responseData = await deleteRequest(url, headers, "user/"+userId)
        localStorage.clear()
        setTimeout(() => {
            setLoggedIn(false)
            navigation("/")
        }, 1000);
    }

    const makeUserAdmin = async (userId) => {
        const requestBody = {
            privilege: 10
        }
        const responseData = await otherRequest(url, headers, "user/update/privilege/"+userId, requestBody, "PATCH")
        console.log(responseData)
    }

    return (
        <>
            <UserDataShow user={user} achievements={achievements} admin={admin} />
            {(id === localStorage.getItem("userId") || privilege == 10) && <Link to={"/user/update/" + id}>Szerkesztés</Link>}
            {(privilege == 10) && <button onClick={() => deleteUser(id)}>Fiók törlése</button>}
            {(privilege == 10) && <button onClick={() => makeUserAdmin(id)}>Adminná tevés</button>}
        </>

    )

}