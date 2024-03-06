import { SearchOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Input } from 'antd'

type FilterProps = {
    showDrawer: () => void
    getFilterData: (filterKey: string, filterValue: string) => void;
}

const RestoFilter = ({ getFilterData, showDrawer }: FilterProps) => {
    return (
        <Card>
            <Flex align="center" justify="space-between" gap={5}>
                <div className="grid grid-cols-3">
                    <Input onChange={(e) => getFilterData("qTerm", e.target.value)} style={{ width: "100%", }} allowClear={true} prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="Search" />
                </div>
                <Button type='primary' icon={<UserAddOutlined />} onClick={showDrawer} >
                    Create tenant
                </Button>
            </Flex>

        </Card>
    )
}

export default RestoFilter