import { Link } from 'react-router-dom'
import PageIntro, { Eyebrow } from '../components/PageIntro.jsx'

const paths = [
  ['01', 'Quranic Arabic', 'Build the foundations to recognize and understand the language of the Quran.', 'Beginner friendly'],
  ['02', 'Tajweed & recitation', 'Learn the art of reciting with accuracy, confidence, and care.', 'All levels'],
  ['03', 'Meaning & reflection', 'Explore the themes of the Quran with context and space to ask.', 'Guided study'],
]

export default function Learn() {
  return <><PageIntro label="Learn with intention" title={<>A practice that<br /><em>grows with you.</em></>} subtitle="Clear guidance, thoughtful teachers, and room to learn without rushing." /><main className="section-wrap content-section"><div className="learning-note"><span className="note-mark">ع</span><div><span className="feature-label">A GOOD PLACE TO START</span><h2>Start with what you’re curious about.</h2><p>Whether you’re learning your first Arabic letters or returning to recitation, we’ll help you find a path that feels right.</p></div></div><div className="list-heading"><div><Eyebrow>Choose your focus</Eyebrow><h2>Learning paths</h2></div></div><div className="learning-grid">{paths.map(([number, title, body, tag]) => <article className="learning-card" key={number}><span>{number} / {tag}</span><h3>{title}</h3><p>{body}</p><Link to="/contact" className="text-link">Ask about this path <span>→</span></Link></article>)}</div></main></>
}