import { useEffect, useState } from "react"
import PostUpdateBox from "../components/PostUpdateBox"
import { useParams, useNavigate } from "react-router-dom"
import FeedBack from "../components/FeedBack"


export default function PostUpdate({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const [post, setPost] = useState("")
    const id = useParams().id

    useEffect(() => {
        const getPost = async () => {
            const response = await fetch(url + "post/" + id, {
                method: "GET",
                headers: headers
            })

            const result = await response.json()

            if (response.status == 200) {
                setPost(result.post)
            }
        }
        getPost()

    }, [])

    const updatePost = async (e) => {
        e.preventDefault()

        const newPost = {
            post: e.target.post.value
        }

        const response = await fetch(url + "post/" + post.id, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(newPost)
        })

        const result = await response.json()

        if (response.status == 200) {
            setSuccess(result.message)
            setTimeout(() => {
                navigation("/")
            }, 1000);
        }
        else {
            setError(result.message)
        }
    }



    if (success) {
        return (
            <div>
                <FeedBack message={success} status={"success"} />
                <PostUpdateBox post={post.post} updatePost={updatePost} />
            </div>
        )
    }
    else if (error) {
        return (
            <div>
                <FeedBack message={error} status={"failure"} />
                <PostUpdateBox post={post.post} updatePost={updatePost} />
            </div>
        )
    }
    else if (post) {
        return <div>
            <PostUpdateBox post={post.post} updatePost={updatePost} />
        </div>
    }

}