import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import FeedBack from "../components/FeedBack";


function Layout() {
    return (<>
        <NavBar />
        <Outlet />
        <Footer />
    </>
    )
}

export default Layout