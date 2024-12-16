import handleAllDates from "./handleAllDates"
import processDate from "./processDate"

export default function PostList({post, viewPost, editPost, deletePost, likePost, likedPostsArr, admin }) {
    const processedDates = handleAllDates(post)

    if (admin) {

        return (
            <div>
                <h2 onClick={() => viewPost(post.id)}>{post.post}</h2>
                <p>{post.likes}</p>
                <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                <p>{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                <p>{processedDates.deleted_at.year} {processedDates.deleted_at.time}</p>
                <button onClick={() => editPost(post.id)}>Szerkesztés</button>
                <button onClick={() => deletePost(post.id)}>Törlés</button>
                {!likedPostsArr.includes(post.id) ? <button onClick={() => likePost(post.id, {likes: true})}>Like</button> : <button className="liked" onClick={() => likePost(post.id, {likes: false})}>Like</button>}
                
            </div>
        )
    }
    else{
        return (
            <div>
                <h2 onClick={() => viewPost(post.id)}>{post.post}</h2>
                <p>{post.likes}</p>
                <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                <p>{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                {!likedPostsArr.includes(post.id) ? <button onClick={() => likePost(post.id, {likes: true})}>Like</button> : <button className="liked" onClick={() => likePost(post.id, {likes: false})}>Like</button>}
    
            </div>
        )
    }

   
}