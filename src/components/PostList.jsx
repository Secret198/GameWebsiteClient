import handleAllDates from "./handleAllDates"
import { useState } from "react"
import deleteRequest from "./deleteRequest"
import Load from "./Load"
import ConfirmWindow from "./ConfirmWindow"
import likeLogo from '../assets/heartWhite.png'
import editLogo from '../assets/edit.png'
import deleteLogo from '../assets/delete.png'
import likeON from '../assets/heartON.png'
import CircleLoader from "./CircleLoader";

export default function PostList({ post, url, headers, viewPost, editPost, likePost, likedPostsArr, admin, setError, setSuccess }) {
    const privilege = localStorage.getItem("privilege")
    const [postState, setPostState] = useState(post)
    const processedDates = handleAllDates(postState)
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)

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

    if (admin) {
        if (privilege == 10 || !postState.deleted_at) {
            return (
                <div className="listBox">

                    <h2 className="postTitle" onClick={() => viewPost(post.id)}>{postState.post}</h2>
                    {(loading) && <CircleLoader position={5}/>}
                    <p>{postState.name}</p>
                    
                    <div className="postBottom">
                        
                    

                        <div className="likeNumber">
                            <button className="circleButton edit" onClick={() => editPost(post.id)}><img src={editLogo} alt="szerkesztés" /></button>
                            <button className="circleButton delete" onClick={() => setShowConfirm(true)}>{postState.deleted_at ? "Visszaállítás" :  <img src={deleteLogo} alt="törlés" />}</button>
                            {!likedPostsArr.includes(post.id) ? <button className="circleButton" onClick={() => startLikeProcess(post.id, { likes: true })}><img src={likeLogo} alt="like" /></button> : <button className="circleButton" onClick={() => startLikeProcess(post.id, { likes: false })}><img src={likeON} alt="like" /></button>}<p>{postState.likes}</p>
                        
                        </div>
                        <div className="dates">
                            {postState.deleted_at && <p>{processedDates.deleted_at.year} {processedDates.deleted_at.time}</p>}
                            <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                            <p className="bottomDate">{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                        </div>
                    </div>                    
                    {(showConfirm) && <ConfirmWindow text={postState.deleted_at ? "Biztosan vissza szeretné állítani a posztot?" : "Biztosan törölni szeretné a posztot?"} functionToCall={postState.deleted_at ? () => restorePost(postState.id) : () => deletePost(postState.id)} setShow={setShowConfirm} />}
                </div>
            )
        }

    }
    else {
        return (
            <div className="listBox">

                <h2 className="postTitle" onClick={() => viewPost(post.id)}>{postState.post}</h2>
                {(loading) && <CircleLoader/>}
                <p>{postState.name}</p>
                
                <div className="postBottom">
                    
                    <div className="likeNumber">{!likedPostsArr.includes(post.id) ? <button className="circleButton" onClick={() => startLikeProcess(post.id, { likes: true })}><img src={likeLogo} alt="like" /></button> : <button className="circleButton" onClick={() => startLikeProcess(post.id, { likes: false })}><img src={likeON} alt="like" /></button>}<p>{postState.likes}</p></div>
                    <div className="dates">
                        <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                        <p className="bottomDate">{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                    </div>
                </div>

            </div>
        )
    }


}