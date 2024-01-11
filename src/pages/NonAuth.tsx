import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"
import siteLinks from "../siteLinks"

const NonAuth = () => {

    const { user } = useAuthStore()

    if (user) {
        return <Navigate to={siteLinks.home} replace={true} />
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default NonAuth
