import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { AdminSilderProps } from '../../types';

export const AdminSilder: React.FC<AdminSilderProps> = ({ menus }) => {
  const {pathname} = useLocation();
  const isRedirect = menus.map(item => item.path).some(item => pathname.includes(item))
  const selectedKeys= menus.map(item => item.path).filter(item => pathname.includes(item))
  return (
    <Layout>
      <Layout.Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
        >
          {menus.map(item => (
            <Menu.Item key={item.path}>
              <Link to={item.path}>{item.menutext}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Sider>
      {!isRedirect && <Navigate to={`${menus[0].path}`} />}
      <Outlet />
    </Layout>
  )
}