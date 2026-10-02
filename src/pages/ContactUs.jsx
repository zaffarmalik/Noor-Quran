import { useState } from 'react'
import PageIntro, { Eyebrow } from '../components/PageIntro.jsx'

export default function ContactUs() {
  const [submitted, setSubmitted] = useState(false)
  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }
  return <><PageIntro label="Start a conversation" title={<>Tell us where<br /><em>you’d like to begin.</em></>} subtitle="A question, a lesson, a little more information — we’d love to hear from you." /><main className="section-wrap content-section contact-layout"><div className="contact-aside"><Eyebrow>We’re listening</Eyebrow><h2>It starts with a hello.</h2><p>Tell us a little about what you’re looking for. Someone from our team will be in touch soon.</p><div className="contact-detail"><span>EMAIL</span><a href="mailto:hello@noorquran.org">hello@noorquran.org</a></div><div className="contact-detail"><span>RESPONSE TIME</span><p>Usually within two working days</p></div><div className="contact-ornament" aria-hidden="true">۞</div></div><form className="contact-form" onSubmit={handleSubmit}><label>Your name<input name="name" autoComplete="name" required placeholder="What should we call you?" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>What are you interested in?<select name="interest" defaultValue=""><option value="" disabled>Choose one (or just say hello)</option><option>One-to-one lessons</option><option>Learning Arabic</option><option>Live classes</option><option>Something else</option></select></label><label>A little more (optional)<textarea name="message" rows="4" placeholder="Anything you’d like us to know?" /></label><button className="button button-dark" type="submit">Send your note <span>↗</span></button>{submitted && <p className="form-success" role="status">Thank you for reaching out. Your note is ready for our team.</p>}</form></main></>
}