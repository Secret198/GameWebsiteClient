import { useParams } from "react-router-dom";
import getRequest from "../components/getRequest";
import { useEffect, useState } from "react";


export default function GetPostData({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const id = useParams().id
    const [error, setError] = useState()
    const [post, setPost] = useState({})


    useEffect(() => {
        const getPost = async () => {
            const returnData = await getRequest(url, headers, "post/" + id)
            if (returnData.response.status == 200) {
                setPost(returnData.result.post)
            }
            else {
                setError(returnData.result.message)
            }
        }

        getPost()
    }, [])



    if (error) {
        return (
            <p>{error}</p>
        )
    }
    else {
        return (
            <div>
                <img src={post.image} alt="" />
                <p>{post.post}</p>
                <p>{post.created_at}</p>
                <p>{post.likes}</p>
            </div>
        )
    }


}