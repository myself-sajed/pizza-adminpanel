import Loading from "../shared/Loading"
import Breds from "../shared/Breds"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../../http/api"
import { useAuthStore } from "../../store"
import { Table, Tag } from "antd"


const Users = () => {

    const { user } = useAuthStore()

    const { data, isLoading } = useQuery({
        queryKey: ['user-list'],
        queryFn: () => getUsers(user?.role === roles.admin ? 0 : Number(user?.tenant.id)),
    })


    return (
        <div>
            <Breds items={[{ title: "Home", link: "" }, { title: "Users", link: "null" }]} />

            <div className="mt-5">
                {isLoading && <Loading title="Loading contents" />}

                <Table columns={columns} dataSource={data?.data?.users} />

            </div>
        </div>
    )
}

export default Users


import type { ColumnsType } from 'antd/es/table';
import { roles } from "../../constants"

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

