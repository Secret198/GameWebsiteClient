export default function AchievementUpdateBox({ submitAchievement, selected, name, threshold, description }) {
    return (
        <div>
            <form onSubmit={submitAchievement}>
                <input type="text" id="name" name="name" placeholder="Név" required defaultValue={name} />
                <select name="field" id="field" defaultValue={selected}>
                    <option value="kills">Kills</option>
                    <option value="deaths">Deaths</option>
                    <option value="points">Points</option>
                    <option value="boss1lvl">Boss 1 lvl</option>
                    <option value="boss2lvl">Boss 2 lvl</option>
                    <option value="boss3lvl">Boss 3 lvl</option>
                </select>
                <input type="number" id="threshold" name="threshold" placeholder="threshold" min={0} defaultValue={threshold} required />
                <input type="text" id="description" name="description" placeholder="Leírás" required defaultValue={description} />
                <button type="submit">Feltöltés</button>
            </form>
        </div>
    )
}