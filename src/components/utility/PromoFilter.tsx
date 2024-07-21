import { GiftOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Input } from 'antd'

type FilterProps = {
    showDrawer: () => void
    getFilterData: (filterKey: string, filterValue: string) => void;
}

const PromoFilter = ({ getFilterData, showDrawer }: FilterProps) => {
    return (
        <Card>
            <Flex align="center" justify="space-between" gap={5}>
                <div className="grid grid-cols-2 gap-4" >
                    <Input onChange={(e) => getFilterData("q", e.target.value)} style={{ width: "100%", }} allowClear={true} prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="Search" />
                    <Input type='number' onChange={(e) => getFilterData("discount", e.target.value)} style={{ width: "100%", }} allowClear={true} placeholder="Search by discount" />
                </div>
                <Button type='primary' icon={<GiftOutlined />} onClick={showDrawer} >
                    Create Promo
                </Button>
            </Flex>

        </Card>
    )
}

export default PromoFilter
