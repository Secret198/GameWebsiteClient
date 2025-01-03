import AchievementBox from "../components/AchievementBox"
import FeedBack from "../components/FeedBack"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import otherRequest from "../components/otherRequest"
import Load from "../components/Load"


export default function AchievementCreate({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState(false)

    const submitAchievement = async (e) => {
        e.preventDefault()
        if (localStorage.getItem("privilege") < 10) {
            setError("Insufficent privileges")
        }
        else {
            setLoading(true)
            const data = {
                name: e.target.name.value,
                field: e.target.field.value,
                threshold: e.target.threshold.value,
                description: e.target.description.value
            }

            const responseData = await otherRequest(url, headers, "achievement", data, "POST")

            setLoading(false)

            if (responseData.response.status == 200) {
                setSuccess(responseData.result.message)
                setTimeout(() => {
                    navigation("/")
                }, 1000);
            }
            else {
                setError(responseData.result.error)
            }
        }
    }

    return (
        <div>
            {loading && <Load />}
            {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
            <AchievementBox submitAchievement={submitAchievement} selected={"kills"} isCreate={true} />
        </div>
    )

    // if (error) {
    //     return (
    //         <div>
    //             <FeedBack message={error} status={"failure"} />
    //             <AchievementBox submitAchievement={submitAchievement} selected={"kills"} isCreate={true} />
    //         </div>
    //     )
    // }
    // else if (success) {
    //     return (
    //         <div>
    //             <FeedBack message={success} status={"success"} />
    //             <AchievementBox submitAchievement={submitAchievement} selected={"kills"} isCreate={true} />
    //         </div>
    //     )
    // }
    // else {
    //     return <div>
    //         {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
    //         <AchievementBox submitAchievement={submitAchievement} selected={"kills"} isCreate={true} />
    //     </div>

    // }
}