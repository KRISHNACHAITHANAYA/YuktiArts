import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import SectionHeader from '../../components/SectionHeader'
import SEO from '../../components/SEO'
import { galleryFilters, galleryItems } from '../../data/siteData'

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightboxItem, setLightboxItem] = useState(null)
  const filteredGallery = activeFilter === 'All' ? galleryItems : galleryItems.filter((item) => item.category === activeFilter)

  return (
    <>
      <SEO title="Gallery" description="View Yukti Artful's handmade resin art, portraits, mandala art, traditional art, acrylic paintings, and custom gifts." />
      <section className="section page-hero"><div className="container"><SectionHeader eyebrow="Gallery" title="A curated showcase of handmade possibilities." copy="Filter by craft style and open artwork samples in a lightbox." /><div className="filter-row">{galleryFilters.map((filter) => <button className={`filter-btn ${activeFilter === filter ? 'active' : ''}`} type="button" key={filter} onClick={() => setActiveFilter(filter)}>{filter}</button>)}</div><motion.div className="masonry" layout><AnimatePresence>{filteredGallery.map((item) => <motion.button layout initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} className="gallery-item" key={item.id} type="button" data-title={item.title} style={{ '--height': item.height, '--art': item.art }} onClick={() => setLightboxItem(item)} />)}</AnimatePresence></motion.div></div></section>
      <AnimatePresence>{lightboxItem && <motion.div className="lightbox" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightboxItem(null)}><motion.div className="lightbox-card" initial={{ scale: 0.94, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.94, y: 20 }} onClick={(event) => event.stopPropagation()}><div className="lightbox-art" style={{ '--art': lightboxItem.art }} /><div className="lightbox-caption"><div><strong>{lightboxItem.title}</strong><p className="section-copy">{lightboxItem.category}</p></div><button className="close-btn" type="button" onClick={() => setLightboxItem(null)}><X size={22} /></button></div></motion.div></motion.div>}</AnimatePresence>
    </>
  )
}
