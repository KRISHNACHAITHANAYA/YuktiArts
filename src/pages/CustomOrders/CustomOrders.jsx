import SectionHeader from '../../components/SectionHeader'
import InquiryForm from '../../components/InquiryForm'
import SEO from '../../components/SEO'

const processSteps = ['Share Your Idea', 'Discuss Customization', 'Artwork Creation', 'Delivery To Your Doorstep']

export default function CustomOrders() {
  return (
    <>
      <SEO title="Custom Orders" description="Place custom orders for personalized resin art, memory frames, portraits, paintings, handmade gifts, and jewellery." />
      <section className="section page-hero"><div className="container"><SectionHeader eyebrow="Custom Order Process" title="From a small idea to a keepsake at your doorstep." /><div className="timeline">{processSteps.map((step, index) => <div className="step" key={step}><div className="step-number">0{index + 1}</div><h3>{step}</h3><p className="section-copy">A simple, guided step with clear communication and thoughtful finishing.</p></div>)}</div></div></section>
      <section className="section"><div className="container contact-grid"><div><SectionHeader eyebrow="Order Form" title="Tell us what you want to create." copy="Include size, occasion, date, names, colors, and reference images where possible." /></div><div className="contact-panel"><InquiryForm mode="order" /></div></div></section>
    </>
  )
}
