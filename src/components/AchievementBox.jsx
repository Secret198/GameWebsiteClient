import FormInput from "./FormInput"

export default function AchievementBox({ submitAchievement, selected, name, threshold, description, isCreate }) {
    if (isCreate) {
        return (
            <div className="coolBox centerHorizontal loginSize">
                <h1>Achievement hozzáadás</h1>
                <form className="loginForm" onSubmit={submitAchievement}>
                    <FormInput type={"text"} inputId={"name"} label={"Új achievement neve"} errorMessage={"Mező kitöltése kötelező"} />
                    <label htmlFor="field">Megszerzéshez szükséges kategória ??????</label>
                    <select name="field" id="field">
                        <option value="kills">Kills</option>
                        <option value="deaths">Deaths</option>
                        <option value="waves">waves</option>
                        <option value="boss1lvl">Boss 1 lvl</option>
                        <option value="boss2lvl">Boss 2 lvl</option>
                        <option value="boss3lvl">Boss 3 lvl</option>
                    </select>
                    <FormInput type={"number"} inputId={"threshold"} label={"Threshold ??"} errorMessage={"Mező kitöltése kötelező, 0-nál nagyobb számot adjon meg"} min={"0"} />
                    <FormInput type={"text"} inputId={"description"} label={"Új achievement leírása"} errorMessage={"Mező kitöltése kötelező"} />
                    <button type="submit">Feltöltés</button>
                </form>
            </div>
        )
    }
    else {
        return (
            <div className="coolBox centerHorizontal loginSize">
                <h1>Achievement szerkesztése</h1>
                <form className="loginForm" onSubmit={submitAchievement}>
                    <FormInput type={"text"} inputId={"name"} label={"Achievement új neve"} errorMessage={"Mező kitöltése kötelező"} defaultValue={name} />
                    <label htmlFor="field">Megszerzéshez szükséges kategória ??????</label>
                    <select name="field" id="field" defaultValue={selected}>
                        <option value="kills">Kills</option>
                        <option value="deaths">Deaths</option>
                        <option value="waves">waves</option>
                        <option value="boss1lvl">Boss 1 lvl</option>
                        <option value="boss2lvl">Boss 2 lvl</option>
                        <option value="boss3lvl">Boss 3 lvl</option>
                    </select>
                    <FormInput type={"number"} inputId={"threshold"} label={"Threshold ??"} errorMessage={"Mező kitöltése kötelező, 0-nál nagyobb számot adjon meg"} min={"0"} defaultValue={threshold} />
                    <FormInput type={"text"} inputId={"description"} label={"Achievement új leírása"} errorMessage={"Mező kitöltése kötelező"} defaultValue={description} />
                    <button type="submit">Feltöltés</button>
                </form>
            </div>
        )
    }

}