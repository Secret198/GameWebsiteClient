import handleAllDates from "./handleAllDates"
import { useState } from "react"
import deleteRequest from "./deleteRequest"
import Load from "./Load"
import ConfirmWindow from "./ConfirmWindow"

export default function PostList({ post, url, headers, viewPost, editPost, likePost, likedPostsArr, admin, setError, setSuccess }) {
    const privilege = localStorage.getItem("privilege")
    const [postState, setPostState] = useState(post)
    const processedDates = handleAllDates(postState)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    const postTitleCharacterLimit = 50

    const deletePost = async (postId) => {
        setLoading(true)
        const responseData = await deleteRequest(url, headers, "post/" + postId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setPostState(responseData.result.post)
        }
        else {
            setError(responseData.result.message)
        }
        setShowConfirm(false)
        setLoading(false)

    }

    const restorePost = async (postId) => {
        setLoading(true)

        const responseData = await deleteRequest(url, headers, "post/restore/" + postId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setPostState(responseData.result.post)

        }
        else {
            setError(responseData.result.message)
        }
        setShowConfirm(false)
        setLoading(false)

    }

    const startLikeProcess = async (postId, likes) => {
        setLoading(true)

        const responseData = await likePost(postId, likes)

        if (responseData.response.status == 200) {
            setPostState(responseData.result.post)
        }
        else {
            setError(responseData.result.message)
        }
        setLoading(false)

    }

    let longPost = false
    if(postState.post.length > 30){
        longPost = true
    }

    if (admin) {
        if (privilege == 10 || !postState.deleted_at) {
            return (
                <div>
                    {(loading) && <Load />}
                    <h2 onClick={() => viewPost(post.id)}>{postState.post.substring(0, postTitleCharacterLimit)}{longPost && "..."}</h2>
                    <p>{postState.name}</p>
                    <p>{postState.likes}</p>
                    <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                    <p>{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                    {postState.deleted_at && <p>{processedDates.deleted_at.year} {processedDates.deleted_at.time}</p>}
                    <button onClick={() => editPost(post.id)}>Szerkesztés</button>
                    <button onClick={() => setShowConfirm(true)}>{postState.deleted_at ? "Visszaállítás" : "Törlés"}</button>
                    {(showConfirm) && <ConfirmWindow text={postState.deleted_at ? "Biztosan vissza szeretné állítani a posztot?" : "Biztosan törölni szeretné a posztot?"} functionToCall={postState.deleted_at ? () => restorePost(postState.id) : () => deletePost(postState.id)} setShow={setShowConfirm} />}
                    {!likedPostsArr.includes(post.id) ? <button onClick={() => startLikeProcess(post.id, { likes: true })}>Like</button> : <button className="liked" onClick={() => startLikeProcess(post.id, { likes: false })}>Like</button>}

                </div>
            )
        }

    }
    else {
        return (
            <div>
                {(loading) && <Load />}

                <h2 onClick={() => viewPost(post.id)}>{postState.post.substring(0, postTitleCharacterLimit)}{longPost && "..."}</h2>
                <p>{postState.name}</p>
                <p>{postState.likes}</p>
                <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                <p>{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                {!likedPostsArr.includes(post.id) ? <button onClick={() => startLikeProcess(post.id, { likes: true })}>Like</button> : <button className="liked" onClick={() => startLikeProcess(post.id, { likes: false })}>Like</button>}

            </div>
        )
    }


}