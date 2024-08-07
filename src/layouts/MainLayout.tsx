import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "../store"
import siteLinks from "../siteLinks"
import { Avatar, Badge, Dropdown, Flex, Layout, Menu, Tag, theme } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import Icon from "@ant-design/icons/lib/components/Icon"
import { HomeIcon } from "../components/icons/HomeIcon"
import { UserIcon } from "../components/icons/UserIcon"
import { BasketIcon } from "../components/icons/BasketIcon"
import { GiftIcon } from "../components/icons/GiftIcon"
import PizzaLogo from "../components/icons/PizzaLogo"
import { FoodIcon } from "../components/icons/FoodIcon"
import useLogout from "../hooks/useLogout"
import { BellFilled, UserOutlined } from "@ant-design/icons"
import { useState } from "react"
import { roles } from "../constants"
import { OrderIcon } from "../components/icons/OrderIcon"


const MainLayout = () => {

  const [collapsed, setCollapsed] = useState(false)
  const { user } = useAuthStore()
  const { token: { colorBgContainer } } = theme.useToken();
  const { logoutMutate } = useLogout()
  const location = useLocation()

  if (!user) {
    return <Navigate to={`${siteLinks.login}?returnTo=${location.pathname}`} replace={true} />
  }

  const items = getMenuItems(user.role)



  return (
    <div>
      <div>
        <Layout style={{ minHeight: '100vh', background: colorBgContainer }}>
          <Sider
            collapsible
            theme="light"
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}>
            <div className="logo-home">
              <PizzaLogo />
            </div>

            <Menu theme="light" defaultSelectedKeys={[location.pathname]} mode="inline" items={items} />
          </Sider>
          <Layout>
            <Header
              style={{
                paddingLeft: '16px',
                paddingRight: '16px',
                background: colorBgContainer,
                display: 'flex',
                alignItems: 'center',
                gap: '30px'
              }}>
              <Flex align="center" justify="space-between" style={{ width: '100%' }} >
                <Tag bordered={false} color="volcano" style={{ marginLeft: collapsed ? '40px' : '0px' }} >
                  {user.role === roles.admin ? "Global - Admin" : user?.tenant?.address}
                </Tag>
                <Flex align="center" justify="space-end" gap={15} >
                  <Badge dot>
                    <BellFilled style={{ fontSize: 20 }} />
                  </Badge>
                  <Dropdown
                    menu={{
                      items: [{ key: "Logout", label: "Logout" }],
                      onClick: () => logoutMutate()
                    }}
                    placement="bottomRight"
                  >
                    <Avatar size={30} icon={<UserOutlined />} />
                  </Dropdown>
                </Flex>
              </Flex>
            </Header>
            <Content style={{ margin: '24px' }}>
              <Outlet />
            </Content>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Round Pizza ©{new Date().getFullYear()} Created by Shaikh Sajed
            </Footer>
          </Layout>
        </Layout>

      </div>
    </div>
  )
}

export default MainLayout


const baseItems = [
  {
    id: 1,
    key: "/",
    icon: <Icon component={HomeIcon} />,
    label: <NavLink to={"/"}>Dashboard</NavLink>,
  },
  {
    id: 4,
    key: "/products",
    icon: <Icon component={BasketIcon} />,
    label: <NavLink to={"/products"}>Products</NavLink>,
  },
  {
    id: 4,
    key: "/orders",
    icon: <Icon component={OrderIcon} />,
    label: <NavLink to={"/orders"}>Orders</NavLink>,
  },
  {
    id: 5,
    key: "/promos",
    icon: <Icon component={GiftIcon} />,
    label: <NavLink to={"promos"}>Promos</NavLink>,
  },

]

const getMenuItems = (role: string) => {

  let menu = baseItems

  const authUserMenu = [
    {
      id: 2,
      key: "/users",
      icon: <Icon component={UserIcon} />,
      label: <NavLink to={"/users"}>Users</NavLink>,
    },
    {
      id: 3,
      key: "/restaurants",
      icon: <Icon component={FoodIcon} />,
      label: <NavLink to={"/restaurants"}>Restaurants</NavLink>,
    },
  ]

  if (role === roles.admin) {
    menu = [...menu, ...authUserMenu]
  }

  return menu.sort((a, b) => a.id - b.id)


}


