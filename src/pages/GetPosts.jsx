import { useEffect, useState } from "react"
import getRequest from "../components/getRequest"


export default function GetPosts({ url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const [page, setPage] = useState(1)
    const [sortBy, setSortBy] = useState("id")
    const [sortDir, setSortDir] = useState("asc")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchPosts = async () => {
        const responseData = await getRequest(url, headers, "post/" + sortBy + "/" + sortDir + "/?page=" + page)

        setData(responseData.result.posts.data)
        setLoading(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [page])

    const handleScroll = () => {
        setTimeout(() => {
            if (document.body.scrollHeight - 300 < window.scrollY + window.innerHeight) {
                setLoading(true)
            }
        }, 1000);

    }

    window.addEventListener("scroll", handleScroll())


    useEffect(() => {
        if (loading == true) {
            setPage(page + 1)
        }
    }, [loading])


    return (
        <div>
            {data.map((item) => {
                <p key={item.id}>{item.post}</p>
            })}
        </div>
    )
}