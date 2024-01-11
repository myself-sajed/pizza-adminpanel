import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./components/sections/Dashboard";
import LoginPage from "./components/sections/Login";
import NonAuth from "./pages/NonAuth";
import Root from "./pages/Root";

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
                        element: <Dashboard />
                    },
                    {
                        path: '/restaurants',
                        element: <Dashboard />
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