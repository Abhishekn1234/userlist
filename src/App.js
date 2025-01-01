import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from "./components/Dashboard";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import UserList from "./components/UserList";
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/users" element={<UserList/>}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}
export default App;
