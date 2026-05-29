import { ShieldCheck } from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'

export default function About() {
  return (
    <>
      <SEO title="About" description="Learn about Yukti Artful, a premium handmade art studio for resin jewellery, portraits, paintings, frames, and custom gifts." />
      <section className="section page-hero"><div className="container"><SectionHeader eyebrow="About Yukti Artful" title="A handmade studio for heartfelt keepsakes." copy="At Yukti Artful, every creation is handmade with passion, creativity, and attention to detail. From personalized gifts and resin jewellery to portraits and traditional artwork, each piece tells a unique story and preserves meaningful memories." /></div></section>
      <section className="section"><div className="container about-grid"><div className="about-visual" /><div className="feature-list">{['Handmade with Love', 'Personalized Creations', 'Premium Quality Materials', 'Unique Artistic Designs'].map((item) => <div className="feature-pill" key={item}><ShieldCheck size={18} color="var(--success)" /> {item}</div>)}</div></div></section>
    </>
  )
}
