import { Link } from "react-router-dom"
import siteLinks from "../../siteLinks"

const Dashboard = () => {
    return (
        <div>
            Dashboard Section
            <Link to={siteLinks.login} >Go to Login page</Link>
        </div>
    )
}

export default Dashboard
