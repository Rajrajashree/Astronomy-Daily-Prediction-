import React, { useState } from 'react';

// Combined CSS for the Landing Page and AuthForm Modal
const GlobalStyles = () => (
  <style>{`
    /* Import a suitable font */
    @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;600&display=swap');

    body {
      margin: 0;
      font-family: 'Lora', serif;
      background-color: #0c1445; /* Set background on body to prevent white flashes */
    }

    /* Landing Page Styles */
    .landing-container {
      min-height: 100vh;
      background-color: #0c1445;
      color: #e0e6f9;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 2rem;
      box-sizing: border-box;
      overflow: hidden;
      position: relative;
    }

    .top-nav {
      position: absolute;
      top: 2rem;
      right: 2rem;
      z-index: 10;
    }

    .top-nav button {
      background: none;
      border: 1px solid rgba(224, 230, 249, 0.5);
      color: #e0e6f9;
      font-family: 'Lora', serif;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      margin-left: 1rem;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s;
    }

    .top-nav button:hover {
      background-color: rgba(224, 230, 249, 0.1);
    }

    .main-content {
      position: absolute;
      left: 10%;
      top: 50%;
      transform: translateY(-50%);
      max-width: 550px;
      z-index: 5;
      text-align: left;
    }

    .title-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .app-logo {
      animation: twinkle 5s infinite ease-in-out;
    }

    .main-content h1 {
      font-size: 2.5rem;
      font-weight: 600;
      letter-spacing: 0.5rem;
      margin: 0;
      text-transform: uppercase;
    }

    .main-content p {
      font-size: 1rem;
      line-height: 1.7;
      color: #b9c2e3;
    }

    .astro-quote {
      margin-top: 2rem;
      padding-left: 1.5rem;
      font-style: italic;
      color: #a0a0ff;
      border-left: 2px solid #a0a0ff;
      font-size: 0.9rem;
    }

    .astro-quote span {
      display: block;
      margin-top: 0.5rem;
      font-style: normal;
      font-weight: 600;
      color: #e0e6f9;
    }

    .celestial-graphics {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .crescent-moon {
      position: absolute;
      top: 18%;
      right: 18%;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      box-shadow: 12px 8px 0 0 #e0e6f9;
      transform: rotate(45deg);
      animation: twinkle 5s infinite ease-in-out;
    }

    .crescent-moon.moon2 {
      top: 70%;
      right: 65%;
      width: 30px;
      height: 30px;
      transform: rotate(-120deg);
      animation-delay: -2s;
    }

    .star {
      position: absolute;
      background-color: #fff;
      border-radius: 50%;
      animation: twinkle 4s infinite ease-in-out;
    }
    @keyframes twinkle {
      0%, 100% { opacity: 0.5; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }
    .s1 { width: 4px; height: 4px; top: 15%; right: 15%; animation-delay: 0s; }
    .s2 { width: 2px; height: 2px; top: 25%; right: 12%; animation-delay: 1s; }
    .s3 { width: 3px; height: 3px; top: 18%; right: 10%; animation-delay: 0.5s; }
    .s4 { width: 2px; height: 2px; top: 80%; left: 10%; animation-delay: 2s; }
    .s5 { width: 4px; height: 4px; top: 10%; left: 20%; animation-delay: 1.5s; }
    .s6 { width: 3px; height: 3px; bottom: 15%; left: 15%; animation-delay: 0.8s; }
    .s7 { width: 2px; height: 2px; top: 60%; right: 8%; animation-delay: 2.5s; }
    .s8 { width: 3px; height: 3px; top: 85%; right: 10%; animation-delay: -1.2s; }
    .s9 { width: 2px; height: 2px; top: 55%; right: 30%; animation-delay: -2.2s; }
    .s10 { width: 4px; height: 4px; top: 30%; right: 75%; animation-delay: -0.3s; }
    .s11 { width: 2px; height: 2px; top: 90%; left: 40%; animation-delay: -3s; }
    .s12 { width: 3px; height: 3px; top: 5%; right: 50%; animation-delay: -1.8s; }
    .s13 { width: 2px; height: 2px; top: 5%; left: 5%; animation-delay: -0.5s; }
    .s14 { width: 3px; height: 3px; top: 95%; right: 5%; animation-delay: -2.5s; }
    .s15 { width: 2px; height: 2px; bottom: 5%; left: 50%; animation-delay: -3.5s; }

    .nebula {
      position: absolute;
      top: 50%;
      right: 15%;
      transform: translateY(-50%);
      width: 250px;
      height: 250px;
      background: radial-gradient(circle, rgba(160, 160, 255, 0.15) 0%, rgba(160, 160, 255, 0) 70%);
      border-radius: 50%;
      animation: float-nebula 10s infinite alternate ease-in-out;
    }

    @keyframes float-nebula {
      from { transform: translateY(-10px) scale(0.95) rotate(-5deg); }
      to { transform: translateY(10px) scale(1.05) rotate(5deg); }
    }

    .journey-sentence {
      position: absolute;
      bottom: 25%;
      right: 15%;
      max-width: 250px;
      text-align: right;
      z-index: 5;
    }

    .journey-sentence p {
      font-family: 'Lora', serif;
      font-size: 1.2rem;
      font-style: italic;
      color: #a0a0ff;
      line-height: 1.6;
      opacity: 0;
      animation: fade-and-bounce 2s 1s ease-out forwards;
    }

    @keyframes fade-and-bounce {
      0% { opacity: 0; transform: translateY(40px); }
      60% { opacity: 0.7; transform: translateY(-10px); }
      80% { transform: translateY(5px); }
      100% { opacity: 0.7; transform: translateY(0); }
    }

    .cluster {
      position: absolute;
      width: 3px;
      height: 3px;
      background-color: rgba(224, 230, 249, 0.6);
      border-radius: 50%;
    }
    .c1 { top: 25%; right: 35%; } .c2 { top: 28%; right: 38%; } .c3 { top: 23%; right: 39%; }
    .c4 { bottom: 20%; left: 35%; } .c5 { bottom: 22%; left: 33%; } .c6 { bottom: 18%; left: 34%; }
    .c7 { top: 70%; left: 5%; } .c8 { top: 73%; left: 8%; } .c9 { top: 40%; left: 8%; }
    .c10 { top: 42%; left: 12%; } .c11 { top: 80%; right: 40%; } .c12 { top: 83%; right: 43%; }
    .c13 { top: 10%; right: 60%; } .c14 { top: 12%; right: 64%; }

    @media (max-width: 900px) {
      .main-content {
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        width: 90%;
        max-width: 500px;
      }
      .celestial-graphics { transform: scale(0.7); opacity: 0.8; }
      .title-container { justify-content: center; }
    }

    @media (max-width: 600px) {
      .main-content h1 { font-size: 2rem; }
      .celestial-graphics { transform: scale(0.5); }
    }

    /* AuthForm Modal Styles */
    .modal-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(12, 20, 69, 0.8);
      backdrop-filter: blur(5px);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      animation: fadeIn 0.3s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-content {
      background: #1a235a;
      border: none;
      padding: 2rem 2.5rem;
      border-radius: 15px;
      color: #e0e6f9;
      width: 90%;
      max-width: 400px;
      position: relative;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.4s ease-out;
    }
    
    @keyframes slideIn {
        from { transform: translateY(-30px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    .modal-content h2 {
      text-align: center;
      font-size: 1.8rem;
      letter-spacing: 0.2rem;
      text-transform: uppercase;
      margin-top: 0;
      margin-bottom: 2rem;
    }
    
    .close-button {
      position: absolute;
      top: 15px;
      right: 20px;
      font-size: 2rem;
      color: #b9c2e3;
      cursor: pointer;
      transition: color 0.3s;
    }

    .close-button:hover {
      color: #fff;
    }

    .auth-form .form-group {
      margin-bottom: 1.5rem;
    }
    
    .auth-form label {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: #b9c2e3;
    }

    .auth-form input {
      width: 100%;
      padding: 0.8rem 1rem;
      background-color: #0c1445;
      border: 1px solid rgba(160, 160, 255, 0.3);
      border-radius: 8px;
      color: #e0e6f9;
      font-family: 'Lora', serif;
      font-size: 1rem;
      box-sizing: border-box;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    .auth-form input:focus {
      outline: none;
      border-color: #a0a0ff;
      box-shadow: 0 0 10px rgba(160, 160, 255, 0.3);
    }
    
    .submit-btn {
      width: 100%;
      padding: 0.8rem 1rem;
      background-color: #a0a0ff;
      color: #0c1445;
      border: none;
      border-radius: 8px;
      font-family: 'Lora', serif;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-top: 1rem;
    }

    .submit-btn:hover {
      background-color: #b9c2e3;
    }

    .toggle-auth {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: #b9c2e3;
    }

    .toggle-auth span {
      color: #a0a0ff;
      cursor: pointer;
      font-weight: 600;
      text-decoration: underline;
    }
    
    .auth-message {
        text-align: center;
        margin-top: 1rem;
        font-size: 0.9rem;
    }
    .auth-message.success {
        color: #a0ffc0;
    }
    .auth-message.error {
        color: #ffa0a0;
    }
  `}</style>
);

