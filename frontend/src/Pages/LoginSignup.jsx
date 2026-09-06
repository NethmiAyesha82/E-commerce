import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset'; 
    };
  }, []);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await fetch('https://virtual-assistant-85xq.vercel.app/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        }),
      });

      const responseData = await response.json();
      
      if (responseData.success) {
        if (responseData.isAdmin) {
          alert("Welcome Admin!");
          window.location.href = "https://e-commerce-dozh.vercel.app?admin=true";
        } else {
          localStorage.setItem('auth-token', responseData.token);
          window.location.replace("/");
        }
      } else {
        alert(responseData.errors || "Invalid Credentials");
      }
    } catch (err) {
      alert("Error connecting to server. Please try again.");
    }
  };

  const signup = async () => {
    try {
      const response = await fetch('https://virtual-assistant-85xq.vercel.app/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();
      
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
      } else {
        alert(responseData.errors);
      }
    } catch (err) {
      alert("Error connecting to server. Please try again.");
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">

        <h1>{state}</h1>

        <form onSubmit={(e) => {
          e.preventDefault();
          state === "Login" ? login() : signup();
        }}>

          <div className="loginsignup-fields">

            {state === "Signup" && (
              <input
                name='username'
                value={formData.username}
                onChange={changeHandler}
                type="text"
                placeholder='Your Name'
                required
              />
            )}

            <input
              name='email'
              value={formData.email}
              onChange={changeHandler}
              type="email"
              placeholder='Email Address'
              required
            />

            <input
              name='password'
              value={formData.password}
              onChange={changeHandler}
              type="password"
              placeholder='Password'
              required
            />

          </div>

          <button type="submit">Continue</button>

        </form>

        <p className="loginsignup-login">
          {state === "Signup"
            ? "Already have an account?"
            : "Create an account?"}

          <span
            style={{ cursor: 'pointer', color: '#ff4141' }}
            onClick={() => {
              setState(state === "Login" ? "Signup" : "Login");
            }}
          >
            {state === "Login" ? " Click Here" : " Login Here"}
          </span>
        </p>

        <div className="loginsignup-agree">
          <input
            type="checkbox"
            name='agree'
            id='agree'
            required
          />

          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoginSignup;