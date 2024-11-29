

export default function UserUpdateBox({ submitUser, name, email }) {
    return (
        <div className="coolBox loginSize centerHorizontal">
            <form className="loginForm" onSubmit={submitUser}>
                <label htmlFor="name">Új felhasználónév</label>
                <input type="text" id="name" name="name" defaultValue={name} required />
                <label htmlFor="email">Új email cím</label>
                <input type="email" id="email" name="email" defaultValue={email} required />
                <button type="submit">Frissítés</button>
            </form>
        </div>
    )
}