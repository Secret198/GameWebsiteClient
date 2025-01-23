import { useState } from "react"
import handleAllDates from "./handleAllDates"
import deleteRequest from "./deleteRequest"
import { useNavigate } from "react-router-dom"
import ConfirmWindow from "./ConfirmWindow"
import Load from "./Load"

export default function UserList({ user, viewUser, editUser, admin, url, headers, setError, setSuccess, setLoggedIn }) {
    const [userState, setUserState] = useState(user)
    const navigation = useNavigate()
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

    const processedDates = handleAllDates(userState)

    const deleteUser = async (userId) => {
        setLoading(true)
        const responseData = await deleteRequest(url, headers, "user/" + userId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setUserState(responseData.result.user)
            if (userId == localStorage.getItem("userId")) {
                localStorage.clear()
                setLoggedIn(false)
                navigation("/")
            }
        }
        else {
            setError(responseData.result.message)
        }
        setShowConfirm(false)
        setLoading(false)
    }

    const restoreUser = async (userId) => {
        setLoading(true)
        const responseData = await deleteRequest(url, headers, "user/restore/" + userId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setUserState(responseData.result.user)

        }
        else {
            setError(responseData.result.message)
        }
        setShowConfirm(false)
        setLoading(false)
    }

    if (admin) {
        return (
            <div className={userState.deleted_at ? "listBox deleteBox" : "listBox"}>
                {(loading) && <Load />}
                {user.privilege == 10 && <p>Admin</p>}
                <h2 onClick={() => viewUser(user.id)}>{user.name}</h2>
                <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                <p>{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                {userState.deleted_at && <p>{processedDates.deleted_at.year} {processedDates.deleted_at.time}</p>}
                <button onClick={() => editUser(user.id)}>Szerkesztés</button>
                <button onClick={() => setShowConfirm(true)}>{userState.deleted_at ? "Visszaállítás" : "Törlés"}</button>
                {(showConfirm) && <ConfirmWindow text={userState.deleted_at ? "Biztosan vissza szeretné állítani a felhasználót" : "Biztosan törölni szeretné a felhasználót"} functionToCall={userState.deleted_at ? () => restoreUser(userState.id) : () => deleteUser(userState.id)} setShow={setShowConfirm} />}
            </div>
        )
    }
    else {
        return (
            <div className={userState.deleted_at ? "listBox deleteBox" : "listBox"}>
                {user.privilege == 10 && <p>Admin</p>}
                <h2 onClick={() => viewUser(user.id)}>{user.name}</h2>
            </div>
        )
    }

}