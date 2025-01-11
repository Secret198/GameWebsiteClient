import { useNavigate, useParams } from "react-router-dom";
import getRequest from "../components/getRequest";
import { useEffect, useState } from "react";
import Load from "../components/Load";
import deleteRequest from "../components/deleteRequest";
import FeedBack from "../components/FeedBack";
import ConfirmWindow from "../components/ConfirmWindow";


export default function GetPostData({ url, headers, likedPosts, likePost, setLikedPosts }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const id = useParams().id
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(false)
    const privilege = localStorage.getItem("privilege")
    const navigation = useNavigate()
    const [showConfirm, setShowConfirm] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getPost = async () => {
            const returnData = await getRequest(url, headers, "post/" + id)
            if (returnData.response.status == 200) {
                setPost(returnData.result.post)
                setLikedPosts(returnData.result.likedPosts)
            }
            else {
                setError(returnData.result.message)
            }
            setLoading(false)
        }

        getPost()
    }, [])

    const editPost = (postId) => {
        navigation("/post/update/" + postId)
    }

    const deletePost = async (postId) => {
        setLoading(true)
        const responseData = await deleteRequest(url, headers, "post/" + postId)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setPost(responseData.result.post)
        }
        else {
            setError(responseData.result.message)
        }
        setShowConfirm(false)
        setLoading(false)
        console.log(responseData)
    }

    const restorePost = async (postId) => {
        setLoading(true)
        const responseData = await deleteRequest(url, headers, "post/restore/" + post.id)
        if (responseData.response.status == 200) {
            setError("")
            setSuccess(responseData.result.message)
            setPost(responseData.result.post)
        }
        else {
            setError(responseData.result.message)
        }
        console.log(responseData)
        setShowConfirm(false)
        setLoading(false)
    }

    const startLikeProcess = async (postId, likes) => {
        const responseData = await likePost(postId, likes)

        if (responseData.response.status == 200) {
            setPost(responseData.result.post)
        }
        else {
            setError(responseData.result.message)
        }
    }

    return (
        <div>
            {loading && <Load />}
            {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}

            <img src={post.image} alt="" />
            <p>{post.post}</p>
            <p>{post.user}</p>
            <p>{post.created_at}</p>
            <p>{post.updated_at}</p>
            {(privilege == 10 && post.deleted_at) && <p>{post.deleted_at}</p>}
            <p>{post.likes}</p>
            {/* {(privilege == 10 && !error && !loading) && <button onClick={(post.deleted_at) ? () => restorePost(post.id) : () => deletePost(post.id)}>{(post.deleted_at) ? "Visszaállítás" : "Törlés"}</button>} */}
            {(privilege == 10 && !error && !loading) && <button onClick={() => setShowConfirm(true)}>{(post.deleted_at) ? "Visszaállítás" : "Törlés"}</button>}
            {(privilege == 10 && !error && !loading) && <button onClick={() => editPost(post.id)}>Szerkesztés</button>}
            {(!error && !loading) && <button className={!likedPosts.includes(post.id) ? "" : "liked"} onClick={() => startLikeProcess(post.id, { likes: (!likedPosts.includes(post.id) ? true : false) })}>Like</button>}
            {(showConfirm) && <ConfirmWindow text={post.deleted_at ? "Biztosan vissza szeretné állítani a posztot?" : "Biztosan törölni szeretné a posztot?"} functionToCall={post.deleted_at ? () => restorePost(post.id) : () => deletePost(post.id)} setShow={setShowConfirm} />}
            {/* {!likedPosts.includes(post.id) ? <button onClick={() => likePost(post.id, { likes: true })}>Like</button> : <button className="liked" onClick={() => likePost(post.id, { likes: false })}>Like</button>} */}
        </div>
    )

    // if (error || success) {
    //     return (
    //         <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />
    //     )
    // }
    // else {
    //     return (
    //         <div>
    //             {loading && <Load />}
    //             {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}

    //             <img src={post.image} alt="" />
    //             <p>{post.post}</p>
    //             <p>{post.created_at}</p>
    //             <p>{post.likes}</p>
    //             {(privilege == 10) && <button onClick={(post.deleted_at) ? () => restorePost(post.id) : () => deletePost(post.id)}>{(post.deleted_at) ? "Visszaállítás" : "Törlés"}</button>}
    //             {(privilege == 10) && <button onClick={() => editPost(post.id)}>Szerkesztés</button>}
    //             {!likedPosts.includes(post.id) ? <button onClick={() => likePost(post.id, { likes: true })}>Like</button> : <button className="liked" onClick={() => likePost(post.id, { likes: false })}>Like</button>}
    //         </div>
    //     )
    // }


}