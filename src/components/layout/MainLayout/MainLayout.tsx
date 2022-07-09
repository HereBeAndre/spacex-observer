import React from 'react';
import { Layout } from 'antd';

import { AppRoutes } from 'components/routes/urls';
import Navbar from 'components/layout/Navbar/Navbar';

import './MainLayout.scss';

const { Header, Footer, Sider, Content } = Layout;

const MainLayout: React.FC = ({ children }) => {
  return (
    <Layout id="main-layout">
      <Header>
        <Navbar routes={AppRoutes} className="navbar__style" />
      </Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>{children}</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default MainLayout;
