import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-icon">📚</span>
            <span className="footer-name">MyReadShelf</span>
          </div>
          <p className="footer-text">
            Your personal digital bookshelf - Track and share your reading journey
          </p>
          <div className="footer-divider"></div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} MyReadShelf. Made with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
