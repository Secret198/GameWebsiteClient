import { Turn as Hamburger } from "hamburger-react"
import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import UserMenu from "./UserMenu"

export default function NavBarMobile({ loggedIn, setLoggedIn, url, headers }) {
    const [isOpen, setIsOpen] = useState(false)
    const [showBar, setShowBar] = useState(false)

    const disableMenus = () => {
        setIsOpen(false)
        setShowBar(false)
    }

    if (localStorage.getItem("token")) {
        return (
            <div>
                <Hamburger toggled={isOpen} size={20} toggle={setIsOpen} rounded label="Show menu" />

                {isOpen &&

                    <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} >
                        <ul>
                            <motion.li initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.05 }} onClick={disableMenus}><Link className="navElement" to={"/post"}>Posztok</Link></motion.li>
                            <motion.li initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }} onClick={disableMenus}><Link className="navElement" to={"/user"}>Felhasználók</Link></motion.li>
                            <motion.li initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.15 }} onClick={disableMenus}><Link className="navElement" to={"/achievement"}>Achievementek</Link></motion.li>
                            <motion.li initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.2 }} ><a className="navElement" onClick={() => setShowBar(!showBar)}>Menü</a></motion.li>
                        </ul>
                    </motion.nav>}
                {showBar === true && <UserMenu loggedIn={loggedIn} setLoggedIn={setLoggedIn} url={url} headers={headers} />}
                <hr />
            </div>
        )
    }
    else {
        return (
            <>
                <Hamburger toggled={isOpen} size={20} toggle={setIsOpen} rounded label="Show menu" />

                {isOpen &&
                    <motion.nav initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.2 }}>
                        <ul>
                            <li onClick={disableMenus}><Link className="navElement" to={"/post"}>Posztok</Link></li>
                            <li onClick={disableMenus}><Link className="navElement" to={"/user"}>Felhasználók</Link></li>
                            <li onClick={disableMenus}><Link className="navElement" to={"/achievement"}>Achievementek</Link></li>
                            <li onClick={disableMenus}><Link className="navElement" to={"/login"}>Bejelentkezés</Link></li>
                            <li onClick={disableMenus}><Link className="navElement" to={"/register"}>Regisztráció</Link></li>
                        </ul>
                    </motion.nav>}
                <hr />
            </>
        )
    }
}