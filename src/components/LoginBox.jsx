import { Link } from "react-router-dom"
import FormInput from "./FormInput"

export default function LoginBox({ login }) {

    return (
        <div className="centerScreen coolBox loginSize">
            <h1>Bejelentkezés</h1>
            <form className="loginForm" onSubmit={login}>
                <FormInput type={"email"} inputId={"email"} label={"Email cím"} errorMessage={"Email cím megadása kötelező"} />
                <FormInput type={"password"} inputId={"password"} label={"Jelszó"} errorMessage={"Jelszó megadása kötelező"} />
                <button type="submit">Bejelentkezés</button>
            </form>
            <Link to={"../register"} >Regisztráció (ide kéne az az ikon)</Link>
        </div>
    )
}