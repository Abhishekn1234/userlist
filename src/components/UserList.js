import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Row, Col, NavDropdown, Table, Form } from "react-bootstrap";
import Sidebar from "./Sidebar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [location, setLocation] = useState('日本');
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://backend-userlist-7.onrender.com/user/users');  
                setUsers(response.data);  
            } catch (error) {
                console.error('ユーザー情報の取得に失敗しました:', error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=ja`)
                    .then(response => {
                        setLocation(response.data.locality);
                    })
                    .catch(err => console.error("位置情報の取得に失敗しました:", err));
            });
        }
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.includes(searchTerm) || user.email.includes(searchTerm)
    );

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
    const totalPages = Math.min(Math.ceil(filteredUsers.length / usersPerPage), 500);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const formatDate = () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const day = currentDate.getDate();
        return `${year}年${month}月${day}日`;
    };

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

    const getGender = (dob) => {
        if (!dob) {
            return "不明";
        }

        const dobYear = new Date(dob).getFullYear();

        if (dobYear % 2 === 0) {
            return '男性';
        } else {
            return '女性';
        }
    };

    return (
        <>
            <Navbar className="navbar-custom" expand="lg" fixed="top">
                <Container fluid>
                    <Navbar.Brand href="#">ダッシュボード</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <NavDropdown
                                title={<i className="fas fa-user-circle fa-2x"></i>}
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
                    <Col xs="auto">
                        <Sidebar />
                    </Col>
                    <Col className="p-4 d-flex flex-column" style={{ marginLeft: '250px', top: "10px", width: "1200px" }}>
                        <div className="d-flex justify-content-between align-items-center w-100 mb-3">
                            <h2 className="mb-0">登録ユーザー一覧</h2>
                            <div className="ms-3" style={{ width: '250px' }}>
                                <Form.Control
                                    type="text"
                                    placeholder="ニックネーム / メールアドレスで検索"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {currentUsers.length > 0 ? (
                            <Table striped bordered hover responsive className="w-100">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>ニックネーム</th>
                                        <th>メールアドレス</th>
                                        <th>生年月日</th>
                                        <th>性別</th>
                                        <th>居住地</th>
                                        <th>登録日</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, index) => (
                                        <tr key={user._id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name || "山田 太郎"}</td>
                                            <td>{user.email}</td>
                                            <td>{user.dob || "1990年1月1日"}</td>
                                            <td>{getGender(user.dob)}</td>
                                            <td>{location || "日本"}</td>
                                            <td>{formatDate()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <div className="text-center py-5">
                                <p>表示するデータがありません</p>
                            </div>
                        )}
                        <div className="d-flex justify-content-end w-100 mt-4">
                            <nav>
                                <ul className="pagination">
                                    <li className="page-item" onClick={() => handlePageChange(currentPage - 1)}>
                                        <a className="page-link">&laquo;</a>
                                    </li>
                                    {[...Array(totalPages).keys()].map(pageNum => (
                                        <li key={pageNum + 1} className={`page-item ${currentPage === pageNum + 1 ? 'active' : ''}`} onClick={() => handlePageChange(pageNum + 1)}>
                                            <a className="page-link">{pageNum + 1}</a>
                                        </li>
                                    ))}
                                    <li className="page-item" onClick={() => handlePageChange(currentPage + 1)}>
                                        <a className="page-link">&raquo;</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
