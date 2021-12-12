import React from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { Logo } from '../Logo';
import { AdminHeaderProps } from '../../types';
import style from './index.module.less'

export const AdminHeader: React.FC<AdminHeaderProps> = ({ menus }) => {
  const { pathname } = useLocation();
  const selectedKeys = menus.map(item => item.path).filter(item => pathname.includes(item))
  const isRedirect = menus.map(item => item.path).some(item => pathname.includes(item))
  return (
    <Layout>
      <Layout.Header className={style.header}>
        <Logo className={style.logo} />
        <Menu theme="dark" mode="horizontal" className={style.menu} selectedKeys={selectedKeys}>
          {menus.map(item => (
            <Menu.Item key={item.path} {...item}>
              <Link to={item.path}>{item.menutext}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Layout.Header>
      {!isRedirect && <Navigate to={`${menus[0].path}`} />}
      <Outlet />
    </Layout>
  )
}