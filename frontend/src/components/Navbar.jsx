import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setMenuOpen(false);
    navigate('/login');
  };

  const close = () => setMenuOpen(false);

  const navCls = ({ isActive }) =>
    isActive ? 'nav-link nav-link-active' : 'nav-link';

  const links = (
    <>
      <NavLink to="/" end className={navCls} onClick={close}>
        Home
      </NavLink>
      <NavLink to="/search" className={navCls} onClick={close}>
        Search Rides
      </NavLink>
      {token && (
        <>
          <NavLink to="/create-ride" className={navCls} onClick={close}>
            Offer a Ride
          </NavLink>
          <NavLink to="/profile" className={navCls} onClick={close}>
            Profile
          </NavLink>
          <button className="nav-logout-btn" onClick={logout}>
            Logout
          </button>
        </>
      )}
      {!token && (
        <>
          <NavLink to="/login" className="nav-btn-login" onClick={close}>
            Login
          </NavLink>
          <NavLink to="/register" className="nav-btn-register" onClick={close}>
            Register
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <>
      <nav className="navbar">
        <div className="nav-logo">
          <NavLink to="/">🚗 Khedni Maak</NavLink>
        </div>
        <div className="nav-links">{links}</div>
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
      <div className={`nav-overlay${menuOpen ? ' open' : ''}`}>{links}</div>
    </>
  );
}

export default Navbar;
