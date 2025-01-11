import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ConfirmWindow from "./ConfirmWindow"


export default function UserMenu({ loggedIn, setLoggedIn }) {
    const navigation = useNavigate()
    const privilege = localStorage.getItem("privilege")
    const [showConfirm, setShowConfirm] = useState(false)


    function logout() {
        localStorage.clear()
        setLoggedIn(false)
        navigation("/")
    }

    const userId = localStorage.getItem("userId")
    return (
        <div className="menuBox">
            <h1>Menü</h1>
            <hr />
            <Link to={"/user/show/" + userId}>Adatok megjelenítése</Link>
            <Link to={"/post/create"}>Új poszt létrehozása</Link>
            <Link to={"/user/posts"}>Posztjaim</Link>
            {privilege == 10 && <Link to={"/achievement/create"}>Új achievement</Link>}
            <button onClick={() => setShowConfirm(true)}>Kijelentkezés</button>
            {(showConfirm) && <ConfirmWindow text={"Biztosan ki szeretne jelentkezni?"} functionToCall={logout} setShow={setShowConfirm} />}
        </div>
    )
}