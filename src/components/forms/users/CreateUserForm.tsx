import { Card, Col, Form, Input, Row, Select, Space } from "antd"
import { Option } from "antd/es/mentions"
import { roles } from "../../../constants"
import { getTenants } from "../../../http/api";
import { useQuery } from "@tanstack/react-query";

const CreateUserForm = () => {

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const { data, isLoading } = useQuery({
        queryKey: ['tenant-list'],
        queryFn: () => getTenants(),
    })

    return (
        <Row>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Col span={24}>
                    <Card title="Basic Info">
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item name="name" label="Full Name" rules={
                                    [{ required: true, message: 'Please enter full name' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="email" label="Email" rules={
                                    [{ required: true, message: 'Please input an email' },
                                    { type: 'email', message: 'Please enter a valid email!' }]}>
                                    <Input type="email" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Security">
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item name="password" label="Create Password" rules={
                                    [{ required: true, message: 'Please input a password' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Role">
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    name="role"
                                    label="Role"
                                    rules={[{ required: true, message: "Select a role" }]}
                                >
                                    <Select
                                        placeholder="Select a role"
                                        allowClear
                                    >
                                        <Option value={roles.admin}>{roles.admin}</Option>
                                        <Option value={roles.manager}>{roles.manager}</Option>
                                        <Option value={roles.customer}>{roles.customer}</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
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
            </Space>
        </Row>
    )
}

export default CreateUserForm
