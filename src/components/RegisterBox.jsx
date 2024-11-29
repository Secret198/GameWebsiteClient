

export default function RegisterBox({ register }) {
    return (
        <div className="centerScreen coolBox loginSize">
            <h1>Regisztráció</h1>
            <form className="loginForm" onSubmit={register}>
                <label htmlFor="email">Email cím</label>
                <input type="email" placeholder="Email" id="email" name="email" required />
                <label htmlFor="name">Felhasználónév</label>
                <input type="text" placeholder="Username" id="name" name="name" required />
                <label htmlFor="password">Jelszó</label>
                <input type="password" placeholder="Password" id="password" name="password" required />
                <label htmlFor="password2">Jelszó újra</label>
                <input type="password" placeholder="Jelszó újra" id="password2" name="password2" required />
                <button type="submit">Regisztráció</button>
            </form>
        </div>
    )
}