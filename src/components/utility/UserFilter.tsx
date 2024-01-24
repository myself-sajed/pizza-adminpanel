import { SearchOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Input, Select } from 'antd'
import { roles } from '../../constants/index'

type FilterProps = {
    showDrawer: () => void
    getFilterData: (filterKey: string, filterValue: string) => void;
}

const UserFilter = ({ getFilterData, showDrawer }: FilterProps) => {
    return (
        <Card>
            <Flex align="center" justify="space-between" gap={5}>
                <div className="grid grid-cols-2 gap-4" >
                    <Input onChange={(e) => getFilterData("qTerm", e.target.value)} style={{ width: "100%", }} allowClear={true} prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="Search" />
                    <Select onChange={(item) => getFilterData("role", item)} allowClear={true} placeholder="Select Role" style={{ width: "100%" }}>
                        <Select.Option value={roles.admin}>{roles.admin}</Select.Option>
                        <Select.Option value={roles.manager}>{roles.manager}</Select.Option>
                    </Select>
                </div>
                <Button type='primary' icon={<UserAddOutlined />} onClick={showDrawer} >
                    Create user
                </Button>
            </Flex>

        </Card>
    )
}

export default UserFilter
