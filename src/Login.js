import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // State variables to store email and password
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost/react-template/backend/login.php');
      if (response.data) {
        navigate('/dashboard');
      } else {
        console.error('Error fetching data: Response is not an array');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', boxShadow: "0 0 5px", margin: "100px 300px", padding: "50px 10px" }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ marginRight: '10px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <button  type="submit" style={{ padding: '8px 15px', borderRadius: '5px', background: '#007bff', color: '#fff', border: 'none' , width: "50%", textAlign: "center"}}>Login</button>
      </form>
    </div>
  );
};

export default Login;
