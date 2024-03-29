import { Button, Image, Space, Table, Tag, Typography } from "antd"
import Breds from "../shared/Breds"
import ProductFilter from "../utility/ProductFilter"
import { ColumnsType } from "antd/es/table"
import { useQuery } from "@tanstack/react-query"
import { PAGE_SIZE, roles } from "../../constants"
import { useMemo, useState } from "react"
import { getProductList } from "../../http/api"
import { format } from "date-fns"
import { useAuthStore } from "../../store"
import { debounce } from "lodash"

const Products = () => {


    const { user } = useAuthStore()

    const [queryParams, setQueryParams] = useState({
        page: 1, limit: PAGE_SIZE,
        tenantId: user?.role === roles.admin ? "" : user?.tenant?.id ? JSON.stringify(user?.tenant?.id) : "",
        q: "", isPublish: "", categoryId: "",
    })

    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

    editingProduct

    const { data: products, isLoading } = useQuery({
        queryKey: ['product-list', queryParams],
        queryFn: () => {
            const params = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
            return getProductList(params)
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


    return (
        <div>
            <Breds items={[{ title: "Home", link: "" }, { title: "Products", link: "null" }]} />

            <div className="mt-5">
                <ProductFilter role={user?.role} showDrawer={() => { }} getFilterData={getFilterData} />
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
                            total: products?.data?.total,
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


