import Breds from "../shared/Breds"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createPromo, getPromosList, updatePromo } from "../../http/api"
import { useAuthStore } from "../../store"
import type { ColumnsType } from 'antd/es/table';
import { PAGE_SIZE, roles } from "../../constants"
import Table from "antd/es/table"
import { Button, Drawer, Form, Space, theme, Typography } from "antd"
import { useEffect, useMemo, useState } from "react"
import { debounce } from "lodash";
import PromoFilter from "../utility/PromoFilter";
import { format } from "date-fns";
import CreatePromoForm from "../forms/promos/CreatePromoForm";
import dayjs from "dayjs";


const Promos = () => {
    const { user } = useAuthStore()

    const [form] = Form.useForm()

    const queryClient = useQueryClient()
    const [editingPromo, setEditingPromo] = useState<Promo | null>(null)

    const [queryParams, setQueryParams] = useState({
        currentPage: 1, perPage: PAGE_SIZE, q: "", discount: "", tenantId: user?.tenant.id
    })

    const { mutate: createPromoMutate } = useMutation({
        mutationKey: ['createPromo'],
        mutationFn: (promoData: Promo) => createPromo(promoData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['promos-list', queryParams] })
        }
    })

    const { mutate: editUserMutate } = useMutation({
        mutationKey: ['editPromo'],
        mutationFn: (userData: Promo) => {
            return updatePromo(userData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['promos-list', queryParams] })
        }
    })

    const handleFormSubmit = async () => {
        await form.validateFields()
        const fields = form.getFieldsValue()
        const data: Promo = {
            code: fields.code,
            title: fields.title,
            discount: fields.discount,
            tenantId: user?.role === roles.admin ? fields.tenantId : user?.tenant.id,
            validUpto: fields.validUpto["$d"]
        }


        if (editingPromo) {
            editUserMutate({ ...form.getFieldsValue(), _id: editingPromo._id })
        } else {
            createPromoMutate(data)
        }

        onClose()
    }



    const { token: { colorBgLayout } } = theme.useToken();


    const { data, isLoading } = useQuery({
        queryKey: ['promos-list', queryParams],
        queryFn: () => {
            const params = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
            return getPromosList(params)
        },
    })


    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        form.resetFields()
        setEditingPromo(null)
        setOpen(false);
    };

    useEffect(() => {
        if (editingPromo) {
            showDrawer()
            form.setFieldsValue({ ...editingPromo, validUpto: dayjs(editingPromo.validUpto, 'dd/mm/yyyy hh:mm') })
        }
    }, [editingPromo, form])

    const debouncedQueryUpdate = useMemo(() => {
        return debounce((key: string, value: string) => {
            setQueryParams((prev) => {
                return { ...prev, [key]: value || "", currentPage: 1 }
            })
        }, 500);
    }, [])

    const getFilterData = (key: string, value: string) => {

        if (key === 'qTerm') {
            debouncedQueryUpdate(key, value)
        } else {
            setQueryParams((prev) => {
                return { ...prev, [key]: value || "", currentPage: 1 }
            })
        }


    }


    return (
        <div>
            <Breds items={[{ title: "Home", link: "" }, { title: "Promos", link: "null" }]} />

            <div className="mt-5">
                <PromoFilter showDrawer={showDrawer} getFilterData={getFilterData} />
                <Table rowKey={"id"} loading={isLoading} className="mt-4"
                    columns={[...columns, {
                        title: 'Action',
                        key: 'action',
                        dataIndex: 'action',
                        render: (_: string, promo: Promo) => (
                            <>
                                <Button onClick={() => setEditingPromo(promo)} type="link">Edit</Button>
                            </>
                        ),
                    }]}
                    dataSource={data?.data?.data}
                    pagination={
                        {
                            showTotal: (total: number, range: number[]) => `Showing ${range[0]}-${range[1]} of ${total}`,
                            total: data?.data?.users?.count,
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

            <div>
                <Drawer
                    destroyOnClose={true}
                    title={editingPromo ? "Edit promo" : "Create a new promo"}
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
                        <CreatePromoForm user={user!} />
                    </Form>

                </Drawer>
            </div>
        </div>
    )
}

export default Promos




export interface Promo {
    _id?: number;
    key?: string;
    title: string;
    code: string;
    discount: number;
    validUpto: string;
    tenantId: string
    updatedAt?: string
}

const columns: ColumnsType<Promo> = [
    {
        title: 'Code',
        dataIndex: 'code',
        key: 'code',
        render: (code) => {
            return <b>{code}</b>
        }
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
    },
    {
        title: 'Discount',
        dataIndex: 'discount',
        key: 'discount',
        render: (discount) => {
            return <b>{discount}</b>
        }
    },
    {
        title: 'Valid Upto',
        key: 'validUpto',
        dataIndex: 'validUpto',
        render: (validUpto) => (
            <Typography.Text>{format(new Date(validUpto), 'dd/MM/yyyy hh:mm')}</Typography.Text>
        ),
    },
    {
        title: 'Active From',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
        render: (updatedAt) => (
            <Typography.Text>{format(new Date(updatedAt), 'dd/MM/yyyy hh:mm')}</Typography.Text>
        ),
    },
    {
        title: 'Restaurant',
        key: 'tenantId',
        dataIndex: 'tenantId',
        render: (tenantId) => (
            <>
                {tenantId}
            </>
        ),
    },
];

