import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography } from "antd"
import { useQuery } from "@tanstack/react-query"
import { getAllCategoryList, getAllTenantList } from "../../../http/api"
import { ChooseCategory } from "../../../types/login.types"
import ProductPricing from "./ProductPricing"
import ProductAttributes from "./ProductAttributes"
import { useAuthStore } from "../../../store"
import { roles } from "../../../constants"
import ProductImageUpload from "./ProductImageUpload"

const ProductForm = ({ isEditing = false }: { isEditing: boolean }) => {

    const { user } = useAuthStore()

    const chosenCategory = Form.useWatch('categoryId')

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    // GET TENANTS
    const { data: tenants, isLoading } = useQuery({
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
        <div>
            <Row>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Col span={24}>
                        <Card title="Product Info">
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item name="name" label="Product Name" rules={
                                        [{ required: true, message: 'Please enter product name' }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="categoryId"
                                        label="Choose Category"
                                        rules={[{ required: true, message: "Select a category" }]}
                                    >
                                        <Select loading={categoryLoading}
                                            placeholder="Choose category"
                                            allowClear
                                        >
                                            {
                                                categories?.data.map((category: ChooseCategory) => {
                                                    return <Select.Option key={category._id} value={JSON.stringify(category)}>{category.name}</Select.Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item name="description" label="Product Description" rules={
                                        [{ required: true, message: 'Please enter product description' }]}>
                                        <Input.TextArea rows={2} style={{ resize: 'none' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    {
                        !isEditing && <Col span={24}>
                            <Card title="Product Image">
                                <Row gutter={10}>
                                    <Col span={20}>
                                        <ProductImageUpload />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    }

                    {
                        chosenCategory && <ProductPricing chosenCategory={chosenCategory} />
                    }

                    {
                        chosenCategory && <ProductAttributes chosenCategory={chosenCategory} />
                    }

                    {
                        user?.role === roles.admin && <Col span={24}>
                            <Card title="Tenant Info">
                                <Row gutter={10}>
                                    <Col span={24}>
                                        <Form.Item
                                            name="tenantId"
                                            label="Tenant"
                                            rules={[{ required: true, message: "Select a tenant" }]}

                                        >
                                            <Select
                                                loading={isLoading}
                                                showSearch
                                                allowClear={true}
                                                placeholder="Select a tenant"
                                                optionFilterProp="children"
                                                filterOption={filterOption}
                                                options={
                                                    tenants?.data?.tenants?.map((item: { name: string, id: number }) => {
                                                        return {
                                                            value: item.id,
                                                            label: item.name
                                                        }
                                                    })
                                                }
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    }


                    <Col span={24}>
                        <Card title="Other Properties">
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item
                                        name="isPublish"
                                        initialValue="Yes"
                                    >
                                        <Space >
                                            <Switch defaultChecked checkedChildren="Yes" unCheckedChildren="No" />
                                            <Typography.Text >Publish</Typography.Text>
                                        </Space>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Space>
            </Row>
        </div>
    )
}

export default ProductForm
