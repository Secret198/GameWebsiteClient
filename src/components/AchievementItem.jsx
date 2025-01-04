import { Link } from "react-router-dom"


export default function AchievementItem({ achievement, deleteAchievement, restoreAchievement }) {
    const privilege = localStorage.getItem("privilege")
    return (
        <div>
            <h2>{achievement.name}</h2>
            <p>{achievement.description}</p>
            {privilege == 10 && <Link to={"/achievement/update/" + achievement.id}>Szerkesztés</Link>}
            {privilege == 10 && <button onClick={achievement.deleted_at ? () => restoreAchievement(achievement.id) : () => deleteAchievement(achievement.id)}>{achievement.deleted_at ? "Visszaállítás" : "Törlés"}</button>}
        </div>
    )
}