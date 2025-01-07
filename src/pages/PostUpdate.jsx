import { useEffect, useState } from "react"
import PostBox from "../components/PostBox"
import { useParams, useNavigate } from "react-router-dom"
import FeedBack from "../components/FeedBack"
import otherRequest from "../components/otherRequest"
import getRequest from "../components/getRequest"
import Load from "../components/Load"


export default function PostUpdate({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [post, setPost] = useState("")
    const [loading, setLoading] = useState(false)
    const id = useParams().id

    useEffect(() => {
        setLoading(true)
        const getPost = async () => {

            const responseData = await getRequest(url, headers, "post/" + id)

            if (responseData.response.status == 200) {
                setPost(responseData.result.post)
            }
            else {
                setError(responseData.result.message)
            }
            setLoading(false)
        }
        getPost()

    }, [])

    const updatePost = async (e) => {
        e.preventDefault()

        let reader = new FileReader()

        let newPost = {
            post: e.target.post.value
        }
        setLoading(true)
        if (!e.target.image["files"][0]) {


            const responseData = await otherRequest(url, headers, "post/" + post.id, newPost, "PATCH")
            setLoading(false)
            if (responseData.response.status == 200) {
                setError("")
                setSuccess(responseData.result.message)
                setTimeout(() => {
                    navigation(-1)
                }, 1000);
            }
            else {
                setError(responseData.result.message)
            }
        }
        else {
            reader.readAsDataURL(e.target.image["files"][0])
        }


        reader.onload = async function () {
            setLoading(true)
            newPost.image = reader.result

            const responseData = await otherRequest(url, headers, "post/" + post.id, newPost, "PATCH")

            setLoading(false)
            if (responseData.response.status == 200) {
                setError("")
                setSuccess(responseData.result.message)
                setTimeout(() => {
                    navigation(-1)
                }, 1000);
            }
            else {
                setError(responseData.result.message)
            }
        }


    }

    return (
        <div>
            {loading && <Load />}
            {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
            <PostBox post={post.post} submitPost={updatePost} isCreate={false} />
        </div>
    )
    // if (success) {
    //     return (
    //         <div>
    //             <FeedBack message={success} status={"success"} />
    //             <PostBox post={post.post} submitPost={updatePost} isCreate={false} />
    //         </div>
    //     )
    // }
    // else if (error) {
    //     return (
    //         <div>
    //             <FeedBack message={error} status={"failure"} />
    //             <PostBox post={post.post} submitPost={updatePost} isCreate={false} />
    //         </div>
    //     )
    // }
    // else if (post) {

    // }

}