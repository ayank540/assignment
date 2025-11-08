import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import hamburgerOpen from '../assets/images/hamburger-open.png'
import hamburgerClose from '../assets/images/hamburger-close.png'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleNavClick = (path) => {
    navigate(path)
    setMenuOpen(false)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="/images/logo.png" alt="Films Logo" className="logo-image" />
        </div>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <a href="#services">Services</a>
          <a href="#stories">Their Stories</a>
          <a href="#our-story">Our Story</a>

          {/* Varnan (Home) link */}
          <Link to="/" className="nav-link">
            Varnan
          </Link>

          {/* Let's Talk button → Contact page */}
          <button
            className="lets-talk-btn"
            onClick={() => handleNavClick('/contact')}
          >
            <span>Let's Talk</span>
            <svg
              className="envelope-icon"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 3L8 8L14 3M2 13H14V3H2V13Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </nav>

        {/* Mobile Hamburger Menu */}
        <button
          className="hamburger-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <img
            src={menuOpen ? hamburgerOpen : hamburgerClose}
            alt={menuOpen ? 'Close menu' : 'Open menu'}
            className="hamburger-icon"
          />
        </button>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="mobile-nav">
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#stories" onClick={() => setMenuOpen(false)}>Their Stories</a>
            <a href="#our-story" onClick={() => setMenuOpen(false)}>Our Story</a>

            {/* Varnan link → home */}
            <Link
              to="/"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Varnan
            </Link>

            {/* Let's Talk button → contact */}
            <button
              className="lets-talk-btn mobile"
              onClick={() => handleNavClick('/contact')}
            >
              <span>Let's Talk</span>
              <svg
                className="envelope-icon"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 3L8 8L14 3M2 13H14V3H2V13Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
