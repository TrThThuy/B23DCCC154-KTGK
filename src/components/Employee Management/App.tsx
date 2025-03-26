// src/App.tsx
import React from 'react';
import { Layout } from 'antd';
import EmployeeManagement from './pages/EmployeeManagement';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
    return (
        <Layout>
            <Header style={{ color: 'white', textAlign: 'center' }}>
                <h1>Employee Management System</h1>
            </Header>
            <Content style={{ padding: '20px' }}>
                <EmployeeManagement />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                ©2023 Employee Management System
            </Footer>
        </Layout>
    );
};

export default App;