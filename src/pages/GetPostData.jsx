import { useNavigate, useParams } from "react-router-dom";
import getRequest from "../components/getRequest";
import { useEffect, useState } from "react";
import Load from "../components/Load";
import deleteRequest from "../components/deleteRequest";
import FeedBack from "../components/FeedBack";
import ConfirmWindow from "../components/ConfirmWindow";
import handleAllDates from "../components/handleAllDates";
import likeLogo from '../assets/heartWhite.png'
import likeON from '../assets/heartON.png'
import editLogo from '../assets/edit.png'
import deleteLogo from '../assets/delete.png'
import CircleLoader from "../components/CircleLoader";
import userPic from '../assets/user.png'

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
    const [processedDates, setProcessedDates] = useState({
        created_at: "",
        updated_at: "",
        deleted_at: ""
    })

    useEffect(() => {
        setLoading(true)
        const getPost = async () => {
            const returnData = await getRequest(url, headers, "post/" + id)
            if (returnData.response.status == 200) {
                setPost(returnData.result.post)
                setLikedPosts(returnData.result.likedPosts)
                setProcessedDates(handleAllDates(returnData.result.post))
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
        <div className="listBox">
            {loading && <CircleLoader/>}
            {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
            <img src={post.image} alt="" />
            
            <p>{post.post}</p>
            <div><img className="profileImage" src={userPic} alt="user" /><p className="userName">{post.name}</p></div>
            
            <div className="postBottom">
                <div className="likeNumber">
                    {(privilege == 10 && !error && !loading) && <button className="circleButton edit" onClick={() => editPost(post.id)}><img src={editLogo} alt="szerkesztés" /></button>}
                    {(privilege == 10 && !error && !loading) && <button className="circleButton delete" onClick={() => setShowConfirm(true)}>{(post.deleted_at) ? "Visszaállítás" : <img src={deleteLogo} alt="törlés" />}</button>}
                    {(!error && !loading) && <button className="circleButton like" onClick={() => startLikeProcess(post.id, { likes: (!likedPosts.includes(post.id) ? true : false) })}>{!likedPosts.includes(post.id) ? <img src={likeLogo} alt="likeButton" /> : <img src={likeON} alt="likeButton" />}</button>}
                    <p>{post.likes}</p>
                </div>


                <div className="dates">
                    {(privilege == 10 && post.deleted_at) && <p className="topDate">{processedDates.deleted_at.year} {processedDates.deleted_at.time}</p>}
                    <p>{processedDates.created_at.year} {processedDates.created_at.time}</p>
                    <p className="bottomDate">{processedDates.updated_at.year} {processedDates.updated_at.time}</p>
                </div>
            </div>
            {/* {(privilege == 10 && !error && !loading) && <button onClick={(post.deleted_at) ? () => restorePost(post.id) : () => deletePost(post.id)}>{(post.deleted_at) ? "Visszaállítás" : "Törlés"}</button>} */}
            
            {(showConfirm) && <ConfirmWindow text={post.deleted_at ? "Biztosan vissza szeretné állítani a posztot?" : "Biztosan törölni szeretné a posztot?"} functionToCall={post.deleted_at ? () => restorePost(post.id) : () => deletePost(post.id)} setShow={setShowConfirm} />}
            {/* {!likedPosts.includes(post.id) ? <button onClick={() => likePost(post.id, { likes: true })}>Like</button> : <button className="liked" onClick={() => likePost(post.id, { likes: false })}>Like</button>} */}
        </div>
    )


}