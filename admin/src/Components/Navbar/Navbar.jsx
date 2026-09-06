import React, { useRef, useState } from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import defaultProfile from '../../assets/nav-profile.png'

const Navbar = () => {
  const [profileImage, setProfileImage] = useState(defaultProfile)
  const fileInputRef = useRef(null)

  const handleProfileClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin-active')
    window.location.href = "https://e-commerce-5qys.vercel.app/"
  }

  return (
    <div className="navbar">

      <div className="nav-logo-container">
        <img 
          src={navlogo} 
          alt="Logo" 
          className="nav-logo" 
        />

        <div className="nav-text-container">
          <h1 className="nav-title">TRENDLY</h1>
          <p className="nav-subtitle">Admin Panel</p>
        </div>
      </div>

      <div className="nav-right-container">
        <div className="profile-container">
          <img
            src={profileImage}
            alt="Profile"
            className="nav-profile"
            onClick={handleProfileClick}
          />

          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

    </div>
  )
}

export default Navbar