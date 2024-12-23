import { useEffect, useState } from "react"
import getRequest from "../components/getRequest"
import UserList from "../components/UserList"
import { useNavigate } from "react-router-dom"
import deleteRequest from "../components/deleteRequest"
import FilterOptions from "../components/FilterOptions"


export default function GetUsers({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState("id")
    const [sortDir, setSortDir] = useState("asc")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const privilege = localStorage.getItem("privilege")
    const [search, setSearch] = useState("")

    const fetchUsers = async () => {
        let responseData;
        if (search) {
            responseData = await getRequest(url, headers, "user/search/" + sortBy + "/" + sortDir + "/" + search + "/?page=" + page)
        }
        else {
            responseData = await getRequest(url, headers, "user/all/" + sortBy + "/" + sortDir + "/?page=" + page)
        }
        // setData(responseData.result.posts.data)
        setData((prevData) => [...prevData, ...responseData.result.users.data])
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers(false)
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

    const deleteUser = async (userId) => {
        const responseData = await deleteRequest(url, headers, "user/" + userId)
        //output is somehow
        console.log(responseData)
    }

    const restoreUser = async (userId) => {
        const responseData = await deleteRequest(url, headers, "user/restore/" + userId)
        console.log(responseData)
    }

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
            <FilterOptions changeSortBy={changeSortBy} changeSortDir={changeSortDir} search={searchUser} />
            {privilege == 10 && data.map((item) => (
                <UserList key={item.id} user={item} viewUser={viewUser} restoreUser={restoreUser} editUser={editUser} deleteUser={deleteUser} admin={true} />
            ))}
            {privilege == 1 && data.map((item) => (
                <UserList key={item.id} user={item} viewUser={viewUser} admin={false} />
            ))}
        </div>

    )
}