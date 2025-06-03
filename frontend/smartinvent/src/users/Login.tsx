import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import axiosInstance from '../utils/axiosInstance';
import inventory2 from '../assets/inventory2.jpeg'
import './SignUp.css';

const Login = () => {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage('Please fill in all fields.');
      return;
    }

    axiosInstance.post('/users/login/', { username, password }, {
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        console.log(`response: ${response.headers}`);
        dispatch(loginUser());
        navigate('/products');
    }).catch(error => {
        console.error('Login error:', error.response ? error.response.data : error.message);
        setMessage('Login failed. Please check your credentials.');
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
      <img src={inventory2} alt="inventory2" />
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="login-link"><a href="/signup">No account?</a></p>
        {message && <p className="login-message">{message}</p>}
      </div>
    </div>
   </>
  );
};

export default Login;
