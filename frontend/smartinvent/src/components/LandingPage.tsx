import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectIsAuthenticated } from '../../redux/authSlice';
import { motion } from 'framer-motion'


const LandingPage = () => {

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({'behavior': 'smooth'})
  }  
  const isAuthenticated = useSelector(selectIsAuthenticated);


  return (
    <div className="landing-container">
     

      {/* Hero Section */}
      <header className="hero-section">

         {/* Navigation */}
      <nav>
        <div className="landing-nav">
          <div className="logo">SmartInvent</div>
          <div className="nav-links">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="btn btn-primary link">Dashboard</Link>
                <Link to="/profile" className="btn btn-outline link">Profile</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary link">Login</Link>
                <Link to="/signup" className="btn btn-outline link">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
        <div className="hero-content">
          <h1>
            <span>SmartInvent</span>
          </h1>
          <p className="hero-subtitle">
            Streamline your inventory management with real-time tracking, automated alerts, and powerful analytics.
          </p>
          <div className="hero-cta">
            {!isAuthenticated && (
              <>
                <Link to="/signup" className="btn btn-primary btn-large link">Get Started</Link>
                <Link to = '#' onClick={scrollToFeatures} className="btn btn-outline btn-large link">Learn More</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Features Section */}
     <section id="features" className="features-section">
      <motion.div
        initial = {{opacity: 0, x: 60}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 1}}
      >
        <h2>Key Features</h2>
        <div className="features-grid">
          {[
            { title: 'Real-time Tracking', desc: 'Monitor your inventory levels instantly.', icon: '📊' },
            { title: 'Automated Alerts', desc: 'Get low-stock notifications.', icon: '🔔' },
            { title: 'Analytics Dashboard', desc: 'Track inventory trends with insights.', icon: '📈' }
          ].map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
     </section>


      {/* CTA Section */}
     <section className="cta-section">
      <motion.div
        initial = {{opacity: 0, x: 60}}
        whileInView={{opacity: 1, x: 0}}
        transition={{duration: 1}}
      >
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Start your free trial today.</p>
          {!isAuthenticated && <Link to="/signup" className="btn btn-primary btn-large link">Get started</Link>}
        </div>
     </motion.div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-logo">SmartInvent</div>
          <nav className="footer-links">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <Link to="" onClick={scrollToFeatures}>Features</Link>
          </nav>
          <p className="footer-copyright">© {new Date().getFullYear()} Unwana Udofia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
