import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useState, useEffect } from "react";
import NavBarMobile from "../components/NavBarMobile";


function Layout({ loggedIn, setLoggedIn, url, headers }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (<>
        {windowWidth < 600 ? <NavBarMobile loggedIn={loggedIn} setLoggedIn={setLoggedIn} url={url} headers={headers} /> : <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} url={url} headers={headers} />}
        
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
    )
}

export default Layout