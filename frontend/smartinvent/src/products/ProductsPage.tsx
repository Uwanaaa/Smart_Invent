import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductsPage.css';
import '../index.css';
import { logout } from '../../redux/authSlice';
import { useDispatch } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { IoAccessibility, IoAddCircleOutline, IoLogOut, IoNotifications } from "react-icons/io5";
import { TbPresentationAnalytics, TbReportSearch } from "react-icons/tb";
import { MdOutlineInventory2 } from "react-icons/md";
import { FiPackage } from "react-icons/fi";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

const ProductsPage = () => {
  const [listProducts, setListProducts] = useState<Product[]>([]);
  const total = useRef(0);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('products/');
      setListProducts(response.data.product);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = listProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  

  return (
    <>
      <nav className='nav-div'>
        <IoAccessibility onClick={() => navigate('/update')} />
        <IoLogOut onClick={() => dispatch(logout())} />
        <button onClick={() => navigate('/add-product')}>Create <IoAddCircleOutline /></button>
      </nav>

      <div className="homepage-container">
        <div className="sidebar-div">
          <h3>SmartInvent</h3>
          <button><MdOutlineInventory2 size={20} /> Inventory</button>
          <button><FiPackage size={20} /> Orders</button>
          <button><TbReportSearch size={20} /> Reports</button>
          <button><TbPresentationAnalytics size={20} /> Analytics</button>
          <button><IoNotifications size={20} /> Updates</button>
        </div>

        <div className="products-container">
         
        {error && <p className="error-message">{error}</p>}

          <h2>Products</h2>

          <input
            style={{marginTop: '2rem'}}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />

          
          {filteredProducts.length > 0 ? (
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price (N)</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      <button onClick={() => navigate(`/update-product/${product.id}/`)}>Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
