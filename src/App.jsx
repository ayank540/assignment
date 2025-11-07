import { useState } from 'react'
import './App.css'
// Import images - update paths based on your actual image files
import hamburgerOpen from './assets/images/hamburger-open.png'
import hamburgerClose from './assets/images/hamburger-close.png'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitSuccess(false)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('https://vernanbackend.ezlab.in/api/contact-us/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
        })
      })

      if (response.ok) {
        setSubmitSuccess(true)
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        })
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSubmitSuccess(false)
        }, 5000)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit form. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="app">
      {/* Header */}
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
            <a href="#varnan">Varnan</a>
            <button className="lets-talk-btn" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              <span>Let's Talk</span>
              <svg className="envelope-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3L8 8L14 3M2 13H14V3H2V13Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
              alt={menuOpen ? "Close menu" : "Open menu"}
              className="hamburger-icon"
            />
          </button>
          
          {/* Mobile Navigation */}
          {menuOpen && (
            <nav className="mobile-nav">
              <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
              <a href="#stories" onClick={() => setMenuOpen(false)}>Their Stories</a>
              <a href="#our-story" onClick={() => setMenuOpen(false)}>Our Story</a>
              <a href="#varnan" onClick={() => setMenuOpen(false)}>Varnan</a>
              <button 
                className="lets-talk-btn mobile"
                onClick={() => {
                  setMenuOpen(false)
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Let's Talk</span>
                <svg className="envelope-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3L8 8L14 3M2 13H14V3H2V13Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-container">
          {/* Left Section - Text Content */}
          <div className="left-section">
            <div className="text-content">
              <p>
                Whether you have an idea, a question, or simply want
                to explore how V can work together, V're just a
                message away.
              </p>
              <p>Let's catch up over coffee.</p>
              <p className="highlight-text">
                Great stories always begin with a good conversation
              </p>
            </div>
          </div>

          {/* Right Section - Contact Form */}
          <div className="right-section" id="contact">
            <div className="form-container">
              <h1 className="form-title">Join the Story</h1>
              <p className="form-subtitle">
                Ready to bring your vision to life? Let's talk.
              </p>

              {submitSuccess && (
                <div className="success-message">
                  <span className="success-icon">✓</span>
                  <span>Form Submitted</span>
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="Your name*"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    placeholder="Your email*"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="Phone"
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    placeholder="Your message*"
                    rows="5"
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}

                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>

              {/* Contact Information */}
              <div className="contact-info">
                <a href="mailto:vernita@varnanfilms.co.in" className="contact-email">
                  vernita@varnanfilms.co.in
                </a>
                <span className="contact-divider"></span>
                <a href="tel:+919873684567" className="contact-phone">
                  +91 98736 84567
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Mandala Patterns */}
        <div className="mandala-pattern mandala-top-right">
          <img src="/public/images/mandala-top-right.png" alt="" className="mandala-image" />
        </div>
        <div className="mandala-pattern mandala-bottom-left">
          <img src="/public/images/mandala-bottom-left.png" alt="" className="mandala-image" />
        </div>
      </main>
    </div>
  )
}

export default App
