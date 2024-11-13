import { Link } from "react-router-dom"


function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to={"/"}>Posztok</Link></li>
                <li><Link to={"/yourmom"}>Másik</Link></li>
                <li><Link to={"/"}>eeeeeeeeeee</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar