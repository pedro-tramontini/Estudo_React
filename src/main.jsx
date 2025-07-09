import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Teste from './Teste.jsx'
import "leaflet/dist/leaflet.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "contact",
        element: <Teste />
    }
])

createRoot(document.getElementById('root')).render(
    <RouterProvider router ={router} />
    
    // <App />
)
