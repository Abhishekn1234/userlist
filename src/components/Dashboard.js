import React from 'react';
import { Container, Row, Col, Card, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css';
import Sidebar from "./Sidebar";
import {useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ['10代満', '10代', '20代', '30代', '40代', '50代', '60代', '70代', '80代', '90代以上'],
  datasets: [
    {
      label: '男性',
      backgroundColor: '#ffa726',
      data: [300, 450, 680, 810, 900, 700, 400, 200, 100, 50]
    },
    {
      label: '女性',
      backgroundColor: '#fb8c00',
      data: [250, 400, 600, 780, 850, 650, 350, 180, 90, 40]
    }
  ]
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: '性別・年代比'
    }
  }
};


const Dashboard = () => {
  const navigate=useNavigate();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/user/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      localStorage.removeItem('token');
      toast.success('ログアウトしました');
      navigate('/login');
    } catch (error) {
      toast.error('ログアウトに失敗しました');
    }
  };
  
  return (
    <>
      <Navbar className="navbar-custom" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/">ダッシュボード</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown
                title={<i className="fas fa-user-circle fa-2x"></i>} // Profile icon
                id="profile-dropdown"
                align="end"
              >
                <NavDropdown.Item href="/profile">プロフィール</NavDropdown.Item>
                <NavDropdown.Item href="/settings">設定</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>ログアウト</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container fluid className="p-0">
        <Row className="g-0">
          <Sidebar />
          <Col md={10} className="p-4 main-content">
            <Row>
              {/* Top Row - 3 Cards Left to Right */}
              <Col md={4}>
                <Card className="mb-4 shadow-lg custom-card">
                  <Card.Body>
                    <Card.Title>ユーザー登録数累計</Card.Title>
                    <h1>450人</h1>
                    <Card.Text>400人 (前月時点の累計)</Card.Text>
                    <small className="text-success">↑ 12.5%</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4 shadow-lg custom-card">
                  <Card.Body>
                    <Card.Title>アクティブユーザー</Card.Title>
                    <h1>50人 / 今月</h1>
                    <Card.Text>12人 (前月時点)</Card.Text>
                    <small className="text-success">↑ 316.6%</small>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4 shadow-lg custom-card">
                  <Card.Body>
                    <Card.Title>定着率</Card.Title>
                    <h1>10% / 前月</h1>
                    <Card.Text>12% (前々月)</Card.Text>
                    <small className="text-danger">↓ 16.6%</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              
              <Col md={8}>
                <Card className="shadow-lg custom-card">
                  <Card.Body>
                    <Card.Title>性別・年代比</Card.Title>
                    <Bar data={data} options={options} />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="mb-4 shadow-lg custom-card">
                  <Card.Body>
                    <Card.Title>抽選利用回数</Card.Title>
                    <h1>125回 / 今月</h1>
                    <Card.Text>85回 (前月の今日時点)</Card.Text>
                    <small className="text-success">↑ 47%</small>
                  </Card.Body>
                </Card>
                <Card className="mb-4 shadow-lg custom-card">
                  <Card.Body>
                    <Card.Title>アカウント削除数</Card.Title>
                    <h1>10人 / 今月</h1>
                    <Card.Text>8人 (前月の今日時点)</Card.Text>
                    <small className="text-success">↑ 25%</small>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
