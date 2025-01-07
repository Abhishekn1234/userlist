import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-userlist-7.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('ログイン成功!', { autoClose: 3000 });
        localStorage.setItem('token', data.token);  // Store token in localStorage
        navigate('/');
      } else {
        toast.error(data.message || 'ログインに失敗しました', { autoClose: 3000 });
      }
    } catch (err) {
      toast.error('サーバーエラー', { autoClose: 3000 });
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-4">ログイン</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 position-relative" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <label className="form-label">メールアドレス</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="text-end mt-1">
            <a href="/forgotpassword" className="text-decoration-none">
              パスワードをお忘れですか？
            </a>
          </div>
        </div>
        <div className="mb-3" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <label className="form-label">パスワード</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <a href="/register" className="text-decoration-none">
            アカウントを作成しますか？登録
          </a>
        </div>
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <button type="submit" className="btn btn-warning w-100">ログイン</button>
        </div>
      </form>
    </div>
  );
}
