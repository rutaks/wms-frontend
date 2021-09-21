import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Menu, Dropdown, Row, Col } from 'antd';
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
import { useAuth } from '../../context/Auth';
import Avatar from 'antd/lib/avatar/avatar';

const Sidebar = ({ children }) => {
  const history = useHistory();
  const auth = useAuth();
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
        <div style={{ marginLeft: collapsed ? '0px' : '40px' }}>
          {/* logo-no-color */}
          <img
            src={window.location.origin + '/img/logo-no-color.png'}
            style={{
              height: '60px',
              aspectRatio: 3 / 2
            }}
            alt="Logo"
          />
        </div>
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
              {!collapsed && <span style={{ paddingLeft: '12px' }}>{navItem.name}</span>}
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
          <div style={{ float: 'right' }}>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item key="0">
                    <a
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        auth.logoutUser();
                        history.replace('/login');
                      }}
                    >
                      Logout
                    </a>
                  </Menu.Item>
                </Menu>
              }
            >
              <a href="/" onClick={(e) => e.preventDefault()}>
                <Row>
                  <Col style={{ paddingRight: '12px' }}>
                    <Avatar shape="square" size="small" icon={<UserOutlined />} />
                  </Col>
                  <Col>
                    {`${auth?.user?.firstName} ${auth?.user?.lastName}`} <DownOutlined />
                  </Col>
                </Row>
              </a>
            </Dropdown>
          </div>
        </Layout.Header>
        {children}
      </Layout>
    </Layout>
  );
};

export default Sidebar;
