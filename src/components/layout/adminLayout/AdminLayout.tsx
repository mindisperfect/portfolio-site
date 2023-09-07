import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TiMessages } from "react-icons/ti";
import { SiSkillshare } from "react-icons/si";
import {
  MdOutlineCastForEducation,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import Cookies from "js-cookie";
import { AiOutlineMessage, AiFillHome } from "react-icons/ai";
import { Layout, Menu, Button, theme, Avatar } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { TOKEN } from "../../../constants";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const logout = () => {
    Cookies.remove(TOKEN);
    navigate("/");
  };
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
          items={[
            {
              key: "/dashboard",
              icon: <MdOutlineDashboardCustomize />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/experiences",
              icon: <VideoCameraOutlined />,
              label: <Link to="/experiences">Experiences</Link>,
            },
            {
              key: "/messages",
              icon: <AiOutlineMessage />,
              label: <Link to="/messages">Messages</Link>,
            },
            {
              key: "/portfolios",
              icon: <UserOutlined />,
              label: <Link to="/portfolios">Portfolio</Link>,
            },
            {
              key: "/skills",
              icon: <SiSkillshare />,
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/education",
              icon: <MdOutlineCastForEducation />,
              label: <Link to="/education">Education</Link>,
            },
            {
              key: "logout",
              icon: <DeleteOutlined />,
              label: (
                <Button onClick={logout} type="primary" danger>
                  Logout
                </Button>
              ),
            },
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
          <div
            className="notification container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyItems: "end",
            }}
          >
            <Link to="/home" style={{ marginRight: "20px" }}>
              <Avatar shape="square" size={40} icon={<AiFillHome />} />
            </Link>
            <Link to="/messages" style={{ marginRight: "20px" }}>
              <Avatar shape="square" size={40} icon={<TiMessages />} />
            </Link>
            <Link to="/admin-account" style={{ borderRadius: "50px" }}>
              <Avatar shape="square" size={40} icon={<UserOutlined />} />
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
