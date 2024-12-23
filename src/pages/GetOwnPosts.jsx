import { useState, useEffect } from "react";
import getRequest from "../components/getRequest";
import { useNavigate } from "react-router-dom"
import PostList from "../components/PostList";
import FilterOptions from "../components/FilterOptions";
import deleteRequest from "../components/deleteRequest";

export default function GetOwnPosts({ url, headers, likedPosts, likePost, setLikedPosts }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")

    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState("id")
    const [sortDir, setSortDir] = useState("asc")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const [search, setSearch] = useState("")

    const fetchPosts = async () => {
        const responseData = await getRequest(url, headers, "user/" + sortBy + "/" + sortDir + "/?page=" + page)

        setLikedPosts(responseData.result.likedPosts)

        setData((prevData) => [...prevData, ...responseData.result.posts.data])
        setLoading(false)
    }

    useEffect(() => {
        fetchPosts(false)
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
        // fetchUsers(event.target.userSearch.value)
    }

    return (
        <div>
            <FilterOptions changeSortBy={changeSortBy} changeSortDir={changeSortDir} search={searchPost} />
            {data.map((item) => (
                <PostList key={item.id} post={item} viewPost={viewPost} likePost={likePost} likedPostsArr={likedPosts} editPost={editPost} deletePost={deletePost} admin={true} />
            ))}

        </div>

    )
}