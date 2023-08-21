import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="demo-logo-vertical"
          style={{ color: "white", padding: "10px 20px", fontSize: "20px" }}
        >
          Najot news
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // selectedKeys={[key]}
          // onClick={({ key }) => {
          //   setKey(key);
          // }}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/experiences",
              icon: <VideoCameraOutlined />,
              label: <Link to="/experiences">Experiences</Link>,
            },
            {
              key: "/messages",
              icon: <UploadOutlined />,
              label: <Link to="/messages">Messages</Link>,
            },
            {
              key: "/portfolios",
              icon: <UserOutlined />,
              label: <Link to="/portfolios">Portfolio</Link>,
            },
            {
              key: "/skills",
              icon: <UserOutlined />,
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/education",
              icon: <UserOutlined />,
              label: <Link to="/education">Education</Link>,
            },
            // {
            //   icon: <UploadOutlined />,
            //   label: (
            //     <Button onClick={logout} type="primary" danger>
            //       Logout
            //     </Button>
            //   ),
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className="notification">
          <Link to="/messages" style={{ marginRight: "20px" }}>
            <Avatar shape="square" size={32} icon={<MdNotificationsActive />} />
          </Link>
          <Link to="/admin-account" style={{ marginRight: "150px" }}>
            <Avatar shape="square" size={32} icon={<UserOutlined />} />
          </Link>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
