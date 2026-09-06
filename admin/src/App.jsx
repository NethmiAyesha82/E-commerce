import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Pages/Admin/Admin'

const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('admin') === 'true') {
      localStorage.setItem('admin-active', 'true');
      setIsAdminLoggedIn(true);
    } else if (localStorage.getItem('admin-active') === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  if (!isAdminLoggedIn) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#ffe6e6', fontFamily: 'Poppins, sans-serif' }}>
        <h1 style={{ color: '#d9534f', marginBottom: '10px' }}>Access Denied</h1>
        <p style={{ color: '#555', fontSize: '16px' }}>Please login as Admin using the main store Frontend Login page.</p>
        <button 
          onClick={() => window.location.href = "https://e-commerce-5qys.vercel.app/login"}
          style={{ 
            padding: '12px 30px', 
            background: '#ff4141', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '30px', 
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer', 
            marginTop: '20px',
            boxShadow: '0 4px 10px rgba(255, 65, 65, 0.3)'
          }}>
          Go to Frontend Login
        </button>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Admin />
    </div>
  )
}

export default App;