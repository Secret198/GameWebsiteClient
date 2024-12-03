import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import FeedBack from "../components/FeedBack"
import UserUpdateBox from "../components/UserUpdateBox"
import otherRequest from "../components/otherRequest"
import getRequest from "../components/getRequest"


export default function UserUpdate({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [user, setUser] = useState()
    const id = useParams().id

    useEffect(() => {
        const getUser = async () => {

            const returnData = await getRequest(url, headers, "user/"+id)

            if (returnData.response.status == 200) {
                setUser(returnData.result.user)
            }
        }
        getUser()

    }, [])

    const updateUser = async (e) => {
        e.preventDefault()

        const newUser = {
            name: e.target.name.value,
            email: e.target.email.value
        }

        const returnData = await otherRequest(url, headers, "user/update/"+user.id, newUser, "PUT")

        if (returnData.response.status == 200) {
            setSuccess(returnData.result.message)
            setTimeout(() => {
                navigation("/")
            }, 1000);
        }
        else {
            setError(returnData.result.message)
        }
    }



    if (success) {
        return (
            <div>
                <FeedBack message={success} status={"success"} />
                <UserUpdateBox name={user.name} email={user.email} submitUser={updateUser} />
            </div>
        )
    }
    else if (error) {
        return (
            <div>
                <FeedBack message={error} status={"failure"} />
                <UserUpdateBox name={user.name} email={user.email} submitUser={updateUser} />
            </div>
        )
    }
    else if (user) {
        return <div>
            <UserUpdateBox name={user.name} email={user.email} submitUser={updateUser} />
        </div>
    }

}