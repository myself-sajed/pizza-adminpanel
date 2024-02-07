import { Card, Col, Form, Input, Row, Space } from "antd"

const CreateTenantForm = () => {

    return (
        <Row>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Col span={24}>
                    <Card title="Basic Info">
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item name="name" label="Full Name" rules={
                                    [{ required: true, message: 'Please enter name of the tenant' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="address" label="Address" rules={
                                    [{ required: true, message: 'Please enter a valid address' }]}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Space>
        </Row>
    )
}

export default CreateTenantForm
