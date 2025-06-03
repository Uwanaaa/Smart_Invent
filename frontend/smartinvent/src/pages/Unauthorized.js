import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--danger)' }}>
        Access Denied
      </h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem', color: 'var(--text-light)' }}>
        You don't have permission to access this page.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
        <Link to="/dashboard" className="btn btn-outline">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized; 