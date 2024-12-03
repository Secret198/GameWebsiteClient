import { Link, Navigate } from "react-router-dom"


export default function UserMenu(){

    async function logout(){
        const navigation = useNavigate()
        navigation("/")
    }
    //whattt

    const userId = localStorage.getItem("userId")
    return (
        <div className="menuBox">
            <h1>Menü</h1>
            <hr />
            <Link to={"/user/show/"+userId}>Adatok megjelenítése</Link>
            <button onClick={logout()}>Kijelentkezés</button>
        </div>
    )
}