import { Alert, Button, Card, Checkbox, Flex, Form, Input, Layout, Space } from "antd"
import { LockOutlined, UserOutlined, } from '@ant-design/icons';
import PizzaLogo from "../icons/PizzaLogo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { login, logout } from "../../http/api";
import { useAuthStore } from "../../store";
import usePermission from "../../hooks/usePermission";
import getSelf from "../../utility/getSelf";




const LoginPage = () => {

  const { setUser, logoutUser } = useAuthStore()
  const { _isPermitted } = usePermission()

  const { refetch } = useQuery({
    queryKey: ['self'],
    queryFn: getSelf,
    enabled: false
  })


  const { mutate: logoutMutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logout,
    onSuccess: () => {
      logoutUser();
      return
    }
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: async () => {
      const fetchedData = await refetch();

      if (!_isPermitted(fetchedData.data)) {
        logoutMutate()
        return
      }

      setUser(fetchedData.data)
    }
  })



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
