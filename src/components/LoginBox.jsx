import { Link } from "react-router-dom"

export default function LoginBox({ login }) {
    return (
        <div>
            <h1>Bejelentkezés</h1>
            <form onSubmit={login}>
                <input type="email" required id="email" />
                <input type="password" required id="password" />
                <button type="submit">Bejelentkezés</button>
            </form>
            <Link to={"../register"} >Regisztráció</Link>
        </div>
    )
}