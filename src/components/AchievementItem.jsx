import { Link } from "react-router-dom"
import { useState } from "react"
import deleteRequest from "./deleteRequest"

export default function AchievementItem({ achievement, setError, setSuccess, url, headers }) {
    const privilege = localStorage.getItem("privilege")
    const [achievementState, setAchievementState] = useState(achievement)

    const deleteAchievement = async (achievementId) => {
        const responseData = await deleteRequest(url, headers, "achievement/" + achievementId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setAchievementState(responseData.result.achievement)
        }
        else {
            setError(responseData.result.message)
        }
        console.log(responseData)
    }

    const restoreAchievement = async (achievementId) => {
        const responseData = await deleteRequest(url, headers, "achievement/restore/" + achievementId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setAchievementState(responseData.result.achievement)
        }
        else {
            setError(responseData.result.message)
        }
        console.log(responseData)
    }

    return (
        <div>
            <h2>{achievement.name}</h2>
            <p>{achievement.description}</p>
            {achievementState.deleted_at && <p>Deleted</p>}
            {privilege == 10 && <Link to={"/achievement/update/" + achievement.id}>Szerkesztés</Link>}
            {privilege == 10 && <button onClick={achievementState.deleted_at ? () => restoreAchievement(achievement.id) : () => deleteAchievement(achievement.id)}>{achievementState.deleted_at ? "Visszaállítás" : "Törlés"}</button>}
        </div>
    )
}