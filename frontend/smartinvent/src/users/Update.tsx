import React, { FormEvent, useEffect, useState, useRef } from 'react'
import { IoArrowBack } from "react-icons/io5"
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'
import { LuEyeClosed, LuEye } from "react-icons/lu";
import '../products/Update.css'

const Update = () => {
  const [username, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [alert_value, setAlertValue] = useState('')
  const [message, setMessage] = useState('')
  const [data, setData] = useState({})
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()

  const getUser = async() => {
    await axiosInstance.get(`users/get-user/`)
    .then((response) => {
        setName(response.data.username),
        setEmail(response.data.email),
        setAlertValue(response.data.alert_value)
    })
    .catch((e) => {
        console.log(`Error: ${e}`)
    })

    
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || !alert_value  ||!email) {
      setMessage('Please fill in all fields.')
      return
    }
    
    if (password !== ''){
       let data = {
            username,
            password,
            email,
            alert_value
        }

        setData(data)
    }else{
      let data = {
            username,
            email,
            alert_value
        }

        setData(data)
    }

    axiosInstance.post(`users/update-user/`,data)
    .then((response) => {
        setMessage(response.data.message)
    }).catch(error => {
        if (error.response){
          setMessage(error.response.data.detail)
        } else {
          setMessage('Updating profile failed. Please try again.')
        }
    })
  }


  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="form-page">

     <nav className="nav-div">
        <button onClick={() => {navigate('/products')}}> <IoArrowBack /> Back</button>
     </nav>
      
      <div className="update-container">
        <h2>Profile</h2>
        <form className='update-form' onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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

          <div>
            <label>Alert Value:</label>
            <input
              type="text"
              value={alert_value}
              onChange={(e) => setAlertValue(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button" >Save</button>
        </form>
        {message && <p>{message}</p>}
      </div>
   </div>
  )
}

export default Update
