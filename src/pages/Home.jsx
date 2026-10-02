import { Link } from 'react-router-dom'
import { Eyebrow } from '../components/PageIntro.jsx'

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-pattern" aria-hidden="true" />
        <div className="hero-inner site-container">
          <div className="hero-copy">
            <Eyebrow>A calmer way to connect</Eyebrow>
            <h1>Let the words<br />find their way <em>in.</em></h1>
            <p>Read, understand, and live the Quran — one thoughtful step at a time.</p>
            <div className="hero-actions"><Link className="button button-light" to="/explore">Explore the Quran <span>↗</span></Link><Link className="text-link text-link-light" to="/learn">Find your learning path <span>→</span></Link></div>
          </div>
          <div className="hero-art" aria-label="Arabic calligraphy reading Al-Quran Al-Kareem">
            <span className="art-ring ring-one" /><span className="art-ring ring-two" />
            <div className="calligraphy">اقْرَأْ</div><div className="art-caption">THE FIRST WORD<br />WAS A BEGINNING</div>
            <span className="art-star">✳</span>
          </div>
          <div className="hero-side-note">A SPACE TO READ · REFLECT · RETURN</div>
        </div>
      </section>
      <section className="home-intro section-wrap">
        <div className="intro-heading"><Eyebrow>Begin where you are</Eyebrow><h2>There’s no one<br />right way <em>to begin.</em></h2></div>
        <div className="intro-copy"><p className="lead">Some days, it’s a single verse. Some days, a question you’ve carried for years.</p><p>Wherever you are on your journey, there’s room here to read at your own pace, learn with care, and find meaning that stays with you.</p><Link to="/about" className="text-link">A little about Noor <span>→</span></Link></div>
      </section>
      <section className="path-section"><div className="section-wrap"><div className="section-heading"><div><Eyebrow>Your next small step</Eyebrow><h2>Find your way in.</h2></div><Link to="/services" className="text-link">See everything we offer <span>→</span></Link></div>
        <div className="path-grid">
          <Link to="/explore" className="path-card path-green"><span className="path-number">01 / READ</span><span className="path-icon">۞</span><h3>Open the Quran</h3><p>Read a translation, listen along, or simply sit with a verse.</p><span className="path-arrow">↗</span></Link>
          <Link to="/learn" className="path-card path-peach"><span className="path-number">02 / LEARN</span><span className="path-icon">ع</span><h3>Learn at your pace</h3><p>Build a steady practice with a teacher who meets you where you are.</p><span className="path-arrow">↗</span></Link>
          <Link to="/live-class" className="path-card path-blue"><span className="path-number">03 / CONNECT</span><span className="path-icon">◌</span><h3>Meet in community</h3><p>Make space for reflection and good questions, together.</p><span className="path-arrow">↗</span></Link>
        </div>
      </div></section>
      <section className="verse-band"><div className="verse-ornament">۞</div><Eyebrow>A moment to pause</Eyebrow><p className="verse-arabic" lang="ar" dir="rtl">فَإِنَّ مَعَ الْعُسْرِ يُسْرًا</p><blockquote>“For indeed, with hardship comes ease.”</blockquote><span className="verse-source">SURAH ASH-SHARH · 94:5</span></section>
      <section className="home-cta site-container"><div><Eyebrow>Take the next step</Eyebrow><h2>There’s a place for you here.</h2></div><Link className="button button-dark" to="/contact">Let’s talk <span>↗</span></Link></section>
    </>
  )
}