import Breds from "../shared/Breds"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createTenant, getTenants } from "../../http/api"
import type { ColumnsType } from 'antd/es/table';
import Table from "antd/es/table"
import { Button, Drawer, Form, Space } from "antd"
import { useMemo, useState } from "react"
import RestoFilter from "../utility/RestoFilter";
import CreateTenantForm from "../forms/tenants/CreateTenantForm";
import { CreateTenantData } from "../../types/login.types";
import { PAGE_SIZE } from "../../constants";
import { debounce } from "lodash";


const Restaurants = () => {


    const [form] = Form.useForm()
    const queryClient = useQueryClient()

    const [queryParams, setQueryParams] = useState({
        currentPage: 1, perPage: PAGE_SIZE, qTerm: "", role: ""
    })

    const { mutate: createUserMutate } = useMutation({
        mutationKey: ['createTenant'],
        mutationFn: (userData: CreateTenantData) => createTenant(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tenant-list'] })
        }
    })

    const handleFormSubmit = async () => {
        await form.validateFields()
        createUserMutate(form.getFieldsValue())
        onClose()
    }



    const { data, isLoading } = useQuery({
        queryKey: ['tenant-list', queryParams],
        queryFn: () => {
            const query = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
            return getTenants(query)
        },
    })

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
        form.resetFields()
    };

    const debouncedQueryUpdate = useMemo(() => {
        return debounce((key: string, value: string) => {
            setQueryParams((prev) => {
                return { ...prev, [key]: value || "", currentPage: 1 }
            })
        }, 500);
    }, [])

    const getFilterData = (key: string, value: string) => {
        debouncedQueryUpdate(key, value)
    }

    return (
        <div>
            <Breds items={[{ title: "Home", link: "" }, { title: "Restaurants", link: "null" }]} />

            <div className="mt-5">
                <RestoFilter showDrawer={showDrawer} getFilterData={getFilterData} />
                <Table rowKey={"id"}
                    loading={isLoading} className="mt-4"
                    columns={columns}
                    dataSource={data?.data?.tenants?.tenants}
                    pagination={
                        {
                            showTotal: (total: number, range: number[]) => `Showing ${range[0]}-${range[1]} of ${total}`,
                            total: data?.data?.tenants?.count,
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
                    title="Create a new tenant"
                    width={650}
                    onClose={(onClose)}
                    open={open}
                    styles={{
                        body: {
                            paddingBottom: 80,
                        },
                    }}
                    extra={
                        <Space>
                            <Button onClick={onClose}>Cancel</Button>
                            <Button type="primary" onClick={handleFormSubmit}>
                                Submit
                            </Button>
                        </Space>
                    }
                >
                    <Form layout="vertical" form={form} >
                        <CreateTenantForm />
                    </Form>
                </Drawer>
            </div>
        </div>
    )
}

export default Restaurants



interface DataType {
    id: number;
    key: string;
    name: string;
    email: number;
    role: string;
}

const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },

];

