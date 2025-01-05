import { useEffect, useState } from "react"
import getRequest from "../components/getRequest"
import UserDataShow from "../components/UserDataShow"
import { Link, useParams, useNavigate } from "react-router-dom"
import deleteRequest from "../components/deleteRequest"
import otherRequest from "../components/otherRequest"
import Load from "../components/Load"
import FeedBack from "../components/FeedBack"


export default function GetUserData({ url, headers, setLoggedIn }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const id = useParams().id
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [user, setUser] = useState({})
    const [achievements, setAchievements] = useState([])
    const [loading, setLoading] = useState(false)
    const privilege = localStorage.getItem("privilege")
    const navigation = useNavigate()



    useEffect(() => {
        setLoading(true)
        const getUserData = async () => {
            const responseData = await getRequest(url, headers, "user/" + id)
            console.log(responseData)
            if (responseData.response.status == 200) {
                setUser(responseData.result.user)
                setAchievements(responseData.result.achievements)
            }
            else {
                setError(responseData.result.message)
            }
            setLoading(false)
        }

        getUserData()
    }, [])

    const deleteUser = async (userId) => {
        setLoading(true)
        const responseData = await deleteRequest(url, headers, "user/" + userId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setUser(responseData.result.user)
        }
        else {
            setError(responseData.result.message)
        }
        setLoading(false)

    }

    const restoreUser = async (userId) => {
        const responseData = await deleteRequest(url, headers, "user/restore/" + userId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setUser(responseData.result.user)
        }
        else {
            setError(responseData.result.message)
        }
    }

    const makeUserAdmin = async (userId) => {
        setLoading(true)
        const requestBody = {
            privilege: 10
        }
        const responseData = await otherRequest(url, headers, "user/update/privilege/" + userId, requestBody, "PATCH")
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setUser(responseData.result.user)
        }
        else {
            setError(responseData.result.message)
        }
        setLoading(false)
    }


    return (
        <>
            {loading && <Load />}
            {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
            <UserDataShow user={user} achievements={achievements} admin={privilege == 10 ? true : false} />
            {((id === localStorage.getItem("userId") || privilege == 10) && !error) && <Link to={"/user/update/" + id}>Szerkesztés</Link>}
            {(privilege == 10 && !error) && <button onClick={user.deleted_at ? () => restoreUser(id) : () => deleteUser(id)}>{user.deleted_at ? "Vissaállítás" : "Fiók törlése"}</button>}
            {(privilege == 10 && user.privilege != 10 && !error) && <button onClick={() => makeUserAdmin(id)}>Adminná tevés</button>}
        </>

    )

}