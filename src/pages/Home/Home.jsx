import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import CategoryCards from '../../components/CategoryCards'
import ProductCatalog from '../../components/ProductCatalog'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { testimonials } from '../../data/siteData'

export default function Home() {
  const { scrollY } = useScroll()
  const parallaxY = useTransform(scrollY, [0, 800], [0, -70])

  return (
    <>
      <SEO title="Home" description="Premium handmade resin art, portraits, jewellery, frames, paintings, and personalized gifts by Yukti Artful." />
      <section className="hero section" id="home">
        <div className="container hero-grid">
          <motion.div initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="eyebrow"><Star size={16} /> Art That Speaks the Language of Feelings</span>
            <h1>Handcrafted Art Made <span>With Love</span></h1>
            <p>Personalized resin art, portraits, paintings, jewellery, and handmade gifts crafted specially for you.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/gallery">Explore Gallery <ArrowRight size={18} /></Link>
              <Link className="btn btn-secondary" to="/custom-orders">Custom Order</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>10+</strong><small>Art categories</small></div>
              <div className="stat"><strong>100%</strong><small>Handmade pieces</small></div>
              <div className="stat"><strong>India</strong><small>Delivery available</small></div>
            </div>
          </motion.div>
          <motion.div className="collage" style={{ y: parallaxY }}>
            {['Resin jewellery', 'Mandala art', 'Portrait artwork', 'Personalized frames', 'Handmade gifts'].map((title, index) => (
              <motion.div key={title} className={`art-card ${['one', 'two', 'three', 'four', 'five'][index]}`} data-title={title} animate={{ y: [0, index % 2 ? -16 : 14, 0] }} transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }} />
            ))}
            <motion.div className="float-badge" animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
              <Sparkles size={18} /> Custom made for every story
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Featured Categories" title="A few favorite handmade formats." copy="Start with the most-loved gifting and decor categories, then explore the full services page." />
          <CategoryCards limit={4} />
          <div className="hero-actions"><Link className="btn btn-primary" to="/services">View More Services</Link></div>
        </div>
      </section>

      <section className="section products-section">
        <div className="container">
          <SectionHeader eyebrow="Featured Artworks" title="Shop handmade products with visible prices." copy="Browse a curated preview of product-ready artwork and gifting pieces." />
          <ProductCatalog />
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-visual" />
          <div>
            <SectionHeader eyebrow="About Preview" title="Art that preserves meaningful memories." copy="Every creation is handmade with passion, creativity, and attention to detail." />
            <div className="hero-actions"><Link className="btn btn-primary" to="/about">View More</Link></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader eyebrow="Testimonials Preview" title="Loved by thoughtful gift givers." />
          <div className="trust-grid">
            {testimonials.slice(0, 3).map(([quote, name]) => (
              <article className="testimonial-card" key={name}>
                <div className="stars">★★★★★</div>
                <h3>"{quote}"</h3>
                <p>{name}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions"><Link className="btn btn-primary" to="/testimonials">View More Reviews</Link></div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container">
          <SectionHeader eyebrow="Custom Orders" title="Ready to turn a memory into handmade art?" copy="Share your idea, timeline, and references. Yukti Artful will guide the customization process." />
          <div className="hero-actions"><Link className="btn btn-primary" to="/custom-orders">Start Custom Order</Link></div>
        </div>
      </section>
    </>
  )
}
