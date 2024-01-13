import Breds from "../shared/Breds"
import { useQuery } from "@tanstack/react-query"
import { getTenants } from "../../http/api"
import type { ColumnsType } from 'antd/es/table';
import Table from "antd/es/table"
import { Button, Drawer, Space } from "antd"
import { useState } from "react"
import RestoFilter from "../utility/RestoFilter";


const Restaurants = () => {

    const { data, isLoading } = useQuery({
        queryKey: ['tenant-list'],
        queryFn: () => getTenants(),
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
            <Breds items={[{ title: "Home", link: "" }, { title: "Restaurants", link: "null" }]} />

            <div className="mt-5">
                <RestoFilter showDrawer={showDrawer} getFilterData={getFilterData} />
                <Table rowKey={"id"} loading={isLoading} className="mt-4" columns={columns} dataSource={data?.data?.tenants} />
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
                            <Button onClick={onClose} type="primary">
                                Submit
                            </Button>
                        </Space>
                    }
                ></Drawer>
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

