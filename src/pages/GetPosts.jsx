import { useEffect, useState } from "react"
import getRequest from "../components/getRequest"
import PostList from "../components/PostList"
import { useNavigate } from "react-router-dom"
import deleteRequest from "../components/deleteRequest"
import otherRequest from "../components/otherRequest"
import FilterOptions from "../components/FilterOptions"


export default function GetPosts({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState("id")
    const [sortDir, setSortDir] = useState("asc")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const privilege = localStorage.getItem("privilege")
    const [search, setSearch] = useState("")

    const fetchPosts = async () => {
        let responseData
        if(search){
            responseData = await getRequest(url, headers, "post/search/"+sortBy + "/" + sortDir + "/" + search + "/?page=" + page)
        }
        else{
            responseData = await getRequest(url, headers, "post/" + sortBy + "/" + sortDir + "/?page=" + page)
        }
        // setData(responseData.result.posts.data)
        setData((prevData) => [...prevData, ...responseData.result.posts.data])
        setLoading(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [page, sortBy, sortDir, search])

    const handleScroll = () => {
        // if (document.body.scrollHeight - 200 < window.scrollY + window.innerHeight) {
        //     setLoading(true)
        // }
        setTimeout(() => {
            if (document.body.scrollHeight - 300 < window.scrollY + window.innerHeight) {
                setLoading(true)
            }
        }, 500);

    }

    window.addEventListener("scroll", handleScroll)


    useEffect(() => {
        if (loading == true) {
            setPage((prevPage) => prevPage + 1)
            // setPage(page + 1)
        }
    }, [loading])

    const viewPost = (postId) => {
        navigation("/post/show/" + postId)
    }

    const changeSortBy = (e) => {
        setData([])
        setSortBy(e.target.value)
    }

    const changeSortDir = (e) => {
        setData([])
        setSortDir(e.target.value)
    }

    const editPost = (postId) => {
        navigation("/post/update/" + postId)
    }

    const deletePost = async (postId) => {
        const responseData = await deleteRequest(url, headers, "post/" + postId)
        //output is somehow
        console.log(responseData)
    }

    const likePost = async (postId, newPost) => {
        const responseData = await otherRequest(url, headers, "post/"+postId, newPost, "PATCH")

        console.log(responseData)
    }

    const searchPost = async (event) => {
        event.preventDefault();
        if(event.target.postSearch.value != ""){
            setData([])
            setSearch(event.target.postSearch.value)
        }
        else{
            setData([])
            setSearch("")
        }
        // fetchPosts(event.target.postSearch.value)
    }

    return (
        <div>
            <FilterOptions changeSortBy={changeSortBy} changeSortDir={changeSortDir} search={searchPost} />
            {privilege == 10 && data.map((item) => (
                <PostList key={item.id} post={item} viewPost={viewPost} likePost={likePost} deleted_at={item.deleted_at} editPost={editPost} deletePost={deletePost} admin={true} />
            ))}
            {privilege == 1 && data.map((item) => (
                <PostList key={item.id} post={item} viewPost={viewPost} likePost={likePost} admin={false} />
            ))}
        </div>

    )
}