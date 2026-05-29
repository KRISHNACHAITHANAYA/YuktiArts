import { PackageCheck } from 'lucide-react'
import CategoryCards from '../../components/CategoryCards'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { trustCards } from '../../data/siteData'

export default function Services() {
  return (
    <>
      <SEO title="Services" description="Explore handmade art services including resin jewellery, personalized frames, portraits, traditional art, mandala art, acrylic paintings, and custom gifts." />
      <section className="section page-hero"><div className="container"><SectionHeader eyebrow="Services" title="Personalized artwork for gifting, homes, and memories." copy="Explore handcrafted categories with a premium finish, thoughtful customization, and gift-ready presentation." /><CategoryCards /></div></section>
      <section className="section"><div className="container"><SectionHeader eyebrow="Why Choose Us" title="Refined craft, warm communication, and careful delivery." /><div className="trust-grid">{trustCards.map(([title, copy, Icon]) => <article className="trust-card" key={title}><div className="trust-icon">{Icon ? <Icon size={24} /> : <PackageCheck />}</div><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
    </>
  )
}
