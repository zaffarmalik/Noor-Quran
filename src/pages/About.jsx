import { Link } from 'react-router-dom'
import PageIntro, { Eyebrow } from '../components/PageIntro.jsx'

const values = [
  ['01', 'With gentleness', 'Learning is a journey, never a race.'],
  ['02', 'With good questions', 'Curiosity is part of understanding.'],
  ['03', 'With each other', 'We find more when we learn together.'],
]

export default function About() {
  return <><PageIntro label="A note about Noor" title={<>Learning should feel<br /><em>like coming home.</em></>} subtitle="Noor is a welcoming space to build a real, lasting relationship with the Quran." /><main className="section-wrap content-section"><div className="about-layout"><div className="about-calligraphy" lang="ar" dir="rtl"><span>نور</span><small>LIGHT · GUIDANCE · CLARITY</small></div><div className="about-copy"><Eyebrow>Why we’re here</Eyebrow><h2>More than getting through the page.</h2><p className="lead">We believe the Quran deserves our attention, our questions, and our time.</p><p>That’s why Noor was made to feel a little different: unhurried, human, and grounded in care. A place where a first lesson is just as welcome as a lifelong practice, and where learning is measured not by how fast we finish, but by how deeply we connect.</p><p>Come as you are. Bring your questions. There’s always another way to begin.</p><Link className="text-link" to="/contact">Meet us where you are <span>→</span></Link></div></div><div className="values-strip">{values.map(([number, title, body]) => <div key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></div>)}</div></main></>
}