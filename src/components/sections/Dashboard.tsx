import { ShoppingOutlined, BarChartOutlined, RiseOutlined } from "@ant-design/icons"
import DashboardCard from "../shared/DashboardCard"
import DashboardListItem from "../shared/DashboardListItem"
import { Link } from "react-router-dom"
import siteLinks from "../../siteLinks"
import { useAuthStore } from "../../store"

const Dashboard = () => {

    const { user } = useAuthStore()

    return (
        <div>

            <p className="text-2xl font-bold">Welcome, {user?.name}</p>

            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <DashboardCard
                            title="Total Orders"
                            subtitle="69"
                            icon={<ShoppingOutlined className="text-green-800 bg-green-100 p-2 rounded-md" style={{ fontSize: 20 }} />}
                        />
                        <DashboardCard
                            title="Total Sale"
                            subtitle="₹ 50,000"
                            icon={<BarChartOutlined className="text-blue-800 bg-blue-100 p-2 rounded-md" style={{ fontSize: 20 }} />}
                        />
                    </div>
                    <DashboardCard
                        title="Sales"
                        icon={<RiseOutlined className="text-blue-800 bg-blue-100 p-2 rounded-md" style={{ fontSize: 20 }} />}
                    >
                        <img src="/assets/graph.png" alt="" />
                    </DashboardCard>
                </div>
                <DashboardCard
                    title="Recent Orders"
                    icon={<ShoppingOutlined className="text-green-800 bg-green-100 p-2 rounded-md" style={{ fontSize: 20 }} />}
                >
                    <div className="flex gap-4 flex-col">

                        {
                            orders.map((order, index) => {
                                return <DashboardListItem key={index} name={order.name} address={order.address} price={order.price} status={order.status} />
                            })
                        }

                        <Link to={siteLinks.orders} className="underline text-red-500" >See all orders</Link>
                    </div>
                </DashboardCard>
            </div>
        </div>
    )
}

export default Dashboard


const orders = [
    {
        name: "Shaikh Sajed",
        address: "Main Street, Bandra",
        status: "On the way",
        price: "500"
    },
    {
        name: "Sameer Samad Kha Pathan",
        address: "Main Street, Bandra",
        status: "Preparing",
        price: "1000"
    },
    {
        name: "Rushi Sawale",
        address: "Main Street, Bandra",
        status: "Delivered",
        price: "432"
    },
    {
        name: "Shaikh Sajed",
        address: "Main Street, Bandra",
        status: "On the way",
        price: "500"
    },
    {
        name: "Sameer Samad Kha Pathan",
        address: "Main Street, Bandra",
        status: "Preparing",
        price: "1000"
    },
    {
        name: "Rushi Sawale",
        address: "Main Street, Bandra",
        status: "Delivered",
        price: "432"
    },
]