// The AuthForm component for the modal with integrated logic


// ... (GlobalStyles and LandingPage components remain unchanged) ...

const AuthForm = ({ isLogin, onClose, onToggle }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        // --- Login Logic (remains unchanged) ---
        const res = await fetch('http://localhost:8080/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: user.email, password: user.password }),
        });
        const data = await res.json();
        if (res.ok) {
          sessionStorage.setItem('userId', data.id);
          sessionStorage.setItem('userEmail', data.email);
          sessionStorage.setItem('userPhone', data.phone);
          setSuccess('Login successful! Redirecting to dashboard...');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1500);
        } else {
          setError(data.message || 'Login failed. Please check your credentials.');
        }
      } else {
        // --- REAL Registration Logic ---
        console.log("Attempting real registration for:", user);

        const res = await fetch('http://localhost:8080/api/users/signup', { // <--- IMPORTANT: Change this URL to your backend registration endpoint
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user), // Send the entire user object (name, email, password, phone)
        });

        const data = await res.json(); // Parse the JSON response from your backend

        if (res.ok) { // Check if the response status is 2xx (e.g., 200 OK, 201 Created)
          // Store relevant user data received from the backend in sessionStorage
          // Your backend should return data.id, data.name, data.email, data.phone upon successful registration
          sessionStorage.setItem('userId', data.id);
          sessionStorage.setItem('userName', data.name);
          sessionStorage.setItem('userEmail', data.email);
          sessionStorage.setItem('userPhone', data.phone);
          setSuccess('Signup successful! Redirecting to dashboard...');
          setTimeout(() => {
            window.location.href = '/dashboard';
          }, 1500);
        } else {
          // Handle registration errors from the backend
          // The backend should send an error message in its response (e.g., data.message)
          setError(data.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error("Authentication error:", err);
      if (err instanceof TypeError && err.message === 'Failed to fetch') {
        setError('Connection failed. Please ensure the server is running and accessible and that your backend is running on http://localhost:8080/api/users/register.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <span className="close-button" onClick={onClose}>&times;</span>
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" value={user.name} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input type="text" id="phone" name="phone" value={user.phone} onChange={handleChange} required />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={user.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={user.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? 'Enter the Cosmos' : 'Join the Stars'}
          </button>
        </form>

        {error && <p className="auth-message error">{error}</p>}
        {success && <p className="auth-message success">{success}</p>}

        <p className="toggle-auth">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={onToggle}>
            {isLogin ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

// ... (LandingPage and App components remain unchanged) ...

export default function App() {
  return (
    <>
      <GlobalStyles />
      <LandingPage />
    </>
  );
}


// The LandingPage component
const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleOpenModal = (loginMode) => {
    setIsLogin(loginMode);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  }

  return (
    <>
      <div className="landing-container">
        <div className="top-nav">
          <button onClick={() => handleOpenModal(true)}>Login</button>
          <button onClick={() => handleOpenModal(false)}>Register</button>
        </div>

        <main className="main-content">
          <div className="title-container">
            <svg className="app-logo" width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L9.46 8.54L2 9.77L7.2 14.47L5.82 21.5L12 17.77L18.18 21.5L16.8 14.47L22 9.77L14.54 8.54L12 2Z" stroke="#e0e6f9" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <h1>ASTRONOMY</h1>
          </div>
          <p>Unlock the secrets of the cosmos. Get personalized daily horoscopes, explore your birth chart, and understand how the stars align for you. Our insights help you navigate your path with confidence and clarity.</p>
          <blockquote className="astro-quote">
            "Astrology is a language. If you understand this language, the sky speaks to you."
            <span>- Dane Rudhyar</span>
          </blockquote>
        </main>
        
        <div className="celestial-graphics">
          <div className="crescent-moon"></div>
          <div className="crescent-moon moon2"></div>
          <div className="nebula"></div>
          <div className="journey-sentence">
            <p><b>Your star determines your life's journey!</b></p>
          </div>
          <div className="star s1"></div><div className="star s2"></div><div className="star s3"></div>
          <div className="star s4"></div><div className="star s5"></div><div className="star s6"></div>
          <div className="star s7"></div><div className="star s8"></div><div className="star s9"></div>
          <div className="star s10"></div><div className="star s11"></div><div className="star s12"></div>
          <div className="star s13"></div><div className="star s14"></div><div className="star s15"></div>
          <div className="cluster c1"></div><div className="cluster c2"></div><div className="cluster c3"></div>
          <div className="cluster c4"></div><div className="cluster c5"></div><div className="cluster c6"></div>
          <div className="cluster c7"></div><div className="cluster c8"></div><div className="cluster c9"></div>
          <div className="cluster c10"></div><div className="cluster c11"></div><div className="cluster c12"></div>
          <div className="cluster c13"></div><div className="cluster c14"></div>
        </div>
      </div>

      {showModal && <AuthForm isLogin={isLogin} onClose={handleCloseModal} onToggle={handleToggleMode} />}
    </>
  );
};


