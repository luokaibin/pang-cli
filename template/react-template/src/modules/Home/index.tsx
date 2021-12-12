import { Layout } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <Layout>
      <h1>Hello World</h1>
      <Link to="/admin">点此跳转到Admin</Link>
    </Layout>
  )
}