import AchievementCreateBox from "../components/AchievementCreateBox"
import FeedBack from "../components/FeedBack"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


export default function AchievementCreate({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const submitAchievement = async (e) => {
        e.preventDefault()
        if (localStorage.getItem("privilege") < 10) {
            setError("Insufficent privileges")
        }
        else {
            const data = {
                name: e.target.name.value,
                field: e.target.field.value,
                threshold: e.target.threshold.value,
                description: e.target.description.value
            }

            const response = await fetch(url + "achievement", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data)
            })
            const result = await response.json()

            if (response.status == 200) {
                setSuccess(result.message)
                setTimeout(() => {
                    navigation("/")
                }, 1000);
            }
            else {
                setError(result.error)
            }
        }
    }

    if (error) {
        return (
            <div>
                <FeedBack message={error} status={"failure"} />
                <AchievementCreateBox submitAchievement={submitAchievement} selected={"kills"} />
            </div>
        )
    }
    else if (success) {
        return (
            <div>
                <FeedBack message={success} status={"success"} />
                <AchievementCreateBox submitAchievement={submitAchievement} selected={"kills"} />
            </div>
        )
    }
    else {
        return <div>
            <AchievementCreateBox submitAchievement={submitAchievement} selected={"kills"} />
        </div>

    }
}