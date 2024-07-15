import { useNavigate, useParams } from "react-router-dom"
import Breds from "../shared/Breds"
import { useQuery } from "@tanstack/react-query"
import { getSingleAdminOrder } from "../../http/api"
import Loading from "../shared/Loading"
import { Order } from "./Orders"

const OrderDetails = () => {

    const { orderId } = useParams()
    const navigate = useNavigate()

    if (!orderId) {
        navigate(-1)
    }

    const { data: order, isLoading } = useQuery({
        queryKey: [`SingleOrderAdmin`, orderId],
        queryFn: () => getSingleAdminOrder(orderId!).then(res => res.data as { status: string, message: string, order: Order }),
        refetchInterval: 1000 * 15,
        enabled: !!orderId
    })

    return (
        <div>
            <Breds items={[{ title: "Home", link: "" }, { title: "Orders", link: "/orders" }, { title: orderId!, link: "" }]} />

            <div className="mt-5">
                {
                    isLoading ? <Loading title="Fetching order details" />
                        : order?.status === "error"
                            ? <div className="my-5 text-center">
                                <p className="text-red-600">{order?.message}</p>
                            </div>
                            : <div>
                                {order?.order?._id}
                            </div>
                }
            </div>
        </div>
    )
}

export default OrderDetails
