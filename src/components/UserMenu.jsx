import { Link } from "react-router-dom"


export default function UserMenu(){
    return (
        <div className="menuBox">
            <h1>Menü</h1>
            <hr />
            <Link to={"#"}>Adatok megjelenítése</Link>
            <button>Kijelentkezés</button>
        </div>
    )
}