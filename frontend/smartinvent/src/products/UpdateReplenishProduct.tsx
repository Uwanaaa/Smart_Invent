import React, { useState,useEffect } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate,useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import './Update.css';

const UpdateReplenishProduct = () => {
  const [providerName, setProviderName] = useState('');
  const [defaultValue, setDefaultValue] = useState('');
  const [providerEmail, setProviderEmail] = useState('');
  const [address, setAddress] = useState('');
  const [providerNumber, setProviderNumber] = useState('');
  const [message, setMessage] = useState('');
  const { providerId } = useParams();
  const navigate = useNavigate();

  const getProvider = () => {
    axiosInstance.get(`/products/provider/${providerId}/`)
    .then((response) => {
        setProviderName(response.data.providerName);
        setProviderEmail(response.data.providerEmail);
        setDefaultValue(response.data.defaultValue);
        setAddress(response.data.address);
        setProviderNumber(response.data.providerNumber);
    })
    .catch((error) => {
            console.error(error);
    });
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!providerName || !defaultValue || !providerEmail) {
      setMessage('Please fill in all fields.');
      return;
    }
    axiosInstance.post(`/products/update-provider/${providerId}/`,{
        providerName,
        defaultValue,
        providerEmail,
        address,
        providerNumber
    }).then(response => {
        console.log(`response: ${response.data.message}`);
        setMessage(response.data.message);
    })
  };



  useEffect(() => {
    getProvider();
  },[])

  return (
   <div className='form-page'>
   <nav className='nav-div'>
    <button onClick={() => {navigate('/products')}}> <IoArrowBack /> Back</button>
   </nav>
    <div className="update-container">
      <h2>Product Restock Information</h2>
      <form className='update-form' onSubmit={handleSubmit}>
        <div>
          <label>Name of Provider:</label>
          <input
            type="text"
            value={providerName}
            onChange={(e) => setProviderName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Default Restock Value:</label>
          <input
            type="number"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Provider Email:</label>
          <input
            type="text"
            value={providerEmail}
            onChange={(e) => setProviderEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Provider Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Provider Phone Number:</label>
          <input
            type="text"
            value={providerNumber}
            onChange={(e) => setProviderNumber(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Add Provider</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default UpdateReplenishProduct;
