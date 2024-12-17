import { useState } from "react"


export default function RegisterBox({ register, password, onChange, values }) {
    const [focused, setFocused] = useState(false)

    return (
        <div className="centerScreen coolBox loginSize">
            <h1>Regisztráció</h1>
            <form className="loginForm" onSubmit={register}>
                <label htmlFor="email">Email cím</label>
                <input type="email" placeholder="Email" id="email" name="email" onBlur={() => setFocused(true)} focused={focused.toString()} onChange={onChange} required />
                <span className="formError">Email cím megadása kötelező</span>
                <label htmlFor="name">Felhasználónév</label>
                <input type="text" placeholder="Username" id="name" name="name" onBlur={() => setFocused(true)} focused={focused.toString()} onChange={onChange} pattern=".{3,}" required />
                <span className="formError">Felhasználnév megadása kötelező, legalább 3 karakter hosszúnak kell lennie</span>
                <label htmlFor="password">Jelszó</label>
                <input type="password" placeholder="Password" id="password" name="password" onBlur={() => setFocused(true)} focused={focused.toString()} onChange={onChange} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$" required/>
                <span className="formError">Jelszó megadása kötelező, legalább 8 karakter, tartalmazzon kis- és nagy betűt, és számot</span>
                <label htmlFor="password2">Jelszó újra</label>
                <input type="password" placeholder="Jelszó újra" id="password2" name="password2" onBlur={() => setFocused(true)} focused={focused.toString()} onChange={onChange} pattern={password} required />
                <span className="formError">Két jelszó nem egyezik</span>
                <button type="submit">Regisztráció</button>
            </form>
        </div>
    )
}