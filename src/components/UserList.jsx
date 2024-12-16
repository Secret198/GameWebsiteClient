import processDate from "./processDate"
import handleAllDates from "./handleAllDates"

export default function UserList({ user, viewUser, restoreUser, editUser, deleteUser, admin }) {
    const processedDates = handleAllDates(user)

    if (admin && user.deleted_at) {
        return (
            <div className="listBox deleteBox">
                {user.privilege == 10 && <p>Admin</p>}
                <h2 onClick={() => viewUser(user.id)}>{user.name}</h2>
                <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                <p>{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                <p>{processedDates.deleted_at.year} {processedDates.deleted_at.time}</p>
                <button onClick={() => editUser(user.id)}>Szerkesztés</button>
                <button onClick={() => restoreUser(user.id)}>Visszaállítás</button>
            </div>
        )
    }
    else if(admin){
        const processedCreatedAt = processDate(user.created_at)
        const processedUpdatedAt = processDate(user.updated_at)
        const processedDeletedAt = processDate(user.deleted_at)
        return (
            <div className="listBox">
                {user.privilege == 10 && <p>Admin</p>}
                <h2 onClick={() => viewUser(user.id)}>{user.name}</h2>
                <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                <p>{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                <p>{processedDates.deleted_at.year} {processedDates.deleted_at.time}</p>
                <button onClick={() => editUser(user.id)}>Szerkesztés</button>
                <button onClick={() => deleteUser(user.id)}>Törlés</button>
            </div>
        )
    }
    else{
        return (
            <div>
                {user.privilege == 10 && <p>Admin</p>}
                <h2 onClick={() => viewUser(user.id)}>{user.name}</h2>
            </div>
        )
    }

}