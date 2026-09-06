import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'

const App = () => {
  // LocalStorage එකේ Admin Token එක තියෙනවාද බලනවා
  const [token, setToken] = useState(localStorage.getItem('admin-token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:4000/adminlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('admin-token', data.token);
        setToken(data.token);
      } else {
        setError(data.errors || 'Login failed');
      }
    } catch (err) {
      setError('Server connection error');
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    setToken('');
  };

  // 1. Admin Login වී නැත්නම් Login UI එක පෙන්වීම
  if (!token) {
    return (
      <div style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#f5f5f5'
      }}>
        <form onSubmit={handleLogin} style={{
          background: '#fff', 
          padding: '40px', 
          borderRadius: '8px', 
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          width: '320px'
        }}>
          <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Admin Login</h2>
          
          {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>

          <button type="submit" style={{
            width: '100%', 
            padding: '10px', 
            backgroundColor: '#007bff', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Login
          </button>
        </form>
      </div>
    );
  }

  // 2. Admin Login වී ඇත්නම් සාමාන්‍ය Admin Dashboard එක පෙන්වීම
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Navbar />
        <button 
          onClick={handleLogout} 
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
          Logout
        </button>
      </div>
      <Admin />
    </div>
  )
}

export default App;