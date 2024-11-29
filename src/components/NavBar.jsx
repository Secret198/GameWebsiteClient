import { Link } from "react-router-dom"

//idk
function NavBar() {
    if(localStorage.getItem("token")){
        return (
            <nav>
                <ul>
                    <li><Link className="navElement" to={"/"}>Posztok</Link></li>
                    <li><Link className="navElement" to={"/yourmom"}>Felhasználók</Link></li>
                    <li><Link className="navElement" to={"/"}>Menü</Link></li>
                </ul>
            </nav>
        )
    }
    else{
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
    
}

export default NavBar