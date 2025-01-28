import handleAllDates from "./handleAllDates";
import ShowAchievement from "./ShowAchievement";


export default function UserDataShow({ user, achievements, admin }) {
    const processedDates = handleAllDates(user)
    if (admin) {
        return (
            <div>
                {user.privilege == 10 && <p>Admin</p>}
                <p>Név: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Halálok: {user.deaths}</p>
                <p>waves: {user.waves}</p>
                <p>Kills: {user.kills}</p>
                <p>idk: {user.boss1lvl}</p>
                <p>idk: {user.boss2lvl}</p>
                <p>idk: {user.boss3lvl}</p>
                {user.deleted_at && <p>deleted_at: {processedDates.deleted_at.year} {process.deleted_at.time}</p>}
                <p>updated_at: {processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                <p>Profil készítése: {processedDates.created_at.year} {processedDates.created_at.time}</p>
                <div>
                    {
                        achievements.map((item) => (
                            <ShowAchievement key={item.id} name={item.name} description={item.description} />
                        ))
                    }
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                {user.privilege == 10 && <p>Admin</p>}
                <p>Név: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Halálok: {user.deaths}</p>
                <p>waves: {user.waves}</p>
                <p>Kills: {user.kills}</p>
                <p>idk: {user.boss1lvl}</p>
                <p>idk: {user.boss2lvl}</p>
                <p>idk: {user.boss3lvl}</p>
                <p>Profil készítése: {processedDates.created_at.year} {processedDates.created_at.time}</p>
                <div>
                    {
                        achievements.map((item) => (
                            <ShowAchievement key={item.id} name={item.name} description={item.description} />
                        ))
                    }
                </div>
            </div>
        )
    }

}