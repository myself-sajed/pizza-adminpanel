import { Button, Drawer, Form, Image, Space, Table, Tag, Typography, theme } from "antd"
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
import ProductForm from "../forms/products/ProductForm"

const Products = () => {

    const { user } = useAuthStore()
    const { token: { colorBgLayout } } = theme.useToken();

    const [form] = Form.useForm()
    const [open, setOpen] = useState(false)

    const [queryParams, setQueryParams] = useState({
        page: 1, limit: PAGE_SIZE,
        tenantId: user?.role === roles.admin ? "" : user?.tenant?.id ? JSON.stringify(user?.tenant?.id) : "",
        q: "", isPublish: "", categoryId: "",
    })

    const [editingProduct, setEditingProduct] = useState<Product | null>(null)

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

    const onClose = () => {
        form.resetFields()
        setEditingProduct(null)
        setOpen(false);
    };


    const handleFormSubmit = () => {

        console.log('Form :', form.getFieldsValue())
    }

    return (
        <div>
            <Breds items={[{ title: "Home", link: "" }, { title: "Products", link: "null" }]} />

            <div className="mt-5">
                <ProductFilter role={user?.role} showDrawer={() => { setOpen(true) }} getFilterData={getFilterData} />
                <Table rowKey={"_id"} loading={isLoading} className="mt-4"
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

                <div>
                    <Drawer
                        destroyOnClose={true}
                        title={editingProduct ? "Edit product" : "Create a new product"}
                        width={600}
                        onClose={(onClose)}
                        open={open}
                        styles={{
                            body: {
                                paddingBottom: 80,
                                backgroundColor: colorBgLayout
                            },
                        }}
                        extra={
                            <Space>
                                <Button onClick={onClose}>Cancel</Button>
                                <Button type="primary" onClick={handleFormSubmit} >
                                    Submit
                                </Button>
                            </Space>
                        }
                    >

                        <Form layout="vertical" form={form} >
                            <ProductForm isEditing={!!editingProduct} />
                        </Form>

                    </Drawer>
                </div>
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


