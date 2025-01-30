import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";



function Layout({ loggedIn, setLoggedIn, url, headers }) {
    return (<>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} url={url} headers={headers} />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
    )
}

export default Layout