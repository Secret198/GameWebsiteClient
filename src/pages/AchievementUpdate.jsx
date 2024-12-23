import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import FeedBack from "../components/FeedBack"
import AchievementBox from "../components/AchievementBox"
import getRequest from "../components/getRequest"
import otherRequest from "../components/otherRequest"

export default function AchievementUpdate({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [achievement, setAchievement] = useState()
    const id = useParams().id

    useEffect(() => {
        const getAchievement = async () => {

            const responseData = await getRequest(url, headers, "achievement/" + id)
            console.log(responseData)
            if (responseData.response.status == 200) {
                setAchievement(responseData.result.achievement)
            }
        }
        getAchievement()

    }, [])

    const updateAchievement = async (e) => {
        e.preventDefault()

        const newAchievement = {
            name: e.target.name.value,
            description: e.target.description.value,
            field: e.target.field.value,
            threshold: e.target.threshold.value
        }

        const responseData = await otherRequest(url, headers, "achievement/" + achievement.id, newAchievement, "PATCH")

        if (responseData.response.status == 200) {
            setSuccess(responseData.result.message)
            setTimeout(() => {
                navigation("/")
            }, 1000);
        }
        else {
            setError(responseData.result.message)
        }
    }



    if (success) {
        return (
            <div>
                <FeedBack message={success} status={"success"} />
                <AchievementBox name={achievement.name} selected={achievement.field} threshold={achievement.threshold} description={achievement.description} submitAchievement={updateAchievement} isCreate={false} />
            </div>
        )
    }
    else if (error) {
        return (
            <div>
                <FeedBack message={error} status={"failure"} />
                <AchievementBox name={achievement.name} selected={achievement.field} threshold={achievement.threshold} description={achievement.description} submitAchievement={updateAchievement} isCreate={false} />
            </div>
        )
    }
    else if (achievement) {
        return <div>
            <AchievementBox name={achievement.name} selected={achievement.field} threshold={achievement.threshold} description={achievement.description} submitAchievement={updateAchievement} isCreate={false} />
        </div>
    }

}