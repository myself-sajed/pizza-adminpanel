import { Card, Col, Form, Radio, Row, Space, Switch, Typography } from "antd"
import { Category } from "../../../types/login.types"

const ProductAttributes = ({ chosenCategory, categoryList }: { chosenCategory: string, categoryList: Category[] | undefined }) => {

    const category: Category | null | undefined = categoryList?.find(c => c._id === chosenCategory)

    if (!category) {
        return null
    }

    return (
        <div>
            <Col span={24}>
                <Card title="Product Attributes">
                    <Row>
                        {
                            category.attributes.map((attribute) => {
                                return <Col key={attribute.name} span={12}>
                                    <Space direction="vertical">
                                        <Typography.Text>{attribute.name}</Typography.Text>
                                        {
                                            <Form.Item name={["attributes", attribute.name]} initialValue={attribute.defaultValue} >
                                                {
                                                    attribute.widgetType === 'switch'
                                                        ? <Switch checkedChildren={attribute.availableOptions[0]} unCheckedChildren={attribute.availableOptions[1]} />
                                                        : attribute.widgetType === 'radio'
                                                            ? <Radio.Group name="radio" >
                                                                {
                                                                    attribute.availableOptions.map((radioOption) => {
                                                                        return <Radio.Button key={radioOption} value={radioOption}>{radioOption}</Radio.Button>
                                                                    })
                                                                }
                                                            </Radio.Group> : null
                                                }
                                            </Form.Item>
                                        }
                                    </Space>
                                </Col>
                            })
                        }
                    </Row>
                </Card>
            </Col>
        </div>
    )
}

export default ProductAttributes
