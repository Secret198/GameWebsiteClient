import handleAllDates from "./handleAllDates";
import ShowAchievement from "./ShowAchievement";


export default function UserDataShow({ user, achievements, admin }) {
    const processedDates = handleAllDates(user)
    if (admin) {
        return (
            <div className="userDataShow">


                {user.privilege == 10 && <p>Admin</p>}
                <p>Név: {user.name}</p>
                <p>Email: </p><p class="right">{user.email}</p>
                <p>Halálok: </p><p class="right">{user.deaths}</p>
                <p>waves: </p><p class="right">{user.waves}</p>
                <p>Kills: </p><p class="right">{user.kills}</p>
                <p>idk: </p><p class="right">{user.boss1lvl}</p>
                <p>idk: </p><p class="right">{user.boss2lvl}</p>
                <p>idk: </p><p class="right">{user.boss3lvl}</p>
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
            <>
            <div className="userDataShow">


                
                <p>Name: {user.name} {user.privilege == 10 && <p>Admin</p>}</p>
                <p>Email: {user.email}</p>
                <p>Deaths: </p><p class="right">{user.deaths}</p>
                <p>Waves: </p><p class="right">{user.waves}</p>
                <p>Kills: </p><p class="right">{user.kills}</p>
                <p>1. Boss killed: </p><p class="right">{user.boss1lvl}</p>
                <p>2. Boss killed: </p><p class="right">{user.boss2lvl}</p>
                <p>3. Boss killed: </p><p class="right">{user.boss3lvl}</p>
                <p>Profile created: {processedDates.created_at.year} {processedDates.created_at.time}</p>
                
            </div>
            <div>
            {
                achievements.map((item) => (
                    <ShowAchievement key={item.id} name={item.name} description={item.description} />
                ))
            }
            </div>
            </>
        )
    }

}