import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setError('有効なメールアドレスを入力してください');
    } else {
      event.preventDefault();
      setValidated(true);

      try {
        const response = await axios.post('http://localhost:5000/user/forgot-password', { email });
        const { resetLink } = response.data;
        const token = resetLink.split('/').pop();
        toast.success('リセットリンクが送信されました');
        setSuccess(true);
        setError('');
        setTimeout(() => navigate(`/reset-password/${token}`), 2000); 
      } catch (err) {
        toast.error('エラー: ユーザーが見つかりません');
        setError('ユーザーが見つかりません');
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Row className="w-50">
        <Col>
          <h2 className="text-center">パスワードを忘れた場合</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>メールアドレス</Form.Label>
              <Form.Control
                type="email"
                placeholder="メールアドレスを入力してください"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" className="w-100" variant="warning">
              リセットリンクを送信
            </Button>
          </Form>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {success && <Alert variant="success" className="mt-3">パスワードリセットリンクを送信しました。</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
