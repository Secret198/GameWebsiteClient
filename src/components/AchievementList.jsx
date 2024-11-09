import { useEffect, useState } from "react";


function AchievementList() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await fetch("http://localhost/api/achievements",);
                const result = await response.json();
                setData(result);
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