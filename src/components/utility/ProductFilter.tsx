import { SearchOutlined, UserAddOutlined } from '@ant-design/icons'
import { Button, Card, Flex, Input, Select, Space, Switch, Typography } from 'antd'
import { useQuery } from '@tanstack/react-query'
import { getAllCategoryList, getAllTenantList } from '../../http/api'
import { ChooseCategory, CreateTenantData } from '../../types/login.types'
import { roles } from '../../constants'

type FilterProps = {
    showDrawer: () => void
    getFilterData: (filterKey: string, filterValue: string) => void;
    role: string | undefined;
}

const ProductFilter = ({ getFilterData, showDrawer, role }: FilterProps) => {

    // GET TENANTS
    const { data: tenants, isLoading: tenantLoading } = useQuery({
        queryKey: ['all-tenant-list'],
        queryFn: () => {
            return getAllTenantList()
        },
    })


    // GET CATEGORIES
    const { data: categories, isLoading: categoryLoading } = useQuery({
        queryKey: ['all-categories-list'],
        queryFn: () => {
            return getAllCategoryList()
        },
    })



    return (
        <Card>
            <Flex align="center" justify="space-between" gap={5}>
                <div className="grid grid-cols-4 gap-4" >

                    {/* 1. SEARCH */}
                    <Input onChange={(e) => getFilterData("q", e.target.value)} style={{ width: "100%", }} allowClear={true} prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="Search" />

                    {/* 2. CATEGORY */}
                    <Select loading={categoryLoading} onChange={(item) => getFilterData("categoryId", item)} allowClear={true} placeholder="Select Category" style={{ width: "100%" }}>
                        {
                            categories?.data.map((category: ChooseCategory) => {
                                return <Select.Option key={category._id} value={category._id}>{category.name}</Select.Option>
                            })
                        }

                    </Select>

                    {/* 3. TENANTS */}
                    {role === roles.admin && <Select loading={tenantLoading} onChange={(item) => getFilterData("tenantId", item)} allowClear={true} placeholder="Select Restaurant" style={{ width: "100%" }}>
                        {
                            tenants?.data.tenants.map((tenant: CreateTenantData) => {
                                return <Select.Option key={tenant.id} value={tenant.id}>{tenant.name}</Select.Option>
                            })
                        }
                    </Select>}

                    {/* 4. IS PUBLISHED SWITCH */}
                    <Space >
                        <Switch defaultChecked onChange={(isChecked) => {
                            getFilterData("isPublish", JSON.stringify(isChecked))
                        }} />
                        <Typography.Text>Show Only Published</Typography.Text>
                    </Space>


                </div>
                <Button type='primary' icon={<UserAddOutlined />} onClick={showDrawer} >
                    Create Product
                </Button>
            </Flex>

        </Card>
    )
}

export default ProductFilter
