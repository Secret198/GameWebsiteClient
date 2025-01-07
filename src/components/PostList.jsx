import handleAllDates from "./handleAllDates"
import { useState } from "react"
import deleteRequest from "./deleteRequest"

export default function PostList({ post, url, headers, viewPost, editPost, likePost, likedPostsArr, admin, setError, setSuccess }) {
    const privilege = localStorage.getItem("privilege")
    const [postState, setPostState] = useState(post)
    const processedDates = handleAllDates(postState)

    const deletePost = async (postId) => {

        const responseData = await deleteRequest(url, headers, "post/" + postId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setPostState(responseData.result.post)
        }
        else {
            setError(responseData.result.message)
        }
    }

    const restorePost = async (postId) => {
        const responseData = await deleteRequest(url, headers, "post/restore/" + postId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setPostState(responseData.result.post)

        }
        else {
            setError(responseData.result.message)
        }
    }

    const startLikeProcess = async (postId, likes) => {
        const responseData = await likePost(postId, likes)

        if(responseData.response.status == 200){
            setPostState(responseData.result.post)
        }
        else{
            setError(responseData.result.message)
        }
    }

    if (admin) {
        if (privilege == 10 || !postState.deleted_at) {
            return (
                <div>

                    <h2 onClick={() => viewPost(post.id)}>{postState.post}</h2>
                    <p>{postState.likes}</p>
                    <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                    <p>{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                    {postState.deleted_at && <p>{processedDates.deleted_at.year} {processedDates.deleted_at.time}</p>}
                    <button onClick={() => editPost(post.id)}>Szerkesztés</button>
                    <button onClick={postState.deleted_at ? () => restorePost(post.id) : () => deletePost(post.id)}>{postState.deleted_at ? "Visszaállítás" : "Törlés"}</button>

                    {!likedPostsArr.includes(post.id) ? <button onClick={() => startLikeProcess(post.id, { likes: true })}>Like</button> : <button className="liked" onClick={() => startLikeProcess(post.id, { likes: false })}>Like</button>}

                </div>
            )
        }

    }
    else {
        return (
            <div>

                <h2 onClick={() => viewPost(post.id)}>{post.post}</h2>
                <p>{postState.likes}</p>
                <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                <p>{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                {!likedPostsArr.includes(post.id) ? <button onClick={() => startLikeProcess(post.id, { likes: true })}>Like</button> : <button className="liked" onClick={() => startLikeProcess(post.id, { likes: false })}>Like</button>}

            </div>
        )
    }


}