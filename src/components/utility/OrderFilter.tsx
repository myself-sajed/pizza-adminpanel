import { SearchOutlined } from '@ant-design/icons'
import { Card, Flex, Input, Select, } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getAllTenantList } from '../../http/api'
import { CreateTenantData, orderStatusColors } from '../../types/login.types'
import { roles } from '../../constants'

type FilterProps = {
    getFilterData: (filterKey: string, filterValue: string) => void;
    role: string | undefined;
}

const OrderFilter = ({ getFilterData, role }: FilterProps) => {

    // GET TENANTS
    const { data: tenants, isLoading: tenantLoading } = useQuery({
        queryKey: ['all-tenant-list'],
        queryFn: () => {
            return getAllTenantList()
        },
    })



    return (
        <Card>
            <Flex align="center" justify="space-between" gap={5}>
                <div className="grid grid-cols-4 gap-4" >

                    {/* 1. SEARCH */}
                    <Input onChange={(e) => getFilterData("q", e.target.value)} style={{ width: "100%", }} allowClear={true} prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="Search for a Order ID" />

                    {/* 3. TENANTS */}
                    {role === roles.admin && <Select loading={tenantLoading} onChange={(item) => getFilterData("tenantId", item)} allowClear={true} placeholder="Select Restaurant" style={{ width: "100%" }}>
                        {
                            tenants?.data.tenants.map((tenant: CreateTenantData) => {
                                return <Select.Option key={tenant.id} value={tenant.id}>{tenant.name}</Select.Option>
                            })
                        }
                    </Select>}

                    <Select loading={tenantLoading} onChange={(item) => getFilterData("paymentMode", item)} allowClear={true} placeholder="Select Payment Mode" style={{ width: "100%" }}>
                        <Select.Option value={"Card"}>{"Card"}</Select.Option>
                        <Select.Option value={"Cash"}>{"Cash"}</Select.Option>
                    </Select>
                    <Select loading={tenantLoading} onChange={(item) => getFilterData("orderStatus", item)} allowClear={true} placeholder="Select Order Status" style={{ width: "100%" }}>
                        {
                            Object.keys(orderStatusColors).map((item) => {
                                return <Select.Option key={item} value={item}>{item}</Select.Option>
                            })
                        }
                    </Select>
                </div>
            </Flex>

        </Card>
    )
}

export default OrderFilter
