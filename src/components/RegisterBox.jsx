

export default function RegisterBox({ register }) {
    return (
        <div>
            <h1>Regisztráció</h1>
            <form onSubmit={register}>
                <input type="email" placeholder="Email" id="email" required />
                <input type="text" placeholder="Username" id="name" required />
                <input type="password" placeholder="Password" id="password" required />
                <input type="password" placeholder="Password again" id="password2" required />
                <button type="submit">Regisztráció</button>
            </form>
        </div>
    )
}