import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ConfirmWindow from "./ConfirmWindow"
import otherRequest from "./otherRequest"
import FeedBack from "./FeedBack"
import Load from "./Load"

export default function UserMenu({ loggedIn, setLoggedIn, url, headers }) {
    headers.Authorization = "Bearer " + localStorage.getItem("token")
    const navigation = useNavigate()
    const privilege = localStorage.getItem("privilege")
    const [showConfirm, setShowConfirm] = useState(false)
    const [loading, setLoading] = useState(false)
    

    async function logout() {
        setLoading(true)
        await otherRequest(url, headers, "user/logout", {}, "PATCH")
        localStorage.clear()
        setLoggedIn(false)
        setLoading(false)
        navigation("/")        

    }

    const userId = localStorage.getItem("userId")
    return (
        <div className="menuBox">
            {loading && <Load />}
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