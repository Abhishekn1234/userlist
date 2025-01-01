import React from 'react';
import { Nav, Col } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <Col md={2} className="bg-light sidebar p-0">
      <div className="sidebar-content d-flex flex-column align-items-center py-4">
        <h3 className="mb-4 text-center">📊 レポート</h3>
        <Nav defaultActiveKey="/" className="flex-column w-100">
          <Nav.Link href="/" className="active">ダッシュボード</Nav.Link>
          <Nav.Link href="/users">登録ユーザー</Nav.Link>
          <Nav.Link>当選者</Nav.Link>
          <Nav.Link>運営管理者</Nav.Link>
        </Nav>
      </div>
    </Col>
  );
};

export default Sidebar;
