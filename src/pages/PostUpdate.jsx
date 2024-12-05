import { useEffect, useState } from "react"
import PostBox from "../components/PostBox"
import { useParams, useNavigate, redirect } from "react-router-dom"
import FeedBack from "../components/FeedBack"
import otherRequest from "../components/otherRequest"
import getRequest from "../components/getRequest"


export default function PostUpdate({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [post, setPost] = useState("")
    const id = useParams().id

    useEffect(() => {
        const getPost = async () => {

            const responseData = await getRequest(url, headers, "post/" + id)

            if (responseData.response.status == 200) {
                setPost(responseData.result.post)
            }
        }
        getPost()

    }, [])

    const updatePost = async (e) => {
        e.preventDefault()

        let reader = new FileReader()

        let newPost = {
            post: e.target.post.value
        }

        if (!e.target.image["files"][0]) {


            const responseData = await otherRequest(url, headers, "post/" + post.id, newPost, "PATCH")

            if (responseData.response.status == 200) {
                setSuccess(responseData.result.message)
                setTimeout(() => {
                    navigation("/")
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
            newPost.image = reader.result

            const responseData = await otherRequest(url, headers, "post/" + post.id, newPost, "PATCH")

            if (responseData.response.status == 200) {
                setSuccess(responseData.result.message)
                setTimeout(() => {
                    navigation("/")
                }, 1000);
            }
            else {
                setError(responseData.result.message)
            }
        }


    }



    if (success) {
        return (
            <div>
                <FeedBack message={success} status={"success"} />
                <PostBox post={post.post} submitPost={updatePost} isCreate={false} />
            </div>
        )
    }
    else if (error) {
        return (
            <div>
                <FeedBack message={error} status={"failure"} />
                <PostBox post={post.post} submitPost={updatePost} isCreate={false} />
            </div>
        )
    }
    else if (post) {
        return <div>
            <PostBox post={post.post} submitPost={updatePost} isCreate={false} />
        </div>
    }

}