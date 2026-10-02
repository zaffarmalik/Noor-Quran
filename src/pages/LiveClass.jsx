import { Link } from 'react-router-dom'
import PageIntro, { Eyebrow } from '../components/PageIntro.jsx'

const values = [
  ['01', 'Small by design', 'Space to ask questions, share reflections, or just listen.'],
  ['02', 'Led with care', 'Learn with teachers who make room for curiosity and context.'],
  ['03', 'Come as you are', 'No preparation or prior knowledge needed. Just bring yourself.'],
]

export default function LiveClass() {
  return <><PageIntro label="Learn together" title={<>Good questions<br /><em>belong here.</em></>} subtitle="Small live classes where learning feels personal, welcoming, and shared." /><main className="section-wrap content-section"><div className="class-feature"><div className="class-date"><span>OCT</span><strong>18</strong><span>SUNDAY</span></div><div className="class-details"><span className="feature-label">UPCOMING COMMUNITY CLASS</span><h2>Finding stillness in Surah Ad-Duha</h2><p>A gentle, guided reflection on hope, reassurance, and the quiet promises woven through the surah.</p><div className="class-meta"><span>10:00 AM ET</span><span>45 MINUTES</span><span>ONLINE · FREE</span></div></div><Link className="button button-dark" to="/contact">Save your place <span>↗</span></Link></div><div className="list-heading"><div><Eyebrow>In the room</Eyebrow><h2>What class feels like</h2></div></div><div className="class-values">{values.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></main></>
}