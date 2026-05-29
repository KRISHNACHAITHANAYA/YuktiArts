import { Image, MessageSquare, PackageCheck, Star } from 'lucide-react'
import SEO from '../../components/SEO'

const cards = [
  ['Manage Gallery', 'Upload, delete, and edit gallery images.', Image],
  ['Manage Orders', 'Review custom order requests and statuses.', PackageCheck],
  ['Manage Testimonials', 'Add, edit, or remove customer reviews.', Star],
  ['Contact Inquiries', 'View customer contact and order inquiries.', MessageSquare],
]

export default function Dashboard() {
  return (
    <>
      <SEO title="Admin Dashboard" description="Protected admin dashboard for Yukti Artful." />
      <section className="admin-section"><h1>Admin Dashboard</h1><p>Only authenticated admin users can access this protected area.</p><div className="trust-grid">{cards.map(([title, copy, Icon]) => <article className="trust-card" key={title}><div className="trust-icon"><Icon size={24} /></div><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    </>
  )
}
