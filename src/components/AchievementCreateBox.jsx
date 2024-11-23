

export default function AchievementCreateBox({ submitAchievement, selected }) {
    return (
        <div>
            <form onSubmit={submitAchievement}>
                <input type="text" id="name" name="name" placeholder="Név" required />
                <select name="field" id="field">
                    <option value="kills">Kills</option>
                    <option value="deaths">Deaths</option>
                    <option value="points">Points</option>
                    <option value="boss1lvl">Boss 1 lvl</option>
                    <option value="boss2lvl">Boss 2 lvl</option>
                    <option value="boss3lvl">Boss 3 lvl</option>
                </select>
                <input type="number" id="threshold" name="threshold" placeholder="threshold" min={0} />
                <input type="text" id="description" name="description" placeholder="Leírás" required />
                <button type="submit">Feltöltés</button>
            </form>
        </div>
    )
}