import { Link } from "react-router-dom"

export default function LoginBox({ login }) {
    return (
        <div className="centerScreen coolBox">
            <h1>Bejelentkezés</h1>
            <form className="loginForm" onSubmit={login}>
                <label htmlFor="email">Email cím</label>
                <input type="email" required id="email" name="email" placeholder="Email cím" />
                <label htmlFor="password">Jelszó</label>
                <input type="password" required id="password" name="password" placeholder="Jelszó" />
                <button type="submit">Bejelentkezés</button>
            </form>
            <Link to={"../register"} >Regisztráció (ide kéne az az ikon)</Link>
        </div>
    )
}