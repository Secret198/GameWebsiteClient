import processDate from "./processDate"

export default function PostList({ user, viewUser, restoreUser, editUser, deleteUser, admin }) {
    const processedCreatedAt = processDate(user.created_at)
    const processedUpdatedAt = processDate(user.updated_at)

    if (admin && user.deleted_at) {
        return (
            <div className="listBox deleteBox">
                {user.privilege == 10 && <p>Admin</p>}
                <h2 onClick={() => viewUser(user.id)}>{user.name}</h2>
                <p>{processedCreatedAt.year} {processedCreatedAt.time}</p>
                <p>{processedUpdatedAt.year} {processedUpdatedAt.time}</p>
                <p>{user.deleted_at}</p>
                <button onClick={() => editUser(user.id)}>Szerkesztés</button>
                <button onClick={() => restoreUser(user.id)}>Visszaállítás</button>
            </div>
        )
    }
    else if(admin){
        return (
            <div className="listBox">
                {user.privilege == 10 && <p>Admin</p>}
                <h2 onClick={() => viewUser(user.id)}>{user.name}</h2>
                <p>{processedCreatedAt.year} {processedCreatedAt.time}</p>
                <p>{processedUpdatedAt.year} {processedUpdatedAt.time}</p>
                <p>{user.deleted_at}</p>
                <button onClick={() => editUser(user.id)}>Szerkesztés</button>
                <button onClick={() => deleteUser(user.id)}>Törlés</button>
            </div>
        )
    }
    else{
        return (
            <div>
                {user.privilege == 10 && <p>Admin</p>}
                <h2 onClick={() => viewUser(id)}>{user.name}</h2>
            </div>
        )
    }

}