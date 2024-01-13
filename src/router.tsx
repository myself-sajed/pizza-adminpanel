import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./components/sections/Dashboard";
import LoginPage from "./components/sections/Login";
import NonAuth from "./pages/NonAuth";
import Root from "./pages/Root";
import Users from "./components/sections/Users";
import Restaurants from "./components/sections/Restaurants";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: '',
                element: <MainLayout />,
                children: [
                    {
                        path: '',
                        element: <Dashboard />
                    },
                    {
                        path: '/users',
                        element: <Users />
                    },
                    {
                        path: '/restaurants',
                        element: <Restaurants />
                    },
                    {
                        path: '/products',
                        element: <Dashboard />
                    },
                    {
                        path: '/promos',
                        element: <Dashboard />
                    },
                ]
            },
            {
                path: 'auth',
                element: <NonAuth />,
                children: [
                    {
                        path: 'login',
                        element: <LoginPage />
                    }
                ]
            },
        ]
    }
])