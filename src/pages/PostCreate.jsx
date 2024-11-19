import FeedBack from "../components/FeedBack"
import PostCreateBox from "../components/PostCreateBox"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function PostCreate({ url, headers }) {
    headers.Authorization = 'Bearer ' + localStorage.getItem("token")

    const navigation = useNavigate()
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function submitPost(post, image) {

        const data = { post: post, image: image }
        const response = await fetch(url + "post", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
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


    const createPost = async (e) => {
        e.preventDefault()

        let reader = new FileReader()

        reader.readAsDataURL(e.target.image["files"][0])

        reader.onload = async function () {
            await submitPost(e.target.post.value, reader.result)
        }


    }

    if (error) {
        return (
            <div>
                <FeedBack message={error} />
                <PostCreateBox submitPost={createPost} />
            </div>
        )
    }
    else if (success) {
        return (
            <div>
                <FeedBack message={success} />
                <PostCreateBox submitPost={createPost} />
            </div>
        )
    }
    else {
        return <PostCreateBox submitPost={createPost} />
    }

}