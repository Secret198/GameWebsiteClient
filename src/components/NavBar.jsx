import { useState } from "react"
import { Link } from "react-router-dom"
import UserMenu from "./UserMenu"

function NavBar({ loggedIn, setLoggedIn }) {
    const [showBar, setShowBar] = useState(false)

    if (localStorage.getItem("token")) {
        return (
            <>
                <nav>
                    <ul>
                        <li><Link className="navElement" to={"/"}>Posztok</Link></li>
                        <li><Link className="navElement" to={"/yourmom"}>Felhasználók</Link></li>
                        <li><Link className="navElement" to={"achievement"}>Achievementek</Link></li>
                        <li><a className="navElement" onClick={() => setShowBar(!showBar)}>Menü</a></li>
                    </ul>
                </nav>
                {showBar === true && <UserMenu loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
            </>
        )
    }
    else {
        return (
            <nav>
                <ul>
                    <li><Link className="navElement" to={"/"}>Posztok</Link></li>
                    <li><Link className="navElement" to={"/yourmom"}>Felhasználók</Link></li>
                    <li><Link className="navElement" to={"achievement"}>Achievementek</Link></li>
                    <li><Link className="navElement" to={"/login"}>Bejelentkezés</Link></li>
                    <li><Link className="navElement" to={"/register"}>Regisztráció</Link></li>
                </ul>
            </nav>
        )
    }

}

export default NavBar