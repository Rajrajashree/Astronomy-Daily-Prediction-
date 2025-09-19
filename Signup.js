import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "", // assuming you have password field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const user = await response.json();
        console.log("Signup successful:", user);
        // Optionally store user in sessionStorage
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/dashboard"; // or navigate to dashboard
      } else {
        const errorData = await response.json();
        console.error("Signup failed:", errorData.message);
        alert(errorData.message || "Signup failed.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      alert("Something went wrong.");
    }
  };
  

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email ID"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;






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
