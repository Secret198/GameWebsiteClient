import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './index.css'
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import AchievementList from './components/AchievementList.jsx'
import Layout from "./pages/Layout.jsx"
import Login from './components/Login.jsx'
import GoToLogin from './pages/GoToLogin.jsx'

const url = "http://localhost:8000/api/"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "achievement",
                element: (localStorage.getItem("token") ? <AchievementList /> : <GoToLogin />)
            },
            {
                path: "login",
                element: <Login url={url} />
            }
        ]
    }
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
