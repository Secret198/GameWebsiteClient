import { useEffect, useState } from "react";


function AchievementList(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/achievement", {
                    "method": "GET",
                    "headers": {
                        "Accept": "application/json"
                    }
                });
                const result = await response.json();
                setData(result.achievements);
            }
            catch (error) {
                console.log(error); //Handle the error somehow
            }
        }

        fetchAchievements();
    }, [url.url])


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