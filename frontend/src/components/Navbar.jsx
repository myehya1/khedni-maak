import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    setMenuOpen(false);
    navigate('/login');
  };

  const close = () => setMenuOpen(false);

  const links = (
    <>
      <Link to="/" onClick={close}>
        Home
      </Link>
      <Link to="/search" onClick={close}>
        Search Rides
      </Link>
      {token && (
        <>
          <Link to="/create-ride" onClick={close}>
            Create Ride
          </Link>
          <Link to="/profile" onClick={close}>
            Profile
          </Link>
          <button className="nav-logout-btn" onClick={logout}>
            Logout
          </button>
        </>
      )}
      {!token && (
        <>
          <Link to="/login" className="nav-btn-login" onClick={close}>
            Login
          </Link>
          <Link to="/register" className="nav-btn-register" onClick={close}>
            Register
          </Link>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">🚗 Khedni Maak</Link>
        </div>

        {/* Desktop */}
        <div className="nav-links">{links}</div>

        {/* Mobile hamburger */}
        <button
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile overlay */}
      <div className={`nav-overlay${menuOpen ? ' open' : ''}`}>{links}</div>
    </>
  );
}

export default Navbar;
