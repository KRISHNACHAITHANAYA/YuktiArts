import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { fadeUp } from './animations'

export default function SectionHeader({ eyebrow, title, copy }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      <span className="eyebrow">
        <Sparkles size={16} aria-hidden="true" />
        {eyebrow}
      </span>
      <h1 className="section-title">{title}</h1>
      {copy && <p className="section-copy">{copy}</p>}
    </motion.div>
  )
}
