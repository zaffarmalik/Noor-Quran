import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container site-container">
        <div className="footer-main">
          <Link to="/" className="brand footer-brand"><span className="brand-mark" aria-hidden="true">ن</span><span>noor<span className="brand-period">.</span><small>QURAN & COMMUNITY</small></span></Link>
          <p>A little closer to the words<br />that bring us home.</p>
          <div className="footer-links"><Link to="/explore">Explore</Link><Link to="/learn">Learning</Link><Link to="/about">Our story</Link><Link to="/contact">Contact</Link></div>
        </div>
        <div className="footer-bottom"><span>Made with care, for the sake of understanding.</span><span>© 2026 Noor Quran</span></div>
      </div>
    </footer>
  )
}