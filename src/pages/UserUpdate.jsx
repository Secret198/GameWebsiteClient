import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import FeedBack from "../components/FeedBack"
import UserUpdateBox from "../components/UserUpdateBox"
import otherRequest from "../components/otherRequest"
import getRequest from "../components/getRequest"
import Load from "../components/Load"


export default function UserUpdate({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)
    const id = useParams().id

    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            const returnData = await getRequest(url, headers, "user/" + id)

            if (returnData.response.status == 200) {
                setUser(returnData.result.user)
            }
            else {
                setError(returnData.result.message)
            }
            setLoading(false)
        }
        getUser()

    }, [])

    const updateUser = async (e) => {
        e.preventDefault()
        setLoading(true)
        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value
        }

        const returnData = await otherRequest(url, headers, "user/update/" + user.id, newUser, "PUT")

        setLoading(false)
        if (returnData.response.status == 200) {
            setError("")
            setSuccess(returnData.result.message)
            setTimeout(() => {
                navigation("/")
            }, 1000);
        }
        else {
            setError(returnData.result.message)
        }
    }

    return (
        <div>
            {loading && <Load />}
            {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
            <UserUpdateBox name={user.name} email={user.email} submitUser={updateUser} />
        </div>
    )

    // if (success) {
    //     return (
    //         <div>
    //             <FeedBack message={success} status={"success"} />
    //             <UserUpdateBox name={user.name} email={user.email} submitUser={updateUser} />
    //         </div>
    //     )
    // }
    // else if (error) {
    //     return (
    //         <div>
    //             <FeedBack message={error} status={"failure"} />
    //             <UserUpdateBox name={user.name} email={user.email} submitUser={updateUser} />
    //         </div>
    //     )
    // }
    // else if (user) {
    //     return <div>
    //         {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
    //         <UserUpdateBox name={user.name} email={user.email} submitUser={updateUser} />
    //     </div>
    // }

}