export function Eyebrow({ children }) {
  return <div className="eyebrow"><span />{children}</div>
}

export default function PageIntro({ label, title, subtitle }) {
  return <section className="page-intro"><div className="section-wrap"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p>{subtitle}</p></div></section>
}