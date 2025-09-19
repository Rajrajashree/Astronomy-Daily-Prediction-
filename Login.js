import React, { useState } from 'react';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
  
        // Store user in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(data));
  
        alert('Login successful!');
        // navigate('/dashboard'); // uncomment if using React Router
      } else {
        const err = await response.text();
        console.error('Login failed:', err);
        alert('Login failed: ' + err);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: ' + error.message);
    }
  };
  

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   console.log('Login data:', formData);
  //   // You can call your API here
  // };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    backgroundColor: '#1a235a',
    padding: '2rem',
    borderRadius: '10px',
    color: '#e0e6f9',
    fontFamily: 'Lora, serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #a0a0ff',
    backgroundColor: '#0c1445',
    color: '#e0e6f9',
    fontSize: '1rem',
  },
  button: {
    padding: '0.8rem',
    backgroundColor: '#a0a0ff',
    color: '#0c1445',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
};
