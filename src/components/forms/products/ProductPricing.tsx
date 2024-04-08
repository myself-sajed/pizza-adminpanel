import { Card, Col, Form, InputNumber, Row, Space, Typography } from "antd"
import { Category } from "../../../types/login.types"

const ProductPricing = ({ chosenCategory, categoryList }: { chosenCategory: string, categoryList: Category[] | undefined }) => {

    const category: Category | null | undefined = categoryList?.find(c => c._id === chosenCategory)

    if (!category) {
        return null
    }

    return (
        <div>
            <Col span={24}>
                <Card title="Product Price">
                    {
                        Object.entries(category.price).map(([priceKey, priceValue]) => {
                            return <div key={priceKey}>
                                <Space direction="vertical">
                                    <Typography.Text>{priceKey} {`(${priceValue.priceType})`}</Typography.Text>
                                    <Row gutter={20}>
                                        {
                                            priceValue.availableOptions.map((option) => {
                                                return <Col span={8} key={option}>
                                                    <Form.Item required label={option}
                                                        name={["priceConfiguration",
                                                            JSON.stringify({
                                                                priceKey,
                                                                priceType: priceValue.priceType
                                                            }),
                                                            option
                                                        ]} >
                                                        <InputNumber addonAfter="₹" required />
                                                    </Form.Item>
                                                </Col>
                                            })
                                        }
                                    </Row>
                                </Space>
                            </div>
                        })
                    }
                </Card>
            </Col>
        </div>
    )
}

export default ProductPricing
