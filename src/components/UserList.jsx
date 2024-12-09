import processDate from "./processDate"

export default function PostList({ id, name, created_at, updated_at, viewUser, deleted_at, restoreUser, editUser, deleteUser, admin }) {
    const processedCreatedAt = processDate(created_at)
    const processedUpdatedAt = processDate(updated_at)

    if (admin && deleted_at) {
        return (
            <div className="listBox deleteBox">
                <h2 onClick={() => viewUser(id)}>{name}</h2>
                <p>{processedCreatedAt.year} {processedCreatedAt.time}</p>
                <p>{processedUpdatedAt.year} {processedUpdatedAt.time}</p>
                <p>{deleted_at}</p>
                <button onClick={() => editUser(id)}>Szerkesztés</button>
                <button onClick={() => restoreUser(id)}>Visszaállítás</button>
            </div>
        )
    }
    else if(admin){
        return (
            <div className="listBox">
                <h2 onClick={() => viewUser(id)}>{name}</h2>
                <p>{processedCreatedAt.year} {processedCreatedAt.time}</p>
                <p>{processedUpdatedAt.year} {processedUpdatedAt.time}</p>
                <p>{deleted_at}</p>
                <button onClick={() => editUser(id)}>Szerkesztés</button>
                <button onClick={() => deleteUser(id)}>Törlés</button>
            </div>
        )
    }
    else{
        return (
            <div>
                <h2 onClick={() => viewUser(id)}>{name}</h2>
    
            </div>
        )
    }

}