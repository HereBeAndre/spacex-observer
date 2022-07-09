import React from 'react';
import { Layout } from 'antd';

import './MainLayout.scss';

const { Header, Footer, Sider, Content } = Layout;

const MainLayout: React.FC = ({ children }) => {
  return (
    <Layout className="main-layout">
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
