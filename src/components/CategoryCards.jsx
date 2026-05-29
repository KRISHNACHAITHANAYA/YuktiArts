import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { artStyles, categories } from '../data/siteData'
import { fadeUp } from './animations'

export default function CategoryCards({ limit }) {
  return (
    <div className="category-grid">
      {categories.slice(0, limit || categories.length).map((category, index) => (
        <motion.article
          className="category-card"
          key={category}
          style={{ '--art': artStyles[index % artStyles.length] }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: (index % 4) * 0.05 }}
        >
          <div className="category-content">
            <h3>{category}</h3>
            <span className="mini-link">
              View Gallery <ArrowRight size={15} />
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  )
}
