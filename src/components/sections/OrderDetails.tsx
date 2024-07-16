import { useNavigate, useParams } from "react-router-dom"
import Breds from "../shared/Breds"
import { useQuery } from "@tanstack/react-query"
import { getSingleAdminOrder } from "../../http/api"
import Loading from "../shared/Loading"
import { CartItem, Order } from "./Orders"
import { Card, Col, Descriptions, DescriptionsProps, Select, Tag } from "antd"
import { orderStatusColors } from "../../types/login.types"
import { format } from "date-fns"

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

    const customerDetails: DescriptionsProps['items'] = order?.order ? [
        {
            key: '1',
            label: 'Name',
            children: order?.order.customerId?.name,
        },
        {
            key: '2',
            label: 'Email',
            children: order?.order.customerId?.email,
        },
        {
            key: '3',
            label: 'Address',
            children: `${order?.order.address.addressLine}, ${order?.order.address.city}`,
        },
        {
            key: '4',
            label: 'Payment Mode',
            children: order?.order.paymentMode,
        },
        {
            key: '5',
            label: 'Payment Status',
            children: order?.order.paymentStatus,
        },
        {
            key: '6',
            label: 'Order Amount',
            children: order?.order.total,
        },
        {
            key: '7',
            label: 'Order at',
            children: format(new Date(order?.order.createdAt as Date), 'dd/MM/yyyy hh:mm'),
        },
        {
            key: '8',
            label: 'Order Comment',
            children: order?.order.comment || 'N/A',
        },
    ] : []

    const handleStatusChange = async (status: string) => {
        console.log(status)
    }

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
                            : <div className="mt-5">
                                <div className="grid grid-cols-5 gap-3">
                                    <Col className="col-span-2">
                                        <Card title="Order Items" extra={<Tag color={orderStatusColors[order?.order.orderStatus as keyof typeof orderStatusColors]}>{order?.order.orderStatus}</Tag>} bordered={false}>
                                            <div className="w-full">
                                                {
                                                    order?.order?.cart.map((cartItem: CartItem, index) => {
                                                        return <div key={`product-${index}`} className="w-full items-center border-b-2 border-secondary py-6">
                                                            <div className='flex items-start justify-between w-full gap-7 md:col-span-4 col-span-5'>
                                                                <img src={cartItem.image} height={90} width={90} alt="Pizza" />

                                                                <div className="flex-1">
                                                                    <p className='font-medium text-xl'>{cartItem.name}</p>
                                                                    <p className='text-gray-500 sm:text-sm text-xs'>{cartItem?.productConfiguration ? Object.values(cartItem?.productConfiguration).join(', ') : null}</p>
                                                                    <p className='text-gray-500 sm:text-sm text-xs'>{cartItem.toppings.map((topping) => topping.name).join(', ')}</p>
                                                                </div>
                                                                <span>Qty:<b className="text-lg mx-2">{cartItem.qty}</b></span>
                                                            </div>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col className="col-span-3">
                                        <Card title="Order Details & Actions"
                                            extra={
                                                <Select onChange={(item) => handleStatusChange(item)} allowClear={true} placeholder="Change Order Status" style={{ width: "100%" }}>
                                                    {
                                                        Object.keys(orderStatusColors).map((item) => {
                                                            return <Select.Option key={item} value={item}>{item}</Select.Option>
                                                        })
                                                    }
                                                </Select>
                                            }
                                            bordered={false}>
                                            <Descriptions title="User Info" items={customerDetails} />
                                        </Card>
                                    </Col>
                                </div>
                            </div>
                }
            </div>
        </div>
    )
}

export default OrderDetails
