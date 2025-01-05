import { useEffect, useState } from "react";
import getRequest from "../components/getRequest";
import Load from "../components/Load";
import deleteRequest from "../components/deleteRequest";
import AchievementItem from "../components/AchievementItem";
import FeedBack from "../components/FeedBack";

function AchievementList({ url, headers }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    const token = localStorage.getItem("token")
    if (token) {
        headers.Authorization = "Bearer " + token
    }

    useEffect(() => {
        setLoading(true)
        const fetchAchievements = async () => {
            const data = await getRequest(url, headers, "achievement")
            if (data.response.status == 200) {
                setData(data.result.achievements)
            }
            else {
                setError(data.result.message)
            }
            console.log(data)
            setLoading(false)
        }

        fetchAchievements();
    }, [])

    // const deleteAchievement = async (achievementId) => {
    //     const responseData = await deleteRequest(url, headers, "achievement/" + achievementId)
    //     if (responseData.response.status == 200) {
    //         setError("")
    //         setSuccess(responseData.result.message)
    //     }
    //     else {
    //         setError(responseData.result.message)
    //     }
    //     console.log(responseData)
    // }

    // const restoreAchievement = async (achievementId) => {
    //     const responseData = await deleteRequest(url, headers, "achievement/restore/" + achievementId)
    //     if (responseData.response.status == 200) {
    //         setError("")
    //         setSuccess(responseData.result.message)
    //     }
    //     else {
    //         setError(responseData.result.message)
    //     }
    //     console.log(responseData)
    // }

    return (
        <div>
            <h1>Achievements</h1>
            {loading && <Load />}
            {(error || success) && <FeedBack message={error ? error : success} status={error ? "failure" : "success"} />}
            <div>
                {data.map((item) => (
                    <AchievementItem key={item.id} achievement={item} setError={setError} setSuccess={setSuccess} url={url} headers={headers} />
                ))}
            </div>

            {/* <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul> */}
        </div>
    )


}

export default AchievementList;