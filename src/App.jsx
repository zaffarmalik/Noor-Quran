import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ExploreQuran from './pages/ExploreQuran.jsx'
import Learn from './pages/Learn.jsx'
import LiveClass from './pages/LiveClass.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import ContactUs from './pages/ContactUs.jsx'
import './App.css'

function NotFound() {
  return <main className="section-wrap not-found"><div className="eyebrow"><span />Nothing on this page</div><h1>Let’s find our way back.</h1><Link to="/" className="button button-dark">Back to home <span>→</span></Link></main>
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreQuran />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/live-class" element={<LiveClass />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}