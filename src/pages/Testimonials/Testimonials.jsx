import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { testimonials } from '../../data/siteData'

export default function Testimonials() {
  return (
    <>
      <SEO title="Testimonials" description="Read customer reviews for Yukti Artful handmade gifts, portraits, resin jewellery, and personalized art." />
      <section className="section page-hero"><div className="container"><SectionHeader eyebrow="Testimonials" title="Words from people who gifted with feeling." /><div className="trust-grid">{testimonials.map(([quote, name]) => <article className="testimonial-card" key={name}><div className="stars">★★★★★</div><h3>"{quote}"</h3><p>{name}</p></article>)}</div></div></section>
    </>
  )
}
