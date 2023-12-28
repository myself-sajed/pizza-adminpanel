import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store"
import siteLinks from "../siteLinks"

const HomePage = () => {

  const { user } = useAuthStore()

  if (!user) {
    return <Navigate to={siteLinks.login} replace={true} />
  }

  return (
    <div>
      <p>Home page for Pizza ADMIN PANEL</p>
      <Outlet />
    </div>
  )
}

export default HomePage
