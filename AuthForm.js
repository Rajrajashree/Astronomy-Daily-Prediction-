import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { registerUser, loginUser } from '../services/api'; // Your API functions
import './FormStyles.css';

const AuthForm = ({ isLogin, onClose, onToggle }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔥 handleSubmit triggered");
    const endpoint = isLogin ? '/api/users/login' : '/api/users/signup';
  
    try {
      const response = await fetch(`http://localhost:8080${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        // ✅ Store user in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(data));
  
        setSuccess(`${isLogin ? 'Login' : 'Signup'} successful! Redirecting...`);
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };
  

  // This function ensures the modal only closes when clicking the background
  const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
          onClose();
      }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="form-content-wrapper">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input type="text" name="name" placeholder="Full Name" value={user.name} onChange={handleChange} required />
              <input type="text" name="phone" placeholder="Phone Number" value={user.phone} onChange={handleChange} required />
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={user.password} onChange={handleChange} required />
          <button type="submit" className="submit-button">{isLogin ? 'Login' : 'Register'}</button>
        </form>
        
        <div className="bottom-actions">
            <button onClick={onToggle} className="toggle-button">
                {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </button>
            <button onClick={onClose} className="back-button">Back</button>
        </div>

        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default AuthForm;
