import { useEffect, useState } from "react";
import getRequest from "./getRequest";

function AchievementList({ url, headers }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            const data = await getRequest(url, headers, "achievement")
            setData(data.result.achievements)
           
        }
       
        fetchAchievements();
    }, [])


    return (
        <div>
            <h1>Achievements</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    )


}

export default AchievementList;