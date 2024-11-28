

export default function AchievementCreateBox({ submitAchievement, selected }) {
    return (
        <div className="coolBox centerHorizontal">
            <h1>Achievement hozzáadás</h1>
            <form className="loginForm" onSubmit={submitAchievement}>
                <label htmlFor="name">Új achievement neve</label>
                <input type="text" id="name" name="name" placeholder="Új achievement neve" required />
                <label htmlFor="field">Megszerzéshez szükséges kategória ??????</label>
                <select name="field" id="field">
                    <option value="kills">Kills</option>
                    <option value="deaths">Deaths</option>
                    <option value="points">Points</option>
                    <option value="boss1lvl">Boss 1 lvl</option>
                    <option value="boss2lvl">Boss 2 lvl</option>
                    <option value="boss3lvl">Boss 3 lvl</option>
                </select>
                <label htmlFor="threshold">Threshold ??</label>
                <input type="number" id="threshold" name="threshold" placeholder="Threshold" min={0} />
                <label htmlFor="description">Új achievement leírása</label>
                <input type="text" id="description" name="description" placeholder="Leírás" required />
                <button type="submit">Feltöltés</button>
            </form>
        </div>
    )
}