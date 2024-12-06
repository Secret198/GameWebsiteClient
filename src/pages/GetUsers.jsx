import { useEffect, useState } from "react"
import getRequest from "../components/getRequest"
import UserList from "../components/UserList"
import { useNavigate } from "react-router-dom"
import deleteRequest from "../components/deleteRequest"


export default function GetUsers({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState("id")
    const [sortDir, setSortDir] = useState("asc")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const navigation = useNavigate()
    const privilege = localStorage.getItem("privilege")

    const fetchUsers = async () => {
        const responseData = await getRequest(url, headers, "user/all/" + sortBy + "/" + sortDir + "/?page=" + page)
        // setData(responseData.result.posts.data)
        setData((prevData) => [...prevData, ...responseData.result.users.data])
        setLoading(false)
    }

    useEffect(() => {
        fetchUsers()
    }, [page, sortBy, sortDir])

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

    const editUser = (postId) => {
        navigation("/user/update/" + postId)
    }

    const deleteUser = async (postId) => {
        const responseData = await deleteRequest(url, headers, "user/" + postId)
        //output is somehow
        console.log(responseData)
    }

    return (
        <div>
            <select name="sortBy" id="sortBy" onChange={changeSortBy} defaultValue={"id"}>
                <option value="id">Relevencia idk??</option>
                <option value="created_at">Regisztrációs dátum</option>
                <option value="updated_at">Legutóbbi módosítás dátum</option>
                <option value="#">All the other stuff</option>
            </select>
            <select name="sortDir" id="sortDir" onChange={changeSortDir} defaultValue={"asc"}>
                <option value="asc">Növekvő</option>
                <option value="desc">Csökkenő</option>
            </select>
            {privilege == 10 && data.map((item) => (
                <UserList key={item.id} id={item.id} name={item.name} created_at={item.created_at} viewUser={viewUser} deleted_at={item.deleted_at} editUser={editUser} deleteUser={deleteUser} admin={true} />
            ))}
            {privilege == 1 && data.map((item) => (
                <UserList key={item.id} id={item.id} name={item.name} viewUser={viewUser} admin={false} />
            ))}
        </div>

    )
}