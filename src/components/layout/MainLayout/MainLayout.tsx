import React, { useState } from 'react';
import { Layout } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { NAVBAR_ROUTES } from 'components/routes/routes';
import Navbar from 'components/layout/Navbar/Navbar';
import Sidebar from 'components/layout/Sidebar/Sidebar';

import './MainLayout.scss';

const { Header, Footer, Content } = Layout;

const MainLayout: React.FC = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => false);

  // TODO: Add click outside sidebar to close it + add X inside sidebar to close it
  const handleOpenSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Layout id="main-layout">
      <Header>
        <Navbar routes={NAVBAR_ROUTES} className="navbar__style">
          <a onClick={handleOpenSidebar}>
            <SearchOutlined />
          </a>
        </Navbar>
      </Header>
      <Layout id="inner-layout">
        {/* TODO: Keep Sidebar open when user navigates to other route - memo hook ? */}
        <Sidebar isOpen={isSidebarOpen} />
        <Content
          className={`main-content__container ${isSidebarOpen ? 'content-shrink' : 'content-grow'}`}
        >
          {children}
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};

export default MainLayout;
