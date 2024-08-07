import Breds from "../shared/Breds"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createUser, getUsers, updateUser } from "../../http/api"
import { useAuthStore } from "../../store"
import type { ColumnsType } from 'antd/es/table';
import { PAGE_SIZE, roles } from "../../constants"
import Table from "antd/es/table"
import UserFilter from "../utility/UserFilter"
import { Button, Drawer, Form, Space, Tag, theme } from "antd"
import { useEffect, useMemo, useState } from "react"
import CreateUserForm from "../forms/users/CreateUserForm";
import { CreateTenantData, CreateUserData } from "../../types/login.types";
import { debounce } from "lodash";


const Users = () => {

    const [form] = Form.useForm()
    const queryClient = useQueryClient()
    const [editingUser, setEditingUser] = useState<DataType | null>(null)

    const [queryParams, setQueryParams] = useState({
        currentPage: 1, perPage: PAGE_SIZE, qTerm: "", role: ""
    })

    const { mutate: createUserMutate } = useMutation({
        mutationKey: ['createUser'],
        mutationFn: (userData: CreateUserData) => createUser(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-list'] })
        }
    })

    const { mutate: editUserMutate } = useMutation({
        mutationKey: ['editUser'],
        mutationFn: (userData: CreateUserData) => {
            return updateUser(userData)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user-list'] })
        }
    })

    const handleFormSubmit = async () => {
        await form.validateFields()

        const newData: CreateUserData = form.getFieldsValue();
        if (user?.role === roles.admin) {
            newData.role = roles.manager
        }

        if (editingUser) {
            editUserMutate({ ...form.getFieldsValue(), id: editingUser.id })
        } else {

            createUserMutate(newData)
        }

        onClose()
    }



    const { user } = useAuthStore()
    const { token: { colorBgLayout } } = theme.useToken();


    const { data, isLoading } = useQuery({
        queryKey: ['user-list', queryParams],
        queryFn: () => {
            const params = new URLSearchParams(queryParams as unknown as Record<string, string>).toString()
            return getUsers((user?.role === roles.admin ? 0 : Number(user?.tenant.id)), params)
        },
    })


    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        form.resetFields()
        setEditingUser(null)
        setOpen(false);
    };

    useEffect(() => {
        if (editingUser) {
            showDrawer()
            form.setFieldsValue({ ...editingUser, tenant: editingUser?.tenant?.id })
        }
    }, [editingUser, form])

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
            <Breds items={[{ title: "Home", link: "" }, { title: "Users", link: "null" }]} />

            <div className="mt-5">
                <UserFilter showDrawer={showDrawer} getFilterData={getFilterData} />
                <Table rowKey={"id"} loading={isLoading} className="mt-4"
                    columns={[...columns, {
                        title: 'Action',
                        key: 'action',
                        dataIndex: 'action',
                        render: (_: string, user: DataType) => (
                            <>
                                <Button onClick={() => setEditingUser(user)} type="link">Edit</Button>
                            </>
                        ),
                    }]}
                    dataSource={data?.data?.users?.users}
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
                    title={editingUser ? "Edit User" : "Create a new user"}
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
                        <CreateUserForm user={user!} isEditing={!!editingUser} />
                    </Form>

                </Drawer>
            </div>
        </div>
    )
}

export default Users




interface DataType {
    id: number;
    key: string;
    name: string;
    email: number;
    role: string;
    tenant: CreateTenantData | null
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        key: 'role',
        dataIndex: 'role',
        render: (role, { id }) => (
            <>
                <Tag color={role === roles.admin ? 'red' : 'blue'} key={id}>
                    {role}
                </Tag>
            </>
        ),
    },
    {
        title: 'Restaurant',
        key: 'tenant',
        dataIndex: 'tenant',
        render: (tenant) => (
            <>
                {tenant?.name}
            </>
        ),
    },
];

