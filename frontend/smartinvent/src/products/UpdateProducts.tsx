import { useEffect, useRef, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { useParams,useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import './Update.css';

const UpdateProduct = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [response, setResponse] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [message, setMessage] = useState('')
  const [providerUpdateBtn, setProviderUpdateBtn] = useState(false)
  const [addProviderBtn, setAddProviderBtn] = useState(true)
  const providerValue = useRef(0)
  let { productId } = useParams()
  const navigate = useNavigate()


  const getProduct = () => {
    if (productId){
        axiosInstance.get(`products/get-product/${productId}/`)
        .then((response) => {
            console.log(`Data: ${response.data.provider_id}`);
            setName(response.data.name)
            setDescription(response.data.description)
            setPrice(response.data.price)
            setStock(response.data.stock)

            if (response.data.provider_id){
              providerValue.current = response.data.provider_id

              setProviderUpdateBtn(true)
              setAddProviderBtn(false)
            }
          }
        )
    }
    
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!name || !description || !price || !stock) {
      setMessage('Please fill in all fields.');
      return;
    }
    axiosInstance.post(`products/update-product/${productId}/`,{
        name,
        description,
        price,
        stock
    }).then(response => {
        console.log(`response: ${response.data.message}`);
        setMessage(response.data.message);
    }).catch((e) => {
      console.log(`Error: ${e}`);
      if (e.response){
        setMessage(e.response.data.detail)
      } else {
        setResponse('An error occurred while trying to delete the product')
      }
    })
  };


  const deleteProduct = () => {
    axiosInstance.delete(`products/delete-product/${productId}/`)
    .then(() =>{
      navigate('/products')
    }
    ).catch((e) => {
      console.log(`Error: ${e}`);
      if (e.response){
        setMessage(e.response.data.detail)
      } else {
        setResponse('An error occurred while trying to delete the product')
      }
    })
  }
  
  const UpdateProvider = () => {
    navigate(`/update-provider-form/${providerValue.current}`)
  }

  useEffect(() => {
    getProduct()
  },[])
  return (
   <div className='form-page'>
    <nav className='nav-div'>
    <button onClick={() => {navigate('/products')}}> <IoArrowBack /> Back</button>
    {providerUpdateBtn && <button onClick={UpdateProvider}> Update Provider <IoAddCircleOutline />  </button>}
    {addProviderBtn && <button onClick={() => {navigate('provider-form')}}> Add Provider <IoAddCircleOutline /> </button>}
    <button onClick={deleteProduct}>Delete</button>
    {response}
    </nav>
    <div className="update-container">
      <h2>Update Product</h2>
      <form className='update-form' onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Update Product</button>
      </form>
      {message && <p>{message}</p>}
    </div>
    </div>
  );
};

export default UpdateProduct;
