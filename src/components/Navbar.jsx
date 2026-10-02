import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  ['Home', '/'], ['Explore Quran', '/explore'], ['Learn', '/learn'],
  ['Live Class', '/live-class'], ['Services', '/services'], ['About', '/about'],
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="header-inner site-container">
        <Link to="/" className="brand" aria-label="Noor home" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">ن</span>
          <span>noor<span className="brand-period">.</span><small>QURAN & COMMUNITY</small></span>
        </Link>
        <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span />
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navItems.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setMenuOpen(false)}>{label}</NavLink>)}
          <NavLink className="nav-contact" to="/contact" onClick={() => setMenuOpen(false)}>Get in touch <span aria-hidden="true">↗</span></NavLink>
        </nav>
      </div>
    </header>
  )
}