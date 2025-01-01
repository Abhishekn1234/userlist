import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('パスワードが一致しません'); 
      return;
    }

    try {
      await axios.post(`http://localhost:5000/user/reset-password/${token}`, { 
        password, 
        confirmPassword 
      });
      toast.success('パスワードがリセットされました。');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'エラーが発生しました'; 
      toast.error(errorMessage); 
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">パスワードリセット</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="password">
              <Form.Label>新しいパスワード</Form.Label>
              <Form.Control
                type="password"
                placeholder="新しいパスワードを入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group controlId="confirmPassword" className="mt-3">
              <Form.Label>パスワードを確認</Form.Label>
              <Form.Control
                type="password"
                placeholder="パスワードを再入力"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button type="submit" className="w-100 mt-3" variant="primary">
              パスワードをリセット
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
