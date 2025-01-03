import { useEffect, useState } from "react"
import getRequest from "../components/getRequest"
import PostList from "../components/PostList"
import { useNavigate } from "react-router-dom"
import deleteRequest from "../components/deleteRequest"
import otherRequest from "../components/otherRequest"
import FilterOptions from "../components/FilterOptions"
import Load from "../components/Load"

export default function GetPosts({ url, headers, likedPosts, likePost, setLikedPosts }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState("id")
    const [sortDir, setSortDir] = useState("asc")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const privilege = localStorage.getItem("privilege")
    const [search, setSearch] = useState("")
    const [dataMaxNum, setDataMaxNum] = useState(0)
    // const [likedPosts, setLikedPosts] = useState([])

    const fetchPosts = async () => {
        let responseData
        if (search) {
            responseData = await getRequest(url, headers, "post/search/" + sortBy + "/" + sortDir + "/" + search + "/?page=" + page)
        }
        else {
            responseData = await getRequest(url, headers, "post/" + sortBy + "/" + sortDir + "/?page=" + page)
        }
        setLikedPosts(responseData.result.likedPosts)
        setDataMaxNum(responseData.result.posts.total)
        // setData(responseData.result.posts.data)
        setData((prevData) => [...prevData, ...responseData.result.posts.data])
        setLoading(false)
    }

    useEffect(() => {
        if (data.length < dataMaxNum || data.length == 0) {
            fetchPosts()
        }

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

    const restorePost = async (postId) => {
        const responseData = await deleteRequest(url, headers, "post/restore/" + postId)
        console.log(responseData)
    }

    // const likePost = async (postId, newPost) => {
    //     const responseData = await otherRequest(url, headers, "post/like/"+postId, newPost, "PATCH")
    //     if(newPost.likes){
    //         setLikedPosts([...likedPosts, postId])
    //     }
    //     else{
    //         let tempLikedPosts = [...likedPosts]
    //         tempLikedPosts.splice(tempLikedPosts.indexOf(postId), 1)
    //         setLikedPosts(tempLikedPosts)
    //     }

    //     console.log(responseData)
    // }

    const searchPost = async (event) => {
        event.preventDefault();
        if (event.target.searchBar.value != "") {
            setData([])
            setSearch(event.target.searchBar.value)
        }
        else {
            setData([])
            setSearch("")
        }
        // fetchPosts(event.target.postSearch.value)
    }

    return (
        <div>
            <FilterOptions changeSortBy={changeSortBy} changeSortDir={changeSortDir} search={searchPost} />
            {privilege == 10 && data.map((item) => (
                <PostList key={item.id} post={item} viewPost={viewPost} likePost={likePost} likedPostsArr={likedPosts} deleted_at={item.deleted_at} editPost={editPost} deletePost={deletePost} restorePost={restorePost} admin={true} />
            ))}
            {privilege == 1 && data.map((item) => (
                <PostList key={item.id} post={item} viewPost={viewPost} likePost={likePost} likedPostsArr={likedPosts} admin={false} />
            ))}
            {(loading && data.length < dataMaxNum) && <Load />}

        </div>

    )
}