import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Layout from './pages/Layout';
import Register from './pages/Register';
import Login from "./pages/Login";
import GetUserData from './pages/GetUserData';
import UserUpdate from './pages/UserUpdate.jsx';
import PostCreate from './pages/PostCreate.jsx';
import PostUpdate from './pages/PostUpdate.jsx';
import AchievementCreate from './pages/AchievementCreate.jsx';
import AchievementUpdate from './pages/AchievementUpdate.jsx';
import AchievementList from './components/AchievementList.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import GetPosts from './pages/GetPosts.jsx';
import GetPostData from './pages/GetPostData.jsx';
import GetUsers from './pages/GetUsers.jsx';

function App() {
    const url = "http://localhost:8000/api/"
    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json"
    }

    const [loggedIn, setLoggedIn] = useState((localStorage.getItem("token") ? true : false))

    return (<>
        <BrowserRouter >
            <Routes>
                <Route path='/' element={<Layout loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} >
                    <Route path='achievement' element={<AchievementList url={url} headers={headers} />} />
                    <Route path='achievement/create' element={loggedIn ? <AchievementCreate url={url} headers={headers} /> : <Navigate replace to={"/login"} />} />
                    <Route path='achievement/update/:id' element={loggedIn ? <AchievementUpdate url={url} headers={headers} /> : <Navigate replace to={"/login"} />} />
                    <Route path='user/update/:id' element={loggedIn ? <UserUpdate url={url} headers={headers} /> : <Navigate replace to={"/login"} />} />
                    <Route path='user/show/:id' element={loggedIn ? <GetUserData url={url} headers={headers} setLoggedIn={setLoggedIn} /> : <Navigate replace to={"/login"} />} />
                    <Route path='user' element={loggedIn ? <GetUsers url={url} headers={headers} /> : <Navigate replace to={"/login"} />} />
                    <Route path='post/create' element={loggedIn ? <PostCreate url={url} headers={headers} /> : <Navigate replace to={"/login"} />} />
                    <Route path='post/update/:id' element={loggedIn ? <PostUpdate url={url} headers={headers} /> : <Navigate replace to={"/login"} />} />
                    <Route path='post' element={loggedIn ? <GetPosts url={url} headers={headers} /> : <Navigate replace to={"/login"} />} />
                    <Route path='post/show/:id' element={loggedIn ? <GetPostData url={url} headers={headers} /> : <Navigate replace to={"/login"} />} />
                </Route>
                <Route path='login' element={<Login url={url} headers={headers} setLoggedIn={setLoggedIn} />} />
                <Route path='register' element={<Register url={url} headers={headers} setLoggedIn={setLoggedIn} />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    </>
    )

}

export default App
