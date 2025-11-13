import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">🎬 Movie Review System</Link>
        <ul className="navbar-menu">
          <li><Link to="/" className="navbar-link">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li className="navbar-user">Welcome, {user?.name}</li>
              <li>
                <button onClick={logout} className="navbar-link navbar-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/signin" className="navbar-link">Sign In</Link></li>
              <li><Link to="/signup" className="navbar-link">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;