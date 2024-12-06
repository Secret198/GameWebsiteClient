

export default function PostList({ id, post, created_at, viewPost, deleted_at, modified_at, editPost, deletePost, admin }) {
    if (admin) {
        return (
            <div>
                <h2 onClick={() => viewPost(id)}>{post}</h2>
                <p>{created_at}</p>
                <p>{modified_at}</p>
                <p>{deleted_at}</p>
                <button onClick={() => editPost(id)}>Szerkesztés</button>
                <button onClick={() => deletePost(id)}>Törlés</button>
            </div>
        )
    }

    return (
        <div>
            <h2 onClick={() => viewPost(id)}>{post}</h2>
            <p>{created_at}</p>
            <p>{modified_at}</p>
        </div>
    )
}