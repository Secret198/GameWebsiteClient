import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";



function Layout({ loggedIn, setLoggedIn }) {
    return (<>
        <NavBar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
    )
}

export default Layout