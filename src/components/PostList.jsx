

export default function PostList({post, viewPost, editPost, deletePost, likePost, likedPostsArr, admin }) {


    if (admin) {
        return (
            <div>
                <h2 onClick={() => viewPost(post.id)}>{post.post}</h2>
                <p>{post.likes}</p>
                <p>{post.created_at}</p>
                <p>{post.modified_at}</p>
                <p>{post.deleted_at}</p>
                <button onClick={() => editPost(post.id)}>Szerkesztés</button>
                <button onClick={() => deletePost(post.id)}>Törlés</button>
                {!likedPostsArr.includes(post.id) ? <button onClick={() => likePost(post.id, {likes: true})}>Like</button> : <button className="liked" onClick={() => likePost(post.id, {likes: false})}>Like</button>}
                
            </div>
        )
    }

    return (
        <div>
            <h2 onClick={() => viewPost(post.id)}>{post}</h2>
            <p>{post.likes}</p>
            <p>{post.created_at}</p>
            <p>{post.modified_at}</p>
            {!likedPostsArr.includes(post.id) ? <button onClick={() => likePost(post.id, {likes: true})}>Like</button> : <button className="liked" onClick={() => likePost(post.id, {likes: false})}>Like</button>}

        </div>
    )
}