import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Menu, Dropdown, Card } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BarChartOutlined,
  DownOutlined,
  UserOutlined,
  ContactsOutlined,
  AlertOutlined,
  ControlOutlined,
  CreditCardOutlined
} from '@ant-design/icons';

const Sidebar = ({ children }) => {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [navItems] = useState([
    { name: 'Overview', url: '/', icon: <BarChartOutlined /> },
    { name: 'Clients', url: '/clients', icon: <UserOutlined /> },
    { name: 'Employees', url: '/employees', icon: <ContactsOutlined /> },
    { name: 'Reports', url: '/reports', icon: <AlertOutlined /> },
    { name: 'Devices', url: '/devices', icon: <ControlOutlined /> },
    { name: 'Billings', url: '/bills', icon: <CreditCardOutlined /> }
  ]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Layout.Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[history.location.pathname]}
          defaultSelectedKeys={['/']}
        >
          {navItems.map((navItem) => (
            <Menu.Item key={navItem.url}>
              <Link to={navItem.url} />
              {navItem.icon}
              {!collapsed && navItem.name}
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      <Layout className="site-layout">
        <Layout.Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle
          })}
          <div style={{ float: 'right', paddingRight: '24px' }}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="0">
                    <a href="/">Logout</a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a href="/" className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                Samuel Rutakayile <DownOutlined />
              </a>
            </Dropdown>
          </div>
        </Layout.Header>
        <Card
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            borderRadius: '12px'
          }}
        >
          {children}
        </Card>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
