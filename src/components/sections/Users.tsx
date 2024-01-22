import Breds from "../shared/Breds"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../http/api"
import { useAuthStore } from "../../store"
import type { ColumnsType } from 'antd/es/table';
import { roles } from "../../constants"
import Table from "antd/es/table"
import UserFilter from "../utility/UserFilter"
import { Button, Drawer, Form, Space, Tag, theme } from "antd"
import { useState } from "react"
import CreateUserForm from "../forms/users/CreateUserForm";


const Users = () => {

    const { user } = useAuthStore()
    const { token: { colorBgLayout } } = theme.useToken();


    const { data, isLoading } = useQuery({
        queryKey: ['user-list'],
        queryFn: () => getUsers(user?.role === roles.admin ? 0 : Number(user?.tenant.id)),
    })

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    }

    const onClose = () => {
        setOpen(false);
    };

    const getFilterData = (key: string, value: string) => {
        console.log(key, value)
    }

    return (
        <div>
            <Breds items={[{ title: "Home", link: "" }, { title: "Users", link: "null" }]} />

            <div className="mt-5">
                <UserFilter showDrawer={showDrawer} getFilterData={getFilterData} />
                <Table rowKey={"id"} loading={isLoading} className="mt-4" columns={columns} dataSource={data?.data?.users} />
            </div>

            <div>
                <Drawer
                    destroyOnClose={true}
                    title="Create a new user"
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
                            <Button onClick={onClose} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }
                >

                    <Form layout="vertical">
                        <CreateUserForm />
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
];

