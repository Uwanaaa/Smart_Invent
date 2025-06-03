import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { LuEyeClosed, LuEye } from "react-icons/lu";
import inventory1 from '../assets/inventory1.png'
import '../index.css'; 

const SignUp = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('User');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    axiosInstance.post('/users/create/', { username, email, role, password })
      .then(response => {
        console.log(`response: ${response.data.message}`);
        setMessage(response.data.message);
        navigate('/login');
      }).catch((e) => {
        console.log(`error: ${e}`);
      });
  };

  return (
    <>
    <nav>
        <div className="landing-nav">
          <div className="logo" onClick={() => {navigate('/')}}>SmartInvent</div>
        </div>
      </nav>


  <div className="main-container">
    <img src={inventory1} alt="inventory1"/>
   <div className="signup-container"> 
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}> 
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setName(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <div className="dropdown-container">
        <label htmlFor="roles" className="dropdown-label">Role:</label>
        <select name="roles" id="roles" className="dropdown-select" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>


        <label>Password:</label>
        <div className="password-box">
          <input 
            type={showPassword ? "text" : "password"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button 
            type="button" 
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <LuEye /> : <LuEyeClosed />}
          </button>
        </div>

        <button type="submit" className="login-button">Sign Up</button>
      </form>
      <p className="login-link"><a href="/login">Already have an account?</a></p>
      {message && <p className="login-message">{message}</p>}
    </div>
   </div>
    </>
  );
};

export default SignUp;
