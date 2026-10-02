import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'

const services = [
  ['01', 'One-to-one lessons', 'Personal Quran, Arabic, and tajweed sessions shaped around your goals and schedule.', 'Personal · Flexible'],
  ['02', 'Small group learning', 'Learn alongside a close-knit group, guided by a teacher who makes space for everyone.', 'Shared · Supportive'],
  ['03', 'Community classes', 'Open sessions for reflection, learning, and meaningful conversation.', 'Open · Welcoming'],
  ['04', 'Learning resources', 'Carefully chosen tools to help you keep learning between sessions.', 'Self-paced · Practical'],
]

export default function Services() {
  return <><PageIntro label="Ways to learn with Noor" title={<>A little guidance<br /><em>goes a long way.</em></>} subtitle="Thoughtful support for every kind of Quran journey, wherever yours begins." /><main className="section-wrap content-section"><div className="service-list">{services.map(([number, title, description, meta]) => <article className="service-row" key={number}><span className="service-number">{number}</span><div><h2>{title}</h2><p>{description}</p></div><span className="service-meta">{meta}</span><Link to="/contact" aria-label={`Ask about ${title}`} className="service-arrow">↗</Link></article>)}</div><div className="service-bottom"><span>Not sure where to begin?</span><Link to="/contact" className="text-link">We can help you figure it out <span>→</span></Link></div></main></>
}