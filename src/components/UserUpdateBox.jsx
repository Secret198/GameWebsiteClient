

export default function UserUpdateBox({ submitUser, name, email }) {
    return (
        <div>
            <form onSubmit={submitUser}>
                <input type="text" id="name" name="name" defaultValue={name} required />
                <input type="email" id="email" name="email" defaultValue={email} required />
                <button type="submit">Frissítés</button>
            </form>
        </div>
    )
}