
export default function PostList({ id, name, created_at, modified_at, viewUser, deleted_at, editUser, deleteUser, admin }) {
    if (admin) {
        return (
            <div>
                <h2 onClick={() => viewUser(id)}>{name}</h2>
                <p>{created_at}</p>
                <p>{modified_at}</p>
                <p>{deleted_at}</p>
                <button onClick={() => editUser(id)}>Szerkesztés</button>
                <button onClick={() => deleteUser(id)}>Törlés</button>
            </div>
        )
    }

    return (
        <div>
            <h2 onClick={() => viewUser(id)}>{name}</h2>

        </div>
    )
}