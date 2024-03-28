import { Button, Image, Space, Table, Tag, Typography } from "antd"
import Breds from "../shared/Breds"
import ProductFilter from "../utility/ProductFilter"
import { ColumnsType } from "antd/es/table"
import { useQuery } from "@tanstack/react-query"
import { PAGE_SIZE } from "../../constants"
import { useState } from "react"
import { getProductList } from "../../http/api"
import { format } from "date-fns"

const Products = () => {
    const [queryParams, setQueryParams] = useState({
        currentPage: 1, perPage: PAGE_SIZE, qTerm: "", role: ""
    })

    const [editingProduct, setEditingProduct] = useState<Product | null>(null)


    // const { user } = useAuthStore()

    const { data: products, isLoading } = useQuery({
        queryKey: ['product-list', queryParams],
        queryFn: () => {
            // const params = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
            return getProductList()
        },
    })

    console.log(`Products :`, products, editingProduct)


    return (
        <div>
            <Breds items={[{ title: "Home", link: "" }, { title: "Products", link: "null" }]} />

            <div className="mt-5">
                <ProductFilter showDrawer={() => { }} getFilterData={() => { }} />
                <Table rowKey={"id"} loading={isLoading} className="mt-4"
                    columns={[...columns, {
                        title: 'Action',
                        key: 'action',
                        dataIndex: 'action',
                        render: (_: string, product: Product) => (
                            <>
                                <Button onClick={() => setEditingProduct(product)} type="link">Edit</Button>
                            </>
                        ),
                    }]}
                    dataSource={products?.data?.data}
                    pagination={
                        {
                            showTotal: (total: number, range: number[]) => `Showing ${range[0]}-${range[1]} of ${total}`,
                            total: products?.data?.count,
                            pageSize: queryParams.perPage,
                            current: queryParams.currentPage,
                            onChange: (page: number) => {
                                setQueryParams((prev) => {
                                    return { ...prev, currentPage: page }
                                })
                            }
                        }
                    }
                />
            </div>
        </div>
    )
}

export default Products

export interface Product {
    _id: number;
    key: string;
    name: string;
    isPublish: number;
    createdAt: string;
    description: string;
    image: string;
}

const columns: ColumnsType<Product> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (_: string, record: Product) => {
            return <Space>
                <Image width={60} src={record.image} />
                <Typography.Text style={{ color: 'orangered' }} >{record.name}</Typography.Text>
            </Space>
        },
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Status',
        key: 'isPublish',
        dataIndex: 'isPublish',
        render: (_: boolean, record: Product) => (
            <>
                {record.isPublish ? <Tag color={'green'}>Published</Tag> : <Tag color={'red'}>Unpublished</Tag>}
            </>
        ),
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


