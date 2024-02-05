import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "../store"

const NonAuth = () => {

    const { user } = useAuthStore()
    const location = useLocation()
    const returnTo = new URLSearchParams(location.search).get('returnTo') || '/'

    if (user) {
        return <Navigate to={returnTo} replace={true} />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default NonAuth
