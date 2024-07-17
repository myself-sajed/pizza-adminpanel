/* eslint-disable @typescript-eslint/no-unused-vars */
import { message, Space, Table, Tag, Typography, } from "antd"
import Breds from "../shared/Breds"
import { ColumnsType } from "antd/es/table"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { PAGE_SIZE, roles } from "../../constants"
import { useEffect, useMemo, useState } from "react"
import { getOrderList } from "../../http/api"
import { format } from "date-fns"
import { useAuthStore } from "../../store"
import { debounce } from "lodash"
import { Address, OldOrders, OrderStatus, PaymentMode, PaymentStatus, ProductConfiguration, Topping } from "../../types/order"
import OrderFilter from "../utility/OrderFilter"
import { KafkaOrderEventTypes, orderStatusColors } from "../../types/login.types"
import { Link } from "react-router-dom"
import socket from "../../lib/socket"

const Orders = () => {

    const { user } = useAuthStore()
    const queryClient = useQueryClient()
    const [messageApi, contextHolder] = message.useMessage();


    const [queryParams, setQueryParams] = useState({
        page: 1, limit: PAGE_SIZE,
        tenantId: user?.role === roles.admin
            ? ""
            : user?.tenant?.id
                ? JSON.stringify(user?.tenant?.id)
                : "",
        q: "", orderStatus: null, paymentMode: null
    })


    const { data: orders, isLoading } = useQuery({
        queryKey: ['order-list', queryParams],
        queryFn: () => {
            const params = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
            return getOrderList(params)
        },
    })


    const debouncedQueryUpdate = useMemo(() => {
        return debounce((key: string, value: string) => {
            setQueryParams((prev) => {
                return { ...prev, [key]: value || "", page: 1 }
            })
        }, 500);
    }, [])

    const getFilterData = (key: string, value: string) => {

        if (key === 'q') {
            debouncedQueryUpdate(key, value)
        } else {
            setQueryParams((prev) => {
                return { ...prev, [key]: value || "", page: 1 }
            })
        }


    }


    useEffect(() => {

        if (user?.tenant.id) {

            socket.on('new-order', (order) => {
                if (order.event_type === KafkaOrderEventTypes.ORDER_CREATED) {
                    queryClient.setQueryData(['order-list', queryParams], (old: OldOrders) => {
                        if (!old) {
                            // Handle the case where old data might be undefined or null
                            return { data: { data: { data: [order.data] } } };
                        }

                        // Ensure the data structure is preserved and the new order is added
                        const newOrders = [order.data, ...old.data.data.data];

                        return {
                            ...old,
                            data: {
                                ...old.data,
                                data: {
                                    ...old.data.data,
                                    data: newOrders
                                }
                            }
                        };
                    });

                    messageApi.success('Hey! You have a new order.');
                }
            })

            socket.on("join", (roomId) => {
                console.log("Joined in", roomId);
            })

            socket.emit("join", { tenantId: user?.tenant.id })
        }

        return () => {
            socket.off("join")
            socket.off("new-order")
        }

    })


    return (
        <div>
            {contextHolder}
            <Breds items={[{ title: "Home", link: "" }, { title: "Orders", link: "null" }]} />

            <div className="mt-5">
                <OrderFilter role={user?.role} getFilterData={getFilterData} />
                <Table rowKey={"_id"} loading={isLoading} className="mt-4"
                    columns={[...columns, {
                        title: 'Action',
                        key: 'action',
                        dataIndex: 'action',
                        render: (_: string, order: Order) => (
                            <>
                                <Link to={`/order/${order._id}`} type="link">Order Details</Link>
                            </>
                        ),
                    }]}
                    dataSource={orders?.data?.data?.data || []}
                    pagination={
                        {
                            showTotal: (total: number, range: number[]) => `Showing ${range[0]}-${range[1]} of ${total}`,
                            total: orders?.data?.total,
                            pageSize: queryParams.limit,
                            current: queryParams.page,
                            onChange: (page: number) => {
                                setQueryParams((prev) => {
                                    return { ...prev, page: page }
                                })
                            }
                        }
                    }
                />

            </div>
        </div>
    )
}

export default Orders


export interface CartItem {
    _id: string;
    name: string;
    image: string;
    tenantId: string;
    productConfiguration: ProductConfiguration | null;
    toppings: Topping[] | [];
    qty: number;
    totalPrice: number;
}

export interface Order {
    _id: string
    cart: CartItem[];
    customerId: { name: string, email: string };
    customer: {
        name: string;
        email: string;
    };
    tenantId: string;
    discount: number;
    tax: number;
    deliveryCharge: number;
    total: number;
    address: Address;
    couponCode?: string;
    comment?: string;
    paymentMode: PaymentMode;
    paymentStatus: PaymentStatus;
    orderStatus: OrderStatus;
    paymentId?: string;
    createdAt?: Date;
}



const columns: ColumnsType<Order> = [
    {
        title: 'Order ID',
        dataIndex: 'orderId',
        key: 'orderId',
        render: (_: string, record: Order) => {
            return <Space>
                <Typography.Text style={{ color: 'orangered' }} >{record._id}</Typography.Text>
            </Space>
        },
    },
    {
        title: 'Customer',
        dataIndex: 'customer',
        key: 'customer',
        render: (_: string, record: Order) => {
            return <Space>
                <Typography.Text >{record?.customer?.name || record?.customerId?.name}</Typography.Text>
            </Space>
        },
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        render: (_: string, record: Order) => {
            return <Space>
                <Typography.Text >{record.address.addressLine}, {record.address.city}</Typography.Text>
            </Space>
        },
    },
    {
        title: 'Order Status',
        key: 'orderStatus',
        dataIndex: 'orderStatus',
        render: (_: boolean, record: Order) => (
            <>
                {record.orderStatus && <Tag color={orderStatusColors[record.orderStatus]}>{record.orderStatus}</Tag>}
            </>
        ),
    },
    {
        title: 'Payment Mode',
        key: 'paymentMode',
        dataIndex: 'paymentMode',
        render: (_: boolean, record: Order) => {
            return <Typography.Text>{record.paymentMode}</Typography.Text>
        }
    },
    {
        title: 'Total',
        dataIndex: 'total',
        key: 'total',
        render: (total: number) => {
            return <Typography.Text style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }} >{`₹${total}`}</Typography.Text>
        }
    },
    {
        title: 'Created At',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: (date) => {
            return <Typography.Text>{format(new Date(date), 'dd/MM/yyyy hh:mm')}</Typography.Text>
        }
    },
];


