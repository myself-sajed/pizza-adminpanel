import { Card, Col, Form, Input, Row, Select, Space, Switch, Typography, Upload, UploadProps } from "antd"
import { useQuery } from "@tanstack/react-query"
import { getAllCategoryList, getAllTenantList } from "../../../http/api"
import { ChooseCategory } from "../../../types/login.types"
import { PlusOutlined } from "@ant-design/icons"
import ProductPricing from "./ProductPricing"
import ProductAttributes from "./ProductAttributes"

const ProductForm = ({ isEditing = false }: { isEditing: boolean }) => {

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

    // ANT-d upload config to avoid unnecessary image uploading, which is a default ant-d behaviour

    const uploadProps: UploadProps = {
        name: 'image',
        multiple: false,
        beforeUpload: () => {
            return false
        }
    }


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
                                        <Form.Item name="image" label="Upload Product Image" rules={
                                            [{ required: true, message: 'Please choose an image' }]}>
                                            <Upload {...uploadProps}
                                                name="image"
                                                listType="picture-card"
                                            >
                                                <Space direction="vertical">
                                                    <PlusOutlined />
                                                    Upload
                                                </Space>
                                            </Upload>
                                        </Form.Item>
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

                    <Col span={24}>
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
