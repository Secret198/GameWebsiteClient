import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './index.css'
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import AchievementList from './components/AchievementList.jsx'
import Layout from "./pages/Layout.jsx"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

const url = "http://localhost:8000/api/"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "achievement",
                element: (localStorage.getItem("token") ? <AchievementList /> : <Login url={url} />)
            },
            {
                path: "login",
                element: <Login url={url} />
            },
            {
                path: "register",
                element: <Register url={url} />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
