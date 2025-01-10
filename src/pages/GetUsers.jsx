import { useEffect, useState } from "react"
import getRequest from "../components/getRequest"
import UserList from "../components/UserList"
import { useNavigate } from "react-router-dom"
import NoData from "../components/NoData"
import FilterOptions from "../components/FilterOptions"
import Load from "../components/Load"
import FeedBack from "../components/FeedBack"

export default function GetUsers({ url, headers, setLoggedIn, scrollThreshold }) {
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
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const fetchUsers = async () => {
        setLoading(true)
        let responseData;
        if (search) {
            responseData = await getRequest(url, headers, "user/search/" + sortBy + "/" + sortDir + "/" + search + "/?page=" + page)
        }
        else {
            setPage(1)
            responseData = await getRequest(url, headers, "user/all/" + sortBy + "/" + sortDir + "/?page=" + page)
        }
        // setData(responseData.result.posts.data)

        if (responseData.response.status == 200) {
            setDataMaxNum(responseData.result.users.total)
            setData((prevData) => [...prevData, ...responseData.result.users.data])
        }
        else {
            setError(responseData.result.message)
        }

        console.log(responseData)

        setLoading(false)
    }

    useEffect(() => {
        if (data.length < dataMaxNum || data.length == 0) {
            fetchUsers()
        }
    }, [page, sortBy, sortDir, search])

    const handleScroll = () => {
        // if (document.body.scrollHeight - 200 < window.scrollY + window.innerHeight) {
        //     setLoading(true)
        // }
        setTimeout(() => {
            if (document.body.scrollHeight - scrollThreshold < window.scrollY + window.innerHeight) {
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

    const viewUser = (userId) => {
        navigation("/user/show/" + userId)
    }

    const changeSortBy = (e) => {
        setData([])
        setSortBy(e.target.value)
    }

    const changeSortDir = (e) => {
        setData([])
        setSortDir(e.target.value)
    }

    const editUser = (userId) => {
        navigation("/user/update/" + userId)
    }

    // const deleteUser = async (userId) => {
    //     const responseData = await deleteRequest(url, headers, "user/" + userId)
    //     if (responseData.response.status == 200) {
    //         setError("")
    //         setSuccess(responseData.result.message)
    //     }
    //     else {
    //         setError(responseData.result.message)
    //     }
    // }

    // const restoreUser = async (userId) => {
    //     const responseData = await deleteRequest(url, headers, "user/restore/" + userId)
    //     if (responseData.response.status == 200) {
    //         setError("")
    //         setSuccess(responseData.result.message)
    //     }
    //     else {
    //         setError(responseData.result.message)
    //     }
    // }

    const searchUser = async (event) => {
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
            {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
            <FilterOptions changeSortBy={changeSortBy} changeSortDir={changeSortDir} search={searchUser} />
            {((success || data.length == 0) && !loading) && <NoData />}
            {privilege == 10 && data.map((item) => (
                <UserList key={item.id} user={item} viewUser={viewUser} editUser={editUser} admin={true} url={url} headers={headers} setError={setError} setSuccess={setSuccess} setLoggedIn={setLoggedIn} />
            ))}
            {privilege == 1 && data.map((item) => (
                <UserList key={item.id} user={item} viewUser={viewUser} admin={false} />
            ))}
            {(loading && (data.length < dataMaxNum || data.length == 0)) && <Load />}
        </div>

    )
}