import ShowAchievement from "./ShowAchievement";


export default function UserDataShow({ user, achievements, admin }) {
    if (admin) {
        return (
            <div>
                {user.privilege == 10 && <p>Admin</p>}
                <p>Név: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Halálok: {user.deaths}</p>
                <p>Points: {user.points}</p>
                <p>Kills: {user.kills}</p>
                <p>idk: {user.boss1lvl}</p>
                <p>idk: {user.boss2lvl}</p>
                <p>idk: {user.boss3lvl}</p>
                {user.deleted_at && <p>deleted_at: {user.deleted_at}</p>}
                <p>updated_at: {user.updated_at}</p>
                <p>Profil készítése: {user.created_at}</p>
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
                <p>Points: {user.points}</p>
                <p>Kills: {user.kills}</p>
                <p>idk: {user.boss1lvl}</p>
                <p>idk: {user.boss2lvl}</p>
                <p>idk: {user.boss3lvl}</p>
                <p>Profil készítése: {user.created_at}</p>
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