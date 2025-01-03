import { useEffect, useState } from "react";
import getRequest from "./getRequest";
import Load from "./Load";

function AchievementList({ url, headers }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        const fetchAchievements = async () => {
            const data = await getRequest(url, headers, "achievement")
            setData(data.result.achievements)

            setLoading(false)
        }

        fetchAchievements();
    }, [])


    return (
        <div>
            <h1>Achievements</h1>
            {loading && <Load />}
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )


}

export default AchievementList;