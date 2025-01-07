import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://backend-userlist-7.onrender.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('登録成功!', {
          autoClose: 3000,  
        });
        navigate('/login');
      } else {
        toast.error(data.message || '登録に失敗しました', {
          autoClose: 3000,
        });
        setError(data.message || '登録に失敗しました');
      }
    } catch (err) {
      toast.error('サーバーエラー', {
        autoClose: 3000,
      });
      setError('サーバーエラー');
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-4">登録</h1>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">名前</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">メールアドレス</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">パスワード</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <a
            href="/login"
            className="text-decoration-none"
          >
            すでにユーザーですか？ログイン
          </a>
        </div>
        <button type="submit" className="btn btn-warning w-100">登録</button>
      </form>
    </div>
  );
}
