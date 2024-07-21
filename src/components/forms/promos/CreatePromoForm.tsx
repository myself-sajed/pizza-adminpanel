import { Card, Col, DatePicker, Form, Input, Row, Select, Space } from "antd"
import { roles } from "../../../constants"
import { getAllTenantList } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "../../../store";

const CreatePromoForm = ({ user }: { user: UserInfo }) => {

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const { data, isLoading } = useQuery({
        queryKey: ['all-tenant-list'],
        queryFn: () => {
            return getAllTenantList()
        },
    })

    return (
        <Row>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Col span={24}>
                    <Card title="Basic Info">
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item name="code" label="Promo Code" rules={
                                    [{ required: true, message: 'Please enter the code' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="title" label="Promo Title" rules={
                                    [{ required: true, message: 'Please enter the title' }]}>
                                    <Input type="text" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="discount" label="Discount" rules={
                                    [{ required: true, message: 'Please enter the discount' }]}>
                                    <Input type="number" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Validity">
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item name="validUpto" label="Promo will be valid upto" rules={
                                    [{ required: true, message: 'Please input a validity' }]}>
                                    <DatePicker />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                {
                    user.role === roles.admin && <Col span={24}>
                        <Card title="Restaurant">
                            <Row gutter={10}>
                                <Col span={12}>
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
                                                data?.data?.tenants?.map((item: { name: string, id: number }) => {
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


            </Space>
        </Row>
    )
}

export default CreatePromoForm
