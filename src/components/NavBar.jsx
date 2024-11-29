import { Link } from "react-router-dom"


function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link className="navElement" to={"/"}>Posztok</Link></li>
                <li><Link className="navElement" to={"/yourmom"}>Felhasználók</Link></li>
                <li><Link className="navElement" to={"/"}>Login</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar