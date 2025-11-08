function HomePage() {
  return (
    <section id="home" className="home-section">
      <div className="home-content-container">
        {/* Left Section - Logo with Mandala */}
        <div className="home-left-section">
          <div className="home-logo-wrapper">
            <div className="home-mandala">
              <img src="/images/mandala-home.png" alt="" className="home-mandala-image" />
            </div>
            <div className="home-logo">
              <img src="/images/home-logo.png" alt="Films Logo" className="home-logo-image" />
            </div>
          </div>
        </div>

        {/* Right Section - Text Content */}
        <div className="home-right-section">
          <h1 className="home-title">Varnan is where stories find their voice and form</h1>
          <p className="home-subtitle">Films . Brands . Art</p>
          <div className="home-description">
            <p>
              Since 2009, V've been telling stories - stories of people,
              their journeys, and the places that shape them.
              Some begin in polished boardrooms, others in humble
              village squares. But every story starts the same way - by
              listening with intention.
              V believes it takes trust, patience,
              and an eye for the unseen to capture what truly matters.
              V doesn't just tell stories - V honors them.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePage

