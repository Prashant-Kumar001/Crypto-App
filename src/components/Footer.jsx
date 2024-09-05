import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px', textAlign: 'center' }}>
      <p style={{ marginBottom: '10px' }}>Crypto App &copy; 2022</p>
      <p style={{ marginBottom: '10px' }}>Made with React and Vite</p>
      <p style={{ marginBottom: '10px' }}>
        <a 
          href="https://github.com/RDXPR/crypto-app-vite" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: '#1e90ff', textDecoration: 'none' }}
        >
          GitHub Repository
        </a>
      </p>
      <p style={{ marginBottom: '10px' }}>
        <a 
          href="https://www.coingecko.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: '#1e90ff', textDecoration: 'none' }}
        >
          Powered by CoinGecko API
        </a>
      </p>
    </footer>
  );
};

export default Footer;
