import { useEffect, useState } from "react";


function AchievementList({ url, headers }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await fetch(url + "achievement", {
                    "method": "GET",
                    "headers": headers
                });
                const result = await response.json();
                setData(result.achievements);
            }
            catch (error) {
                console.log(error); //Handle the error somehow
            }
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