import ShowAchievement from "./ShowAchievement";


export default function UserDataShow({user, achievements, admin}){
    if(admin){
        return (
            <div>
                <p>Név: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Halálok: {user.deaths}</p>
                <p>Points: {user.points}</p>
                <p>Kills: {user.kills}</p>
                <p>idk: {user.boss1lvl}</p>
                <p>idk: {user.boss2lvl}</p>
                <p>idk: {user.boss3lvl}</p>
                <p>deleted_at: {user.deleted_at}</p>
                <p>modified_at: {user.modified_at}</p>
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
    else{
        return (
            <div>
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