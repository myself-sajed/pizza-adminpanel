import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd"
import { LockOutlined, UserOutlined, } from '@ant-design/icons';
import PizzaLogo from "../../components/icons/PizzaLogo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login, self } from "../../http/api";

const getSelf = async () => {
  const { data } = await self()
  return data
}


const LoginPage = () => {

  const { data: selfData, refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      refetch();
      console.log('Login successful', data)
    }
  })

  console.log('Self Data: ', selfData)


  return (


    <Layout style={{ height: '100vh', alignItems: 'center', justifyContent: 'center' }} >

      <Space direction="vertical" size="large" >
        <Layout.Content style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <PizzaLogo />
        </Layout.Content>

        <Card title={<Space style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <LockOutlined />
          Sign in
        </Space>} bordered={false} style={{ width: '330px' }} >
          {isError && <Alert style={{ marginBottom: '5px' }} type="error" message={error?.message} />}
          <Form initialValues={{ remember: true }} onFinish={(credentials) => mutate(credentials)} >

            <Form.Item name="email" rules={
              [{ required: true, message: 'Please input your username!' },
              { type: 'email', message: 'Please enter a valid email!' }
              ]}>
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" />
            </Form.Item>

            <Flex justify="space-between">
              <Form.Item name="remember"
                valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a id="login-forgot-password" href="#" >Forgot password?</a>
            </Flex>


            <Form.Item>
              <Button style={{ width: '100%' }} type="primary" htmlType="submit" loading={isPending} >
                Log in
              </Button>
            </Form.Item>


          </Form>
        </Card>
      </Space>


    </Layout>

  )
}

export default LoginPage
