import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles.css'
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import AchievementList from './components/AchievementList.jsx'
import Layout from "./pages/Layout.jsx"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import PostCreate from './pages/PostCreate.jsx'
import PostUpdate from './pages/PostUpdate.jsx'
import AchievementCreate from './pages/AchievementCreate.jsx'
import AchievementUpdate from './pages/AchievementUpdate.jsx'
import UserUpdate from './pages/UserUpdate.jsx'
import GetUserData from './pages/GetUserData.jsx'

const url = "http://localhost:8000/api/"
const headers = {
    "Accept": "application/json",
    "Content-type": "application/json"
}


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "achievement",
                element: (localStorage.getItem("token") ? <AchievementList url={url} headers={headers} /> : <Login url={url} headers={headers} />)
            },
            {
                path: "achievement/create",
                element: (localStorage.getItem("token") ? <AchievementCreate url={url} headers={headers} /> : <Login url={url} headers={headers} />)
            },
            {
                path: "achievement/update/:id",
                element: (localStorage.getItem("token") ? <AchievementUpdate url={url} headers={headers} /> : <Login url={url} headers={headers} />)
            },
            {
                path: "user/update/:id",
                element: (localStorage.getItem("token") ? <UserUpdate url={url} headers={headers} /> : <Login url={url} headers={headers} />)
            },
            {
                path: "user/show/:id",
                element: (localStorage.getItem("token") ? <GetUserData url={url} headers={headers} /> : <Login url={url} headers={headers} />)
            },
            {
                path: "post/create",
                element: (localStorage.getItem("token") ? <PostCreate url={url} headers={headers} /> : <Login url={url} headers={headers} />)
            },
            {
                path: "post/update/:id",
                element: (localStorage.getItem("token") ? <PostUpdate url={url} headers={headers} /> : <Login url={url} headers={headers} />)
            }

        ]
    },
    {
        path: "login",
        element: <Login url={url} headers={headers} />
    },
    {
        path: "register",
        element: <Register url={url} headers={headers} />
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
